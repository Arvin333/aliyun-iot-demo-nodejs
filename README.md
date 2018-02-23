# thermometer-iot-fc-dingtalk

## 1.[温湿度计上报数据到钉钉群机器人实践](https://help.aliyun.com/document_detail/65255.html)、

场景：办公室中已经布点的温湿度计设备上报数据到钉钉群机器人。

思路：温湿度计通过MQTT协议连接到IoT套件，规则引擎针对数据上报Topic配置转发到函数计算(FunctionComputer)中编写好的函数pushData2DingTalk，函数Nodejs脚本处理数据，post到钉钉群机器人的Webhook，配置了温湿度机器人的钉钉群组即可收到消息。

![](https://gw.alipayobjects.com/zos/skylark/6b838058-fac6-482d-b493-7f872899b228/2018/png/afa45386-1971-4218-b4f8-cc210b71963f.png)

## 2.温湿度计设备模拟

```bash
$ node thermometer.js
```

## 3.[规则引擎SQL](https://help.aliyun.com/document_detail/42732.html)

rules-engine-fc.sql
```bash
payload :{temperature: 18,humidity: 63}

```

## 4.函数计算脚本

fc-post2Dingtalk.js

## 5.IoT套件技术支持群

![](https://gw.alipayobjects.com/zos/skylark/c79fe29d-8c52-475e-a5c8-de95de005d99/2018/png/17fb88e0-1d91-4f0a-bd20-3f38afd46c6c.png)