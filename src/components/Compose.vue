<template>
  <div class="retouch-image-container">
    <img :src="this.imageSrc" alt="원본 이미지" class="retouch-image" />
    <!-- <button @click="generate">Send</button> -->
    <div>
      <button @click="send">생성</button>
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

      // face: null,
      // hair: null,
      // color: null,
      DB_ngrok: process.env.VUE_APP_API_URL2,
      formData: new FormData(),
    };
  },
  mounted() {
    // 나중엔 얼굴도 vuex로 관리해야 할 듯!@@@ 바꿀것
    // this.$bus.$on("face", (faceBlob) => {
    //   this.face = faceBlob;
    // });
  },

  methods: {
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

        const imageBlob = new Blob([response.data], { type: "image/png" }); // 브라우저가 이해할 수 있는 Blob으로 변환
        const imageUrl = URL.createObjectURL(imageBlob);

        // 이미지 URL 변경 후 컴포넌트 업데이트

        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = e.target.result;
        };
        reader.readAsDataURL(imageBlob);

        // 2. 캐싱 방지 (선택 사항, 필요한 경우에만)
        const timestamp = new Date().getTime();
        this.imageSrc += `?t=${timestamp}`;

        axios.post(DB_ngrok + "/image_save", this.imageSrc);
      } catch (error) {
        console.log("error:", error);
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
</style>
