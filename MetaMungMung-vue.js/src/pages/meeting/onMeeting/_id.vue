<template>
  <div class="services_section layout_padding">
      <div class="container">
        <BoardList v-if="isPublic"/>
        <JoinOnMeeting v-if="!isPublic"/>
      </div>
    </div>
</template>

<script>
import BoardList from '@/components/meeting/onMeeting/board/boardList.vue';
import JoinOnMeeting from '../../../components/meeting/onMeeting/JoinOnMeeting.vue';
import {ref, watchEffect} from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  components: {
    BoardList,
    JoinOnMeeting
  },
  setup(){
    axios.defaults.headers.common['AUTHORIZATION'] = sessionStorage.getItem('token');
    const memberIdx = sessionStorage.getItem('memberIdx');

    const route = useRoute();
    const isPublic = ref(false);

    const judgment = async () => {
      try{
          const res = await axios.get('/onMeetings');
          // myOnMeetings.value = {...res.data.myList};
          let onMeetings = res.data.recommendList;
          let myOnMeetings = res.data.myList;
          for(let i = 0; i < Object.keys(myOnMeetings).length; i++){
            onMeetings.push(myOnMeetings[i]);
          }
          console.log(onMeetings);
          for(let i = 0; i < Object.keys(onMeetings).length; i++){
            console.log("meet.onMeetingIdx : "+ onMeetings[i].onMeetingIdx);
            console.log("route.params.id: "+ route.params.id);
            // if(route.params.id == onMeetings[i].onMeetingIdx){
            //   if(onMeetings[i].isPublic === "1")
            //     isPublic.value = true;
            //   else
            //     isPublic.value = false;
            //   console.log("공개여부" + onMeetings[i].isPublic);
            //   break;
            // }
          }
      } catch(err){
          console.log(err);
      }
    }
    judgment();


    return{
      isPublic
    }
  }
}
</script>

<style>

</style>