/**
 * IndexedDB 유틸리티 모듈
 * 로컬 이미지 캐싱을 위한 함수들
 */

const DB_VERSION = 1;

/**
 * IndexedDB 열기
 * @param {string} dbName - 데이터베이스 이름
 * @param {string} storeName - 스토어 이름
 * @returns {Promise<IDBDatabase>} 데이터베이스 객체
 */
function openDB(dbName, storeName) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, DB_VERSION);

    request.onerror = () => {
      reject(new Error(`IndexedDB 열기 실패: ${request.error}`));
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };
  });
}

/**
 * 모든 이미지 가져오기
 * @param {string} dbName - 데이터베이스 이름
 * @param {string} storeName - 스토어 이름
 * @returns {Promise<string[]>} 이미지 URL 배열
 */
export async function getAllImages(dbName, storeName) {
  try {
    const db = await openDB(dbName, storeName);
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        const images = request.result.map(
          (item) => `data:image/png;base64,${item.url}`
        );
        resolve(images);
      };

      request.onerror = () => {
        reject(new Error('이미지 조회 실패'));
      };

      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error('IndexedDB 오류:', error);
    return [];
  }
}

/**
 * 이미지 저장
 * @param {string} dbName - 데이터베이스 이름
 * @param {string} storeName - 스토어 이름
 * @param {string[]} imageUrls - 저장할 이미지 URL 배열
 * @returns {Promise<void>}
 */
export async function storeImages(dbName, storeName, imageUrls) {
  try {
    const db = await openDB(dbName, storeName);
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);

      imageUrls.forEach((url) => {
        store.add({ url });
      });

      transaction.oncomplete = () => {
        db.close();
        resolve();
      };

      transaction.onerror = () => {
        reject(new Error('이미지 저장 실패'));
      };
    });
  } catch (error) {
    console.error('IndexedDB 저장 오류:', error);
    throw error;
  }
}

/**
 * 스토어 비우기
 * @param {string} dbName - 데이터베이스 이름
 * @param {string} storeName - 스토어 이름
 * @returns {Promise<void>}
 */
export async function clearStore(dbName, storeName) {
  try {
    const db = await openDB(dbName, storeName);
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onsuccess = () => {
        db.close();
        resolve();
      };

      request.onerror = () => {
        reject(new Error('스토어 비우기 실패'));
      };
    });
  } catch (error) {
    console.error('IndexedDB 클리어 오류:', error);
    throw error;
  }
}

// 데이터베이스 상수
export const DB_NAMES = {
  HAIR: 'hairDb',
  COLOR: 'colorDb',
};

export const STORE_NAMES = {
  HAIR: 'hairUrls',
  COLOR: 'colorUrls',
};
