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
          <div class="main__left_box">
            <p class="main__highlighted-text">
              AI 헤어스타일 변환으로 꿈꿔왔던 스타일을 현실로!
              <br />
            </p>
            <p class="main__small-text">
              힘든 스타일링 없이, 원하는 헤어스타일을 자유롭게!<br />
              AI 기술로 당신의 이미지에 딱 맞는 스타일 추천<br />
            </p>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="main__right_box">
            <v-img src="../assets/image1.png" alt="image1"> </v-img>
          </div>
        </v-col>

        <v-col cols="6">
          <div class="main__left_box">
            <v-img src="../assets/image2.png" alt="image2"> </v-img>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="main__left_box">
            <p class="main__highlighted-text">
              칙칙한 헤어스타일에 지루함을 느낀다면? HIT!
              <br />
            </p>
            <p class="main__small-text">
              새로운 나를 발견하는 특별한 경험, 지금 시작하세요!<br />
              ✨ HIT, 당신의 스타일 변신을 응원합니다!<br />
            </p>
          </div>
        </v-col>

        <v-col cols="6">
          <div class="main__left_box">
            <p class="main__highlighted-text">
              당신의 스타일 변신은 지금부터 시작됩니다! HIT!
              <br />
            </p>
            <p class="main__small-text">
              HIT의 AI 헤어스타일 변환 서비스는 당신이 꿈꾸던 스타일을 현실로
              만들어 줍니다.<br />
              힘든 스타일링 과정 없이, 자신의 이미지와 어울리는 최고의
              헤어스타일을 AI 기술이 추천해 드립니다.<br />
            </p>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="main__right_box">
            <v-img src="../assets/image3.png" alt="image3"> </v-img>
          </div>
        </v-col>

        <v-col cols="6">
          <div class="main__left_box">
            <v-img src="../assets/image4.jpg" alt="image4"> </v-img>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="main__left_box">
            <p class="main__highlighted-text">
              HIT는 당신의 스타일 변신을 응원합니다! <br />
              지금 바로 시작하세요.
              <br />
            </p>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoUrl:
        "https://www.youtube.com/embed/MJL8xn-M3Aw?autoplay=1&mute=1&loop=1&playlist=MJL8xn-M3Aw",
    };
  },
};
</script>

<style scoped>
@font-face {
  font-family: "BMJUA";
  src: url("/fonts/BMJUA_ttf.ttf") format("truetype");
}

.main__content {
  position: relative;
  width: 100%;
  height: 100%; /* 전체 화면을 사용하여 비디오가 꽉 차도록 설정 */
  overflow: hidden;
  font-family: "silgothic", sans-serif; /* 예쁜 폰트 적용 */
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
  color: #ffffff;
  text-decoration: none;
}

.main__left_box {
  margin-left: 10px;
  border: 1px solid #ccc;
  border-radius: 25px;
  width: 100%;
  height: 650px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  white-space: pre-wrap;
}

.main__right_box {
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 25px;
  width: 100%;
  height: 650px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  white-space: pre-wrap;
}

.main__left_box .v-image {
  width: 100%;
  height: 100%;
  opacity: 0.9;
  border-radius: 25px;
}

.main__right_box .v-image {
  width: 100%;
  height: 100%;
  opacity: 0.9;
  border-radius: 25px;
}

.main__highlighted-text {
  font-family: "BMJUA", sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
}

.main__small-text {
  font-family: "BMJUA", sans-serif;
  font-size: 1.8rem;
  text-align: center;
}
</style>
