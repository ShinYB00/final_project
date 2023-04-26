<template>
    <div class="group-card">
        <img :src="onMeeting.thumbnail" alt="Group cover photo">
        <img src="@/assets/images/offMeeting/paw-print.png" style="width: 70px"/>
        <h2>{{ onMeeting.onMeetName }}</h2>
        <div class="group-stats">
            <p>게시글 {{ postCount }} 개</p>
            <p>멤버 {{ onMeeting.memberCnt }} / {{onMeeting.personnel}}</p>
        </div>
        <p class="group-description" v-html="onMeeting.introduction"></p>
        <button v-if="!isApply && !isFull" @click="joinGroup">가입 신청</button>
    </div>
</template>

<script>
import {ref, watchEffect} from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

export default {
    setup(){
        axios.defaults.headers.common['AUTHORIZATION'] = sessionStorage.getItem('token');
        const memberIdx = sessionStorage.getItem('memberIdx');
        
        const route = useRoute();
        const router = useRouter();
        const onMeeting = ref({}
          // {
          //   onMeetingIdx: 2, onMeetName: '말티쥬 모임 [말모]', category: '일상', introduction: 
          //   `말티쥬를 사랑하는 분들을 위한 모임입니다<br><Br>들어오셔서 함께 정보도 공유하고 이야기도 나누어요!<br><br><br>-말티쥬를 사랑하는 사람들의 모임-`, 
          //   thumbnail: 'https://file3.instiz.net/data/cached_img/upload/2019/05/18/12/1110b3ff0bf4bd7b13a55c787e6c7483.jpg', isPublic: '1', 
          //   onMeetingAddr: '가락동', memberCnt: 1716, hostName: '부 끄', maximum: 5000
          // }
        );
        const myOnMeetings = ref({});
        const postCount = ref(406);
        // const memberCount = ref(0);
        const isApply = ref(false);
        const isFull = ref(false);

        const getOnMeetingDetail = async () => {
          try{
            const res = await axios.get('/onMeetings/' + route.params.id);
            console.log(res.data);
            onMeeting.value = {...res.data};
            console.log(onMeeting.value);
          } catch(err){
            console.log(err);
          }
        }

        getOnMeetingDetail();
        
        watchEffect(() => {
            if(onMeeting.personnel <= onMeeting.memberCnt){
                isFull.value = true;
            }
        });

        
        const joinGroup = () => {
            isApply.value = !isApply.value;
            try{
              setTimeout(async () => {
                const res = await axios.post('/onMeetings/' + route.params.id + '/join');
                console.log(res.data);
                onMeeting.value = {...res.data};
                console.log(onMeeting.value);
                router.push({
                  name: "RegisterModal",
                  params: {id: route.params.id}
                })
              }, 3000);

            } catch(err){
              console.log(err);
            }
        }

        return{
            onMeeting,
            myOnMeetings,
            postCount,
            isApply,
            isFull,
            joinGroup
        }
    }
}
</script>

<style scoped>
.group-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px;
}

.group-card img {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  margin-bottom: 30px;
}

.group-card h2 {
  font-size: 30px;
  margin-bottom: 10px;
  font-weight: 900;
}

.group-stats {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 30px;
}

.group-stats p {
  font-size: 16px;
  font-weight: bold;
}

.group-description {
  font-size: 18px;
  margin-bottom: 50px;
  text-align: center;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #89cbeb;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0062cc;
}

button.cancel{
    background-color: #eb8989;
}

button.cancel:hover{
    background-color: #cc0000;
}
</style>
