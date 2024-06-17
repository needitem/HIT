<template>
  <div class="retouch-image-container">
    <img :src="this.imageSrc" alt="원본 이미지" class="retouch-image" />
    <!-- <button @click="generate">Send</button> -->
    <div>
      <button @click="send">생성</button>
      <button @click="isShowModal">공유 아이콘</button>
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <span class="close-button" @click="showModal = false">&times;</span>
          <h2>인스타그램 공유</h2>
          <img :src="this.imageBlob" />
          <textarea
            v-model="caption"
            placeholder="메모를 입력하세요"
          ></textarea>
          <button @click="instagram_share">공유하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["uploadedImage", "uploadedColorImage", "uploadedFaceImage"]),
  },
  data() {
    return {
      imageSrc: require("@/assets/man_icon.png"), // 초기 이미지 경로

      showModal: false,
      imageBlob: null,
      formData: new FormData(),
    };
  },
  methods: {
    isShowModal() {
      if (this.imageBlob != null) {
        this.showModal = true;
      } else {
        alert("공유할 이미지가 없습니다.");
      }
    },

    // 문자열을 Blob으로 변환하는 함수
    dataURLtoBlob(dataURL) {
      const arr = dataURL.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    async send() {
      // 새로운 ui에 대한 실험

      if (!this.uploadedColorImage) {
        alert("컬러 이미지를 업로드해주세요.");
        return;
      }
      if (!this.uploadedImage) {
        alert("기본 이미지를 업로드해주세요.");
        return;
      }
      if (!this.uploadedFaceImage) {
        alert("얼굴 이미지를 업로드해주세요.");
        return;
      }
      this.formData.append("files", this.uploadedFaceImage, "face.png");
      //this.formData.append("files", this.face, "face.png");
      this.formData.append(
        "files",
        this.dataURLtoBlob(this.uploadedImage),
        "target.png"
      );
      this.formData.append(
        "files",
        this.dataURLtoBlob(this.uploadedColorImage),
        "color.png"
      );
      try {
        const response = await axios.post("/api/get_pic", this.formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.status === 200) {
          alert("Files uploaded successfully");
          this.generate();
        } else {
          //  alert(`Failed to upload files: ${response.data.error}`);
        }
      } catch (error) {
        // alert(`An error occurred: ${error.response ? error.response.data.error : error.message}`);
      }
    },

    async generate() {
      try {
        const response = await axios.get("/api/generate", {
          responseType: "arraybuffer", // 바이너리 데이터로 요청
        });

        imageBlob = new Blob([response.data], { type: "image/png" }); // 브라우저가 이해할 수 있는 Blob으로 변환
        const imageUrl = URL.createObjectURL(imageBlob);

        // 이미지 URL 변경 후 컴포넌트 업데이트

        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = e.target.result; // 이미지 표시

          // 1. Base64 인코딩
          const base64Image = e.target.result.split(",")[1]; // Data URL에서 base64 부분 추출
          console.log("보낸문자", base64Image);
          try {
            // 2. 인코딩된 이미지 데이터 서버로 전송
            const response = axios
              .post("/DBapi/image_save", {
                image: base64Image,
              })
              .then((response) => {
                console.log("성공");
              });
          } catch (error) {
            console.error("이미지 저장 중 오류 발생:", error);
          }
        };
        reader.readAsDataURL(imageBlob);

        // 2. 캐싱 방지 (선택 사항, 필요한 경우에만)
        const timestamp = new Date().getTime();
        this.imageSrc += `?t=${timestamp}`;
      } catch (error) {
        console.log("error:", error);
      }
    },

    async instagram_share() {
      try {
        // FormData 객체 생성 및 데이터 추가
        const formData = new FormData();
        const imageFile = this.imageBlob;
        formData.append("image", imageFile); // 이미지 추가
        formData.append("caption", this.caption);

        // Axios 요청 (Content-Type 설정 중요!)
        const response = await axios.post("/api/instagram_upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // 반드시 multipart/form-data로 설정
          },
        });

        console.log("인스타그램 공유 성공:", response.data);
      } catch (error) {
        console.error("인스타그램 공유 에러 발생:", error);
      } finally {
        this.showModal = false; // 공유 후 모달 닫기
      }
    },
  },
};
</script>

<style scoped>
.retouch-image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 500px;
  margin: 50px auto; /* 상단에 50px의 여유 공간 추가 */
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #fff;
}

.retouch-image {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}

button {
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
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
</style>
