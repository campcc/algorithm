**本地存储**

**Cookie**

```xml
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
```

1. 背景，HTTP 是一个无状态协议，服务器没有记录客户端的状态，最常见的场景是保持用户的登录状态，所以 Cookie 最初的设计是为了维持会话状态，在 Web Storage API 没有出来之前，在没有 Web Storage 前，Cookie 曾一度用于客户端数据的存储
2. 是什么？以键值对存储在浏览器本地的一小块数据，我们说的 Cookie 通常指 HTTP Cookie，它是由服务器发送到浏览器并保存在本地的一小块数据，最大为 4kb
3. 服务器怎么发送？响应头设置一个或多个 Set-Cookie 选项
4. 遵循同源策略

**Cookie 的特性**

服务器响应头设置了 Set-Cookie 后，对该服务器发起的每一次新请求，浏览器都会将之前保存的 Cookie 信息通过 Cookie 请求头发送给服务器

**Cookie 可设置的属性**

除了键值对数据外，Cookie 可以指定以下额外属性，

1. Domian & Path，标识 Cookie 定义的域和路径
2. SameSite，严格模式下可阻止跨站请求携带的 Cookie，CSRF 攻击的防范手段之一
3. HttpOnly，限制 Cookie 只能访问不能被 JavaScript 读取，可以减少 XSS 攻击带来的影响
4. Expires & Max-Age，设置 Cooikie 的生命周期，过期后会被删除，与 HTTP 强缓存类似

**Cookie 的使用场景**

1. 会话状态管理（用户登录、购物车等信息）
2. 个性化设置（用户自定义设置、主题）
3. 浏览器行为跟踪（跟踪分析用户行为）

**LocalStorage & SessionStorage**

Web Storage 是 HTML5 提供的浏览器数据存储机制，分为 LocalStorage 和 SessionStorage，

1. 两者都遵循同源策略，仅支持以字符串键值对的形式存储，区别是生命周期和作用域不同
2. LocalStorage 是持久化的本地存储，同一域名下如果不手动清除会一直存在，SessionStorage 在页面会话结束（关闭 Tab）后会被清除
3. Storage 在不同浏览器支持的可存储的数据大小不同，大约在 2.5M 到 10M 之间

> Storage 存储大小可用 [Web Storage Support Test](http://dev-test.nemikor.com/web-storage/support-test/) 工具进行测试

**IndexDB**

一个运行在浏览器上的非关系型数据库，NoSQL，以键值对来存储，除了存储字符串外，还可以用来存储文件、二进制数据
