/**
 * 헬퍼 유틸리티 함수들
 */

/**
 * Data URL을 Blob으로 변환
 * @param {string} dataURL - Data URL 문자열
 * @returns {Blob} 변환된 Blob 객체
 */
export function dataURLtoBlob(dataURL) {
  if (!dataURL || !dataURL.includes(',')) {
    throw new Error('Invalid data URL');
  }
  
  const arr = dataURL.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  
  if (!mimeMatch) {
    throw new Error('Invalid data URL format');
  }
  
  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
}

/**
 * Blob을 Base64로 변환
 * @param {Blob} blob - Blob 객체
 * @returns {Promise<string>} Base64 문자열
 */
export function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * 파일 크기 포맷팅
 * @param {number} bytes - 바이트 수
 * @returns {string} 포맷된 문자열
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 이미지 파일 유효성 검사
 * @param {File} file - 파일 객체
 * @param {number} maxSize - 최대 크기 (바이트)
 * @returns {Object} 유효성 검사 결과
 */
export function validateImageFile(file, maxSize = 10 * 1024 * 1024) {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  
  if (!file) {
    return { valid: false, error: '파일이 선택되지 않았습니다.' };
  }
  
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: '지원하지 않는 이미지 형식입니다.' };
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: `파일 크기가 ${formatFileSize(maxSize)}를 초과합니다.` };
  }
  
  return { valid: true };
}

/**
 * 디바운스 함수
 * @param {Function} func - 실행할 함수
 * @param {number} wait - 대기 시간 (ms)
 * @returns {Function} 디바운스된 함수
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
