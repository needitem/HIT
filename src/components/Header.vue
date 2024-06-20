<template>
  <v-app-bar app color="white" class="header">
    <router-link to="/" class="header__logo">
      <v-toolbar-title>
        <span class="header__logo-text">HIT</span>
      </v-toolbar-title>
    </router-link>

    <v-spacer></v-spacer>

    <div class="header__links">
      <router-link to="/introduce" class="header__link"
        >개발자 소개</router-link
      >

      <router-link to="/history" v-if="isLoggedIn" class="header__link"
        >히스토리</router-link
      >

      <div class="header__auth" v-if="isLoggedIn">
        <span class="header__welcome">{{ userName }}님 :)</span>
        <button @click="logout" class="header__button">로그아웃</button>
      </div>
      <div v-else>
        <button @click="instagramLogin" class="header__button">
          인스타로그인
        </button>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {};
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    userName() {
      return this.$store.state.userName;
    },
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
      const receivedData = JSON.parse(event.data);
      this.$store.commit("SET_IS_LOGGED_IN", true);
      this.$store.commit("SET_USER_NAME", receivedData.username);
      localStorage.setItem("username", receivedData.username);

      // 닉네임 확인 요청
      this.checkNickname(receivedData.username);
    },
    async checkNickname(username) {
      try {
        const response = await axios.post("/api/check_nickname", {
          nickname: username,
        });

        console.log("닉네임 확인 요청 성공:", response.data.message);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            console.error("API 엔드포인트를 찾을 수 없습니다.");
          } else if (error.response.status === 401) {
            console.error("로그인 실패:", error.response.data.message);
            this.$store.commit("SET_IS_LOGGED_IN", false);
            this.$store.commit("SET_USER_NAME", null);
            localStorage.removeItem("username");
            // 로그인 실패 처리 (예: 오류 메시지 표시)
          } else {
            console.error(
              "닉네임 확인 중 오류 발생:",
              error.response.data.message
            );
          }
        } else if (error.request) {
          console.error("서버 응답 없음:", error.request);
        } else {
          console.error("요청 에러:", error.message);
        }
      }
    },
    logout() {
      this.$store.commit("SET_IS_LOGGED_IN", false);
      this.$store.commit("SET_USER_NAME", null);
      localStorage.removeItem("username");
      axios.post("/api/check_nickname", {
        nickname: null,
      });
    },
  },
  created() {
    const localS_username = localStorage.getItem("username");

    if (localS_username) {
      this.$store.commit("SET_IS_LOGGED_IN", true);
      this.$store.commit("SET_USER_NAME", localS_username);
      this.checkNickname(localS_username); // 닉네임 확인 요청
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cormorant:wght@400;700&display=swap");

@font-face {
  font-family: "Cafe24Ohsquareair";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2202@1.0/Cafe24Ohsquareair.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
.header {
  padding: 0 20px;
  border-bottom: 1px solid #ccc;
  font-family: "Noto Sans KR", sans-serif; /* Noto Sans KR 폰트 적용 */
}

.header__logo {
  font-size: 2rem;
  font-weight: bold;
}

.header__spacer {
  flex-grow: 1;
}

.header__links {
  display: flex;
  align-items: center;
}

.header__link {
  margin-left: 20px;
  margin-right: 20px;
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.header__auth {
  margin-left: 20px;
}

.header__welcome {
  margin-right: 10px;
}

.header__button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}

.header__logo-image {
  height: 40px;
}

.main__header__logo {
  font-size: 2rem;
}

.main__header__links {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main__header__info {
  margin-left: -40px;
}

.main__header__links > * {
  margin-left: 10px;
}

.main__header__welcome {
  margin-left: 10px;
}

.header__logo {
  font-size: 2rem;
  font-weight: bold;
  text-decoration: none;
  color: inherit;
  font-weight: bold;
  font-family: "Cormorant", serif;
}
.header__logo-text {
  font-size: 3rem; /* HIT 텍스트의 크기 증가 */
  font-weight: bold;
  font-family: "Cormorant", serif; /* Cormorant 폰트 적용 */
  text-decoration: none;
}
</style>
