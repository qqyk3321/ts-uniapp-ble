# 项目配置



## 配置步骤
1. 确认包含node
2. 请执行`npm -i`
3. 请确认登录,如果不登陆会造成很多内容无法使用
4. 如果无法下载或者长时间没有反应,建议添加proxy
```powershell
$env:http_proxy = "http://127.0.0.1:4780"
$env:https_proxy = "http://127.0.0.1:4780"
```
4. 点击::运行->运行到小程序模拟器->运行设置,配置微信小程序工具路径. 请确保添加到`.exe`
5. 打开微信小程序开发者工具,配置::设置->安全设置->打开全部安全
6. 配置项目appid::`/src/manifest.json`  ->基础配置->获取DcloudAppId
7. 配置项目中微信小程序appid::`/src/manifest.json`  ->微信小程序配置->微信小程序id`wxc108778cc3730721`,并勾选`上传代码时自动压缩`

## 项目提交
1. `npm run cz`
2. `git push -u origin main`