<template>
  <div class="slide-wrapper">
    <div class="slide-tabs">
      <v-btn-toggle v-model="activeSlide" mandatory color="primary">
        <v-btn value="style">
          <v-icon left>mdi-content-cut</v-icon>스타일
        </v-btn>
        <v-btn value="color">
          <v-icon left>mdi-palette</v-icon>색상
        </v-btn>
      </v-btn-toggle>
    </div>

    <transition name="fade" mode="out-in">
      <div v-if="activeSlide" :key="activeSlide" class="slide-container">
        <div class="slide-scroll">
          <div
            v-for="(image, index) in filteredImages"
            :key="index"
            class="slide-item"
            :class="{ active: isActiveImage(index) }"
            @click="selectImage(index)"
          >
            <img :src="image" :alt="activeSlide + ' ' + index" />
            <v-icon v-if="isActiveImage(index)" class="check-icon" color="success">mdi-check-circle</v-icon>
          </div>
          
          <div class="slide-item upload-item" @click="showFileUploadDialog">
            <v-icon size="32" color="grey">mdi-plus</v-icon>
            <span>업로드</span>
          </div>
        </div>
      </div>
    </transition>
    
    <input ref="fileInput" type="file" accept="image/*" hidden @change="handleFileUpload" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'ImageSlide',
  data() {
    return {
      activeSlide: 'style',
      selectedStyleIndex: -1,
      selectedColorIndex: -1,
    };
  },
  computed: {
    ...mapState(['hairImages', 'colorImages']),
    filteredImages() {
      return this.activeSlide === 'style' ? this.hairImages : this.colorImages;
    },
  },
  methods: {
    ...mapMutations(['SET_UPLOADED_IMAGE', 'SET_UPLOADED_COLOR_IMAGE']),
    isActiveImage(index) {
      return this.activeSlide === 'style' 
        ? this.selectedStyleIndex === index 
        : this.selectedColorIndex === index;
    },
    selectImage(index) {
      if (this.activeSlide === 'style') {
        this.selectedStyleIndex = index;
        this.SET_UPLOADED_IMAGE(this.hairImages[index]);
      } else {
        this.selectedColorIndex = index;
        this.SET_UPLOADED_COLOR_IMAGE(this.colorImages[index]);
      }
    },
    showFileUploadDialog() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (this.activeSlide === 'style') {
          this.SET_UPLOADED_IMAGE(e.target.result);
          this.selectedStyleIndex = -1;
        } else {
          this.SET_UPLOADED_COLOR_IMAGE(e.target.result);
          this.selectedColorIndex = -1;
        }
      };
      reader.readAsDataURL(file);
      this.$refs.fileInput.value = null;
    },
  },
};
</script>

<style scoped>
.slide-wrapper {
  padding: 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-top: 20px;
}
.slide-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.slide-container {
  overflow: hidden;
}
.slide-scroll {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 10px 0;
  scroll-behavior: smooth;
}
.slide-scroll::-webkit-scrollbar {
  height: 6px;
}
.slide-scroll::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 3px;
}
.slide-item {
  position: relative;
  flex-shrink: 0;
  width: 120px;
  height: 140px;
  border: 3px solid transparent;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f5f5f5;
}
.slide-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.slide-item.active {
  border-color: #4caf50;
}
.slide-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.check-icon {
  position: absolute;
  top: 8px;
  right: 8px;
  background: white;
  border-radius: 50%;
}
.upload-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ccc;
  background: #fafafa;
}
.upload-item span {
  margin-top: 8px;
  font-size: 12px;
  color: #999;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
