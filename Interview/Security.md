**XSS 攻击**

跨站脚本攻击，是一种代码注入攻击，原理是：通过在目标网站上注入恶意脚本，使之在用户浏览器上运行以获取用户敏感信息如 Cookie、SessionID 等，

这里的脚本包括两类 script 标签和 javasript: ，常见注入方法有，

1. HTML 内嵌的文本中，恶意内容通过 script 标签注入（如搜索关键词，输入 script 标签恶意代码，服务端解析参数拼接返回，浏览器将返回数据嵌入执行）
2. 标签的 href、src 等属性中，包含 javascript: 等可执行代码（如 a 标签 redirect_to?JavAsCript:...），需要注意大小写、空格都能执行，要选择成熟的转义库
3. 其他方式，style 属性标签中的 background-image: url("javascript:...")，expression(..) CSS 表达式（新版浏览器可防范）

根据类型，XSS 可以分为，

1. 存储型，恶意代码提交到数据库，通过响应拼接在 HTML 中返回给浏览器执行
2. 反射型，没到数据库，在 URL 上返回
3. DOM 型，构造出特殊的 URL 包含 javascript: 等，用户点击后执行

解决方案，

1. 前后端都需要对敏感字符进行转义，需要成熟的转义库
2. 使用类似 innerHtml，事件监听器，a 标签的 href 属性等方法时要格外小心，尽量避免使用框架的 v-html/dangerouslySetInnerHtml 等方法，eval 等方法
3. HTTP-only：cookie，禁止 JavaScript 读取 Cookie
4. 验证码，防止脚本冒充用户提交

**CSRF**

跨站请求伪造，原理是：利用已登录网站的 Cookie，通过诱导链接向当前网站发送请求，由于默认会携带当前网站的 Cookie 从而绕开后台验证

常见的攻击方式有，

1. 访问含有特殊 img 标签的页面，src 自动发送 GET 请求，带查询参数
2. 隐藏的表单，页面载入就自动 POST 提交
3. 伪造 a 标签 href 的链接诱导点击

解决方案，

1. 阻止不明外域访问，可使用同源检测（检查 referer、origin），Samesite Cookie（Set-Cookie 响应头的 Samesite 属性，设置为 strict 后 Cookie 不能作为三方 Cookie）
2. 提交时要求附加本域才能获取，可使用 CSRF Token（请求附加额外的 Token，攻击者只能伪造 Cookie），双重 Cookie 验证（取 Cookie 中的某个值附加到 URL 或 POST 请求中，csrf 只能让请求携带 cookie 不能读取 cookie 加入 POST 或 URL 中）
