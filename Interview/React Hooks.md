1. React 设计理念；快速响应（解决 CPU、IO 瓶颈）
2. CPU 瓶颈，大数据量的渲染导致的掉帧（刷新率内，JS 占用主线程，浏览器没有时间执行样式布局和绘制），解决关键在于任务切片，将同步更新变成可中断的异步更新
3. IO 瓶颈，主要来源于网络延迟（客观存在，只能降低用户感知），解决方案参考苹果 IOS 人机交互研究的结果，是否显示 loading 取决于异步时间长短，具体的实现为 Suspense 及配套的 useDeferredValue
4. React 15 架构，两层，reconciler（协调器）和 Renderer（渲染器），一个负责找出变化的组件，一个负责将变化的组件渲染到页面
5. React 16 架构，三层，reconciler 重构为 Fiber Reconciler，新增调度器 Scheduler 调度任务的优先级，高优先级任务会优先进入 Reconciler
6. 为什么 Scheduler 实现不用浏览器原生支持的 requestIdleCallback？两个考量点，一是浏览器兼容性，跨平台问题，二是触发频率问题（切换 Tab 之前注册的触发频率会降低）
7. Fiber 架构：既是架构（可中断的异步更新），也是数据结构（节点的 key、tag、type、stateNode 等）也是工作单元（保存了本次更新的状态改变等相关信息）
8. 双缓冲技术（Double Buffing）: 内存中构建并直接替换，比如 canvas 帧动画替换避免绘制白屏，alternate 连接的两颗 current & workInProcess Fiber 树
9. mount 阶段，ReactDOM.render 做了什么？创建 fiberRoot 和 rootFiber（应用根节点和 App 组件），进入 render 阶段，构建 workInProcess Fiber 树，构建完成后进入 commit 阶段替换 current
10. update 阶段做了什么？开启新的 render 阶段，构建 workInProcess 树尝试复用节点（Diffing 算法），构建完成后进入 commit 阶段替换 current
11. render 阶段做了什么？从 performSyncWorkOnRoot 或 performConConcurrentWorkOnRoot 开始（取决于世同步还是异步更新）开始，循环调用，区别在于是否判断 shouldYield 空闲时间，递归过程分别对应 beginWork 和 completeWork
12. 递归中怎么区分是首次渲染还是更新？Fiber 基于双缓冲技术，最多存在两颗 Fiber 树，首次渲染时是不存在 currentFiber 的，可以通过判断 current 是否为 null 来区分
13. beginWork 做了什么？判断 mount 还是 update，update 多了一个判断节点是否可以复用，不可复用时与 mount 一致，根据节点的 tag 区别处理，如果是 mount 调用 mountChildFibers 创建新的 Fiber 节点，如果是 update 调用 reconcileChildFibers，这个过程会调用 Diffing 算法将比较的结果生成新的节点，最后返回生成的子 Fiber 节点赋值给 workInPorcess.child，作为本次 beginWork 的返回值和下一次 performUnitOfWork 执行时 workInProgress 的 传参
14. mountChildFibers 与 reconcileChildFibers 的区别？后者会生成 effectTag
15. completeWord 做了什么？判断 tag、判断 mount 还是 update，如果是 mount，为 Fiber 创建对应的 DOM 节点，然后将子孙 DOM 节点插入，接着处理 props 生成 effectList，update 时已经存在 DOM 节点，只需要 diff props 返回待更新的属性名列表即可，最终都会生成 effectList
16. 什么是 effectList，为什么需要生成 effectList？effectList 是一个单向链表，保存了每个执行完 completeWork 并且存在 effectTag 的节点，这样在 commit 阶段只需要遍历一次 effectList 就能执行所有的 effect
17. v18 开发环境 render 两次？