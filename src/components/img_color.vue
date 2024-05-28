<template>


  <div class="original-image-container">
    <div v-if="!imageUrl">
    <swiper class="swiper" ref="mySwiper" 
		  :options="swiperOptions" 
		  @slideChange="slideChangeTransitionStart">
      
      <swiper-slide v-for="(slide, index) in images" :key="index">
        <img 
        :src="slide" alt="slide" @click="handleImageClick(index)"
        :style="{
          border: index === selectedImageIndex ? '2px solid green' : '2px solid red',
          width:'250px',
          height:'250px',
          

        }"/>
      </swiper-slide> 
		
		  <!-- pagination -->
		  <div class="swiper-pagination" slot="pagination"></div>
        
		  <!-- navigation -->
		  <div class="swiper-button-prev swiper-btn-prev" slot="button-prev"></div>
		  <div class="swiper-button-next swiper-btn-next" slot="button-next"></div>
	  </swiper>
    </div> 

    <div>
      <img :src="imageUrl" class="original-image">
      <input type="file" accept="image/*" @change="onFileChange"/>
      <p v-if="file">
        upload 이미지 : {{ file.name }} ({{ file.size }} bytes) / {{ file.type }}
      </p>

      <div>
        <!--<button @click="send">Send</button>-->
      </div>
    </div>


  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import axios from 'axios';
export default {
  name: "slider",
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      file: null,
      imageUrl: null,
      files: [],


      selectedImageIndex: -1,
      // 서버를 통해 통신할땐 아래 배열 빈배열로 초기화시켜야함   @@##@@##@@##@@##@@##
      images: [],
      swiperOptions: {
					//loop: true,
					// autoplay:{
					//   delay:1000
					// },
					pagination: {
						el: '.swiper-pagination'
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},                    
			},

      swiper: null // swiper instance를 저장할 변수 추가
    };
  },
  methods: {
    // 그림파일 선택 시 지금 컴포넌트에서 서버로 직접 전송하는 메서드(디버그용으로 비활성화 상태)
    async send() {
      if (this.files.length === 0) {
        alert('Please select files to upload');
        return;
      }
      const formData = new FormData();
  
      this.files.forEach((file, index) => {
        formData.append('files', file, 'input_hair.png');
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
          //  alert(`Failed to upload files: ${response.data.error}`);
        }
      } catch (error) {
        // alert(An error occurred: ${error.response ? error.response.data.error : error.message});
      }
    },

    // 그림파일 선택 시 그림 바꿔주는 메서드
    onFileChange(event) {
      this.files = Array.from(event.target.files);
      const file = event.target.files[0];
      if (file) {
        this.file = file;
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imageUrl = event.target.result;
        };
        reader.readAsDataURL(file);
        //this.send();
        this.$bus.$emit('color', this.file);
        console.log("버스전송:파일선택")
      }
      
    },
   
    // 이미지 클릭 시 클릭된 이미지(base64형태)를 blob형태로 바꿔서 서버로 전송
    async handleImageClick(index) {

      if(this.selectedImageIndex != index){
        //this.selectedImageIndex = null;
      

        // 선택된 이미지의 인덱스를 업데이트
        this.selectedImageIndex = index;

        // Base64 데이터를 Blob으로 변환
        const byteString = atob(this.images[index].split(",")[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: 'image/png' });

        this.$bus.$emit('color', blob);
        console.log("버스전송:이미지선택")
      }else{
        this.selectedImageIndex = null;
        
      }
      /* 해당 주석은 지금 컴포넌트에서 서버로 직접 이미지를 전송하는 코드로 디버깅용(비활성화 상태)
      // FormData 객체 생성
      const formData = new FormData();
      // 이미지 데이터를 FormData에 추가
      formData.append('files', blob, 'image.png');
      

      try {
        const response = await axios.post('/api/get_pic', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.status === 200) {
          alert('Files uploaded successfully');
        } else {
          //  alert(`Failed to upload files: ${response.data.error}`);
        }
      } catch (error) {
        // alert(An error occurred: ${error.response ? error.response.data.error : error.message});
      }*/
    },

    // 슬라이드 변경 시 호출되는 메서드( 인덱스가 몇인지 디버그 용도 )
    slideChangeTransitionStart() {
      if (this.swiper) {
        console.log("현재 활성화된 슬라이드의 인덱스:", this.swiper.activeIndex);
      
      }
		},


    // 웹 접속시 api를 통해 이미지를 받아옴
    async fetchImages() {
      try {
        const response = await fetch('/api/send_pic');
        const data = await response.json();
      
        if (data.error) {
          console.error(data.error);
        } else {
          //this.images = data.images;
          console.log(this.images); // 데이터 확인

          this.images = data.images.map(image => 'data:image/png;base64,' +image);
        
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        
      }
    },
  
    // swiper 초기화
    initializeSwiper() {
      this.swiper = new Swiper('.swiper-container', {
        // Optional parameters
        loop: true,
        
        // If you need pagination
        pagination: {
          el: '.swiper-pagination',
        },
        
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        
        // And if we need scrollbar
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      });
    }
  },

  mounted() {
    this.initializeSwiper();
    this.fetchImages();
  },

};
</script>

<style scoped>

.original-image-container {
  width: 100%;
  height:auto;


  text-align: center;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 50px;
  border: 2px solid #000000;
}

.original-image {

width:100%;
height:auto;
/* width: 200px;
height: 280px; */
/* object-fit: cover; */
object-fit:contain
}

</style>