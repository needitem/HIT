<template>
  <div style="padding: 30px">
    <div class="main__content">
      <v-row>
        <v-col cols="6">
          <div class="main__box">
            <v-img src="../assets/logo2.png" class="logo_class" alt="logo">
            </v-img>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="main__box">
            <v-img
              src="../assets/영호.jpg"
              alt="영호"
              class="left-aligned-image"
            ></v-img>
            <div class="main__text">
              <p class="name">추영호</p>
              <p>HIT의 총괄 책임자</p>

              <p>
                colab의 mysql을 이용해서 유저 테이블 및 유저 이미지 테이블 작성
              </p>

              테이블 생성 시에 drive의 데이터를 업로드,<br>데이터 유지 관리</br>
              <p></p>

              <p>
                Hairfastgan을 이용해서 사용자의 이미지,<br> 머리 스타일, 염색을 받고
                이미지를 <br>데이터 베이스의 저장 및 전송
              </p>
            </div>
          </div>
        </v-col>

        <v-col cols="6">
          <div class="main__box">
            <v-img
              src="../assets/태호.png"
              alt="태호"
              class="left-aligned-image"
            ></v-img>
            <div class="main__text">
              <p class="name">김태호</p>
              <p>Flask웹 애플리케이션을 개발하여 사용자 <br>인터페이스를 제공</p>
              <p>
                이미지 업로드 및 변환 기능 구현 
              </p>
              <p>HairFastGAN 모델을 활용하여 사용자가 <br>업로드한 얼굴 이미지에 가상 헤어스타일 및 <br>염색 적용</p>
              <p>
                Selenium을 이용한 인스타그램 자동 로그인 및 이미지 업로드 기능 구현
              </p>
            </div>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="main__box">
            <v-img
              src="../assets/승표.png"
              alt="승표"
              class="left-aligned-image"
            ></v-img>
            <div class="main__text">
              <p class="name">이승표</p>
              <p>Vue 프레임워크 기반으로 웹 구축</p>
              <p>vuetify 라이브러리를 사용해 디자인 설계</p>
              <p>webcam을 이용해 웹캠화면을 송출, 서버에 <br>전송</p>
              <p>모듈을 통해 유저, 서버간 API를 이용해 이미지 처리</p>
              <p>IndexedDB를 통해 이미지 저장, 관리</p>
            </div>
          </div>
        </v-col>

        <v-col cols="6">
          <div class="main__box">
            <v-img
              src="../assets/민호.png"
              alt="민호"
              class="left-aligned-image"
            ></v-img>
            <div class="main__text">
              <p class="name">여민호</p>
              <p>Code Vanguard 음주 및 광대 담당</p>
              <p>이미지 데이터 수집 및 전처리 작업</p>
              <p>GoogleColab DB생성과 로그인 정보 <br>저장 및 처리</p>
              <p>HairFastGan을 이용해서 사용자의 이미지 염색 및 기장을 통해 생성해 DB의 저장 및 전송</p>
              <p>Frontend html 및 css 생성</p>
            </div>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="main__box">
            <v-img
              src="../assets/소희.jpg"
              alt="소희"
              class="left-aligned-image"
            ></v-img>
            <div class="main__text">
              <p class="name">오소희</p>
              <p>Frontend 디자인 총괄</p>
              <p>사용자 경험을 개선하기 위한 UI/UX 디자인을 최적화</p> 
              <p>반응형 웹 디자인을 구현하여 웹에서 <br>일관된 사용자 인터페이스를 제공</p>
              <p>각종 active요소와 상호작용이 자연스럽게 <br>이어지게 코드 생성 및 수정</p>
              <p>HTML, CSS, JavaScript를 활용하여 <br>웹 페이지의 시각적 요소와 상호작용을 구현</p>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
@font-face {
  font-family: "BMJUA";
  src: url("/fonts/BMJUA_ttf.ttf") format("truetype");
}

.main__box {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
}

.logo_class {
  height: 400px;
  border-radius: 25px;
}

.left-aligned-image {
  flex: 6.5; /* Image takes up 80% of the width */
  max-width: 80%; /* Ensure the image does not exceed 80% of container width */
  height: 400px; /* Maintain aspect ratio */
  border-radius: 25px;
}

.main__text {
  flex: 4.5; /* Text takes up 20% of the width */
  padding: 20px; /* Adjust padding as needed */
  font-size: 16px; /* Example text style */
  text-align: center;
  font-family: "BMJUA", sans-serif;

  .name{
    font-size: 20px;
  }
}
</style>
