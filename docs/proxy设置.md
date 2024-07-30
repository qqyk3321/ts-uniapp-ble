```
# 为当前 PowerShell 会话设置代理
$env:http_proxy = "http://127.0.0.1:4780"
$env:https_proxy = "http://127.0.0.1:4780"

# 如果需要，也可以设置不走代理的地址
$env:no_proxy = "localhost,127.0.0.1"

```
