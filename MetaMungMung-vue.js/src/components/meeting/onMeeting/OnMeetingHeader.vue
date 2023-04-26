<template>
    <div class="pageHeader">
        <router-link :to="{name: 'OnMeeting'}" @click="moveToPage">
            <div class="pageTitle">
                모임
                <img src="@/assets/images/offMeeting/paw-print.png" style="width: 70px"/>
            </div>
        </router-link>
        <SearchLocationBtn :addr="addr" v-if="showLoc" @send-location="sendLocation"/>
        <OnMeetingSearchBar @send-type="sendType" :isMain="isMain"/>
    </div>
</template>

<script>
import SearchLocationBtn from './SearchLocationBtn.vue'
import OnMeetingSearchBar from './OnMeetingSearchBar.vue'
import {useRouter} from 'vue-router'
import {ref, watchEffect} from 'vue';


export default {
    props: {
        isMain: Boolean,
        showLocation: Boolean
    },
    components: {
        SearchLocationBtn,
        OnMeetingSearchBar
    },
    setup(props, {emit}){
        const router = useRouter();

        const showLoc = ref(true);

        watchEffect(() => {
            if(!props.showLocation){
                showLoc.value = false;
            } else{
                showLoc.value = true;
            }
        });

        const sendLocation = (location) => {
            emit('send-location', location);
        }

        const sendType = () => {
            emit('send-type', 'search');
        }

        const moveToPage = () => {
            emit('send-type');
        }

        return{
            showLoc,
            sendLocation,
            sendType,
            moveToPage,
            
        }
    }
}
</script>

<style scoped>
.pageTitle{
    /* font-weight: 900; */
    font-size: 40px;
    margin: 0;
    float: left;
    color: #addaed;
    font-weight: 600;
}
.pageHeader {
    position: relative;
    /* display: -webkit-box; */
    /* display: flex; */
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    max-width: 1034px;
    height: 70px;
    margin: 0 0 35px 0;
}
</style>