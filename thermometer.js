/**
* node thermometer.js
*/
const mqtt = require('aliyun-iot-mqtt');

const options = {
    productKey: "产品productKey",
    deviceName: "设备deviceName",
    deviceSecret: "设备的secret",
    regionId: "cn-shanghai"
};

const client = mqtt.getAliyunIotMqttClient(options);

//添加了转发函数计算规则的Topic
const topic = `${options.productKey}/${options.deviceName}/data`;
const data = {
    temperature: Math.floor((Math.random()*20)+10),
    humidity: Math.floor((Math.random()*100)+20),
};

client.on('connect', function (connack) {
  console.log("connect... ",JSON.stringify(connack));
})
 
client.on('message', function (topic, message) {
  console.log("\nReceived: "+topic)
  console.log(message.toString())
})
client.on('close', function () {
  console.log("close... ")
})

//订阅topic
client.subscribe(topic)
//发布数据到topic
client.publish(topic, JSON.stringify(data));

//client.end()

