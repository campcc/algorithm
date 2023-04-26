1. offsetWidth、clientWidth、scrollWidth

**offsetWidth**

- 只读属性，返回元素的布局宽度（包含 width、border、padding、竖直方向滚动条宽度）
- 如果设置了盒子模型为 border-box，返回的就是 border-box 盒子的宽度 width

**clientWidth**

- 只读属性，返回元素内部的宽度，对于内联元素、没有 CSS 样式的元素返回 0，否则返回 width + padding
- 如果设置了盒子模型为 border-box，返回盒子宽度 - border
- 根元素 html 或怪异模式下的 body，返回视口宽度(body 不包含滚动条，html 包含滚动条)

**scrollWidth**

- 只读属性，返回元素内容宽度，包括由于 overflow 溢出的内容
- 没溢出的情况下（没有水平滚动条），值就是 clientWidth
- 如果存在伪元素，其宽度也会计算进 scrollWidth
