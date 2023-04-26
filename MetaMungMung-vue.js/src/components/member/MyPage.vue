<template>
  <div class="services_section layout_padding">
        <div class="container">

          <h1 style="text-align:center">My Page</h1>
            
            <div class="myContent">

            <div class="profile">
                <div class="profile-image">
                <img id="preview-image" :src="profileImgSrc" @error="defaultImage">
                <br>
                </div>
                <h1>{{memberName}} 님</h1>
            </div>


            <div class="main-content">
              <div class="menu">
                <ul>
                <li><router-link :to="{ name: 'Register' }">반려견 등록</router-link></li>
                <li><router-link :to="{ name: 'OrderList' }">내 주문내역</router-link></li>
                <li><router-link :to="{ name: 'Modify' }">회원정보 수정 및 탈퇴</router-link></li>
                </ul>
              </div>
              
              <div class="profile-wrapper">
                <div class="card-news" v-for="myPet in myPetList" :key="myPet.petIdx">
                  <!-- <h2><img :src="myPet.petImg"/></h2> -->
                  <div class="card-container">
                    <div class="card">
                      <div class="petImgBox">
                        <img :src="myPet.petImg" alt="Card image 1" class="petImg">
                      </div>
                      <div class="petInfo">
                        <h3>{{ myPet.petName }}</h3>
                        <p>성별: {{ myPet.sex }}</p>
                        <p>태어난 날: {{ myPet.birth.split('T')[0] }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            </div>

        </div>
    </div>
</template>

<script>
import { useRouter} from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';

export default {
  name: 'MyPage',
  setup() {
    const router = useRouter();
    const memberName = ref('');

    const memberIdx = sessionStorage.getItem('memberIdx');
    axios.defaults.headers.common['AUTHORIZATION'] = sessionStorage.getItem('token');

    // 이미지 파일 첨부
    const profileImgSrc = ref('');
    const defaultImage = () => {
        profileImgSrc.value = require(`@/assets/images/member/profile.png`);
    }

    const info = async () => {
      try {
          const res = await axios.get('/members/my');
          memberName.value = res.data.memberName;

          console.log(res.data);

      } catch (error) {
        console.error(error);
      }
    }

    info();

    const myPetList = ref([]);

    const getMyPets = async () => {
      try {
        const response = await axios.get('/members/pets');
        console.log(response.data);

        myPetList.value = response.data;

      } catch (error) {
        console.error(error);
      }
    };

    
    getMyPets();
    
    return {
      memberName,
      defaultImage,
      memberIdx,
      info,
      myPetList,
      getMyPets,
      profileImgSrc
    };
  }
}
</script>

<style scoped>
@import "@/assets/css/member/mypage.css";
</style>