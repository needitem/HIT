<template>
	<form id="loginForm" @submit.prevent="onSubmit">
    <!-- 폼 유효성 검사를 하기 위해 @submit.prevent 설정하여 onSubmit 함수를 실행 -->
		<input class="form-control" id="id" type="text" minlength="4"
        	maxlength="20" placeholder="" 
        	v-model="userId"/>
        <label for="name">아이디</label>
        
        <input class="form-control" id="pw" type="password" minlength="8"
        	maxlength="16" placeholder=""
        	v-model="userPw"/>
        <label for="pw">비밀번호</label>
                      
        <button class="btn btn-primary btn-lg" id="loginBtn" type="submit">로그인</button>
</template>


<script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  
  //v-model로 설정한 userId와 userPw를 ref를 사용하여 초기화한다.
  const userId = ref(''); 
  const userPw = ref('');

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', { // 서버에서 설정한 로그인 api를 post로 보내기 위해 axios 사용
        //login api로 userId.value와 userPw.value 값을 userId와 userPw로 보내준다.
        userId: userId.value,
        userPw: userPw.value,
      });

      if (response.data.success === true) { //로그인 성공했을 경우
        router.push({path: '/main'}) //main 페이지로 router를 통하여 페이지 이동
      } else { 
        alert('아이디와 비밀번호가 일치하지 않습니다.')
      }
    } catch (err) {
      console.error('Server error:', err);
      alert("서버 오류입니다. 잠시 후 다시 시도해주세요.")
    }
  };

  const onSubmit = (event: Event) => {
    event.preventDefault();
    
    //유효성 검사 코드 작성

    login();
  };
</script>