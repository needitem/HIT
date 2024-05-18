<template>
    <div class="retouch-image-container">
        <img :src="imageSrc" alt="원본 이미지" class="retouch-image">
        <button @click="generate">Send</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            imageSrc: require('@/assets/logo.png') // 초기 이미지 경로
        };
    },
    methods: {
        async generate() {
            try {
                const response = await axios.get('/api/generate', {
                    responseType: 'arraybuffer' // 바이너리 데이터로 요청
                });

                // 이미지 데이터를 받아왔으므로 처리 가능
                const imageBlob = new Blob([response.data], { type: 'image/jpeg' }); // 브라우저가 이해할 수 있는 Blob으로 변환
                const imageUrl = URL.createObjectURL(imageBlob);

                // 받아온 이미지 데이터를 사용하여 필요한 작업을 수행할 수 있습니다.
                // 예를 들어, 이미지를 화면에 표시하거나 다운로드할 수 있습니다.
                this.imageSrc = imageUrl; // 이미지 URL을 Vue 데이터에 저장하여 이미지 소스로 설정

            } catch (error) {
                console.log("error:", error);
            }
        }
    }
}
</script>

<style scoped>
.retouch-image-container {
    text-align: center;
    /* 가운데 정렬을 위한 스타일 */
    max-width: 500px;
    /* 최대 너비 설정 (원하는 크기로 조절) */
    margin: 0 auto;
    /* 수평 가운데 정렬을 위한 스타일 */
    margin-top: 74px;
    border: 2px solid #000000;
    /* 테두리 설정: 두께 2px */
}

.retouch-image {
    width: 280px;
    height: 280px;
    object-fit: cover;
    /* 이미지를 비율 유지하면서 지정한 크기로 자르기 */
}
</style>
