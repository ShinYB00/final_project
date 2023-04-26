<template>
    <div class="services_section layout_padding">
        <div class="container">
            <OnMeetingHeader :showLocation="false"/>
            <hr>
            <CreateOnMeeting :status="status"/>
        </div>
    </div>
</template>

<script>
import CreateOnMeeting from '../../../../components/meeting/onMeeting/CreateOnMeeting.vue';
import OnMeetingHeader from '../../../../components/meeting/onMeeting/OnMeetingHeader.vue';
import {ref} from 'vue';

export default {
    components: {
        CreateOnMeeting,
        OnMeetingHeader
    },
    setup(){
        const status = ref('modify');

        return{
            status
        }
    }
}
</script>

<style>

</style>