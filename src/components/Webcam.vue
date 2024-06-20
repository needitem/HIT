<template>
  <div class="original-image-container">
    <div class="camera" v-show="!showUploadedImage">
      <video id="video" ref="video" @canplay="playVideo"></video>
    </div>
    <img
      v-if="showUploadedImage"
      :src="uploadedImageURL"
      alt="Uploaded Image"
      class="uploaded-image"
    />
    <div class="button-container">
      <label for="fileInput" class="upload-button">사진 첨부</label>
      <input
        type="file"
        accept="image/*"
        ref="fileInput"
        @change="handleFileUpload"
        id="fileInput"
        hidden
      />
      <button @click="showCameraView" v-if="showUploadedImage">카메라</button>
      <button @click="takePhoto" v-if="!showUploadedImage && !showRetakeButton">
        사진 촬영
      </button>

      <button @click="restartStreaming" v-if="showRetakeButton">
        다시 촬영
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";

export default {
  name: "start-video-practice",
  data() {
    return {
      video: null,
      streaming: false,
      height: 0,
      width: 320,
      showRetakeButton: false,
      showUploadedImage: false,
      uploadedImageURL: null,
    };
  },
  computed: {
    ...mapState(["uploadFaceImage"]),
  },
  mounted() {
    this.video = this.$refs.video;
    this.getMediaStream();
  },
  methods: {
    ...mapMutations(["SET_UPLOADED_FACE_IMAGE"]),

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
        this.SET_UPLOADED_FACE_IMAGE(blob);
        console.log("Blob created:", blob);
      }, "image/png");

      this.showRetakeButton = true;
    },
    handleFileUpload() {
      const file = this.$refs.fileInput.files[0];
      if (file) {
        this.showUploadedImage = true;
        this.uploadedImageURL = URL.createObjectURL(file);
        this.SET_UPLOADED_FACE_IMAGE(file);
      }
    },
    restartStreaming() {
      this.showUploadedImage = false;
      this.uploadedImageURL = null;
      this.video.play();
      this.showRetakeButton = false;
      this.$refs.fileInput.value = null; // Clear the file input
    },

    showCameraView() {
      this.showUploadedImage = false;
      this.uploadedImageURL = null;
      this.getMediaStream(); // Restart the video stream
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

.camera {
  flex: 1;
  /* Allow the camera to expand and take up available space */
  width: 100%;
}

#video {
  width: 100%;
  height: 100%;
  /* Make the video fill the camera container */
  object-fit: cover;
  /* Cover the container, maintaining aspect ratio */
}

.button-container {
  display: flex;
  justify-content: center;
  /* Center buttons horizontally */
  margin-bottom: 20px;
  /* Add space from the bottom */
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

.original-image-container {
  background-color: #fff;
  border: 2px solid #ccc;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
}

.take-photo-button {
  margin-left: 120px;
  /* 원하는 여백 크기 */
}
.upload-button {
  /* Style the upload button label */
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
}

.uploaded-image {
  max-width: 100%;
  max-height: 300px;
  margin-bottom: 20px;
}
</style>
