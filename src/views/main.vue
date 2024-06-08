<template>
  <v-app>
    <v-main style="padding: 0">
      <hr class="main__divider" />

      <main class="main__content">
        <div class="main__video-container">
          <div class="main__video">
            <iframe
              width="100%"
              height="315"
              :src="videoUrl"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div class="main__video-text">
            <textarea
              class="main__video-text__input"
              placeholder="영상에 대한 설명을 입력하세요."
            ></textarea>
          </div>
        </div>

        <hr class="main__divider" />

        <div class="main__buttons">
          <router-link to="/use" class="main__buttons__button"
            >사용해보기</router-link
          >
          <router-link to="/history" class="main__buttons__button"
            >과거 항목 불러오기</router-link
          >
          <router-link to="/community" class="main__buttons__button"
            >커뮤니티</router-link
          >
        </div>
      </main>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      videoUrl: "https://www.youtube.com/watch?v=p4MJVPzV3x4&t=3s", // 임베드 URL 형식으로 변경
    };
  },
};
</script>
<style>
.main__divider {
  margin: 1rem 0;
  border: none;
}

.main__content {
  padding: 1rem;
}

.main__video-container {
  display: flex;
  gap: 1rem;
}

.main__video {
  flex: 2;
}

.main__video-text {
  flex: 1;
}

.main__video__content {
  width: 100%;
}

.main__buttons {
  display: flex;
  justify-content: space-around;
}

.main__video-text__input {
  width: 100%;
  height: 100%;
  resize: vertical;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.main__image-carousel {
  display: flex;
  overflow-x: auto;
}

.main__image-carousel img {
  width: 100%;
  height: auto;
  margin-right: 10px;
}
</style>
