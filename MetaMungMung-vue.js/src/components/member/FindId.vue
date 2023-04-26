<template>
    <div class="services_section layout_padding">
      <div class="container">
            <div class="membership-login">
            <div style="text-align:center"><h1>아이디 찾기</h1></div>
                
            <form role="form" @submit.prevent="findIdForm">

            <div>
                
                <div>회원 이메일</div>
                <div>
                <input type="text" v-model="member.email" required>
                </div>
            </div>

            <button type="submit" id="btnLogin" @click="submit">확인</button>
            
            </form>           
        
        </div>

      </div>
    </div>
</template>

<script>
import {useRouter} from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';
import Swal from "sweetalert2";

export default {
  setup() {
    const router = useRouter();
    const member = ref({
      email: '',
    });

    const findIdForm = async() => {
      try {
        console.log(member.value);
        
        const res = await axios.post('/members/findId', {
          email: member.value.email
        });

        Swal.fire({
            icon: 'success',
            title: '회원 아이디',
            text:'가입하신 회원의 아이디는 ' + res.data + ' 입니다',
        });

        router.push({name: "Login"});
        
      } catch (error) {
          console.log(error);

          Swal.fire({
            icon: 'error',
            title: '해당 이메일과 일치하는 정보가 없습니다.'
          });
      } 
    };

    return {
      member,
      findIdForm,
    };
  }
}
</script>

<style scoped>
@import "@/assets/css/member/login.css";
</style>