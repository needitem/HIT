<template>
  <div>
    <button @click="activeSlide = activeSlide === 'style' ? null : 'style'">
      스타일
    </button>
    <button @click="activeSlide = activeSlide === 'color' ? null : 'color'">
      색상
    </button>

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
        <img src="@/assets/plus.png" @click="showFileUploadDialog()" />
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
      if (index === this.hairImages.length) {
        //실행할 함수();
        this.showFileUploadDialog();
      } else {
        this.selectImage(index); // 기존 선택 로직 유지
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
          } else {
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
        this.SET_UPLOADED_IMAGE(this.$store.state.images[index]);
      } else {
        this.SET_UPLOADED_COLOR_IMAGE(this.$store.state.images[index]);
      }
    },

    isActiveImage(index) {
      return this.activeSlide === "style"
        ? this.selectedHairIndex === index
        : this.selectedColorIndex === index;
    },

    selectImage(index) {
      if (this.activeSlide === "style") {
        this.SET_UPLOADED_IMAGE(this.$store.state.hairImages[index]);
      } else if (this.activeSlide === "color") {
        this.SET_UPLOADED_COLOR_IMAGE(this.$store.state.colorImages[index]);
      }
    },
    setActiveSlide(slide) {
      this.activeSlide = this.activeSlide === slide ? null : slide;
    },
  },
};
</script>

<style scoped>
/* 기존 스타일 유지 */
.slide-container {
  display: flex;
  /* 이미지들을 가로로 배치 */
  gap: 20px;
  /* 이미지 간 간격 조절 (원하는 값으로 변경) */
}
.slide-container img {
  width: 100px;
  height: auto;
  border: 2px solid black;
}

/* 활성화된 이미지 스타일 */
.slide-container img.active {
  border-color: green;
  /* 초록색 테두리 */
}

button {
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease; /* Adjust duration and timing function as needed */
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
