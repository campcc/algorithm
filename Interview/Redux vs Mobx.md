### Redux & Mobx

为什么我们需要状态管理？状态管理的本质是为了解决项目变大，状态复杂后组件间通信的问题，主要包括以下两种场景，

1. 某一个状态需要在多个组件间共享（访问和更新）
2. 某个组件的交互需要触发其他组件的状态更新

官方方案，

1. 状态提升（提升到最近祖先组件）
2. Context

其他方案：发布订阅

但上述方式在项目足够庞大的时候仍然会让程序变得难以同步，此时就可以考虑引入状态管理库

无论是 Redux 还是 Mobx，本质都是为了解决状态管理混乱，无法有效同步的问题，它们都支持，

1. 统一维护管理应用状态
2. 某一个状态只有一个可信的数据源（通常命名 store，指状态容器）
3. 操作更新状态的方式统一，并且可控（通常以 action 的方式更新状态途径）
4. 支持将 store 与 React 组件连接（如 react-redux, mobx-react）

并且，Redux 和 Mobx 都是 JavaScript 应用状态的管理库，适用于 React, Vue, Angular 等框架，而不局限于某一个特定的框架

**Redux 核心原理**

要介绍 Redux，就不得不提到 Flux 了，Flux 是 Facebook 用来开发客户端-服务端 Web 应用程序的应用架构，它更多的是一种架构模式，而非一个特定的框架，

它的关注点主要是以下几个方面，

1. Action：一个 JavaScript 对象，用来描述动作相关的信息，主要包含 type 和 payload
2. Reducer：定义应用如何响应不同的动作（action），如何更新状态
3. Store：来管理 action 和 reducer 及其关系的对象，主要提供以下功能
   - （1）维护应用状态并支持访问状态（getState()）
   - （2）支持监听 action 的分发，更新状态（dispatch(action)）
   - （3）支持订阅 store 的变更（subscribe(listener)）
4. 异步流：由于 Redux 所有对 store 的更新，都约定通过 action 来触发，异步任务（通常是业务和获取数据）也不例外，为了不将业务和数据相关的任务混入 React 组件，就需要使用其他框架配合管理异步任务的流程，如 redux-thunk, redux-sage 等

**Mobx 核心原理**

Mobx 是一个透明函数响应式编程（Transparently Functional Reactive Programming，TFRP）的状态管理库，它的设计思想是，任何起源于应用状态的数据都应该自动获取，所以在设计上，Mobx 提供了，

1. Action：与 Redux 的 action 不同，Mobx 的 action 是一个定义了改变状态的动作函数，包括如何去变更状态
2. Store：集中管理状态（State）和动作（action）
3. Derivation：衍生，从应用状态派生出的数据，主要分为两类，
   - （1）Computed Values（计算值）：计算值总是可以通过纯函数从从当前可观察的状态中获取
   - （2）Reactions（反应）：状态变更时需要自动发生的副作用，这种情况需要实现其读写操作

**函数式编程 & 面向对象**

从上面的设计思想不难看出，Redux 更多的是遵循函数式编程思想，Mobx 更多从面向对象的角度考虑问题，具体来说，

Redux 提倡编写函数式代码，比如 reducer 就是一个纯函数（对于相同的输入总是输出相同的结果，没有副作用），接受 state 和 action，返回新的 state，

Mobx 设计则是更多偏向于面向对象（OOP）和响应式编程（Reactive Programing），Mobx 将状态包装成可观察的对象，于是我们可以使用可观察对象的能力，一旦状态对象变更，就能自动获得更新

**单一 store & 多 store**

对于状态数据的管理 store 而言，两个框架的最佳实践也有一定区别，在 Redux 中，我们总是将所有共享的应用数据集中在一个大的 store 中，

而 Mobx 则通常按照模块将应用状态进行划分，在多个独立的 store 中进行管理

**JavaScript 对象 & 可观察对象**

对于状态数据的存储形式而言，Redux 使用普通的 JavaScript 对象，而 Mobx 使用可观察对象，

所以在 Redux 中需要手动追踪所有状态对象的变更，而 Mobx 可以监听可观察对象，当其变更时自动触发监听

**不可变（Immutable） & 可变（Mutable）**

对于状态数据的特性而言，Redux 使用不可变对象，我们不能直接操作状态对象（state），而总是在原来 state 基础上返回一个新的 state，这样能很方便的返回应用的上一状态

而 Mobx 中可以直接使用新值更新新状态对象
