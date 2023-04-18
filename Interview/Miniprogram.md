**小程序自动埋点方案**

1. 原理：重写 Component 和 Page 构造器，通过页面路径 + 事件名 + 参数可以唯一确定一个埋点
2. 2 种接入方式：集成到 Ration | 提供单独覆盖包（提供注入，手动，配置）
3. 覆盖场景：生命周期、自定义函数、页面事件函数
4. 对于参数：1.页面绑定事件函数可以直接拿到 event.dataset 自动上报，结合配置映射可以自定义上报参数名称

**Javascript 精度问题**

1. 解决思路：将浮点数转换为整数进行计算
2. JavaScript 数值表示：十进制(36), 十六进制(0x1), 科学计数法(123e+3, 0.123e-3)，需要考虑科学计数法表示的场景
3. strip: 将数值尝试转换为固定精度的浮点数
4. digitLength: 获取数值的小数长度，需要考虑科学计数法的 e-x 的场景
5. float2Fixed: 将浮点数转换为整数，去除小数位
6. 乘除法运算思路: 将操作数转换为整数进行运算，再转换为浮点数；两个小数相乘，结果的小数位为两个操作数的小数位之和
7. 加减法运算思路：计算两个操作数最大的小数位，利用乘法转换为最大小数位的整数，相加后再除以转换倍数，其中除法 需要注意的是，小数位差值的倍数可能为不精确小数，考虑用 strip 进行修正

**Ration**

1. 高阶函数或类返回 Page、App
2. 支持 injection 注入一些常用方法
3. 防抖和节流支持快捷调用方式，Page 的 init 初始化，onLoad 里进行扩展
4. 整合 underscore
5. 提供封装好的请求方法
6. 整合自动埋点

**惯性滚动**

IOS 系统的 Safari 浏览器最早支持 -webkit-overflow-scrolling: touch，但存在兼容性问题

建模：滑块模型（带弹簧）

1. 惯性滚动第一阶段，匀加速计算初始速度
2. 惯性滚动第二阶段，匀减速计算滚动距离和时长
3. 需要考虑触发条件，停留时长小于某个阈值且最小位移距离大于某个阈值
4. 惯性滚动一般发生在容器内，需要考虑回弹
5. 惯性滚动第三阶段，滑块受反向的摩擦力和弹簧拉力做变减速运动，加速度越来越大，可以用一个近似的缓动曲线去描述这一过程，需要计算滑块触碰边界后的滚动距离，也就是曲线在时间范围内与 x 轴围成的面积，可以用积分表示，我们刚开始使用了 ease-out，因为我们知道该曲线的一个函数，可以很方便的计算其原函数，代入牛顿莱布利兹公式，就可以计算出积分值，也就是我们的滚动距离，但实际场景下 ease-out 的缓动效果比较差，我们不断地调整贝塞尔曲线，进行了大量地缓动效果测试，最终确认了缓动曲线，但是要计算该曲线的原函数是很复杂的，我们考虑将模型再一次进行了简化，由于第三阶段的加速度是大于匀减速运动的加速度的，所以第三阶段滑块触碰到边界后的滚动距离一定小于匀减速运动情况下的滚动距离，所以我们不妨设置一个阻力常量将不等式转化，最后在当前的贝塞尔曲线下经过大量的测试，这里的阻力常量设置为 10 - 12 较为合适
6. 最后还需要对惯性滚动的各个阶段设置缓动曲线，这里不涉及计算，只有大量的测试
7. 还有一个问题是处于回弹过程用户再次触碰元素时，我们需要暂停缓动，这里不同平台做法有些差异，在小程序端我们需要通过 getComputedStyle 获取当前元素的计算样式值，然后对偏移量进行重设

**多行省略**

1. 单行省略的方案是统一的，没有太多魔法
2. 最简单的多行省略是通过 CSS 属性 -webkit-line-clamp，移动端友好，PC 需要关注下兼容性，不支持自定义省略样式
3. 浮动实现，三个盒子文字，占位和自定义样式的省略盒子，全部向右浮动，然后给文字盒负边距值刚好为占位盒宽度，这样一来就给了占位盒子空间，当文字盒高度小于占位盒的时候，自定义省略盒子只能在第二排，但是当文字盒高度大于占位盒的时候，第一排的就有了多余空间，省略盒子就能挤进去，这时我们只需要将省略盒子定位到和占位盒同排就好了，这里可以使用 transform，最后在修饰一下给省略盒子增加文字颜色和渐变，这里其实利用了浮动和 BFC 原理，浮动盒子的区域不会和 BFC 重叠，在计算 BFC 高度时，浮动元素也会参与计算，浮动方案优点，支持所有主流浏览器，支持自定义带渐变的文字省略样式，对于背景颜色复杂的区域或者自定义省略样式需求时力不从心
4. 浮动 + line-clamp，借助 line-clamp 默认的省略号进行占位，隐藏省略号，替换为自定义省略盒子，预留位置可以调整字号，但是 font-size 会继承，所以需要再内嵌一个子盒子重置字号，隐藏省略号，可以通过设置透明度或颜色，接着通过浮动将自定义省略盒子定位到预留位置，但是由于设置了 line-clamp 会导致文字盒子无法撑开完整的高度，为了使用浮动的方案我们可以多渲染一份一模一样的文案来撑开高度，设置颜色透明