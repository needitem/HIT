<template>
  <v-app-bar app color="white" class="header" elevation="1">
    <router-link to="/" class="header__logo">
      <v-toolbar-title>
        <span class="header__logo-text">HIT</span>
      </v-toolbar-title>
    </router-link>

    <v-spacer></v-spacer>

    <nav class="header__nav">
      <router-link to="/introduce" class="header__link">
        <v-icon small class="mr-1">mdi-account-group</v-icon>
        개발자 소개
      </router-link>

      <router-link v-if="isLoggedIn" to="/history" class="header__link">
        <v-icon small class="mr-1">mdi-history</v-icon>
        히스토리
      </router-link>

      <div v-if="isLoggedIn" class="header__user">
        <v-chip color="primary" outlined small>
          <v-icon left small>mdi-account</v-icon>
          {{ userName }}
        </v-chip>
        <v-btn 
          small 
          outlined 
          color="grey" 
          class="ml-2"
          @click="handleLogout"
        >
          로그아웃
        </v-btn>
      </div>
      
      <v-btn 
        v-else 
        color="primary" 
        @click="handleInstagramLogin"
        class="header__login-btn"
      >
        <v-icon left>mdi-instagram</v-icon>
        인스타 로그인
      </v-btn>
    </nav>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AppHeader',
  
  computed: {
    ...mapState(['isLoggedIn', 'userName']),
  },
  
  created() {
    this.restoreLogin();
  },
  
  methods: {
    ...mapActions(['login', 'logout', 'restoreLogin']),
    
    handleInstagramLogin() {
      const popupWidth = 500;
      const popupHeight = 600;
      const left = (window.screen.width - popupWidth) / 2;
      const top = (window.screen.height - popupHeight) / 2;
      const features = `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`;

      const instagramBitBPath = process.env.BASE_URL + 'InstagramBitB.html';
      const popupWindow = window.open(instagramBitBPath, '_blank', features);

      if (popupWindow) {
        window.addEventListener('message', this.handlePopupMessage);
      } else {
        alert('팝업 창이 차단되었습니다. 팝업 차단 설정을 확인해주세요.');
      }
    },
    
    async handlePopupMessage(event) {
      try {
        const receivedData = JSON.parse(event.data);
        await this.login(receivedData.username);
      } catch (error) {
        console.error('로그인 처리 실패:', error);
      }
    },
    
    async handleLogout() {
      await this.logout();
    },
  },
  
  beforeDestroy() {
    window.removeEventListener('message', this.handlePopupMessage);
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@400;700&display=swap');

.header {
  padding: 0 20px;
  border-bottom: 1px solid #eee;
}

.header__logo {
  text-decoration: none;
  color: inherit;
}

.header__logo-text {
  font-size: 2.5rem;
  font-weight: 700;
  font-family: 'Cormorant', serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header__link {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  text-decoration: none;
  color: #555;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.header__link:hover {
  background-color: #f5f5f5;
  color: #333;
}

.header__link.router-link-active {
  color: #667eea;
  background-color: #f0f4ff;
}

.header__user {
  display: flex;
  align-items: center;
}

.header__login-btn {
  text-transform: none;
  font-weight: 500;
}
</style>
