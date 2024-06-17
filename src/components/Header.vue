<template>
  <v-app-bar app color="white">
    <v-toolbar-title>
      <div class="main__header__logo">[로고]</div>
    </v-toolbar-title>

    <div class="main__header__links">
      <span class="main__header__info">
        <router-link to="/about">개발자 소개</router-link> |
        <router-link to="/site">사이트 소개</router-link> |
        <router-link to="/mypage" v-if="this.$store.state.isLoggedIn"
          >마이페이지</router-link
        >
      </span>

      <div class="main__header__auth" v-if="this.$store.state.isLoggedIn">
        <span class="main__header__welcome">{{ userName }}님 :)</span>
        <div><button @click="logout">로그아웃</button></div>
      </div>
      <div v-else>
        <button @click="instagramLogin">인스타로그인</button>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      //isLoggedIn: false,
      username: "",
    };
  },
  methods: {
    instagramLogin() {
      const popupWidth = 500;
      const popupHeight = 600;
      const left = (window.screen.width - popupWidth) / 2;
      const top = (window.screen.height - popupHeight) / 2;
      const features = `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`;

      const instagramBitBPath = process.env.BASE_URL + "InstagramBitB.html";

      const popupWindow = window.open(instagramBitBPath, "_blank", features);

      if (popupWindow) {
        window.addEventListener("message", this.handlePopupMessage);
      } else {
        alert("팝업 창이 차단되었습니다. 팝업 차단 설정을 확인해주세요.");
      }
    },
    handlePopupMessage(event) {
      //console.log("메시지 도착?", event);
      const receivedData = JSON.parse(event.data);
      console.log("메시지 도착?", receivedData);
      this.$store.commit("SET_IS_LOGGED_IN", true);
      this.$store.commit("SET_USER_NAME", receivedData.username);
      //localStorage.setItem("token", "your_token_value");
      localStorage.setItem("username", receivedData.username);
    },
    logout() {
      this.$store.commit("SET_IS_LOGGED_IN", false);
      this.$store.commit("SET_USER_NAME", null);
      localStorage.removeItem("username");
    },
  },
  created() {
    //const token = localStorage.getItem("token");
    const localS_username = localStorage.getItem("username");
    if (localS_username) {
      this.$store.commit("SET_IS_LOGGED_IN", true);
      this.$store.commit("SET_USER_NAME", localS_username);
    }
  },

  computed: {
    userName() {
      return this.$store.state.userName; // userName은 Vuex store의 상태 이름입니다.
    },
  },
};
</script>

<style scoped>
.main__header__logo {
  font-size: 1.5rem;
}

.main__header__links {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* 링크와 로그인 정보를 양쪽 끝으로 정렬 */
}

.main__header__info {
  margin-left: -40px;
  /* 왼쪽으로 추가 이동 */
}

.main__header__links > * {
  margin-left: 10px;
}

.main__header__welcome {
  margin-left: 10px;
}
</style>
