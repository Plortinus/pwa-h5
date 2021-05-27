// 在Worker线程的全局作用域执行的，WorkerGlobalScope.importScripts()
console.log('Hello from service-worker.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');
if (workbox) {  
  console.log(`Yay! Workbox is loaded 🎉`);
  // 设置缓存名细节
  workbox.core.setCacheNameDetails({
    prefix: 'cosmo',
    suffix: 'v1.0.0'
  })

  /*
  * 以下语句来获取预缓存列表和预缓存他们，也就是打包项目后生产的html，js，css等* 静态文件
  */
  workbox.precaching.precacheAndRoute([
    { url: '/offline.html', revision: 1 }
  ])

  // 对我们请求的数据进行缓存，
  // 缓存策略：一共五种
  // NetworkFirst：网络优先策略，优先尝试通过网络获取资源，如果获取失败则使用缓存中的资源
  // CacheFirst：缓存优先策略，优先使用缓存中的资源，如果缓存中没有相关资源，则进行网络请求获取资源
  // NetworkOnly：只使用网络请求获取资源
  // CacheOnly：只使用缓存中的资源
  // StaleWhileRevalidate：如果缓存有数据，直接返回缓存中的资源，让界面快速加载，然后再发起网络请求更新相关资源并进行缓存
  workbox.routing.registerRoute(
    new RegExp('.*/.*'),
    new workbox.strategies.StaleWhileRevalidate()
  )

  // Catch routing errors, like if the user is offline
  workbox.routing.setCatchHandler(async ({ event }) => {
    // Return the precached offline page if a document is being requested
    if (event.request.destination === 'document') {
      return workbox.precaching.matchPrecache('/offline.html');
    }

    return Response.error();
  });
} else {  
  console.log(`Boo! Workbox didn't load 😬`);
}

// 首先监听 notificationclick 事件：
self.addEventListener('notificationclick', function (e) {
  // 关闭通知
  e.notification.close()
  // 打开网页
  e.waitUntil(clients.openWindow(e.notification.data.url))
})