<template>
  <div class="login-container">
    <img src="logo.png" alt="로고" class="logo" />
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
      <button type="submit">LOGIN</button>
      <button type="button" @click="naverLogin">네이버</button>
      <div class="forgot-password">
        <a href="#">forgot pw?</a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
  login() {
    console.log("로그인 시도:", this.username, this.password);
  },
  naverLogin() {
    window.location.href = 'http://localhost:5000/naver_home';
  }
}
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
</style>
