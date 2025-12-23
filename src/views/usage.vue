<template>
  <div class="usage-page">
    <v-overlay :value="isLoading" z-index="999">
      <div class="loading-content">
        <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
        <p class="mt-4">이미지 생성 중...</p>
      </div>
    </v-overlay>

    <div class="usage-header">
      <h1>AI 헤어스타일 변환</h1>
      <p>원하는 스타일과 색상을 선택하고 새로운 나를 만나보세요!</p>
    </div>

    <div class="usage-content">
      <div class="panel-container">
        <Webcam ref="webcam" />
        
        <div class="selection-panel">
          <div class="selection-box">
            <div class="selection-label">
              <v-icon small color="primary">mdi-content-cut</v-icon>
              스타일
            </div>
            <div class="selection-preview">
              <img v-if="uploadedImage" :src="uploadedImage" alt="선택된 스타일" />
              <v-icon v-else size="40" color="grey lighten-1">mdi-image-outline</v-icon>
            </div>
          </div>
          
          <div class="selection-box">
            <div class="selection-label">
              <v-icon small color="secondary">mdi-palette</v-icon>
              색상
            </div>
            <div class="selection-preview">
              <img v-if="uploadedColorImage" :src="uploadedColorImage" alt="선택된 색상" />
              <v-icon v-else size="40" color="grey lighten-1">mdi-image-outline</v-icon>
            </div>
          </div>
        </div>
        
        <Compose ref="compose" />
      </div>
    </div>
    
    <Slide />
  </div>
</template>

<script>
import Webcam from '@/components/Webcam.vue';
import Compose from '@/components/Compose.vue';
import Slide from '@/components/Slide.vue';
import { mapState } from 'vuex';

export default {
  name: 'UsagePage',
  components: { Webcam, Compose, Slide },
  computed: {
    ...mapState(['uploadedImage', 'uploadedColorImage', 'isLoading']),
  },
};
</script>

<style scoped>
.usage-page {
  padding: 30px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
}
.usage-header {
  text-align: center;
  margin-bottom: 30px;
}
.usage-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
}
.usage-header p {
  color: #666;
  font-size: 1.1rem;
}
.usage-content {
  max-width: 1400px;
  margin: 0 auto;
}
.panel-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
  flex-wrap: wrap;
}
.selection-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.selection-box {
  background: white;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}
.selection-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #555;
  margin-bottom: 8px;
}
.selection-preview {
  width: 140px;
  height: 180px;
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.selection-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.loading-content {
  text-align: center;
  color: white;
}
</style>
