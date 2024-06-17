<!-- 이 view는 더이상 쓰지않음 삭제 가능-->
<template>
  <div class="login-container">
    <a href="/">
      <img src="@/assets/logo.png" alt="로고" class="logo" />
    </a>
    <h2>로그인</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">ID:</label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div class="form-group">
        <label for="password">PW:</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="button" @click="toggleLogin">
        {{ $store.state.isLoggedIn ? "로그아웃" : "로그인" }}
      </button>
      <br />
      <button type="button" @click="instagramLogin">인스타그램</button>
      <div class="forgot-password">
        <a href="#">forgot pw?</a>
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    toggleLogin() {
      if (this.$store.state.isLoggedIn) {
        this.logout();
      } else {
        this.login();
      }
    },
    async login() {
      try {
        const response = await axios.post("/DBapi/login", {
          userid: this.username,
          passwd: this.password,
        });
        this.$store.commit("SET_IS_LOGGED_IN", true);
        console.log("로그인 성공:", response.data);
        this.errorMessage = "";
      } catch (error) {
        console.error("로그인 실패:", error);
        this.errorMessage = "로그인에 실패했습니다.";
      }
    },

    async logout() {
      try {
        const response = await axios.get("/DBapi/logout");
        this.$store.commit("SET_IS_LOGGED_IN", false);
      } catch (error) {
        console.error("로그아웃 실패:", error);
        // Handle logout error (e.g., display an error message)
      }
    },
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
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.logo {
  width: 100px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button[type="submit"],
button[type="button"] {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button[type="button"] {
  background-color: #1ec800;
  margin-top: 10px;
}

.forgot-password {
  text-align: right;
  margin-top: 10px;
}
@font-face {
  font-family: system;
  font-style: normal;
  font-weight: 300;
  src: local(".SFNSText-Light"), local(".HelveticaNeueDeskInterface-Light"),
    local("Roboto-Light"), local("DroidSans"), local("Tahoma"),
    local(".LucidaGrandeUI"), local("Ubuntu Light"), local("Segoe UI Light");
}

html,
body {
  width: 100%;
  height: 100%;
}

#title-bar {
  height: 31px;
  background-color: #d6dae0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  user-select: none;
}

#logo {
  padding-left: 5px;
  vertical-align: middle;
}

#logo-description {
  color: black;
  font-size: 12px;
  font-family: "system";
  vertical-align: middle;
}

#minimize {
  color: black;
  font-size: 12px;
  padding: 9px 15px 7px 15px;
}

#square {
  color: black;
  font-size: 22px;
  padding: 0px 15px 5px 15px;
}

#exit {
  color: black;
  font-size: 15px;
  padding: 7px 17px 7px 17px;
}

#url-bar {
  height: 28px;
  background-color: #f1f3f4;
  width: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: scroll;
  text-overflow: ellipsis;
  -ms-overflow-style: none;
  scrollbar-width: none;
  border-bottom: 1px solid lightgray;
}

#url-bar::-webkit-scrollbar {
  display: none;
}

#ssl-padlock {
  user-select: none;
  padding-left: 8px;
  margin-right: 8px;
}

#domain-name {
  color: #000000;
  font-size: 14px;
  font-family: "system";
}

#domain-path {
  color: #7c7c7c;
  font-size: 14px;
  font-family: "system";
}

#title-bar-width {
  width: 100%;
}

#content {
  width: 100%;
  height: 700px;
}

#window {
  color: transparent;
  background-color: transparent;
  border-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  height: 759px;
  /* title bar height + content height */
  width: 40%;
}
</style>
