/*
* iothub -->FC --> Dingtalk webhook
*/
const https = require('https');
const accessToken = '此处填写钉钉机器人webhook的accessToken';
module.exports.handler = function(event, context, callback) {
    var eventJson = JSON.parse(event.toString());
    //钉钉消息格式
    const postData = JSON.stringify({
        "msgtype": "markdown",
        "markdown": {
            "title": "温湿度传感器",
            "text": "#### 温湿度传感器上报\n" +
                "> 设备位置：" + eventJson.tag + "\n\n" +
                "> 设备编号：" + eventJson.isn + "\n\n" +
                "> 实时温度：" + eventJson.temperature + "℃\n\n" +
                "> 相对湿度：" + eventJson.humidity + "%\n\n" +
                "> ###### " + eventJson.time + " 发布  by [物联网套件](https://www.aliyun.com/product/iot) \n"
        },
        "at": {
            "isAtAll": false
        }
    });
    const options = {
        hostname: 'oapi.dingtalk.com',
        port: 443,
        path: '/robot/send?access_token=' + accessToken,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };
    const req = https.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {});
        res.on('end', () => {
            callback(null, 'success');
        });
    });
    // 异常返回
    req.on('error', (e) => {
        callback(e);
    });
    // 写入数据
    req.write(postData);
    req.end();
};