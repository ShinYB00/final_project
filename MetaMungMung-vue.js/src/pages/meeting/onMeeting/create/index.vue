<template>
    <div class="services_section layout_padding">
        <div class="container">
            <OnMeetingHeader :showLocation="false"/>
            <hr>
            <CreateOnMeeting/>
        </div>
    </div>
</template>

<script>
import CreateOnMeeting from '../../../../components/meeting/onMeeting/CreateOnMeeting.vue';
import OnMeetingHeader from '../../../../components/meeting/onMeeting/OnMeetingHeader.vue';

export default {
    components: {
        CreateOnMeeting,
        OnMeetingHeader
    },
    setup(){

    }
}
</script>

<style>

</style>