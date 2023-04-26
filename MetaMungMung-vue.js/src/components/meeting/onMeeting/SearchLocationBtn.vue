<template>
    <div style="float: left">
        <button type="button" class="btnMySetting" 
            :class="{active: isActive}" aria-haspopup="true" :aria-expanded=isActive aria-controls="gnbProfileMenuPopup" @click="menuToggle">
                {{curLocation}}
        </button>
        <div class="menuModalLayer">
            <ul class="menuModalList">
                <li class="menuModalItem" @click="changeList">
                    <div class="menuModalText">{{selectCate}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {ref, watchEffect} from 'vue';

export default {
    mounted() {
        // api 스크립트 소스 불러오기 및 지도 출력
        if (window.kakao && window.kakao.maps) {
            this.loadMap();
        } else {
            this.loadScript();
        }
    },
    emits: ['send-location'],
    setup(props, {emit}){
        const isActive = ref(false);
        const selectCate = ref('모든 동네');
        const curLocation = ref('연지동');

        const menuToggle = () => {
            isActive.value = !isActive.value;
            console.log("보낸다 이거 " + curLocation.value);
            emit('send-location', curLocation.value);
        }

        const changeList = () => {
            let tmp = selectCate.value;
            selectCate.value = curLocation.value;
            curLocation.value = tmp;
            menuToggle();
        }

        // const locationSetting = () => {
        //     console.log(props.addr);
        //     curLocation.value = props.addr;
        //     // emit('send-location', curLocation.value);
        // }
        
        watchEffect(() => {
            emit('send-location', curLocation.value);
        });

        function loadScript() {
            const script = document.createElement('script')
            script.src =
                '//dapi.kakao.com/v2/maps/sdk.js?appkey=331e2b8989b90b725f0ab6a607cf49f9&autoload=false&libraries=services'
            script.onload = () => window.kakao.maps.load(this.loadMap)

            document.head.appendChild(script)
        }
        function loadMap() {
            let lat = 0;
            let lon = 0;

            geolocationFunc();

            function geolocationFunc () {
                if (navigator.geolocation) {
                    // GeoLocation을 이용해서 접속 위치를 얻어옴
                    navigator.geolocation.getCurrentPosition(function (position) {
                        lat = position.coords.latitude // 위도

                        lon = position.coords.longitude // 경도

                        const locPosition = new kakao.maps.LatLng(lat, lon)

                        // 주소 태그에 포함 + 주소 파악 되면 띄우기
                        searchAddrFromCoords(locPosition, function(result, status){
                            if (status === kakao.maps.services.Status.OK) {
                                for(var i = 0; i < result.length; i++) {
                                    // 행정동의 region_type 값은 'H' 이므로
                                    if (result[i].region_type === 'H') {
                                        // 동만 추출
                                        const strArr = result[i].address_name.split(' ');
                                        curLocation.value = strArr[strArr.length - 1];
                                        emit('send-location', curLocation.value);
                                        break;
                                    }
                                }
                            }
                        });
                    })
                } else {
                    var locPostion = new kakao.maps.LatLng(33.450701, 126.570667) 
                    var message = '현재위치를 찾을 수 없습니다.'
                }
            }
            // 주소-좌표 변환 객체를 생성합니다
            var geocoder = new kakao.maps.services.Geocoder();

            function searchAddrFromCoords(coords, callback) {
                // 좌표로 행정동 주소 정보를 요청합니다
                geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
            }

        } // loadMap() end
               

        return{
            isActive,
            selectCate,
            curLocation,
            menuToggle,
            changeList,
            loadScript,
            loadMap
        }
    }
}
</script>

<style scoped>
.btnMySetting {
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding-left: 9px;
    border-radius: 20px;
    color: #444;
    float: left;
    width: 95px;
    /* margin-bottom: 30px; */
    margin-top: 20px;
    margin-left: 20px;
}
.btnMySetting.active:after {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
}
.btnMySetting:after {
    width: 7px;
    height: 7px;
    -webkit-mask-image: url(@/assets/images/common/arrow.png);
    mask-image: url(@/assets/images/common/arrow.png);
    -webkit-mask-size: 7px 7px;
    mask-size: 7px 7px;
    background-color: #83879B;
    display: inline-block;
    margin-left: 9px;
    margin-right: 9px;
    margin-top: -3px;
    vertical-align: top;
    opacity: .55;
    content: '';
}
.btnMySetting.active~.menuModalLayer {
    display: block!important;
}
.menuModalLayer {
    margin-top: 46px;
    margin-left: 20px;
}
.menuModalLayer {
    display: none;
    position: absolute;
    /* min-width: 158px; */
    /* padding: 12px 0; */
    border-radius: 16px;
    background-color: #fff;
    -webkit-box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.15),0px 0px 2px 1px rgba(0, 0, 0, 0.02);
    box-shadow: 0px 4px 13px rgba(0, 0, 0, 0.15),0px 0px 2px 1px rgba(0, 0, 0, 0.02);
    z-index: 10;
    width: 95px;
}
.menuModalItem{
    padding-left: 3px;
    background-color: #F5F6F8;
    border-radius: 15px;
}
.menuModalText{
    width: 80px;
    margin-left: 10px;
}
</style>