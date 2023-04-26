<template>
    <div class="services_section layout_padding">
        <div class="container">
            
            <div class="membership-signup">
            <div style="text-align:center"><h1>회원가입</h1></div>

                <form 
                    @submit.prevent="signupForm">

                <div>
                <div><h3>회원 정보 입력</h3></div>

                <div>
                    <div>아이디</div>
                    <div id="form-id">
                    <input id="memberId" v-model="member.memberId" type="text" placeholder="아이디를 입력(6~20자)" required>
                    <button @click="idCheck">중복 확인</button>
                    </div>
                    <div>
                    <span v-if="message" class="text-danger">{{ message }}</span>
                    </div>
                </div>

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
                    <div>이름</div>
                    <input name="name" v-model="member.memberName" type="text" placeholder="이름 입력" required>
                </div>

                <div>
                    <div class="info">
                        <div class="sex">
                            <div>성별</div>
                            <input type="radio" v-model="member.sex" value="female" required> 여성
                            <input type="radio" v-model="member.sex" value="male" required> 남성
                        </div>
                        <div class="birth">
                            <div>생년월일</div>
                            <input type="date" v-model="member.birth" min="1950-01-01" max="2005-12-31" class="birth">
                        </div>
                    </div>
                </div>

                <div>
                    <div>이메일</div>
                    <input name="email" v-model="member.email" type="text" placeholder="이메일 입력" required>
                </div>

                <div>
                    <div>휴대폰</div>
                    <input name="phone" v-model="member.phone" type="text" placeholder="010-1234-5678" required>
                </div>

                <div>
                    <div class="info-address">주소</div>
                    <input name="address1" v-model="member.address1" type="text" placeholder="주소지 입력" style="margin-bottom:4px;" required>
                    <input name="address2" v-model="member.address2" type="text" placeholder="상세 주소지 입력" required>
                </div>

                <button type="submit" id="btnSignup" >가입하기</button>
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
  name: 'SignupForm',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const member = ref({
      memberId: '',
      password: '',
      memberName: '',
      sex:'',
      birth:'',
      email: '',
      phone: '',
      address1: '',
      address2:''
    });

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

    const signupForm = async() => {
      try {
        console.log(member.value);
        const res = await axios.post('/members/signup', {
          memberId: member.value.memberId,
          password: member.value.password,
          memberName: member.value.memberName,
          sex: member.value.sex,
          birth: member.value.birth,
          email: member.value.email,
          phone: member.value.phone,
          address1: member.value.address1,
          address2: member.value.address2
        })              
        
        Swal.fire({
            icon: 'success',
            title: '회원가입 완료',
            text:'반려견 등록은 로그인 후 진행해 주세요!'
        });
        
        setTimeout("location.href='Login'", 1000);

        } catch (error) {
            console.log(error.message);
            console.log(member.value);
            alert("잘못된 입력입니다.");
        } 
    };

    const idCheck = async () => {
        try {
            const res = await axios.post('/members/idCheck', { 
              memberId: member.value.memberId 
            });

            if (res.data === 0) {
                alert("사용 가능한 아이디입니다.");
            } else {
                alert("이미 존재하는 아이디입니다.");
                member.value.memberId = '';
                console.log(res.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return {
      member,
      signupForm,
      idCheck,
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