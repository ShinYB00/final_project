<template>
    <div class="topInputSearch _searchBox">
        <label class="gSrOnly">모임 검색</label>
        <input @keyup="enterkey" :type="text" id="input_search_view62" class="inputBandSearch _gnbInputSearch" role="search" title="모임 검색" placeholder="모임 검색" autocomplete="off" v-model="searchKeyword">

        <button type="submit" class="btnSearch" id="btn_search" @click="checkInputText"><span class="gSrOnly">검색</span></button>
    </div>
</template>

<script>
import {ref, watchEffect} from 'vue'
import {useRoute, useRouter} from 'vue-router'

export default {
    emits: ['send-type'],
    // props: {
    //     isMain: Boolean
    // },
    setup(props, {emit}) {
        const route = useRoute();
        const router = useRouter();
        const searchKeyword = ref('');
        // const isMain = ref(true);

        const init = () => {
            if(Array.isArray(route.query.keywords) && route.query.keywords[0] === ''){
                searchKeyword.value = '';
            } else if(route.query.keywords != null){
                searchKeyword.value = route.query.keywords;
            }
        }

        init();

        const checkInputText = () => {
            if(searchKeyword.value !== ''){
                emit('send-type', 'search');
                console.log("나와라" + searchKeyword.value);
                router.push({name: 'OnMeetingSearch', query: {keywords: searchKeyword.value}});
            }
            return false;
        }

        // watchEffect(() => {
        //     // isMain: props.isMain;
        //     if(props.isMain){
        //         console.log("메인화면이니" + props.isMain);
        //         searchKeyword.value = '';
        //     }
        //     else{
        //         searchKeyword.value = route.query.keywords;
        //     }

        // });

        const enterkey = () => {
            if (window.event.keyCode == 13) {
                checkInputText();
            }
        }

        return {
            searchKeyword,
            checkInputText,
            enterkey
        }
    }
}
</script>

<style scoped>
.topInputSearch {
    position: relative;
    -webkit-box-flex: 0;
    flex: 0 0 auto;
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    width: 420px;
    height: 28px;
    margin-top: -2px;
    margin-left: 9px;
    padding: 0 0 0 13px;
    border-radius: 14px;
    border: 1px solid rgba(0,0,0,.05);
    background-color: #F5F6F8;
    float: right;
    margin-top: 20px;
}
.gSrOnly {
    overflow: hidden!important;
    position: absolute!important;
    height: 1px!important;
    width: 1px!important;
    clip: rect(1px,1px,1px,1px)!important;
}
.topInputSearch .inputBandSearch {
    -webkit-box-flex: 0;
    flex: 0 1 auto;
    width: 100%;
    height: 100%;
    border: 0;
    font-size: 12px;
    color: #222;
    background-color: transparent;
}
input, textarea {
    color: #444;
    border-radius: 0;
}
button {
    border: 0;
    background-color: transparent;
    border-radius: 0;
    cursor: pointer;
}
.topInputSearch .btnSearch {
    -webkit-box-flex: 0;
    flex: 0 0 auto;
    width: 36px;
    height: 100%;
}
.topInputSearch .btnSearch:before {
    width: 24px;
    height: 24px;
    -webkit-mask-image: url(@/assets/images/common/search-icon.png);
    mask-image: url(@/assets/images/common/search-icon.png);
    -webkit-mask-size: 24px 24px;
    mask-size: 24px 24px;
    background-color: #222;
    display: inline-block;
    vertical-align: top;
    margin-top: 3px;
    margin-left: -3px;
    width: 17px;
    height: 17px;
    -webkit-mask-size: 17px 17px;
    mask-size: 17px 17px;
    content: '';
}

</style>