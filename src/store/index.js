/**
 * Vuex Store
 * 애플리케이션 상태 관리
 */
import Vue from 'vue';
import Vuex from 'vuex';
import { apiService } from '@/utils/api';
import { getAllImages, storeImages, DB_NAMES, STORE_NAMES } from '@/utils/indexedDB';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // UI 상태
    showAppBar: true,
    isLoading: false,
    
    // 이미지 데이터
    hairImages: [],
    colorImages: [],
    uploadedImage: null,
    uploadedColorImage: null,
    uploadedFaceImage: null,
    
    // 사용자 상태
    isLoggedIn: false,
    userName: null,
    
    // 에러 상태
    error: null,
  },

  getters: {
    // 로그인 여부
    isAuthenticated: (state) => state.isLoggedIn && state.userName,
    
    // 이미지 업로드 준비 완료 여부
    isReadyToGenerate: (state) => 
      state.uploadedImage && 
      state.uploadedColorImage && 
      state.uploadedFaceImage,
    
    // 헤어 이미지 개수
    hairImageCount: (state) => state.hairImages.length,
    
    // 컬러 이미지 개수
    colorImageCount: (state) => state.colorImages.length,
  },

  mutations: {
    // 사용자 관련
    SET_USER_NAME(state, userName) {
      state.userName = userName;
    },
    SET_IS_LOGGED_IN(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    
    // 이미지 관련
    SET_UPLOADED_IMAGE(state, image) {
      state.uploadedImage = image;
    },
    SET_UPLOADED_COLOR_IMAGE(state, image) {
      state.uploadedColorImage = image;
    },
    SET_UPLOADED_FACE_IMAGE(state, image) {
      state.uploadedFaceImage = image;
    },
    SET_HAIR_IMAGES(state, images) {
      state.hairImages = images;
    },
    SET_COLOR_IMAGES(state, images) {
      state.colorImages = images;
    },
    
    // UI 관련
    SET_SHOW_APP_BAR(state, value) {
      state.showAppBar = value;
    },
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    
    // 에러 관련
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    },
    
    // 이미지 초기화
    CLEAR_UPLOADED_IMAGES(state) {
      state.uploadedImage = null;
      state.uploadedColorImage = null;
      state.uploadedFaceImage = null;
    },
  },

  actions: {
    /**
     * 헤어 이미지 로드
     */
    async fetchImagesHair({ commit, dispatch }) {
      try {
        // IndexedDB에서 먼저 확인
        const cachedImages = await getAllImages(DB_NAMES.HAIR, STORE_NAMES.HAIR);
        
        if (cachedImages.length > 0) {
          commit('SET_HAIR_IMAGES', cachedImages);
          return;
        }
        
        // 서버에서 가져오기
        await dispatch('fetchAndCacheImages', {
          dbName: DB_NAMES.HAIR,
          storeName: STORE_NAMES.HAIR,
          imageType: 'hair',
          mutation: 'SET_HAIR_IMAGES',
        });
      } catch (error) {
        console.error('헤어 이미지 로드 실패:', error);
        commit('SET_ERROR', '헤어 이미지를 불러오는데 실패했습니다.');
      }
    },

    /**
     * 컬러 이미지 로드
     */
    async fetchImagesColor({ commit, dispatch }) {
      try {
        // IndexedDB에서 먼저 확인
        const cachedImages = await getAllImages(DB_NAMES.COLOR, STORE_NAMES.COLOR);
        
        if (cachedImages.length > 0) {
          commit('SET_COLOR_IMAGES', cachedImages);
          return;
        }
        
        // 서버에서 가져오기
        await dispatch('fetchAndCacheImages', {
          dbName: DB_NAMES.COLOR,
          storeName: STORE_NAMES.COLOR,
          imageType: 'color',
          mutation: 'SET_COLOR_IMAGES',
        });
      } catch (error) {
        console.error('컬러 이미지 로드 실패:', error);
        commit('SET_ERROR', '컬러 이미지를 불러오는데 실패했습니다.');
      }
    },

    /**
     * 서버에서 이미지 가져와서 캐싱
     */
    async fetchAndCacheImages({ commit }, { dbName, storeName, imageType, mutation }) {
      try {
        const response = await apiService.getImages();
        const data = response.data;
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        const images = imageType === 'hair' ? data.hair : data.color;
        
        // IndexedDB에 저장
        await storeImages(dbName, storeName, images);
        
        // 상태 업데이트
        const formattedImages = images.map((img) => `data:image/png;base64,${img}`);
        commit(mutation, formattedImages);
      } catch (error) {
        console.error('이미지 캐싱 실패:', error);
        throw error;
      }
    },

    /**
     * 로그인 처리
     */
    async login({ commit }, username) {
      try {
        await apiService.checkNickname(username);
        commit('SET_IS_LOGGED_IN', true);
        commit('SET_USER_NAME', username);
        localStorage.setItem('username', username);
      } catch (error) {
        commit('SET_IS_LOGGED_IN', false);
        commit('SET_USER_NAME', null);
        localStorage.removeItem('username');
        throw error;
      }
    },

    /**
     * 로그아웃 처리
     */
    async logout({ commit }) {
      try {
        await apiService.checkNickname(null);
      } catch (error) {
        console.error('로그아웃 API 호출 실패:', error);
      } finally {
        commit('SET_IS_LOGGED_IN', false);
        commit('SET_USER_NAME', null);
        localStorage.removeItem('username');
      }
    },

    /**
     * 저장된 로그인 정보 복원
     */
    async restoreLogin({ dispatch }) {
      const username = localStorage.getItem('username');
      if (username) {
        try {
          await dispatch('login', username);
        } catch (error) {
          console.error('로그인 복원 실패:', error);
        }
      }
    },
  },
});
