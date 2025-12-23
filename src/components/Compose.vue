<template>
  <div class="compose-container">
    <div class="compose-header">
      <h3>결과 이미지</h3>
    </div>
    
    <div class="compose-content">
      <img :src="imageSrc" alt="결과 이미지" class="result-image" />
    </div>
    
    <div class="compose-actions">
      <v-btn color="primary" :loading="isLoading" :disabled="!canGenerate" @click="handleGenerate">
        <v-icon left>mdi-auto-fix</v-icon>생성하기
      </v-btn>
      <v-btn color="secondary" outlined :disabled="!hasResult" @click="showShareModal = true">
        <v-icon left>mdi-share-variant</v-icon>공유하기
      </v-btn>
    </div>

    <v-dialog v-model="showShareModal" max-width="400">
      <v-card>
        <v-card-title>인스타그램 공유</v-card-title>
        <v-card-text>
          <img :src="imageSrc" alt="공유할 이미지" class="share-preview" />
          <v-textarea v-model="caption" label="캡션" placeholder="캡션을 입력하세요" outlined rows="3"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="showShareModal = false">취소</v-btn>
          <v-btn color="primary" :loading="isSharing" @click="handleShare">업로드</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="2000">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { apiService } from '@/utils/api';
import { dataURLtoBlob } from '@/utils/helpers';

export default {
  name: 'ComposeResult',
  data() {
    return {
      imageSrc: require('@/assets/man_icon.png'),
      imageBlob: null,
      hasResult: false,
      showShareModal: false,
      caption: '',
      isSharing: false,
      snackbar: { show: false, text: '', color: 'info' },
    };
  },
  computed: {
    ...mapState(['uploadedImage', 'uploadedColorImage', 'uploadedFaceImage', 'isLoading', 'userName', 'isLoggedIn']),
    ...mapGetters(['isReadyToGenerate']),
    canGenerate() {
      return this.isReadyToGenerate && this.isLoggedIn && !this.isLoading;
    },
  },
  methods: {
    ...mapMutations(['SET_LOADING']),
    showMessage(text, color = 'info') {
      this.snackbar = { show: true, text, color };
    },
    async handleGenerate() {
      if (!this.isLoggedIn) {
        this.showMessage('로그인이 필요합니다.', 'warning');
        return;
      }
      if (!this.uploadedImage || !this.uploadedColorImage || !this.uploadedFaceImage) {
        this.showMessage('모든 이미지를 선택해주세요.', 'warning');
        return;
      }
      this.SET_LOADING(true);
      try {
        const formData = new FormData();
        formData.append('files', this.uploadedFaceImage, 'face.png');
        formData.append('files', dataURLtoBlob(this.uploadedImage), 'target.png');
        formData.append('files', dataURLtoBlob(this.uploadedColorImage), 'color.png');
        await apiService.uploadImages(formData);
        const response = await apiService.generateImage();
        this.imageBlob = new Blob([response.data], { type: 'image/png' });
        this.imageSrc = URL.createObjectURL(this.imageBlob);
        this.hasResult = true;
        this.showMessage('이미지 생성 완료!', 'success');
      } catch (error) {
        console.error('이미지 생성 실패:', error);
        this.showMessage('이미지 생성에 실패했습니다.', 'error');
      } finally {
        this.SET_LOADING(false);
      }
    },
    async handleShare() {
      if (!this.imageBlob) return;
      this.isSharing = true;
      try {
        const reader = new FileReader();
        reader.readAsDataURL(this.imageBlob);
        reader.onloadend = async () => {
          await apiService.uploadToInstagram(reader.result, this.caption, this.userName);
          this.showMessage('인스타그램 공유 성공!', 'success');
          this.showShareModal = false;
        };
      } catch (error) {
        console.error('공유 실패:', error);
        this.showMessage('공유에 실패했습니다.', 'error');
      } finally {
        this.isSharing = false;
      }
    },
  },
};
</script>

<style scoped>
.compose-container {
  display: flex;
  flex-direction: column;
  width: 400px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}
.compose-header {
  padding: 16px 20px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}
.compose-header h3 { margin: 0; font-size: 1.1rem; }
.compose-content {
  width: 100%;
  height: 320px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.result-image { max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 8px; }
.compose-actions {
  display: flex;
  gap: 8px;
  padding: 16px;
  justify-content: center;
}
.share-preview { width: 100%; border-radius: 8px; margin-bottom: 16px; }
</style>
