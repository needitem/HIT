<template>
  <div class="history">
    <img :src="`data:image/png;base64,${image}`" alt="History" v-if="image" />
    <div class="buttons">
      <button @click="handleSave" v-if="image">저장하기</button>
      <button @click="showModal = true" v-if="image">공유하기</button>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close-button" @click="showModal = false">&times;</span>
        <h2>인스타그램 공유</h2>
        <form>
          <img
            :src="`data:image/png;base64,${image}`"
            alt="공유할 이미지"
            style="width: 100%; margin-bottom: 10px"
          />
          <textarea v-model="caption" placeholder="캡션 입력"></textarea>
          <button type="button" @click="handleShare">업로드</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showModal: false,
      caption: "",
    };
  },
  props: ["image"],
  methods: {
    handleSave() {
      // 이미지 데이터를 Blob 객체로 변환
      const byteCharacters = atob(this.image);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });

      // Blob 객체를 이용하여 다운로드 링크 생성
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "generated_image.png";
      link.click();
    },

    async handleShare() {
      try {
        //console.log(this.image);
        // // 이미지 데이터 Base64 인코딩 확인
        // if (!this.image || !this.image.startsWith("data:image/png;base64,")) {
        //   throw new Error("Invalid image data");
        // }
        const image2 = "data:image/png;base64," + this.image;
        //const base64Image = this.image.split(",")[0]; // 이미 Base64로 인코딩된 상태
        console.log(image2);
        const response = await axios.post(
          "/api/instagram_upload",
          {
            image: image2, // 인코딩된 이미지 데이터 전송
            caption: this.caption,
            nickname: this.$store.state.userName,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("인스타그램 공유 성공:", response.data);
        alert("인스타그램 공유 성공!");
      } catch (error) {
        console.error("인스타그램 공유 에러 발생:", error);
        alert("인스타그램 공유 에러 발생!");
      } finally {
        this.showModal = false;
      }
    },
  },
};
</script>
<style scoped>
/* scoped 속성 유지 */

.history {
  display: flex;
  /* Flexbox 적용 */
  flex-direction: column;
  /* 세로 정렬 */
  align-items: center;
  /* 가로 중앙 정렬 */
  width: 300px;
  /* 너비 조정 */
  height: 400px;
  /* 높이 조정 */
  margin: 20px auto;
  /* 상하 20px, 좌우 auto 마진 */
  padding: 20px;
  border: 2px solid #ccc;
  /* 테두리 추가 */
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  /* 그림자 효과 추가 */
  border-radius: 10px;
  /* 둥근 모서리 */
  background-color: #fff;
  /* 흰색 배경 */
}

.history img {
  max-width: 100%;
  /* 최대 너비를 부모 요소에 맞춤 */
  height: auto;
  /* 높이 자동 조절 */
  margin-bottom: 20px;
}

button {
  /* 버튼 스타일 */
  padding: 8px 16px;
  /* 패딩 조정 */
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  /* 파란색 배경 */
  color: white;
  cursor: pointer;
  margin: 5px;
  /* 버튼 간 간격 조정 */
}

button:hover {
  background-color: #0056b3;
  /* 어두운 파란색 호버 효과 */
}
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 300px;
}
.close-button {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close-button:hover,
.close-button:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}
.retouch-image-container {
  /* ... */
  background-color: #fff;
  border: 2px solid #ccc;
  /* 테두리 추가 */
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  /* 그림자 효과 추가 */
}
</style>
