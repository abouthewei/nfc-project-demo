(() => {
  const DB_NAME = 'nanfeng-open-kiln-local-stories';
  const STORE_NAME = 'stories';
  let databasePromise;

  function openDatabase() {
    if (!('indexedDB' in window)) return Promise.reject(new Error('当前浏览器不支持本机作品保存。'));
    if (databasePromise) return databasePromise;

    databasePromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          database.createObjectStore(STORE_NAME, { keyPath: 'storyId' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('无法打开本机作品空间。'));
      request.onblocked = () => reject(new Error('本机作品空间正在升级，请关闭其他南风古灶页面后重试。'));
    });
    databasePromise.catch(() => { databasePromise = null; });
    return databasePromise;
  }

  async function saveStory(story) {
    const database = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, 'readwrite');
      transaction.objectStore(STORE_NAME).put(story);
      transaction.oncomplete = () => resolve(story);
      transaction.onerror = () => reject(transaction.error || new Error('作品没有保存到本机。'));
      transaction.onabort = () => reject(transaction.error || new Error('作品保存已取消。'));
    });
  }

  async function getStory(storyId) {
    const database = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, 'readonly');
      const request = transaction.objectStore(STORE_NAME).get(storyId);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error || new Error('无法读取这份本机作品。'));
    });
  }

  async function deleteStory(storyId) {
    const database = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, 'readwrite');
      transaction.objectStore(STORE_NAME).delete(storyId);
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error || new Error('无法删除这份本机作品。'));
      transaction.onabort = () => reject(transaction.error || new Error('作品删除已取消。'));
    });
  }

  window.LocalStoryStore = { saveStory, getStory, deleteStory };
})();
