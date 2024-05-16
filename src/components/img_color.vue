<template>
  <div>
    <div class="original-image-container">
      <img :src="imageUrl || require('@/assets/팔레트아이콘.png')" alt="원본 이미지" class="original-image">
    </div>

    <div class="upload-container">
      <input type="file" accept="image/*" @change="Imageinput"/>
      <p v-if="file">
        upload 이미지 : {{ file.name }} ({{ file.size }} bytes) / {{ file.type }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      imageUrl: null,
    };
  },
  methods: {
    Imageinput(e) {
      const file = e.target.files[0];
      if (file) {
        this.file = file;
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imageUrl = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style scoped>
.upload-container {
  text-align: center;
  margin-top: 20px; /* 이미지와 버튼 사이의 간격 */
}

.original-image-container {
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 50px;
  border: 2px solid #000000;
}

.original-image {
  width: 200px;
  height: 280px;
  object-fit: cover; /* 이미지를 비율 유지하면서 지정한 크기로 자르기 */
}

.upload-label {
  display: inline-block;
  padding: 10px 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}
</style>
