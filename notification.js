// function uint8ArrayToBase64 (arr) {
//   return btoa(String.fromCharCode.apply(null, new Uint8Array(arr)))
// }
// function distributePushResource (pushSubscription) {
//   return fetch('/path/to/subscribe', {
//     method: 'post',
//     body: JSON.stringify({
//       endpoint: pushSubscription.endpoint,
//       keys: {
//         p256dh: uint8ArrayToBase64(pushSubscription.getKey('p256dh')),
//         auth: uint8ArrayToBase64(pushSubscription.getKey('auth'))
//       }
//     })
//   })
// }
// async function subscribe () {
//   // 判断兼容性
//   if (window.PushManager == null && navigator.serviceWorker == null) {
//     return
//   }
//   // 注册 service-worker.js 获取 ServiceWorkerRegistration 对象
//   let registration = await navigator.serviceWorker.register('/service-worker', {scope: '/'})
//   // 发起推送订阅
//   let pushSubscription = await registration.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: base64ToUint8Array('BLjmecELgzCq4S-fJyRx9j03wvR0yjSs6O13L6qABrj7CadS8689Lvi2iErzG8SeaPSX_ezoyD2O0MMkGZcj4c0')
//   })
//   // 将 pushSubscription 发送给应用后端服务器
//   await distributePushResource(pushSubscription)
// }

  // navigator.serviceWorker.getRegistration().then(function (registration) {
  //   registration.showNotification('你好', {
  //     body: '我叫李雷，交个朋友吧',
  //     icon: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
  //     data: {
  //       time: new Date(Date.now()).toString(),
  //       url: 'https://www.baidu.com'
  //     }
  //   })
  //   .then(function () {
  //   // 通知展现成功
  //   })
  //   .catch(function (e) {
  //   // 通知展现未授权
  //   })
  // })