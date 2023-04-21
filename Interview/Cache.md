**浏览器缓存**

按照获取资源时请求的优先级、浏览器缓存分为 4 种，

1. Memory Cache
2. Service Worker Cache
3. HTTP Cache
4. Push Cache

**Memory Cache 内存缓存**

最快也最短命，base64 图片，一些小的 JS、CSS 文件

**Service Worker Cache 离线缓存**

借助 Service Worker 线程实现，生命周期包括 install、active、working 三个阶段，原理：拦截 fetch

**HTTP Cache**

先命中强缓存，再命中协商缓存，

1. 强缓存实现：expires、cache-control
2. expires 原理：响应头中写入 expires，是一个时间戳，绝对时间，弊端，客户端和服务器存在时差
3. cache-control，手动指定缓存策略，no-store, no-cache, s-maxage（代理服务器缓存）, max-age
4. max-age 原理：相对时间，标识资源将在多少时间后失效，优先级大于 expires，s-maxage 优先级大于 max-age

协商缓存原理：问一下服务器，进而判断是重新发起请求，下载完整响应还是从本地获取缓存

1. 协商缓存实现：Last-modified、Etag
2. Last-modified 原理：一个时间戳，表示最后修改时间，随着资源第一次的响应头返回，随后每次请求带上 IF-Modified-Since 字段，值就是上一次返回的 Last-Modified，然后服务器判断是否一致，如果变化了，就会返回完整的响应内容，更新 Last-Modified 值，否则返回 304，不再添加 Last-Modified 字段
3. Last-Modified 的问题：两个，一是编辑了文体但实质内容没有修改，二是 If-Modified-Since 只能检测 s 级的时间差，如果修改过快不会生效
4. Etag 原理：由服务器为每个资源生成唯一标识符，通信原理与 Last-Modified 类似，下一次请求会带上 IF-Node-Match 字段，弊端是服务器开销
