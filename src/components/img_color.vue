<template>


  <div class="original-image-container">
    <swiper class="swiper" ref="mySwiper" 
		  :options="swiperOptions" 
		  @slideChange="slideChangeTransitionStart">
      
      <swiper-slide v-for="(slide, index) in images" :key="index">
        <img :src="slide" alt="slide" @click="handleImageClick(index)"
        :style="{ border: index === selectedImageIndex ? '2px solid green' : 'none' }"/>
      </swiper-slide> 
		
		  <!-- pagination -->
		  <div class="swiper-pagination" slot="pagination"></div>
        
		  <!-- navigation -->
		  <div class="swiper-button-prev swiper-btn-prev" slot="button-prev"></div>
		  <div class="swiper-button-next swiper-btn-next" slot="button-next"></div>
	  </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "slider",
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      selectedImageIndex: -1,
      
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
   
    handleImageClick(index) {
      // 선택된 이미지의 인덱스를 업데이트
      this.selectedImageIndex = index;
      console.log("이미지 클릭됨:", index);
      // 기존의 이벤트 처리 로직 추가 가능
      this.$bus.$emit('color_Clicked', index);
    },

    slideChangeTransitionStart() {

      if (this.swiper) {
        console.log("현재 활성화된 슬라이드의 인덱스:", this.swiper.activeIndex);
      
      }
		},



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
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 50px;
  border: 2px solid #000000;
}

</style>