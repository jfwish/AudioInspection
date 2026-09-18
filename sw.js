// 給你的快取取個名字
const CACHE_NAME = 'myAudioInspection';
// 列出你想要「離線儲存」的檔案
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json'
];

// 1. 安裝階段 (Install)：下載並儲存檔案
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('正在快取靜態資源');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. 攔截請求 (Fetch)：沒網路時從快取拿檔案
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 如果快取裡有，就直接回傳快取的檔案；沒有的話才去網路抓
      return response || fetch(event.request);
    })
  );
});