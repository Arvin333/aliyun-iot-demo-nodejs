-- payload :{temperature: 18,humidity: 63}
-- https://help.aliyun.com/document_detail/42732.html

SELECT
deviceName() as deviceName,
attribute('tag') as tag,
attribute('deviceISN') as isn,
temperature,
humidity,
timestamp('yyyy-MM-dd HH:mm:ss') as time
FROM
"/此处为产品productKey/+/data"