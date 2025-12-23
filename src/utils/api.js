/**
 * API 유틸리티 모듈
 * 서버 통신을 위한 공통 함수들
 */
import axios from 'axios';

const API_BASE = '/api';

// API 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    // 요청 전 처리
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 에러 처리
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 401:
          console.error('인증이 필요합니다.');
          break;
        case 404:
          console.error('요청한 리소스를 찾을 수 없습니다.');
          break;
        case 500:
          console.error('서버 오류가 발생했습니다.');
          break;
        default:
          console.error(`오류 발생: ${data.message || '알 수 없는 오류'}`);
      }
    } else if (error.request) {
      console.error('서버 응답이 없습니다.');
    } else {
      console.error('요청 설정 오류:', error.message);
    }
    return Promise.reject(error);
  }
);

// API 함수들
export const apiService = {
  // 닉네임 확인
  async checkNickname(nickname) {
    return api.post('/check_nickname', { nickname });
  },

  // 이미지 업로드
  async uploadImages(formData) {
    return api.post('/get_pic', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // 이미지 생성
  async generateImage() {
    return api.get('/generate', { responseType: 'arraybuffer' });
  },

  // 이미지 목록 가져오기
  async getImages() {
    return api.get('/send_pic');
  },

  // 히스토리 이미지 가져오기
  async getHistoryImages() {
    return api.get('/send_pic2');
  },

  // 인스타그램 업로드
  async uploadToInstagram(imageData, caption, nickname) {
    return api.post('/instagram_upload', {
      image: imageData,
      caption,
      nickname,
    });
  },
};

export default api;
