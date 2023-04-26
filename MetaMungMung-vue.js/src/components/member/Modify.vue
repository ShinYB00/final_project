<template>
    <div class="services_section layout_padding">
        <div class="container">
            
            <div class="membership-signup">
            <div style="text-align:center"><h1>회원 정보 수정</h1></div>

                <form 
                    @submit.prevent="modifyForm">

                <div>
                <div><h3>회원 정보 입력</h3></div>

                <div>
                    <div>비밀번호</div>
                    <input id="password" v-model="member.password" type="password" placeholder="8자이상 16자 이하이며 대/소문자/숫자 1개 이상" @blur="passwordValid">
                     <div v-if="!passwordValidFlag" style="color: #F55050;">
                      유효하지 않은 비밀번호입니다.
                    </div>
                </div>

                <div>
                    <div>비밀번호 확인</div>
                    <input id="passwordCheck" v-model="passwordCheck" type="password" placeholder="비밀번호 확인" @blur="passwordCheckValid">
                    <div v-if="!passwordCheckFlag" style="color: #F55050;">
                      비밀번호가 동일하지 않습니다.
                    </div>
                </div>

                <div>
                    <div>이메일</div>
                    <input name="email" v-model="member.email" type="text" placeholder="이메일 입력" >
                </div>

                <div>
                    <div>휴대폰</div>
                    <input name="phone" v-model="member.phone" type="text" placeholder="010-1234-5678">
                </div>

                <div>
                    <div class="info-address">주소</div>
                    <input v-model="member.address1" type="text" placeholder="주소지 입력" style="margin-bottom:4px;">
                    <input v-model="member.address2" type="text" placeholder="상세 주소지 입력">
                </div>

                <button type="submit" id="btnSave" @click="btnSave">저장하기</button>
                <button type="submit" id="btnDelete" @click="btnDelete">회원 탈퇴</button>
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
import Swal from "sweetalert2";

export default {
  name: 'ModifyForm',
  setup() {
    const route = useRoute();
    const router = useRouter();

    const passwordValidFlag = ref(true);
    const passwordCheck = ref('');
    const passwordCheckFlag = ref(true);

    const passwordValid = () => {
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}$/.test(member.value.password)) {
        passwordValidFlag.value = true
      } else {
        passwordValidFlag.value = false
      }
    }

    const passwordCheckValid = () => {
      if (member.value.password === passwordCheck.value) {
        passwordCheckFlag.value = true
      } else {
        passwordCheckFlag.value = false
      }
    }

    const member = ref({
      password: '',
      email: '',
      phone: '',
      address1: '',
      address2:''
    });

    const btnSave = async() => {
      try {
        console.log(member.value);
        axios.defaults.headers.common['AUTHORIZATION'] = sessionStorage.getItem('token');
        const memberIdx = sessionStorage.getItem('memberIdx');

        const res = await axios.patch(`/members/modify/${memberIdx}`, {
          password: member.value.password,
          email: member.value.email,
          phone: member.value.phone,
          address1: member.value.address1,
          address2: member.value.address2
        });
        console.log(res.data);

        const Toast = Swal.mixin({
          toast: true,
          position: 'center-center',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: '회원 정보 수정 완료'
        })

        router.push({ name: 'MyPage'});

        } catch (error) {
            console.log(error);
        } 
    };

    const btnDelete = async() => {
      try {

        Swal.fire({
            title: '탈퇴를 진행하시겠습니까?',
            text: "탈퇴 후 일주일 이내 재가입이 불가능합니다.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '탈퇴',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {

              axios.defaults.headers.common['AUTHORIZATION'] = sessionStorage.getItem('token');
              const memberIdx = sessionStorage.getItem('memberIdx');
                const res = axios.patch(`/members/withdrawal/${memberIdx}`, {
                  status: 'DELETED'
              });

              Swal.fire(
                  '탈퇴가 완료되었습니다.',
                  '메타멍멍을 이용해 주셔서 감사합니다.',
                  'success'
              )
              
              sessionStorage.removeItem("token");
              sessionStorage.removeItem("memberId");
              window.location.href = "/";
            }
        })
        } catch (error) {
            console.log(error);
        } 
    };

    return {
      member,
      btnSave,
      btnDelete,
      passwordValid,
      passwordValidFlag,
      passwordCheck,
      passwordCheckValid,
      passwordCheckFlag,
    };
  }
}
</script>

<style scoped>
@import "@/assets/css/member/login.css";
</style>