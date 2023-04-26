// 모임 설정 페이지
<template>
    <div class="services_section layout_padding">
      <div class="container">
        <OnMeetingSetting v-if="!withDrawal" @member-withdrawal="memberWithdrawal"/>
        <OnMeetingMemWithdrawal v-else/>
      </div>
    </div>
</template>

<script>
import OnMeetingSetting from '@/components/meeting/onMeeting/OnMeetingSetting.vue';
import OnMeetingMemWithdrawal from '../../../../components/meeting/onMeeting/OnMeetingMemWithdrawal.vue';
import {ref} from 'vue';

export default {
    components: {
        OnMeetingSetting,
        OnMeetingMemWithdrawal
    },
    setup () {
      const withDrawal = ref(false);
      const memberWithdrawal = (isClick) => {
        withDrawal.value = isClick;
      }

      return{
        withDrawal,
        memberWithdrawal
      }
    }
}
</script>
