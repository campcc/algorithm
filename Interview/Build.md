**模块化**

1. CommonJS（cjs），用于服务端的模块化方案，我们熟知的 require、module.exports
2. AMD、CMD，社区模块化方案，通过关键字 define 声明模块，常见于早期的 require.JS 等类库
3. ESM，JavaScript 官方标准化的模块系统，导入、导出指向的是同一个地址，支持静态分析
4. IIFE，立即执行函数，早期的 JQuery 等类库
5. UMD，通用模块定义规范，支持在 JavaScript 所有的运行环境，实现原理：通过工厂 + IIFE，根据不同的环境变量初始化模块

CJS 与 ESM 的差异，

1. cjs 的一个模块，就是一个脚本文件，require 命令第一次加载该脚本的时候，就会执行整个脚本，然后在内存中生成一个对象，再次执行会读取缓存值，所以 cjs 模块无论运行多少次 require 都只会在第一次加载时运行一次，以后再加载返回第一次运行的结果
2. cjs 是运行时加载的，加载的是一个对象（module.exports 属性），这个对象只有在脚本执行完后才会生成，返回的是一个值的拷贝
3. ESM 模块是静态的，也就是说引入模块的语句必须写在最顶层，只能使用常量字符串，不能依赖运行时的表达式（比如 if 语句），但 cjs 可以

如何在 ESM 中使用 cjs？想办法支持 require，`__filename`，`__dirname` 等关键字，实现原理为通过 import.meta 对象暴露出的特殊引用

**构建工具**

**gulp**

1. 一般我们将 gulp 与 grunt 进行对比，gulp 是一个基于流的自动化构建工具，核心实现依赖于 Node.js 的 Stream 的读写和转换
2. 核心概念：输入、输出、流、任务（串行 series 任务、并行 parallel 任务）
3. 工作原理：把文件读取为一个 Stream 流，然后对流进行一系列的操作，最后写入到另一个文件中

**Rollup**

1. Rollup 是一个 JavaScript 模块打包器，支持 ES6 模块、Tree-Shaking，小而美，由于不支持 code spliting，dev server，模块热更新等功能，所以更适合用来做类库的打包
2. 核心原理：从入口文件开始，使用 Acorn 读取解析文件，生成模块实例和 AST 抽象语法树，解析 AST 递归重复上述过程，同时基于 ESM 的静态分析，执行 Tree-Shaking

**webpack**

1. 目前使用量最大，社区最完善的模块打包工具，支持 dev server、热更新、code spliting、Tree-Shaking
2. 核心概念：entry、output、loader、plugin
3. 核心原理：从一个或多个入口文件开始，构建模块的依赖图，然后组合成 boundles 输出。其中，编译阶段读取并遍历 AST，利用 babel 或 loader 对源码做转换，逐步构建模块依赖图；生成阶段，遍历模块集合，将模块按规则组织成 chunks 并输出
4. loader 原理：webpack 编译阶段创建 module 后会执行 runLoaders 调用用户配置的所有 loader 来读取和转译资源，loader 的职责就是将输入内容进行转化，由于这个过程发生在 acorn 解析 AST 之前，所以 loader 的输出必须为 acorn 能解析的内容，比如标准的 JavaScript 文本或 AST 对象等
5. plugin 原理：webpack 在编译、构建等阶段暴露出了非常多的钩子，插件就是在这些钩子函数内，利用附带的上下文信息，加入一些自定义的 side effect 处理，插件通常是一个带有 apply 函数的类，需要将插件调用 this 指向当前的上下文

**Vite**

1. 基于 ESM 的构建工具，No Boundle + esbuild 预构建，整合 rollup 相较于 snowpack 而言开箱即用
2. esbuild 为什么快？底层 go，编译型语言，编译阶段就可以生成机器语言，启动直接执行，相较于 JavaScript 等边运行边解释的解释型语言，性能更高；其次，go 天生支持多线程
3. 核心原理：script 标签类型为 module，浏览器解析资源是，会向当前域名发起一个 GET 请求，vite 启动一个 koa 服务器拦截这些请求，对请求内容做一些分类处理然后以 ESM 格式返回给浏览器
4. esbuild 预构建的原因？支持 cjs 依赖，整合类似 lodash 这样的库减少模块数量和请求数量
5. 热更新原理：大同小异，通过 Websocket 创建 Dev Server 与浏览器的长连接，通过 chokidar 等工具监听文件变化，针对变化做一些处理推送到浏览器，浏览器响应变化进行更新
