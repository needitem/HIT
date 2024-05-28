<template>
  <v-app>
    <!-- <img :src="require('@/assets/1.png')" alt="원본 이미지" class="original-image"> -->


    <v-row>
      <v-col cols="3">
        <Img_original />
      </v-col>
      
      <v-col cols="3" >
        머리모양
        <Img_hair />
      </v-col>

      <v-col cols="3" >
        머리색갈
        <Img_color />
      </v-col>
      
      <v-col cols="3">
        <Img_retouch />
      </v-col>
<!-- 
      <v-col cols="2" style="background-color: aqua;">
        <Recom_Image />
      </v-col> -->
    </v-row>

    <!-- <v-main style="background-color: rgb(170, 46, 46);">
      <Customize />
      <!--<router-view/>-->
      <!-- <Hair_Curl />
      <Hair_Long />
    </v-main> -->
  </v-app>
</template>

<script>
import Img_original from '@/components/Img_original.vue';
import Img_hair from '@/components/Img_hair.vue';
import Img_color from '@/components/img_color.vue';
import Img_retouch from '@/components/Img_retouch.vue';
import Customize from '@/components/Customize.vue';
import Recom_Image from '@/components/RecomImage.vue';
import Hair_Curl from '@/components/Hair_Curl.vue';
import Hair_Long from '@/components/Hair_Long.vue';


export default {
  name: 'App',

  components: {
    Img_original,
    Img_hair,
    Img_color,
    Img_retouch,
    Customize,
    Recom_Image,
    Hair_Curl,
    Hair_Long,
  },

  // 시작 슬라이더 위치
  methods: {
    onValueChanged(newValue) {
      console.log("Value changed:", newValue)
    },
    
  },

  data: () => ({
    //
  }),
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


width: 800px;
height: 500px; 
/* object-fit: cover; */
object-fit:contain
}

</style>