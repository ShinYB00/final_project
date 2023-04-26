<template>
    <div data-viewname="DGlobalSearchBandSubTabNavView" class="bandListWrap">
        <div class="wide -w840">
            <div class="searchedSortBand">

                <a href="" class="sortButton _btnTabNav active" data-id="1" :class="{active: isActive}" @click.prevent="cateToggle(0)">전체</a>

                <a href="" class="sortButton _btnTabNav " data-id="2" :class="{active: isActive}" @click.prevent="cateToggle(1)">소형견</a>

                <a href="" class="sortButton _btnTabNav " data-id="3" :class="{active: isActive}" @click.prevent="cateToggle(2)">중형견</a>

                <a href="" class="sortButton _btnTabNav " data-id="4" :class="{active: isActive}" @click.prevent="cateToggle(3)">대형견</a>

                <a href="" class="sortButton _btnTabNav " data-id="5" :class="{active: isActive}" @click.prevent="cateToggle(4)">일상</a>

                <a href="" class="sortButton _btnTabNav " data-id="6" :class="{active: isActive}" @click.prevent="cateToggle(5)">취미</a>

                <a href="" class="sortButton _btnTabNav " data-id="7" :class="{active: isActive}" @click.prevent="cateToggle(6)">정보</a>

            </div>
        </div>
    </div>
</template>

<script>
import {ref, watchEffect} from 'vue';
import {useRoute, useRouter} from 'vue-router';

export default {
    props:{
        isViewAll: Boolean
    },
    emits: ['select-cate'],
    setup(props, {emit}){
        const route = useRoute();
        const router = useRouter();
        const isActive = ref(false);
        let prevIdx = 0;

        // const getCate = () => {
        //     for(let item in document.getElementsByClassName("searchedSortBand")){
        //         console.log(item);
        //     }
        // }

        // getCate();

        const cateToggle = (idx) => {
            const parent = document.getElementsByClassName("searchedSortBand")[0];
            if(idx != prevIdx){
                parent.children[prevIdx].classList.remove('active');
                const selectElem = parent.children[idx];
                selectElem.classList.add('active');
                prevIdx = idx;

                // if(props.isViewAll){
                //     viewCate(selectElem.innerText);
                // }
                // else{
                //     viewSearchResult(selectElem.innerText);
                // }
                emit('select-cate', selectElem.innerText);
            }
        }

        // const viewCate = (cate) => {
        //     if(cate === '전체'){
        //         router.push({
        //             name: 'OnMeeting'
        //         });
        //     }
        //     else{
        //         router.push({
        //             name: 'OnMeetingSearch',
        //             query: {
        //                 category: cate
        //             }
        //         });
        //     }
        // }

        const viewSearchResult = (cate) => {
            // let searchKeyword = '';
            // if(Array.isArray(route.query.keywords)){
            //     searchKeyword = route.query.keywords[0];
            // } else if(route.query){
            //     searchKeyword = route.query.keywords;
            // }

            // if(cate === '전체'){
            //     router.push({
            //         name: 'OnMeetingSearch',
            //         query: {
            //             keywords: searchKeyword
            //         }
            //     });
            // } 
            // else if(cate === searchKeyword){
            //     router.push({
            //         name: 'OnMeetingSearch',
            //         query: {
            //             keywords: searchKeyword
            //         }
            //     });
            // }
            // else{
            //     router.push({
            //         name: 'OnMeetingSearch',
            //         query: {
            //             keywords: [
            //                 searchKeyword,
            //                 cate
            //             ]
            //         }
            //     });
            // }
            emit('select-cate', cate);
        }

        return {
            isActive,
            cateToggle
        }
    }
}
</script>

<style scoped>
.bandListWrap {
    position: relative;
    text-align: center;
}
.wide.-w840 {
    width: 840px;
}
.wide {
    width: 1034px;
    /* margin: 0 auto; */
}
.-w840 {
    width: 840px!important;
}
.searchedSortBand {
    text-align: left;
    padding: 16px 0 14px;
}
.searchedSortBand .sortButton.active {
    font-size: 13px;
    font-weight: 600;
    color: #444;
    background: #e9eaea;
}
.searchedSortBand .sortButton {
    display: inline-block;
    border-radius: 14px;
    padding: 0 20px 0 20px;
    height: 28px;
    line-height: 28px;
    font-size: 13px;
    font-weight: 400;
    color: #888;
}
</style>