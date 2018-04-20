/**
 * node advanced-thermometer.js
 */
const mqtt = require('aliyun-iot-mqtt');
//设备属性

const options = {
    productKey: "产品productKey",
    deviceName: "设备deviceName",
    deviceSecret: "设备的secret",
    regionId: "cn-shanghai"
};
//建立连接
const client = mqtt.getAliyunIotMqttClient(options);

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



function getPostData(){
    const payloadJson = 
    {
        id: Date.now(),
        params: {
            temperature: Math.floor((Math.random() * 20) + 10),
            humidity: Math.floor((Math.random() * 20) + 40)
        },
        method: "thing.event.property.post"

    }

    console.log("===postData topic=" + topic)
    console.log(payloadJson)

    return JSON.stringify(payloadJson);
}


function getEventData(){
    const payloadJson = 
    {
        id: Date.now(),
        params: {},
        method: "thing.event.alarmCleaning.post"
    }

    console.log("===EventData topic=" + topic)
    console.log(payloadJson)
    
    return JSON.stringify(payloadJson);
}
//client.end()