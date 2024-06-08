<template>
  <div class="original-image-container">
    <br /><br />
    <div class="camera">
      <video id="video" ref="video" @canplay="playVideo"></video>
      <button @click="takePhoto" v-show="!showRetakeButton">take Photo</button>
    </div>
    <div>
      <button @click="restartStreaming" v-show="showRetakeButton">
        다시 찍기
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "start-video-practice",
  data() {
    return {
      video: null,
      streaming: false,
      height: 0, //280,
      width: 320, //280,

      files: [],
      showRetakeButton: false,
    };
  },
  mounted() {
    this.video = this.$refs.video;

    this.getMediaStream();
  },
  methods: {
    async sendImage() {
      if (this.color_file != null && this.hair_file != null) {
        if (this.files.length === 0) {
          alert("Please select files to upload");
          return;
        }
        const formData = new FormData();

        this.files.forEach((file, index) => {
          formData.append("files", this.hair_file);
          formData.append("files", this.color_file);
        });
        try {
          const response = await axios.post("/api/get_pic", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.status === 200) {
            alert("Files uploaded successfully");
          } else {
            // alert(Failed to upload files: ${response.data.error});
          }
        } catch (error) {
          // alert(An error occurred: ${error.response ? error.response.data.error : error.message});
        }
      } else {
        alert("Please input color&hair");
      }
    },

    getMediaStream() {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          this.video.srcObject = stream;
          this.video.play();
        })
        .catch((err) => {
          console.error(`error occurred : ${err}`);
        });
    },
    playVideo() {
      if (!this.streaming) {
        this.streaming = true;
        this.height =
          (this.video.videoHeight / this.video.videoWidth) * this.width;

        this.video.height = this.height;
        this.video.width = this.width;
      }
    },
    async takePhoto() {
      this.video.pause();
      const canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      const context = canvas.getContext("2d");
      context.drawImage(this.video, 0, 0, this.width, this.height);

      const dataURL = canvas.toDataURL("image/png");

      canvas.toBlob(async (blob) => {
        this.$bus.$emit("face", blob);
        console.log("Blob created:", blob);
      }, "image/png");
      this.showRetakeButton = true;
    },

    restartStreaming() {
      this.video.play();
      this.showRetakeButton = false;
    },

    downloadImage(dataURL, fileName) {
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
  },
};
</script>

<style scoped>
.original-image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 500px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #fff;
}

#video {
  border: 1px solid black;
  box-shadow: 2px 2px 3px black;
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.camera {
  width: 100%;
  height: auto;
  display: inline-block;
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
