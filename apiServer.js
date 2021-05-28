// server.js

const webpush = require('web-push')
const express = require('express')
const path = require('path')

// 配置 web push
webpush.setVapidDetails(
  'mailto:your-email@provider.com',
  'BLjmecELgzCq4S-fJyRx9j03wvR0yjSs6O13L6qABrj7CadS8689Lvi2iErzG8SeaPSX_ezoyD2O0MMkGZcj4c0',
  'wNY2Jw8Zcw2wjfsiVzIxQB6K-ZoOkn-MS7fXxoo8w0Y'
)
webpush.setGCMAPIKey('<Your GCM API Key Here>')

// 存储 pushSubscription 对象
let pushSubscriptionSet = new Set()

// 定时任务，每隔 10 分钟向推送服务器发送消息
setInterval(function () {
  if (pushSubscriptionSet.size > 0) {
    pushSubscriptionSet.forEach(function (pushSubscription) {
      webpush.sendNotification(pushSubscription, JSON.stringify({
        title: '你好',
        body: '我叫李雷，很高兴认识你',
        icon: 'https://path/to/icon',
        url: 'http://localhost'
      }))
    })
  }
}, 1 * 60)

const app = new express()

// 服务端提供接口接收并存储 pushSubscription
app.post('/api/push/subscribe', function (req, res) {
  if (req.body) {
    try {
      pushSubscriptionSet.add(req.body)
      res.sendStatus(200)
    } catch (e) {
      res.sendStatus(403)
    }
  } else {
    res.sendStatus(403)
  }
})

// 静态资源
app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})
app.get('/entry.js', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'entry.js'))
})
app.get('/service-worker.js', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'service-worker.js'))
})
// 启动服务器
app.listen(80, function () {
  console.log('服务端启动了')
})
