<template>
    <div class="services_section layout_padding">
        <div class="container">
            <OnMeetingHeader @send-type="sendType" :isMain="isMain" :showLocation="true" @send-location="sendLocation"/>
            <hr>
            <OnMeetingCategory v-if="isSearch" :key="categoryKey" @select-cate="selectCate"/>
            <hr>
            <OnMeetingList @send-type="sendType" :isMain="isMain" :isSearch="isSearch" :addr="addr" :cate="cate"/>
        </div>
    </div>
</template>

<script>
import {ref, watchEffect} from 'vue';
import {useRoute} from 'vue-router';
import MyOnMeetingList from '../../../../components/meeting/onMeeting/MyOnMeetingList.vue'
import OnMeetingList from '../../../../components/meeting/onMeeting/OnMeetingList.vue'
import OnMeetingCategory from '../../../../components/meeting/onMeeting/OnMeetingCategory.vue';
import OnMeetingHeader from '../../../../components/meeting/onMeeting/OnMeetingHeader.vue';

export default {
    components: {
        MyOnMeetingList,
        OnMeetingList,
        OnMeetingCategory,
        OnMeetingHeader
    },
    setup(){
        const route = useRoute();
        const isMain = ref(true);
        const isSearch = ref(false);
        const categoryKey = ref(0);
        const addr = ref('');
        const cate = ref('전체');

        watchEffect(() => {
            if(route.query.keywords != null){
                isMain.value = false;
                isSearch.value = true;
            }
        });

        const sendType = (type) => {
            console.log("부모가 받았어!");
            console.log(type);
            if(type === 'viewAll'){
                isMain.value = false;
                isSearch.value = false;
            } else if(type === 'search'){
                isMain.value = false;
                isSearch.value = true;
            }
            forceRender();
        }

        const forceRender = () => {
            categoryKey.value += 1;
        }

        const selectCate = (category) => {
            cate.value = category;
        }

        const sendLocation = (location) => {
            console.log("search하는 주소 : " + location);
            addr.value = location;
        }

        return{
            isMain,
            isSearch,
            categoryKey,
            cate,
            addr,
            sendType,
            forceRender,
            selectCate,
            sendLocation
        }
    }
}
</script>

<style>

</style>