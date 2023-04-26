<template>
    <!-- 지도 모달 -->
    <div id="addrModal">
        <!-- Modal content -->
        <div class="modal-content slideDown">
            <div class="modal-header">
                <h2>주소 추가</h2>
                <span @click="closeModal" class="close" id="closeModal">&times;</span>
            </div>
            <div class="modal-body">
                <form action="" class="modal-form" id="addrForm">
                    <div class="form-row">
                        <input
                            type="text"
                            placeholder="주소를 입력해주세요." id="keyword"/>
                        <div class="topInputSearch _searchBox">
                            <button type="submit" class="btnSearch" id="btn_search" @click="checkInputText"></button>
                        </div>
                    </div>
                    <div class="form-row mapCustom">
                        <div class="map_wrap">
                            <div id="map">
                                <div class="hAddr">
                                    <span class="title">지도중심기준 행정동 주소정보</span>
                                    <span id="centerAddr"></span>
                                </div>
                            </div>

                            <div id="menu_wrap" class="bg_white">
                                <hr>
                                <ul id="placesList"></ul>
                                <div id="pagination"></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- 모임생성 모달 end -->
</template>

<script>
import {ref} from 'vue';

export default {
    mounted() {
        // api 스크립트 소스 불러오기 및 지도 출력
        if (window.kakao && window.kakao.maps) {
            this.loadMap()
        } else {
            this.loadScript()
        }

        // 현주
        // var infoWindow = document.getElementById("infowindow");
        // console.log(infoWindow != null);
        // if(infoWindow != null){
        //     document.getElementById("infowindow").addEventListener('click', (e) => {
        //         console.log(e.currentTarget.lastChild.getAttribute('data-addr'));
        //         const addr = e.currentTarget.lastChild.getAttribute('data-addr');
        //         emit('send-addr', addr);
        //         emit('close-req', false);
        //     });
        // }
        
    },
    emits: ['close-req', 'send-addr'],
    setup(props, {emit}){
        const addr = ref('');

        const closeModal = () => {
            // document.getElementById("menu_wrap").style.display = 'block';
            emit('close-req', false);
        }

        const addPosition = (name, event) => {
            console.log(name);
            emit('add-address', name);
        }



        //

        function loadScript () {
            const script = document.createElement('script')
            script.src =
                '//dapi.kakao.com/v2/maps/sdk.js?appkey=331e2b8989b90b725f0ab6a607cf49f9&autoload=false&libraries=services'
            script.onload = () => window.kakao.maps.load(this.loadMap)

            document.head.appendChild(script)
        }
        function loadMap () {
            const container = document.getElementById('map')
            const currentBtn = document.getElementById('current-location-btn');
            let lat = 0;
            let lon = 0;
            let locationAddress= '';

            const option = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 3
            }

            /* 지도 생성 코드 */
            const map = new kakao.maps.Map(container, option)
        

            // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
            var zoomControl = new kakao.maps.ZoomControl();
            map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

            geolocationFunc();

            // 지도에 마커와 인포윈도우를 표시하는 함수
            function displayMarker (locPosition, message) {
                // const marker = new kakao.maps.Marker({
                // map: map,
                // position: locPosition
                // })
                marker1.setPosition(locPosition);
                marker1.setMap(map);

                const iwContent = message // 인포윈도우에 표시할 내용
                const iwRemovaable = true
                // 인포 윈도우 생성
                // var infowindow = new kakao.maps.InfoWindow({
                // content: iwContent,
                // removavle: iwRemovaable
                // })

                infowindow.setContent(iwContent);
                infowindow.open(map, marker1)

                map.setCenter(locPosition)
            }

            function kangFunc() {
                if (navigator.geolocation) {
                    // GeoLocation을 이용해서 접속 위치를 얻어옴
                    navigator.geolocation.getCurrentPosition(function (position) {
                        lat = position.coords.latitude // 위도

                        lon = position.coords.longitude // 경도

                        const locPosition = new kakao.maps.LatLng(lat, lon)
                        return locPosition;
                    })
                } else {
                    var locPostion = new kakao.maps.LatLng(33.450701, 126.570667)
                    return locPostion;
                }
            }

            function geolocationFunc () {
                if (navigator.geolocation) {
                    // GeoLocation을 이용해서 접속 위치를 얻어옴
                    navigator.geolocation.getCurrentPosition(function (position) {
                        lat = position.coords.latitude // 위도

                        lon = position.coords.longitude // 경도

                        const locPosition = new kakao.maps.LatLng(lat, lon)

                        // 주소 태그에 포함 + 주소 파악 되면 띄우기(현주)
                        var address = '';
                        searchDetailAddrFromCoords(locPosition, function(result, status){
                            if (status === kakao.maps.services.Status.OK) {
                                address = !!result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;

                                // 주소 전달할 hidden div 추가(현주)
                                const message = '<div style="width:100%;padding:5px;cursor:pointer" id="infowindow" >이 위치를 추가' + '<div style="display:hidden" data-addr="' + address + '"></div>' + '</div>' // 인포윈도우에 표시될 내용

                                // 마커와 인포윈도우를 표시한다.
                                displayMarker(locPosition, message)
                            
                                // 인포윈도우에 클릭이벤트 추가
                                addinfoWindowClickEvt();
                            }
                        });
                    })
                } else {
                    var locPostion = new kakao.maps.LatLng(33.450701, 126.570667) 
                    var message = '현재위치를 찾을 수 없습니다.'

                    displayMarker(locPostion, message)
                }
            }

            // ** 클릭한 위치에 마커 표시하기 **
            // 주소-좌표 변환 객체를 생성합니다
            var geocoder = new kakao.maps.services.Geocoder();

            var marker1 = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
                infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다
            

            const locPosition = kangFunc();
            // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
            // searchAddrFromCoords(map.getCenter(), displayCenterInfo);

            // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
            kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
                searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                        // 도로명 주소 있으면 도로명 주소, 없으면 지번 주소 출력하도록 수정(현주)
                        var detailAddr = !!result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;
                        // detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';

                        // 인포윈도우 내용 수정(현주)
                        var content = '<div style="width:100%;padding:5px;cursor:pointer" id="infowindow">이 위치를 추가' + '<div class="bAddr" data-addr="' + detailAddr + '">' +
                                        detailAddr + 
                                    '</div></div>';

                        // 마커를 클릭한 위치에 표시합니다 
                        marker1.setPosition(mouseEvent.latLng);
                        marker1.setMap(map);

                        // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                        infowindow.setContent(content);
                        infowindow.open(map, marker1);
                        
                        // 지도의 중심좌표에 marker가 존재하도록 수정(현주)
                        map.setCenter(mouseEvent.latLng);
                    }   
                });
            });

            // // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
            // kakao.maps.event.addListener(map, 'idle', function() {
            //     searchAddrFromCoords(map.getCenter(), displayCenterInfo);
            // });

            function searchAddrFromCoords(coords, callback) {
                // 좌표로 행정동 주소 정보를 요청합니다
                geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
            }

            function searchDetailAddrFromCoords(coords, callback) {
                // 좌표로 법정동 상세 주소 정보를 요청합니다
                geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
            }

            // // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
            // function displayCenterInfo(result, status) {
            //     if (status === kakao.maps.services.Status.OK) {
            //         var infoDiv = document.getElementById('centerAddr');

            //         for(var i = 0; i < result.length; i++) {
            //             // 행정동의 region_type 값은 'H' 이므로
            //             if (result[i].region_type === 'H') {
            //                 infoDiv.innerHTML = result[i].address_name;
            //                 break;
            //             }
            //         }
            //     }    
            // }

            // 지도 위에 표시되고 있는 마커를 모두 제거합니다
            function removeMarker() {
                for ( var i = 0; i < markers.length; i++ ) {
                    markers[i].setMap(null);
                }
                markers = [];
            }

            //현주
            document.getElementById("menu_wrap").style.display = 'none';
            // 마커를 담을 배열입니다
            var markers = [];  
            // 장소 검색 객체 생성
            const ps = new kakao.maps.services.Places();

            document.getElementById("addrForm").addEventListener('submit', (e) => {
                e.preventDefault();
                document.getElementById("menu_wrap").style.display = 'block';
                searchPlaces();
            });

            // document.getElementById('menu_wrap').addEventListener('click', () => {
            //     document.getElementById("menu_wrap").style.display = 'block';
            // });
            //키워드 검색을 요청하는 함수
            function searchPlaces() {

                var keyword = document.getElementById('keyword').value;

                if (!keyword.replace(/^\s+|\s+$/g, '')) {
                    alert('키워드를 입력해주세요!');
                    document.getElementById('menu_wrap').style.display = 'none';
                    return false;
                }

                // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
                ps.keywordSearch( keyword, placesSearchCB, {
                    location: new kakao.maps.LatLng(lat, lon)
                }); 
            }
            // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
            function placesSearchCB(data, status, pagination) {

                if (status === kakao.maps.services.Status.OK) {
                    // 현재 위치 마커 삭제
                    marker1.setMap(null);
                    // 현재 위치 인포윈도우 닫기
                    infowindow.close();

                    // 정상적으로 검색이 완료됐으면
                    // 검색 목록과 마커를 표출합니다
                    displayPlaces(data);

                    // 페이지 번호를 표출합니다
                    displayPagination(pagination);

                } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

                    alert('검색 결과가 존재하지 않습니다.');
                    return;

                } else if (status === kakao.maps.services.Status.ERROR) {

                    alert('검색 결과 중 오류가 발생했습니다.');
                    return;

                }
            }
            // 검색 결과 목록과 마커를 표출하는 함수입니다
            function displayPlaces(places) {

                var listEl = document.getElementById('placesList'), 
                menuEl = document.getElementById('menu_wrap'),
                fragment = document.createDocumentFragment(), 
                bounds = new kakao.maps.LatLngBounds(), 
                listStr = '';

                // 검색 결과 목록에 추가된 항목들을 제거합니다
                removeAllChildNods(listEl);

                // 지도에 표시되고 있는 마커를 제거합니다
                removeMarker();

                for ( var i=0; i<places.length; i++ ) {

                    // 마커를 생성하고 지도에 표시합니다
                    var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                        marker = addMarker(placePosition, i), 
                        itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

                    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                    // LatLngBounds 객체에 좌표를 추가합니다
                    bounds.extend(placePosition);

                    // 마커와 검색결과 항목에 mouseover 했을때
                    // 해당 장소에 인포윈도우에 장소명을 표시합니다
                    // mouseout 했을 때는 인포윈도우를 닫습니다
                    (function(marker, title, placePosition) {
                        kakao.maps.event.addListener(marker, 'click', function() {
                            clear();

                            displayInfowindow(marker, title);
                            
                            // 지도의 중심좌표에 marker가 존재하도록
                            map.setCenter(placePosition);
                        });

                        // kakao.maps.event.addListener(marker, 'mouseout', function() {
                        //     infowindow.close();
                        // });

                        itemEl.onclick =  function () {
                            clear();
                            displayInfowindow(marker, title);

                            // 지도의 중심좌표에 marker가 존재하도록
                            map.setCenter(placePosition);
                        };

                        // itemEl.onmouseout =  function () {
                        //     infowindow.close();
                        // };
                    })(marker, places[i].place_name, new kakao.maps.LatLng(places[i].y, places[i].x));

                    fragment.appendChild(itemEl);
                    
                }

                // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
                listEl.appendChild(fragment);
                menuEl.scrollTop = 0;

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                map.setBounds(bounds);

                // 검색결과 첫번째 장소를 표시(인포윈도우가 최상단에 존재하도록 마지막에 추가)
                displayInfowindow(markers[0], places[0].place_name);
                map.setCenter(new kakao.maps.LatLng(places[0].y, places[0].x));
            }
            // 검색결과 항목을 Element로 반환하는 함수입니다
            function getListItem(index, places) {

                var el = document.createElement('li'),
                itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                            '<div class="info">' +
                            '   <h5>' + places.place_name + '</h5>';

                if (places.road_address_name) {
                    itemStr += '    <span>' + places.road_address_name + '</span>' +
                                '   <span class="jibun gray">' +  places.address_name  + '</span>';
                } else {
                    itemStr += '    <span>' +  places.address_name  + '</span>'; 
                }
                            
                itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                            '</div>' + '<hr>';           

                el.innerHTML = itemStr;
                el.className = 'item';

                return el;
            }
            // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
            function addMarker(position, idx, title) {
                var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
                    imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
                    imgOptions =  {
                        spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                        spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                        offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                    },
                    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                        marker1 = new kakao.maps.Marker({
                        position: position, // 마커의 위치
                        image: markerImage 
                    });

                marker1.setMap(map); // 지도 위에 마커를 표출합니다
                markers.push(marker1);  // 배열에 생성된 마커를 추가합니다

                return marker1;
            }
            // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
            function displayPagination(pagination) {
                var paginationEl = document.getElementById('pagination'),
                    fragment = document.createDocumentFragment(),
                    i; 

                // 기존에 추가된 페이지번호를 삭제합니다
                while (paginationEl.hasChildNodes()) {
                    paginationEl.removeChild (paginationEl.lastChild);
                }

                for (i=1; i<=pagination.last; i++) {
                    var el = document.createElement('a');
                    el.href = "#";
                    el.innerHTML = i;

                    if (i===pagination.current) {
                        el.className = 'on';
                    } else {
                        el.onclick = (function(i) {
                            return function() {
                                pagination.gotoPage(i);
                            }
                        })(i);
                    }

                    fragment.appendChild(el);
                }
                paginationEl.appendChild(fragment);
            }

            // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
            // 인포윈도우에 장소명을 표시합니다
            function displayInfowindow(marker, title) {

                var content = '<div style="width:100%;padding:5px;cursor:pointer">이 위치를 추가<div style="padding:5px;z-index:1;" data-addr="' + title + '">' + title + '</div></div>';

                infowindow.setContent(content);
                infowindow.open(map, marker);
            }

            // 검색결과 목록의 자식 Element를 제거하는 함수입니다
            function removeAllChildNods(el) {   
                while (el.hasChildNodes()) {
                    el.removeChild (el.lastChild);
                }
            }

            // 인포윈도우 클릭 이벤트
            function addinfoWindowClickEvt() {
                document.getElementById("infowindow").parentNode.parentNode.addEventListener('click', (e) => {
                    addr.value = e.currentTarget.lastChild.childNodes[0].lastChild.getAttribute('data-addr');
                    emit('send-addr', addr.value);
                    emit('close-req', false);
                    console.log(addr.value);
                });
            }
            
            // 마커, 인포윈도우 삭제
            function clear() {
                // 현재 위치 마커 삭제
                marker1.setMap(null);
                // 현재 위치 인포윈도우 닫기
                infowindow.close();
            }

        } // loadMap() end

        //

        return{
            closeModal,
            addPosition,
            loadScript,
            loadMap
        }
    }

}
</script>

<style scoped>
#addrModal{
    /* display: none; */
    /* position: absolute;
    z-index: 11;
    left: 28%;
    top: 23%;
    max-width: 100%;
    height: auto; */
    /* overflow: hidden; */
    transition: all 0.5s ease 0.06s;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.modal-content {
    background-color: #fff;
    /* margin: 15% auto; */
    padding: 1.2rem;
    max-width: 50%;
    min-width: 400px;
    /* visibility: hidden; */
    box-shadow: 2px 2px 10px 0px rgba(99, 106, 119, 0.6);
    border-radius: 5px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
#map{
    height: 390px;
}
.form-row input, .form-row select {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 50%;
    border: 1px solid hsl(0, 0%, 90%);
    padding: 0.4rem 0.4rem;
    max-width: 100%;
    background: white;
}
.topInputSearch{
    width: 10%;
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
    margin-left: 10px;
}
.mapCustom{
    padding: 0.4rem 0;
}

.map_wrap, .map_wrap * {margin:0;padding:0;font-family:'Malgun Gothic',dotum,'돋움',sans-serif;font-size:12px;}
.map_wrap a, .map_wrap a:hover, .map_wrap a:active{color:#000;text-decoration: none;}
.map_wrap {position:relative;width:100%;/*height:500px;*/}
#menu_wrap {
    display: none;
    position: absolute;
    top: 225px;
    left: 0;
    bottom: 0;
    height: 43%;
    width: 100%;
    /* margin: 10px 0 30px 10px; */
    padding: 5px;
    overflow-y: auto;
    background: rgba(255, 255, 255, 0.9);
    z-index: 1;
    font-size: 12px;
    border-radius: 10px;
}
.bg_white {background:#fff;}
#menu_wrap hr {display: block; height: 1px;border: 0; border-top: 2px solid #5F5F5F;margin:3px 0;}
#menu_wrap .option{text-align: center;}
#menu_wrap .option p {margin:10px 0;}  
#menu_wrap .option button {margin-left:5px;}
#placesList li {list-style: none;}
#placesList .item {position:relative;border-bottom:1px solid #888;overflow: hidden;cursor: pointer;min-height: 65px;}
#placesList .item span {display: block;margin-top:4px;}
#placesList .item h5, #placesList .item .info {text-overflow: ellipsis;overflow: hidden;white-space: nowrap;}
#placesList .item .info{padding:10px 0 10px 55px;}
#placesList .info .gray {color:#8a8a8a;}
#placesList .info .jibun {padding-left:26px;background:url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png) no-repeat;}
#placesList .info .tel {color:#009900;}
#placesList .item .markerbg {float:left;position:absolute;width:36px; height:37px;margin:10px 0 0 10px;background:url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png) no-repeat;}
#placesList .item .marker_1 {background-position: 0 -10px;}
#placesList .item .marker_2 {background-position: 0 -56px;}
#placesList .item .marker_3 {background-position: 0 -102px}
#placesList .item .marker_4 {background-position: 0 -148px;}
#placesList .item .marker_5 {background-position: 0 -194px;}
#placesList .item .marker_6 {background-position: 0 -240px;}
#placesList .item .marker_7 {background-position: 0 -286px;}
#placesList .item .marker_8 {background-position: 0 -332px;}
#placesList .item .marker_9 {background-position: 0 -378px;}
#placesList .item .marker_10 {background-position: 0 -423px;}
#placesList .item .marker_11 {background-position: 0 -470px;}
#placesList .item .marker_12 {background-position: 0 -516px;}
#placesList .item .marker_13 {background-position: 0 -562px;}
#placesList .item .marker_14 {background-position: 0 -608px;}
#placesList .item .marker_15 {background-position: 0 -654px;}
#pagination {margin:10px auto;text-align: center;}
#pagination a {display:inline-block;margin-right:10px;}
#pagination .on {font-weight: bold; cursor: default;color:#777;}
</style>