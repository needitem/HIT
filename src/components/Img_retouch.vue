<template>
    <div class="retouch-image-container">
        <img :src="imageSrc" alt="원본 이미지" class="retouch-image">
        <button @click="generate">Send</button>
        <div>
        <button @click="send">캠, 헤어, 컬러 한번에 post하는 임시버튼</button>
        </div>
        <!-- <div>
        <button @click="debug">디버그버튼</button>
        </div> -->
    </div>


</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            imageSrc: require('@/assets/logo.png'), // 초기 이미지 경로

            face:null,
            hair:null,
            color:null,

            
            formData: new FormData(),
        };
    },
    mounted() {
        this.$bus.$on('face',(faceBlob)=>{
            //this.formData.append('files', faceBlob, 'face.png');
            this.face=faceBlob;
        });

        this.$bus.$on('hair',(hairBlob)=>{
            // this.formData.append('files', hairBlob, 'hair.png');
            //this.formData.set('files', hairBlob, 'hair.png');
            this.hair = hairBlob;
        });

        this.$bus.$on('color',(colorBlob)=>{
            //this.formData.append('files', colorBlob, 'color.png');
            this.color = colorBlob;
            
        });


    },

    methods: {
        // async debug(){
        //     if (!this.face || !this.hair || !this.color) {
        //         alert("face, hair, color 전부 선택해 주세요");
        //         return;
        //     }
        
        //     this.formData.append('files', this.face, 'face.png');
        //     this.formData.append('files', this.hair, 'target.png');
        //     this.formData.append('files', this.color, 'color.png');
        //     console.log("폼확인:",this.formData.getAll('files'))
        // },
        async send(){
            if (!this.face || !this.hair || !this.color) {
                alert("face, hair, color 전부 선택해 주세요");
                return;
            }
            
            // face, hair, color Blob들이 formData에 모두 실려 있는지 확인
            this.formData.append('files', this.face, 'face.png');
            this.formData.append('files', this.hair, 'target.png');
            this.formData.append('files', this.color, 'color.png');

            const blobCount = this.formData.getAll('files').length;
            if (blobCount < 3) {
                alert('Please upload all required images (face, hair, color) before sending.');
                return;
            } else if (blobCount > 3) {
                alert('지금 formData에 3개가 초과되는 파일이 들어있음');
                return;
            }


            try {
                const response = await axios.post('/api/get_pic', this.formData, {
                    headers: {'Content-Type': 'multipart/form-data'}
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

        async generate() {
            try {
                const response = await axios.get('/api/generate', {
                    responseType: 'arraybuffer' // 바이너리 데이터로 요청
                });

                // 이미지 데이터를 받아왔으므로 처리 가능
                const imageBlob = new Blob([response.data], { type: 'image/jpeg' }); // 브라우저가 이해할 수 있는 Blob으로 변환
                const imageUrl = URL.createObjectURL(imageBlob);

                // 받아온 이미지 데이터를 사용하여 필요한 작업을 수행할 수 있습니다.
                // 예를 들어, 이미지를 화면에 표시하거나 다운로드할 수 있습니다.
                this.imageSrc = imageUrl; // 이미지 URL을 Vue 데이터에 저장하여 이미지 소스로 설정

            } catch (error) {
                console.log("error:", error);
            }
        }
    }
}
</script>

<style scoped>
.retouch-image-container {
    width: 100%;
    height:auto;


    text-align: center;
    /* 가운데 정렬을 위한 스타일 */
    max-width: 500px;
    /* 최대 너비 설정 (원하는 크기로 조절) */
    margin: 0 auto;
    /* 수평 가운데 정렬을 위한 스타일 */
    margin-top: 74px;
    border: 2px solid #000000;
    /* 테두리 설정: 두께 2px */
}

.retouch-image {
    /* width: 280px;
    height: 280px; */
    width: 100%;
    height: auto;
    object-fit: cover;
    /* 이미지를 비율 유지하면서 지정한 크기로 자르기 */
}
</style>
