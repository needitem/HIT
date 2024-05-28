<template>
  <!-- <div id="contents"> -->
  <div class="original-image-container">
    <br><br>
    <div class="camera">
      <video id="video" ref="video" @canplay="playVideo"></video>
      <button @click="takePhoto">take Photo</button>
    </div>



    <div>
      <button @click="sendImage">이미지 보내기</button>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import axios from 'axios';


export default {
  name: "start-video-practice",
  data() {
    return {
      video: null,
      streaming: false,
      height: 0,//280,
      width: 320,//280,


      
      colorIndex: null,
      hariIndex: null,
      color_file: null,
      hair_file: null,
      files:[],
    }
  },
  mounted() {
    this.video = this.$refs.video;

    this.getMediaStream();
    
    this.$bus.$on('color_Clicked',(colorIndex)=>{
      this.colorIndex = colorIndex;
    });
        
    this.$bus.$on('hair_Clicked',(hairIndex)=>{
      this.hairIndex = hairIndex;
    });

    this.$bus.$on('color_input',(color_file)=>{
      this.color_file = color_file;
    });

    this.$bus.$on('hair_input',(hair_file)=>{
      this.hair_file = hair_file;
    });

  },
  methods: {
    
    //선택한 사진을 보냄
    async sendImage(){
      if(this.color_file != null && this.hair_file != null){
        if (this.files.length === 0) {
          alert('Please select files to upload');
          return;
        }
        const formData = new FormData();
  
        this.files.forEach((file, index) => {
          formData.append('files', this.hair_file);
          formData.append('files', this.color_file);

        });
      try {
        const response = await axios.post('/api/get_pic', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.status === 200) {
            alert('Files uploaded successfully');
          } else {
            // alert(Failed to upload files: ${response.data.error});
          }
        } catch (error) {
          // alert(An error occurred: ${error.response ? error.response.data.error : error.message});
        }
      }else{
        alert("Please input color&hair");
      }
    },


    getMediaStream() {
      navigator.mediaDevices.getUserMedia(
        { video: true, audio: false } // 비디오, 오디오 사용??
      ).then((stream) => {
        this.video.srcObject = stream;
        this.video.play();
      }).catch((err) => {
        console.error(`error occurred : ${err}`);
      })
    },
    playVideo() {
      if (!this.streaming) {
        this.streaming = true;
        this.height = this.video.videoHeight / this.video.videoWidth * this.width;

        this.video.height = this.height;
        this.video.width = this.width;
      }
    },
    async takePhoto() {
      // try {
      //   this.error = null; // Clear any previous error
      //   const response = await axios.get('/api/hello', {
      //     // headers: {
      //     //   'Content-Type': 'application/json',
      //     // },
      //   });
      //   this.data = response.data;
      //   console.log(this.data);
      // } catch (err) {
      //   this.error = 'Error fetching data: ' + err.message;
      // }

      const canvas = document.createElement("canvas");
      canvas.width = this.width;
      canvas.height = this.height;
      const context = canvas.getContext("2d");
      context.drawImage(this.video, 0, 0, this.width, this.height);

      // Get the data URL directly
      const dataURL = canvas.toDataURL("image/png");

      // 주석해제 시 다운됨
      // this.downloadImage(dataURL, "captured_image.png");

      //############### 주석해제
      canvas.toBlob(async (blob) => {
        //const formData = new FormData();
        //formData.append('files', blob, '0.png');
        this.$bus.$emit('face', blob);
        console.log("Blob created:", blob);

        // try {
        //   const response = await axios.post('/api/get_pic', formData, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data'
        //     }
        //   });
        // } catch (error) {
        //   //console.error(`Error uploading image: ${error}`);
        //   alert(`Error uploading image: ${error.response ? error.response.data.error : error.message}`);
        // }
      }, 'image/png');

    },

    downloadImage(dataURL, fileName) {
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
   

    // makeImage() {
    //   //send image route, target route, source color to server
    //   axios.post('http://localhost:8000/upload', {
    //     image: this.image,
    //     target: this.target,
    //     source: this.source
    //   })
    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.error(`Error uploading image: ${error}`);
    //   });
    // }
    
  }
}
</script>

<style scoped>
.original-image-container {

  
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 74px;
  border: 2px solid #000000;
}


#video {
  border: 1px solid black;
  box-shadow: 2px 2px 3px black;
  width: 100%;
  height:auto;


}

.camera {
  /* width: 340px; */
    
  width: 100%;
  height:auto;
  display: inline-block;
}
</style>