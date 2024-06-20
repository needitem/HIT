<template>
  <div class="retouch-image-container">
    <img :src="imageSrc" alt="원본 이미지" class="retouch-image" />

    <div>
      <button @click="send">생성하기</button>
      <button @click="showModal = true">공유하기</button>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close-button" @click="showModal = false">&times;</span>
        <h2>인스타그램 공유</h2>
        <form>
          <img
            :src="imageSrc"
            alt="공유할 이미지"
            style="width: 100%; margin-bottom: 10px"
          />
          <textarea v-model="caption" placeholder="캡션 입력"></textarea>
          <button type="button" @click="instagramShare">업로드</button>
        </form>
      </div>
    </div>

    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState([
      "uploadedImage",
      "uploadedColorImage",
      "uploadedFaceImage",
      "isLoading",
      "userName", // Vuex에서 가져올 사용자 이름 추가
    ]),
  },
  data() {
    return {
      imageSrc: require("@/assets/man_icon.png"), // 초기 이미지 경로
      showModal: false,
      imageBlob: null,
      formData: new FormData(),
      caption: "", // 인스타그램 캡션

      snackbar: false,
      text: "로그인이 필요한 기능입니다. 로그인을 해주세요",
      timeout: 2000,
    };
  },
  methods: {
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
      if (this.$store.state.userName == null) {
        this.snackbar = true;
        this.$store.state.isLoading = false;
        console.log("snackbar 상태", this.snackbar);
        return false;
      }

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
      this.$store.state.isLoading = true;

      this.formData.append("files", this.uploadedFaceImage, "face.png");

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
          //alert("Files uploaded successfully");
          this.generate();
        } else {
          // 에러 처리
          this.$store.state.isLoading = false;
        }
      } catch (error) {
        // 에러 처리
        this.$store.state.isLoading = false;
      }
    },

    async generate() {
      try {
        const response = await axios.get("/api/generate", {
          responseType: "arraybuffer",
        });

        this.imageBlob = new Blob([response.data], { type: "image/png" });
        const imageUrl = URL.createObjectURL(this.imageBlob);

        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = e.target.result;

          const base64Image = e.target.result.split(",")[1];
          // try {
          //   //axios.post("/DBapi/image_save", { image: base64Image });
          // } catch (error) {
          //   console.error("이미지 저장 중 오류 발생:", error);
          // }
        };
        reader.readAsDataURL(this.imageBlob);
        this.$store.state.isLoading = false;
      } catch (error) {
        this.$store.state.isLoading = false;
        console.log("error:", error);
      }
    },

    async instagramShare() {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(this.imageBlob);

        reader.onloadend = async () => {
          const base64data = reader.result;
          console.log("이미지", base64data);
          const response = await axios.post(
            "/api/instagram_upload",
            {
              image: base64data, // Base64 인코딩된 이미지 데이터 전송
              caption: this.caption,
              nickname: this.userName, // Vuex에서 가져온 사용자 이름 사용
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("인스타그램 공유 성공:", response.data);
          alert("인스타그램 공유 성공!");
        };
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
  background-color: #4caf50;
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
.retouch-image-container {
  /* ... */
  background-color: #fff;
  border: 2px solid #ccc;
  /* 테두리 추가 */
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  /* 그림자 효과 추가 */
}
</style>
