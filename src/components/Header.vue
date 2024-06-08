<template>
  <v-app-bar app color="white">
    <v-toolbar-title>
      <div class="main__header__logo">[로고]</div>
    </v-toolbar-title>

    <div class="main__header__links">
      <span class="main__header__info">
        <router-link to="/about">개발자 소개</router-link> |
        <router-link to="/site">사이트 소개</router-link> |
        <router-link to="/mypage" v-if="isLoggedIn">마이페이지</router-link>
      </span>

      <div class="main__header__auth" v-if="isLoggedIn">
        <span class="main__header__welcome">{{ username }}님 :)</span>
      </div>
      <div v-else>
        <router-link to="/login">로그인</router-link>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      username: "",
    };
  },
  created() {
    this.isLoggedIn = localStorage.getItem("token") ? true : false;
    this.username = localStorage.getItem("username");
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
