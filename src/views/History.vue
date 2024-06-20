<template>
  <div class="historys">
    <Frame v-for="(image, index) in images" :key="index" :image="image" />
  </div>
</template>

<script>
import Frame from "@/components/Frame.vue";

export default {
  components: {
    Frame,
  },
  data() {
    return {
      images: [],
      error: null, // 에러 메시지 저장할 데이터 추가
    };
  },
  mounted() {
    try {
      // 서버에서 이미지 데이터 가져오기 (send_pic2 엔드포인트 활용)
      fetch("/api/send_pic2")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          this.images = data.images;
        })
        .catch((error) => {
          console.error("Error fetching images:", error);
          this.error = error.message; // 에러 메시지 저장
        });
    } catch (error) {
      console.error("Unexpected error:", error);
      this.error = error.message;
    }
  },
};
</script>

<style scoped>
/* historys.css와 동일한 스타일 적용 */
.historys {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
