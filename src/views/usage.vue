<template>
  <div>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <div class="content-container">
      <div class="column left">
        <Webcam ref="webcam" />
      </div>
      <div class="column center">
        <table>
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
      </div>
      <div class="column right">
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
    ...mapState(["uploadedImage", "uploadedColorImage", "isLoading"]),
  },
  methods: {
    //...mapMutations(["SET_UPLOADED_IMAGE"]),
  },
};
</script>

<style scoped>
td {
  display: block;
  margin: 10px auto;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #fff;
  text-align: center;
  padding: 0;
}

table {
  border-collapse: collapse;
  padding: 0;
  width: fit-content;
  max-width: 100%;
}

.content-container {
  display: flex;
  justify-content: center; /* Center the whole content */
  align-items: center;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px; /* Reduce the margin to bring columns closer */
}

.left,
.right {
  flex: 0 0 auto; /* Prevent these columns from growing */
}

.center {
  flex: 0 1 auto; /* Allow the center column to take up necessary space */
}

.box {
  width: 160px;
  height: 200px;
  margin: 10px 10px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  background-color: #f2f2f2;
}

.box img {
  margin: auto;
  max-width: 90%;
  max-height: 90%;
  display: block;
}
</style>
