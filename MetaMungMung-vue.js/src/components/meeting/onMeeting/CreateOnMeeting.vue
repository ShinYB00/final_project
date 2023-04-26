<template>
    <main id="content" data-uiselector="regionContent" role="main">
        <section data-viewname="DGroupBandCreateView" class="bandMake">
            <h2 class="gSrOnly">
                모임 
                <span v-if="status === 'modify'">수정</span>
                <span v-else>생성</span>
            </h2>
            <form class="_form" @submit.prevent="registerOnMeeting">
                <fieldset>
                    <div class="makeCover">
                        <label class="title" for="ex_name">모임 이름(최대 10자)</label>
                        <div class="uInput -simpleLine inputBand">
                            <input v-model="name" type="text" class="_inputBandName" id="ex_name" maxlength="10" placeholder="모임 이름을 입력하세요" required>
                        </div>

                        <AddAddressModal v-if="isOpen" @close-req="toggleMap" @send-addr="sendAddr" />

                        <div class="coverSelect">
                            <div class="mainCover">
                                <span class="cover">
                    
                                    <img :data-cover="coverImg" :src="coverImg" class="_selectedCover coverImg" width="300" height="225" alt="">
                    
                                </span>
                            </div>

                            <select id="cateSelect" v-model="category" required>
                                <option value="">카테고리 선택</option>
                                <option value="소형견">소형견</option>
                                <option value="중형견">중형견</option>
                                <option value="대형견">대형견</option>
                                <option value="일상">일상</option>
                                <option value="취미">취미</option>
                                <option value="정보">정보</option>
                            </select>

                            <div class="makeType">
                                <h2 class="title">모임 공개</h2>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="scope" id="flexRadioDefault1" value="0" v-model="isPublic">
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        비공개
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="scope" id="flexRadioDefault2" value="1" v-model="isPublic">
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        공개
                                    </label>
                                </div>
                            </div>
                            <div class="coverList">
                                <h3 class="title">커버사진(최대 30MB)</h3>
                                <p class="err">{{imgMessage}}</p>
                                <ul class="list">
                                    <li>
                                        <span class="changeCover _coverImageUploader js-fileapi-wrapper">
                                            <label for="addPhoto" class="labelAddPhoto">사진 추가</label>
                                            <input type="file" class="imageUpload" id="addPhoto" accept="image/*" name="attachment" @change="upload">
                                        </span>
                                    </li>
                    
                        
                                    <li v-for="image in images" :key="image.id" class="_coverSet_0" style="">
                                        
                                        <button type="button" :data-cover="image.src" aria-selected="false" class="_defaultCovers cover " @click="selectImg(image.id)">
                                            <img class="coverImg" id="coverImg" :src="image.src" width="120" height="90" alt="">
                                            <span class="mask"></span>
                                        </button>
                                        
                                    </li>

                    
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h3 class="title" style="margin-top: 20px;padding-bottom:0">모임 소개글</h3>
                            <div class="uTextarea">
                                <textarea class="_introDescription" id="bandIntroduce" cols="30" rows="10" maxlength="500" placeholder="모임 소개글을 입력하세요." style="height:100%" v-model="introduction"></textarea>
                                <span class="border"></span>
                            </div>
                        </div>

                        <div class="introOption _locationButtonWrapper" style="display: flex;">
                            <div class="introOptionBox">
                                <div class="addressText">
                                    <button type="button" class="textButton _btnSelectLocation" @click="toggleMap">{{address}}</button>
                                </div>
                            </div>
                        </div>
            
            
                        <div class="btnFooter">
                            <button type="button" class="_btnCancel uButton -sizeXL -cancel" @click="cancel">취소</button>
                            <button type="submit" class="_btnConfirm uButton -sizeXL -disabled" >완료</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </section>
    </main>
</template>

<script>
import AddAddressModal from './modal/AddAddressModal.vue';
import {ref, reactive, watchEffect} from 'vue';
import axios from 'axios';
import {useRoute, useRouter} from 'vue-router';

export default {
    components:{
        AddAddressModal
    },
    props:{
        status: String
    },
    // emits: ['toggle-modal'],
    setup(props, {emit}){
        const route = useRoute();
        const router = useRouter();
        const status = ref('');
        const name = ref('');
        const introduction = ref('');
        const coverImg = ref(require(`@/assets/images/onMeeting/cream.jpg`));
        const images = reactive([{
            id: 1,
            src: require(`@/assets/images/onMeeting/cream.jpg`)
        },
        {
            id: 2,
            src: require(`@/assets/images/onMeeting/maru.jpg`)
        },
        {
            id: 3,
            src: require(`@/assets/images/onMeeting/ocho.jpg`)
        },
        {
            id: 4,
            src: require(`@/assets/images/onMeeting/babpul.jpg`)
        }]);
        let imgValidation = true;
        const imgMessage = ref('');
        const isOpen = ref(false);
        const address = ref('주소를 등록해주세요.');
        const category = ref('');
        const isPublic = ref('1');
        let description = '';
        const meetingInfo = ref({});

        watchEffect(() => {
            status.value = props.status;

            if(status.value === 'modify'){
                name.value = meetingInfo.value.onMeetName;
                introduction.value = description.replace(/<br>/g, '\n');
                console.log(introduction.value);

                coverImg.value = meetingInfo.value.thumbnail;
                address.value = meetingInfo.value.onMeetingAddr === null ? '주소를 등록해주세요.' : meetingInfo.value.onMeetingAddr;
                category.value = meetingInfo.value.category;
                isPublic.value = meetingInfo.value.isPublic;
            }
        });

        const upload = (e) => {
            const file = e.target.files[0];
            if(file.size > 1024 * 1024 * 30){
                imgMessage.value = '파일 용량은 30MB 이하만 가능합니다.';
                imgValidation = false;
            }
            if(imgValidation){
                let url = URL.createObjectURL(file);
                coverImg.value = url;
            }
        }

        const selectImg = (id) => {
            coverImg.value = images[id - 1].src;
        }

        const toggleMap = () => {
            isOpen.value = !isOpen.value;
            // emit('toggle-modal', isOpen.value);
        }

        // const closeModal = () => {
        //     isOpen.value = !isOpen.value;
        //     // emit('toggle-modal', isOpen.value);
        // }

        const sendAddr = (addr) => {
            address.value = addr;
        }

        // const check = async () => {
        //     introduction.value = introduction.value.split('\n').join('<br>');
        //     meetingInfo.value = {
        //         onMeetName: name.value,
        //         category: category.value,
        //         introduction: introduction.value,
        //         thumbnail: coverImg.value,
        //         isPublic: isPublic.value,
        //         onMeetingAddr: address.value
        //     };
        // }

        const cancel = () => {
            router.go(-1);
        }

        // 온미팅 생성
        const registerOnMeeting = async () => {
            const myIdx = Number(sessionStorage.getItem("memberIdx"));
            console.log(`MEMBERIDX::::: ${myIdx}`);

            introduction.value = introduction.value.split('\n').join('<br>');
            meetingInfo.value = {
                onMeetName: name.value,
                category: category.value,
                introduction: introduction.value,
                thumbnail: coverImg.value,
                isPublic: isPublic.value,
                onMeetingAddr: address.value === '주소를 등록해주세요.' ? '' : address.value
            };
            // 수정
            if(status.value === 'modify'){
                console.log("수정하세요");
                try{
                    const res = await axios.put('/onMeetings/' + route.params.id, meetingInfo.value);
                    console.log("수정된 온모임 : " + res.data);
                    router.push({
                        name: "OnMeeting"
                    });
                } catch(err){
                    console.log(err);
                }
            }
            // 생성
            else{
                console.log("생성하세요");
                try{
                    console.log(meetingInfo.value);
                    const res = await axios.post('/onMeetings', meetingInfo.value);

                    router.push({
                        name: "OnMeeting"
                    });

                     axios.post(`/onMeetings/${res.data.onMeetingIdx}/board`,
                        {
                            onMeetingIdx: res.data.onMeetingIdx,
                            boardContents: "환영합니다!! 게시물을 올려보세요!",
                            boardWriter: res.data.hostName,
                            memberIdx: myIdx,
                            onMeetingBoardAddr: "주소를 등록해주세요."
                        }
                        )
                        .then((response) => {
                            console.log("입력됐나요~~~")
                        })
                        .catch((error) => {
                            console.log("게시 에러 입니다.")
                        })
                } catch(err){
                    console.log(err);
                }
            }
            // router.push({
            //     name: "OnMeeting"
            // });
        }

        const getMyOnMeetingInfo = async () => {
            if(status.value === 'modify'){
                try{
                    axios.defaults.headers.common['AUTHORIZATION'] = sessionStorage.getItem('token');
                    const memberIdx = sessionStorage.getItem('memberIdx');

                    const res = await axios.get('/onMeetings/' + route.params.id);
                    meetingInfo.value = {...res.data};
                    description = meetingInfo.value.introduction;
                    console.log(meetingInfo.value );
                } catch(err){
                    console.log(err);
                }
            }
        }
        getMyOnMeetingInfo();

        return{
            status,
            name,
            introduction,
            coverImg,
            images,
            imgMessage,
            isOpen,
            address,
            category,
            isPublic,
            meetingInfo,
            upload,
            selectImg,
            toggleMap,
            // openMap,
            // closeModal,
            sendAddr,
            // check,
            cancel,
            registerOnMeeting
        }
    }
}
</script>

<style scoped>
#cateSelect{
    position: absolute;
    left: 55%;
    width: 20%; /* 원하는 너비설정 */
    padding: .3em .5em; /* 여백으로 높이 설정 */
    font-family: inherit;  /* 폰트 상속 */
    background: url(https://farm1.staticflickr.com/379/19928272501_4ef877c265_t.jpg) no-repeat 95% 50%; /* 네이티브 화살표 대체 */  
    border: 1px solid #999; 
    border-radius: 0px; /* iOS 둥근모서리 제거 */
    -webkit-appearance: none; /* 네이티브 외형 감추기 */
    -moz-appearance: none;
    appearance: none;
}
/* IE 10, 11의 네이티브 화살표 숨기기 */
select::-ms-expand { 
  display: none;
}
.err{
    color: red;
    display: inline;
    margin-left: 20px;
}
/* 이미지 크기 맞추기 */
._selectedCover{
    width: 300px;
    height: 225px;
    object-fit: cover;
}
input[type='radio']{
    margin-left: -19px;
}
.gSrOnly{
    font-weight: 900;
    font-size: 40px;
    margin: 0;
    color: black;
    margin-bottom: 30px;
}
#content {
    width: 100%;
    margin-left: 0;
    -webkit-box-flex: 1;
    flex: 1 1 auto;
    padding-bottom: 20px;
}
.bandMake {
    /* max-width: 840px; */
    margin: 0 auto;
    padding-top: 58px;
}
fieldset {
    border: 0;
}
button, dd, dl, dt, fieldset, ol, p, ul {
    margin: 0;
    padding: 0;
}
legend {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
}
.bandMake .makeCover {
    position: relative;
}
.bandMake .makeCover .title {
    display: block;
    margin-bottom: 11px;
    font-weight: 600;
    display: inline-block;
}
.bandMake .title {
    font-size: 14px;
    font-weight: 400;
    color: #444;
}
.bandMake .makeCover .inputBand {
    display: block;
    height: 54px;
    padding: 0;
}
.bandMake .inputBand {
    display: block;
    height: 54px;
    padding: 0;
    margin-top: -7px;
}
.uInput.-simpleLine {
    padding: 0;
    background: 0 0;
}

.uInput {
    height: 36px;
    padding: 0 10px;
}
.uInput, .uInputComment, .uInputSearch, .uTextarea {
    position: relative;
    display: block;
    width: 100%;
    background: #fcfcfc;
    margin: 20px 0;
}
.bandMake .makeCover .inputBand input {
    line-height: 54px;
    border-bottom: 1px solid #ccc;
    font-size: 20px;
    font-weight: 400;
    color: #333;
}
.bandMake .inputBand input {
    line-height: 54px;
    border-bottom: 1px solid #ccc;
    font-size: 30px;
    font-weight: 400;
    color: #333;
}
.uInput>:not(.border), .uInputComment>:not(.border), .uInputSearch>:not(.border), .uTextarea>:not(.border) {
    z-index: 3;
}
textarea, .uInput input, .uInput textarea, .uInputComment input, .uInputComment textarea, .uInputSearch input, .uInputSearch textarea, .uTextarea input, .uTextarea textarea {
    position: relative;
    width: 100%;
    height: 100%;
    border: none;
    padding: 0;
    background: 0 0;
    font-size: 13px;
}
.uInput.-simpleLine .border, .uInput.-simpleLine:after {
    border-width: 0 0 1px 0;
}
.border, .uInput .border, .uInput:after, .uInputComment .border, .uInputComment:after, .uInputSearch .border, .uInputSearch:after, .uTextarea .border, .uTextarea:after {
    z-index: 2;
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border: 1px solid #ebebeb;
}
.uInput:after, .uInputComment:after, .uInputSearch:after, .uTextarea:after {
    z-index: 1!important;
    content: '';
}
.bandMake .makeCover .coverSelect {
    position: relative;
    margin-top: 30px;
    /* padding-left: 300px; */
}
.bandMake .makeCover .coverSelect .mainCover {
    position: absolute;
    left: 0;
    top: 0;
    width: 300px;
    height: 225px;
}
.bandMake .makeCover .coverSelect .mainCover .cover {
    display: block;
    position: relative;
    font-size: 0;
}
.bandMake .makeCover .coverSelect .mainCover .cover .coverImg {
    border-radius: 2px;
}
img {
    border-style: none;
}
.bandMake .makeCover .coverSelect .mainCover .cover:after {
    z-index: 10;
    position: absolute;
    display: block;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border: 1px solid rgba(0,0,0,.05);
    content: '';
}
.bandMake .makeCover .coverSelect .coverList {
    padding-top: 142px;
}
.bandMake .makeCover .coverSelect .coverList .list {
    margin-left: -10px;
    margin-top: 2px;
}
.bandMake .makeCover .coverSelect .coverList .list:after, .bandMake .makeCover .coverSelect .coverList .list:before {
    display: table;
    content: ' ';
}

.bandMake .makeCover .coverSelect .coverList .list li {
    float: left;
    margin-left: 10px;
}
.bandMake .makeCover .coverSelect .coverList .list li .changeCover {
    overflow: hidden;
    display: block;
    position: relative;
    width: 120px;
    height: 90px;
    padding-top: 21px;
    text-align: center;
    background-color: #ebebeb;
    border-radius: 2px;
}
.bandMake .makeCover .coverSelect .coverList .list li .changeCover:before {
    width: 30px;
    height: 30px;
    overflow: hidden;
    display: inline-block;
    background-repeat: no-repeat;
    content: '';
    background-image: url(@/assets/images/common/spr_icons_f.png);
    background-position: -32px -196px;
}
.bandMake .makeCover .coverSelect .coverList .list li .changeCover .labelAddPhoto {
    display: block;
    margin-top: 1px;
    font-size: 11px;
    font-weight: 400;
    color: #777;
}
.bandMake .makeCover .coverSelect .coverList .list li .changeCover .imageUpload {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    height: 100%;
    cursor: pointer;
    opacity: 0;
}
input, textarea {
    color: var(--tier2TextMainLv02);
    border-radius: 0;
}
.bandMake .makeCover .coverSelect .coverList .list li .cover {
    display: block;
    position: relative;
    width: 120px;
    height: 90px;
    font-size: 0;
    background-color: #ebebeb;
}
.bandMake .makeCover .coverSelect .coverList .list li .cover .coverImg {
    position: relative;
    border-radius: 1px;
}
.bandMake .makeCover .coverSelect .coverList .list li .cover .mask {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(46,204,113,.8);
    border-radius: 1px;
}
.bandMake .makeCover .coverSelect .coverList .list li .cover:after {
    z-index: 10;
    position: absolute;
    display: block;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border: 1px solid rgba(0,0,0,.05);
    content: '';
}
.bandMake .makeCover .coverSelect .coverList .list:after {
    clear: both;
}
.bandMake .makeCover .coverSelect .coverList .list:after, .bandMake .makeCover .coverSelect .coverList .list:before {
    display: table;
    content: ' ';
}
.bandMake .makeType {
    position: relative;
    margin-left: 88%;
    /* padding-left: 567px; */
}
.bandMake .makeType .title {
    margin-bottom: 19px;
    font-weight: 600;
}
.bandMake .title {
    font-size: 14px;
    font-weight: 400;
    color: #444;
}
.gBoxShadow {
    background-color: #fff;
    -webkit-box-shadow: 0 1.4px 1.3px 0 rgba(62,73,89,.07);
    box-shadow: 0 1.4px 1.3px 0 rgba(62,73,89,.07);
}
.uCheck {
    position: relative;
    display: inline-block;
    vertical-align: top;
}
.uCheck .checkInput {
    z-index: 10;
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    opacity: 0;
    cursor: pointer;
}
.uCheck.-checkbox .checkLabel {
    min-width: 20px;
    min-height: 20px;
}
.uCheck .checkLabel {
    position: relative;
    display: block;
    padding-left: 20px;
    cursor: pointer;
}
.uCheck.-checkbox .checkLabel .shape {
    width: 20px;
    height: 20px;
    margin-top: -10px;
}
.uCheck .checkLabel .shape {
    position: absolute;
    display: inline-block;
    left: 0;
    top: 50%;
}
.uCheck.-checkbox .checkLabel .shape:after, .uCheck.-checkbox .checkLabel .shape:before {
    width: 20px;
    height: 20px;
    overflow: hidden;
    display: inline-block;
    background-repeat: no-repeat;
    content: '';
    background-image: url(@/assets/images/common/spr_icons_f.png);
    background-position: -280px -159px;
}
.uCheck .checkLabel .shape:before {
    width: 100%;
    height: 100%;
}
.uCheck .checkLabel .shape:after, .uCheck .checkLabel .shape:before {
    display: block;
    -webkit-transition: all .2s ease;
    -o-transition: all .2s ease;
    transition: all .2s ease;
    content: '';
}
.uCheck.-checkbox .checkLabel .shape:after {
    left: 0;
    top: 0;
    opacity: 0;
    background-position: -280px -181px;
}
.uCheck.-checkbox .checkLabel .shape:after, .uCheck.-checkbox .checkLabel .shape:before {
    width: 20px;
    height: 20px;
    overflow: hidden;
    display: inline-block;
    background-repeat: no-repeat;
    content: '';
    background-image: url(@/assets/images/common/spr_icons_f.png);
    background-position: -280px -159px;
}
.uCheck .checkLabel .shape:after {
    position: absolute;
    border-radius: 50%;
    background-color: #2ecc71;
}
.uCheck .checkLabel .shape:after, .uCheck .checkLabel .shape:before {
    display: block;
    -webkit-transition: all .2s ease;
    -o-transition: all .2s ease;
    transition: all .2s ease;
    content: '';
}
.uCheck .checkLabel .text {
    overflow: hidden;
    display: inline-block;
    margin-left: 8px;
    vertical-align: middle;
    font-size: 14px;
    font-weight: 400;
    color: #333;
}
.bandMake .btnFooter {
    margin: 40px 0 58px;
    text-align: center;
}
.bandMake .btnFooter .-cancel {
    background: 0 0;
}
.bandMake .btnFooter button {
    margin: 0 3px;
}
.uButton.-cancel {
    border: 1px solid #ccc;
    background: #fff;
    color: #666;
}
.uButton.-sizeXL {
    min-width: 140px;
    height: 44px;
    padding: 0 30px;
    font-size: 14px;
    font-weight: 600;
}
button.uButton {
    line-height: 1;
}
.uButton.-disabled:not(.-text), .uButton[data-status=off]:not(.-text), .uButton[disabled]:not(.-text) {
    color: #F5F6F8!important;
    background: #addaed!important;
}
.bandMake .btnFooter button {
    margin: 0 3px;
}
.uButton {
    position: relative;
    min-width: 90px;
    height: 34px;
    padding: 0 15px;
    background: #474e60;
    border-radius: 1px;
    font-size: 13px;
    color: #fff;
    font-weight: 500;
    vertical-align: top;
    white-space: nowrap;
    cursor: pointer;
}
.cBandIntro .textareaBox .uTextarea {
    height: 100%;
    padding: 0;
    line-height: 18px;
}
.uTextarea {
    min-height: 52px;
    padding: 8px 10px;
}
.uInput, .uInputComment, .uInputSearch, .uTextarea {
    position: relative;
    display: block;
    width: 100%;
    background: #fcfcfc;
}
.textareaBox .uTextarea textarea {
    padding: 13px 15px;
}
.uInput textarea, .uInputComment textarea, .uInputSearch textarea, .uTextarea textarea {
    line-height: 20px;
}
.uInput input, .uInput textarea, .uInputComment input, .uInputComment textarea, .uInputSearch input, .uInputSearch textarea, .uTextarea input, .uTextarea textarea {
    position: relative;
    width: 100%;
    height: 100%;
    border: none;
    padding: 0;
    background: 0 0;
    font-size: 13px;
}
input, textarea {
    color: #444;
    border-radius: 0;
}
.introOption {
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    margin-top: 17px;
}
.introOption .introOptionBox {
    -webkit-box-flex: 1;
    flex: 1 1 auto;
    font-size: 14px;
    font-weight: 400;
    color: #222;
}
.introOption .introOptionBox {
    -webkit-box-flex: 1;
    flex: 1 1 auto;
    overflow: hidden;
    font-size: 13px;
    font-weight: 400;
    color: #333;
}
.introOption .addressText:before {
    width: 12px;
    height: 16px;
    overflow: hidden;
    display: inline-block;
    background-repeat: no-repeat;
    content: '';
    background-image: url(@/assets/images/common/spr_icons.png);
    background-position: -762px -444px;
    margin: 3px 10px 0 0;
    vertical-align: top;
}
.introOption .textButton {
    font-size: 14px;
    font-weight: 400;
    color: #888;
}
button {
    border: 0;
    background-color: transparent;
    border-radius: 0;
    cursor: pointer;
}

#coverImg {
    width: 120px;
    height: 90px;
    object-fit: cover;
}
</style>