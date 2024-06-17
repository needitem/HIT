<template>
  <div>
    <div class="content-container">
      <div class="left-box">
        <Webcam ref="webcam" />
      </div>
      <div class="text-container"></div>

      <table>
        <tr>
          <td colspan="2" style="text-align: center; padding-top: 20px">
            <font size="20px">⟩⟩</font>
          </td>
        </tr>
        <tr>
          <td style="text-align: center">
            스타일
            <div class="box">
              <img
                v-if="uploadedImage"
                :src="uploadedImage"
                alt="Uploaded Image"
              />
            </div>
          </td>
          <td style="text-align: center">
            색상
            <div class="box">
              <img
                v-if="uploadedColorImage"
                :src="uploadedColorImage"
                alt="Uploaded Image"
              />
            </div>
          </td>
        </tr>
      </table>

      <div class="right-box">
        <Compose ref="compose" />
      </div>
    </div>
    <Slide />
  </div>
</template>

<script>
import Webcam from "@/components/Webcam.vue";
import Compose from "@/components/Compose.vue";
import Slide from "@/components/Slide.vue";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    Webcam,
    Compose,
    Slide,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState([
      //"selectedHairIndex",
      //"images",
      "uploadedImage",
      "uploadedColorImage",
    ]), // uploadedImage 추가
  },
  methods: {
    //...mapMutations(["SET_UPLOADED_IMAGE"]),
  },
};
</script>
<style scoped>
.content-container {
  display: flex;
  /* 가로 방향으로 배치 */
}
.left-box {
  width: 50%;
  /* 각 박스 너비 50% */
  /* 필요에 따라 높이, 테두리 등 스타일 추가 */
  margin-left: 10%;
}

.right-box {
  width: 50%;
  /* 각 박스 너비 50% */
  /* 필요에 따라 높이, 테두리 등 스타일 추가 */
  margin-right: 10%;
}

.text-container {
  display: flex;
  flex-direction: row; /* 가로 방향으로 배치 */
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  height: 60vh;
}

.divider-text {
  font-size: 20px;
  align-items: center;
  margin-right: 20px; /* >> 기호와 박스 사이 간격 추가 (오른쪽으로) */
}

.box {
  width: 160px;
  height: 200px;
  border: 1px solid black;
  margin: 0 10px; /* 좌우 간격 10px, 위아래 간격 0 */
  display: flex; /* Flexbox 레이아웃 적용 */
  align-items: center; /* 세로 중앙 정렬 */
}

.box img {
  margin: auto; /* 이미지 자동 중앙 정렬 */
  max-width: 90%; /* 이미지가 박스 너비를 넘지 않도록 설정 */
  max-height: 90%; /* 이미지가 박스 높이를 넘지 않도록 설정 */
}
</style>
