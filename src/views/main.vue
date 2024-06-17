<template>
  <div style="padding: 30px">
    <div class="main__content">
      <v-row>
        <v-col cols="12">
          <div class="main__video-container">
            <iframe
              class="main__video-iframe"
              :src="videoUrl"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
            <router-link to="/use" class="main__video-button"
              >사용해보기</router-link
            >
          </div>
        </v-col>

        <v-col cols="6">
          <div class="main__left_box">라 쿤</div>
        </v-col>
        <v-col cols="6">
          <div class="main__right_box">
            <v-img src="" alt="귀여운 라쿤"></v-img>
          </div>
        </v-col>

        <v-col cols="6">
          <div class="main__left_box">이미지</div>
        </v-col>
        <v-col cols="6">
          <div class="main__right_box">설명</div>
        </v-col>
        <v-col cols="12"> Contact Us </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoUrl:
        "https://www.youtube.com/embed/p4MJVPzV3x4?autoplay=1&mute=1&loop=1&playlist=p4MJVPzV3x4",
    };
  },
};
</script>

<style scoped>
.main__content {
  position: relative;
  width: 100%;
  height: 100%; /* 전체 화면을 사용하여 비디오가 꽉 차도록 설정 */
  overflow: hidden;
}

.main__video-container {
  position: relative;
  width: 100%;
  height: 650px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main__video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; /* 비디오가 가장 아래에 위치하도록 설정 */
  pointer-events: none; /* 비디오 클릭 방지 */
}

.main__video-button {
  position: relative;
  z-index: 2; /* 버튼이 비디오 위에 위치하도록 설정 */
  display: inline-block;
  padding: 20px 120px;
  background-color: rgba(0, 0, 0, 0.4); /* 반투명 배경 */
  border: none;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 300px; /* 버튼을 아래로 이동 */
}

/* router-link의 기본 스타일을 재정의 */
.main__video-button:link,
.main__video-button:visited {
  color: #ffffff; /* 링크의 글자 색상을 흰색으로 설정 */
  text-decoration: none; /* 링크의 밑줄을 제거 */
}

.main__left_box {
  margin-left: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  width: 100%;
  height: 650px;
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  font-size: 30px;
}

.main__right_box {
  margin-right: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  width: 100%;
  height: 650px;
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  font-size: 30px;
}

.main__left_box .v-image {
  /* 이미지 크기를 컨테이너에 맞춤 */
  width: 100%;
  height: 100%;
  opacity: 0.5; /* 원하는 투명도 값 (0 ~ 1) */
}

.main__right_box .v-image {
  /* 이미지 크기를 컨테이너에 맞춤 */

  width: 100%;
  height: 100%;
  opacity: 0.5; /* 원하는 투명도 값 (0 ~ 1) */
}
</style>
