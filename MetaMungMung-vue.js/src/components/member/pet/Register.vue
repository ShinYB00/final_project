<template>
  <div class="services_section layout_padding">
        <div class="container">
            
        <div class="membership-register">
        <div style="text-align:center"><h1>반려견 정보 등록</h1></div>

            <form 
                @submit.prevent="registerForm">

            <div>
            <div><h3>반려견 정보 입력</h3></div>

            <div>
                <img class="previewImage" id="previewImage" :src="previewImage" @error="defaultImage" style="width:30%"/>
                <br/>
                <label for="input-image">반려견 이미지 선택:</label>
                <br>
                <input id="input-image" type="file" accept="image/*" ref="inputImage" @change="readImage"/>
                
            </div>

            <div>
                <div>동물 등록 번호</div>
                <input name="no" v-model="pet.animalRegistrationNo" type="text" placeholder="반려 동물 등록 번호 입력" required>
            </div>

            <div>
                <div>이름</div>
                <input name="name" v-model="pet.petName" type="text" placeholder="반려견 이름 입력" required>
            </div>

            <div>
                <div>성별</div>
                <input type="radio" v-model="pet.sex" class="female" value="female" required> 여
                <input type="radio" v-model="pet.sex" class="male" value="male" required> 남
            </div>

            <div>
                <div>생년월일</div>
                <input name="birth" v-model="pet.birth" type="date" placeholder="생년월일 입력" min="2000-01-01" max="2023-04-01" required>
            </div>

            <button type="submit" id="btnRegister">등록하기</button>
            </div>
            
            </form>

        </div>
    </div>
  </div>
</template>

<script>
import {useRoute, useRouter} from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';

export default {
  name: 'RegisterForm',
  setup() {
    const router = useRouter();

    const pet = ref({
      memberIdx: '',
      animalRegistrationNo:'',
      petName: '',
      sex:'',
      birth:'',
      petImg: ''
    });

    // 이미지 파일 첨부
    const inputImage = ref(null);
    const previewImage = ref('');
    const defaultImage = () => {
        previewImage.value = require(`@/assets/images/member/pet-image.png`);
    }

    const file = document.getElementById('inputImage');
    

    function readImage() {
      const input = inputImage.value;

      if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = (e) => {
          previewImage.value = e.target.result;

          console.log("Uploaded file data: ", input.files[0]);
        };

        reader.readAsDataURL(input.files[0]);
      }
    };

    //const memberInfo = JSON.parse(sessionStorage.getItem("memberInfo"));
    // const previewImage = ref('');

    const registerForm = async() => {
      try {
        const memberIdx = sessionStorage.getItem('memberIdx');
        axios.defaults.headers.common['AUTHORIZATION'] = sessionStorage.getItem('token');

        const res = await axios.post('/members/pets/register', {
          memberIdx: memberIdx,
          animalRegistrationNo: pet.value.animalRegistrationNo,
          petName: pet.value.petName,
          sex: pet.value.sex,
          birth: pet.value.birth,
          petImg: previewImage.value
        });

        //const update = await axios.patch('members/update')
        console.log(res.data);

        alert('반려견 정보가 등록 되었습니다.')
        router.push({ name: 'MyPage' });

        } catch (error) {
            console.log(error);
        } 
        
    };

    

    return {
      previewImage,
        pet,
        file,
        defaultImage,
        inputImage,
        previewImage,
        readImage,
        registerForm,
    };
  }
}
</script>

<style scoped>
@import "@/assets/css/member/login.css";
</style>