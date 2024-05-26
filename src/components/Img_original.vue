<template>
  <!-- <div id="contents"> -->
  <div class="original-image-container">
    <br><br>
    <div class="camera">
      <video id="video" ref="video" @canplay="playVideo"></video>
      <button @click="takePhoto">take Photo</button>
    </div>


    <div>
    <button @click="getIndex">Perform Activity</button>
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
  },
  methods: {
    async getIndex(){

      console.log("버스on:"+this.colorIndex)
      if(this.colorIndex != null){
        try {
          const data = new FormData();
          data.append('target', this.hairIndex);
          data.append('color', this.colorIndex);
          
          const response = await axios.post('/api/get_index', data);

          if (response.status === 200) {
            alert('color index uploaded successfully');
          } else {
            // alert(Failed to upload files: ${response.data.error});
          }
        } catch (error) {
          // alert(An error occurred: ${error.response ? error.response.data.error : error.message});
        }
      }else{
        alert("Please select color");
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
        const formData = new FormData();
        formData.append('files', blob, '0.png');

        console.log("Blob created:", blob);

        try {
          const response = await axios.post('/api/get_pic', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        } catch (error) {
          //console.error(`Error uploading image: ${error}`);
          alert(`Error uploading image: ${error.response ? error.response.data.error : error.message}`);
        }
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
   

    makeImage() {
      //send image route, target route, source color to server
      axios.post('http://localhost:8000/upload', {
        image: this.image,
        target: this.target,
        source: this.source
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(`Error uploading image: ${error}`);
      });
    }
    
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
  width: 320px;
  height: 240px;


}

.camera {
  width: 340px;

  display: inline-block;
}
</style>