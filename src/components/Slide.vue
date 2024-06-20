<template>
  <div>
    <div class="button-container">
      <button
        @click="setActiveSlide('style')"
        :class="{ active: activeSlide === 'style' }"
        class="custom-button"
      >
        스타일
      </button>
      <button
        @click="setActiveSlide('color')"
        :class="{ active: activeSlide === 'color' }"
        class="custom-button"
      >
        색상
      </button>
    </div>

    <transition name="fade" mode="out-in">
      <div v-if="activeSlide" :key="activeSlide" class="slide-container">
        <img
          v-for="(image, index) in filteredImages"
          :key="index"
          :src="image"
          :alt="activeSlide + ' Image'"
          :class="{ active: isActiveImage(index) }"
          @click="handleImageClick(index)"
        />
        <button class="custom-button" @click="showFileUploadDialog()">
          이미지 업로드
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      activeSlide: null,
    };
  },
  computed: {
    ...mapState(["hairImages", "selectedHairIndex"]),
    ...mapState(["colorImages", "selectedColorIndex"]),
    filteredImages() {
      return this.activeSlide === "style" ? this.hairImages : this.colorImages;
    },
  },
  methods: {
    handleImageClick(index) {
      if (index === this.filteredImages.length) {
        this.showFileUploadDialog();
      } else {
        this.selectImage(index);
      }
    },
    showFileUploadDialog() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = this.handleFileUpload;
      input.click();
    },

    ...mapMutations(["SET_UPLOADED_IMAGE", "SET_UPLOADED_COLOR_IMAGE"]),
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (this.activeSlide === "style") {
            this.SET_UPLOADED_IMAGE(e.target.result);
          } else if (this.activeSlide === "color") {
            this.SET_UPLOADED_COLOR_IMAGE(e.target.result);
          }
        };
        reader.readAsDataURL(file);
      }
    },

    isActiveImage(index) {
      return this.activeSlide === "style"
        ? this.selectedHairIndex === index
        : this.selectedColorIndex === index;
    },

    selectImage(index) {
      if (this.activeSlide === "style") {
        this.SET_UPLOADED_IMAGE(this.hairImages[index]);
      } else if (this.activeSlide === "color") {
        this.SET_UPLOADED_COLOR_IMAGE(this.colorImages[index]);
      }
    },

    setActiveSlide(slide) {
      this.activeSlide = slide;
    },
  },
};
</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px; /* 버튼과 슬라이드 간격 조정 */
}

.slide-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 20px;
}

.slide-container img {
  width: 120px;
  height: 120px;
  border: 2px solid black;
  object-fit: cover;
}

.slide-container img.active {
  border-color: green;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.custom-button {
  border: none;
  color: black;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px; 
  margin: 4px 2px;
  cursor: pointer;
  width: 250px;
}

.custom-button.active {
  color: #4caf50; /* 활성 상태 텍스트 색상 (초록색) */
  border-bottom: 2px solid #4caf50; /* 하단 테두리 초록색 */
}
</style>
