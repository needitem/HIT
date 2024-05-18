<template>
  <div>
    <div class="original-image-container">
      <img :src="imageUrl || require('@/assets/팔레트아이콘.png')" alt="원본 이미지" class="original-image">
    </div>

    <div class="upload-container">
      <input type="file" accept="image/*" @change="onFileChange"/>
      <p v-if="file">
        upload 이미지 : {{ file.name }} ({{ file.size }} bytes) / {{ file.type }}
      </p>
    </div>

    <div>
      <button @click="send">Send</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      file: null,
      imageUrl: null,

      
      files: [],


    };
  },
  methods: {
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
      }
    },






    async send() {
      // try {
      //   this.error = null; // Clear any previous error
      //   const response = await axios.get('/api/hello', {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   });
      //   this.data = response.data;
      //   console.log(this.data);
      // } catch (err) {
      //   this.error = 'Error fetching data: ' + err.message;
      // }



      
      if (this.files.length === 0) {
        alert('Please select files to upload');
        return;
      }

      const formData = new FormData();
  
      this.files.forEach((file, index) => {
        formData.append('files', file);
      });

      try {
        const response = await axios.post('/api/get_color', formData, {
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

      
 

    },
  },
};


</script>

<style scoped>
.upload-container {
  text-align: center;
  margin-top: 20px; 
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
  object-fit: cover;
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