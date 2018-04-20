## thermometer-iot-fc-dingtalk

### 1. 阿里云IoT物联网套件-高级版产品开发实战

### 1.1 [温湿度计上报数据到钉钉群机器人实践](https://help.aliyun.com/document_detail/65255.html)
场景：办公室中已经布点的温湿度计设备上报数据到钉钉群机器人。

思路：温湿度计通过MQTT协议连接到IoT套件，规则引擎针对数据上报Topic配置转发到函数计算(FunctionComputer)中编写好的函数pushData2DingTalk，函数Nodejs脚本处理数据，post到钉钉群机器人的Webhook，配置了温湿度机器人的钉钉群组即可收到消息。

![](https://raw.githubusercontent.com/iot-blog/yunqi-iot-demo/master/images/iot-fc.png)

### 1.2 温湿度计设备模拟

```bash
$ node thermometer.js
```

### 1.3 [规则引擎SQL](https://help.aliyun.com/document_detail/30554.html)

rules-engine-fc.sql
```bash
payload :{temperature: 18,humidity: 63}

```

### 1.4 [函数计算](https://help.aliyun.com/document_detail/51733.html)脚本

fc-post2Dingtalk.js
## 2.阿里云IoT物联网套件-高级版产品开发实战

### 2.1 IoT云端产品物模型定义

阿里云IoT物联网套件控制台

![](https://raw.githubusercontent.com/iot-blog/thermometer-iot-fc-dingtalk/master/images/iot-product.png)

创建高级版产品，基本信息

![](https://raw.githubusercontent.com/iot-blog/thermometer-iot-fc-dingtalk/master/images/product-info.png)

高级版产品，定义物模型的 属性，服务，事件

![](https://raw.githubusercontent.com/iot-blog/thermometer-iot-fc-dingtalk/master/images/product-feature.png)

产品的消息通信-Topic类列表

![](https://raw.githubusercontent.com/iot-blog/thermometer-iot-fc-dingtalk/master/images/product-topic.png)


### 2.2 设备模拟端代码开发 advanced-thermometer.js
```Javascript

//属性上报的Topic
const topic = `/sys/${options.productKey}/${options.deviceName}/thing/event/property/post`;
setInterval(function() {
    //发布数据到topic
    client.publish(topic, getPostData());
}, 5 * 1000);


//服务订阅的Topic
const serviceTopic = `/sys/${options.productKey}/${options.deviceName}/thing/service/setTemperature`;
client.subscribe(serviceTopic)
client.on('message', function(topic, message) {

    if (serviceTopic === topic) {
        console.log("setTemperature " + JSON.parse(message).params.temperature)
    }

})

//事件上报的Topic
const eventTopic = `/sys/${options.productKey}/${options.deviceName}/thing/event/alarmCleaning/post`;
setInterval(function() {
    //事件上报
    client.publish(eventTopic, getEventData());
}, 20 * 1000);

``` 

### 2.3 设备上线后在云端查看

设备的运行状态

![](https://raw.githubusercontent.com/iot-blog/thermometer-iot-fc-dingtalk/master/images/device-status.png)

## 3.帮助&反馈

<img src='https://raw.githubusercontent.com/iot-blog/yunqi-iot-demo/master/images/iot-dd.png' width="240" height="300" />

联系我：

<img src='https://raw.githubusercontent.com/wongxming/dtalkNodejs/master/wongxming.jpg' width="240" height="240" />
