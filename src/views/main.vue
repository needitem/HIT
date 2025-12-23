<template>
  <div class="main-page">
    <section class="hero-section">
      <div class="hero-video-container">
        <iframe
          class="hero-video"
          :src="videoUrl"
          title="HIT 소개 영상"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <div class="hero-overlay">
          <h1 class="hero-title">AI 헤어스타일 변환</h1>
          <p class="hero-subtitle">꿈꿔왔던 스타일을 현실로</p>
          <router-link to="/use" class="hero-cta">
            <v-btn x-large color="primary" class="hero-btn">
              <v-icon left>mdi-magic-staff</v-icon>
              지금 시작하기
            </v-btn>
          </router-link>
        </div>
      </div>
    </section>

    <section class="features-section">
      <v-container>
        <v-row>
          <v-col cols="12" md="6" class="feature-col">
            <div class="feature-text">
              <h2>AI 기술로 완성하는 나만의 스타일</h2>
              <p>힘든 스타일링 없이, 원하는 헤어스타일을 자유롭게!</p>
              <p>AI 기술로 당신의 이미지에 딱 맞는 스타일을 추천해드립니다.</p>
              <ul class="feature-list">
                <li><v-icon color="success" small>mdi-check-circle</v-icon> 실시간 헤어스타일 미리보기</li>
                <li><v-icon color="success" small>mdi-check-circle</v-icon> 다양한 염색 색상 적용</li>
                <li><v-icon color="success" small>mdi-check-circle</v-icon> 인스타그램 바로 공유</li>
              </ul>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="feature-image">
              <v-img src="../assets/image1.png" alt="AI 헤어스타일" class="rounded-image"></v-img>
            </div>
          </v-col>
        </v-row>

        <v-row class="mt-12">
          <v-col cols="12" md="6" order="2" order-md="1">
            <div class="feature-image">
              <v-img src="../assets/image2.png" alt="스타일 변환" class="rounded-image"></v-img>
            </div>
          </v-col>
          <v-col cols="12" md="6" order="1" order-md="2" class="feature-col">
            <div class="feature-text">
              <h2>칙칙한 헤어스타일에 지루함을 느낀다면?</h2>
              <p>새로운 나를 발견하는 특별한 경험, 지금 시작하세요!</p>
              <p>HIT가 당신의 스타일 변신을 응원합니다!</p>
            </div>
          </v-col>
        </v-row>

        <v-row class="mt-12">
          <v-col cols="12" md="6" class="feature-col">
            <div class="feature-text">
              <h2>당신의 스타일 변신은 지금부터!</h2>
              <p>HIT의 AI 헤어스타일 변환 서비스는 당신이 꿈꾸던 스타일을 현실로 만들어 줍니다.</p>
              <p>힘든 스타일링 과정 없이, 자신의 이미지와 어울리는 최고의 헤어스타일을 AI가 추천해 드립니다.</p>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="feature-image">
              <v-img src="../assets/image3.png" alt="헤어 변환" class="rounded-image"></v-img>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="cta-section">
      <v-container>
        <div class="cta-content">
          <h2>HIT와 함께 새로운 나를 만나보세요</h2>
          <p>지금 바로 시작하세요!</p>
          <router-link to="/use">
            <v-btn x-large color="white" class="cta-btn">
              <v-icon left>mdi-arrow-right</v-icon>
              사용해보기
            </v-btn>
          </router-link>
        </div>
      </v-container>
    </section>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  data() {
    return {
      videoUrl: 'https://www.youtube.com/embed/MJL8xn-M3Aw?autoplay=1&mute=1&loop=1&playlist=MJL8xn-M3Aw',
    };
  },
};
</script>

<style scoped>
@font-face {
  font-family: 'BMJUA';
  src: url('/fonts/BMJUA_ttf.ttf') format('truetype');
}
.main-page {
  font-family: 'BMJUA', sans-serif;
}
.hero-section {
  position: relative;
  height: 80vh;
  min-height: 500px;
}
.hero-video-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}
.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
}
.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 32px;
  opacity: 0.9;
}
.hero-btn {
  font-size: 1.1rem;
  padding: 12px 32px !important;
  text-transform: none;
}
.features-section {
  padding: 80px 0;
  background: #fafafa;
}
.feature-col {
  display: flex;
  align-items: center;
}
.feature-text {
  padding: 20px;
}
.feature-text h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 16px;
}
.feature-text p {
  font-size: 1.2rem;
  color: #666;
  line-height: 1.8;
  margin-bottom: 12px;
}
.feature-list {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}
.feature-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 1.1rem;
  color: #555;
}
.feature-image {
  padding: 20px;
}
.rounded-image {
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}
.cta-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
.cta-content {
  text-align: center;
}
.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 16px;
}
.cta-content p {
  font-size: 1.3rem;
  margin-bottom: 32px;
  opacity: 0.9;
}
.cta-btn {
  color: #667eea !important;
  font-size: 1.1rem;
  text-transform: none;
}
</style>
