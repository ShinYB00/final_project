<template>
  <!-- 모임상세 모달 start -->
  <div id="detailModal" class="detailModal">
    <!-- Modal content -->
    <div class="modal-content slideDown">
      <div class="modal-header">
        <span @click="closeDetailModalFunc" class="close" id="closeModal"
          >&times;</span
        >
        <h2 style="color: gray; font-weight: bolder">
          모임 상세<span
            style="
              margin-left: 10px;
              padding: 10px;
              font-size: 13px;
              font-weight: bold;
            "
            class="badge detailBadge"
            >( {{ headcount }} / {{ limit }} )</span
          >
        </h2>
      </div>
      <div class="modal-body">
        <div style="margin-bottom: 20px">
          <middle
            id="location"
            style="text-align: center"
            class="form-text text-muted box ivory"
            >👉🏻 모임 위치 : {{ locationAddress }} 👈🏻</middle
          >
        </div>
        <div class="form-group">
          <label for="title">🐶 제목</label>
          <input
            type="text"
            class="form-control inputText"
            id="title"
            aria-describedby="emailHelp"
            v-model="title"
            disabled
          />
        </div>

        <div class="form-group">
          <label for="host">🙋🏻 호스트</label>
          <input
            type="text"
            class="form-control inputText"
            id="host"
            aria-describedby="emailHelp"
            v-model="hostId"
            disabled
          />
        </div>

        <div class="form-group" style="display: none">
          <label for="location">위치</label>
          <input
            type="text"
            class="form-control inputText disabledLabel"
            id="location"
            v-model="locationAddress"
            disabled
          />
        </div>

        <div class="form-group">
          <label for="limit" style="margin-right: 10px">💁🏼‍♀️ 제한인원</label>
          <button
            v-if="myIdx != hostMemberIdx"
            @click="activeJoin"
            class="heart-button"
            id="likeBtn"
          >
            <div class="heart-flip"></div>
            <span>참여<span>완료</span></span>
          </button>
          <button
            @click="checkJoinMember"
            style="
              margin-left: 10px;
              padding: 10px;
              font-size: 13px;
              font-weight: bold;
            "
            class="badge"
          >
            참여자 확인! ✅
          </button>

          <input
            type="number"
            id="limit"
            v-model="limit"
            name="usernumber"
            class="form-control inputText"
            disabled
          />
        </div>

        <div class="form-group" style="display: none">
          <label for="">위도</label>
          <input type="text" v-model="latitude" disabled />
        </div>
        <div class="form-group" style="display: none">
          <label for="">경도</label>
          <input type="text" v-model="longitude" disabled />
        </div>

        <div class="form-group">
          <label for="date">📅 날짜</label>
          <input
            type="date"
            id="date"
            v-model="meetingDate"
            name="date"
            class="form-control inputText"
            disabled
          />
        </div>

        <div class="form-group">
          <label for="startTime">⏰ 시작시간</label>
          <input
            type="time"
            id="startTime"
            v-model="startTime"
            name="startTime"
            class="form-control inputText"
            disabled
          />
        </div>

        <div class="form-group">
          <label for="content">📝 내용</label>
          <textarea
            class="form-control inputText"
            id="content"
            rows="5"
            v-model="contents"
            disabled
          ></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button
          v-if="myIdx == hostMemberIdx"
          @click="modifyOffMeeting"
          class="btn modifyBtn"
        >
          수정
        </button>
        <button
          v-if="myIdx == hostMemberIdx"
          @click="deleteOffMeeting"
          class="btn deleteBtn"
        >
          삭제
        </button>
        <button
          v-if="myIdx != hostMemberIdx"
          @click="closeDetailModalFunc"
          class="btn cancelBtn"
        >
          닫기
        </button>
      </div>
    </div>
  </div>
  <!-- 모임생성 모달 end -->
  <JoinMemberModal
    :offMeetingIdx="offMeetingIdx"
    v-if="showModal"
    @close="showModal = false"
    ref="joinMemberModal"
  />
</template>

<script>
import JoinMemberModal from "@/components/meeting/offMeeting/modal/JoinMemberModal.vue";
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export default {
  name: "OffMeetingModal",
  props: ["selectedMarker", "boardDetails", "isOpen"],
  components: {
    JoinMemberModal,
  },
  emits: ["isOpen", "board"],
  setup(props, { emit }) {
    const myIdx = Number(sessionStorage.getItem("memberIdx"));
    let offMeetingIdx = ref(0);
    let title = ref("");
    let meetingDate = ref("");
    let limit = ref(0);
    let contents = ref("");
    let createDate = ref("");
    let updateDate = ref("");
    let status = ref("");
    let latitude = ref(0);
    let longitude = ref(0);
    let locationAddress = ref("");
    let startTime = ref("");
    let headcount = ref(0);
    let likeBtn = null;
    let joinMemberModal = ref(null);
    let router = useRouter();
    let board = ref({});
    let hostMemberIdx = ref(0);
    let hostId = ref("");
    let isOpen = ref(props.isOpen);
    let showModal = ref(false);
    let isJoin = ref(false);

    /* 모임 수정 모달 열기 */
    const modifyOffMeeting = () => {
      const modalId = document.getElementById("detailModal");
      modalId.style.display = "none";
      console.log("2. 자식 detailModal => " + isOpen.value);
      isOpen.value = true;
      emit("isOpen", isOpen.value);
      console.log("보낸다 ~~~ => " + isOpen.value);
      emit("board", board.value);
      console.log("board 보낸다~~~ => " + board.value);
    };

    /* 모임 참여자 확인 모달 열기 */
    const checkJoinMember = () => {
      showModal.value = true;
    };

    /* 참여 버튼 클릭 시 발생하는 이벤트 */
    const activeJoin = async () => {
      likeBtn = document.getElementsByClassName("heart-button")[0];
      likeBtn.classList.toggle("active");

      axios.defaults.headers.common["AUTHORIZATION"] =
        sessionStorage.getItem("token");

      axios
        .post(`/offMeetings/${offMeetingIdx.value}/join`, {
          offMeetingIdx: offMeetingIdx.value,
          onMeetingIdx: 14,
        })
        .then(function (response) {
          // console.log(response);
          console.log("등록됨");
          console.log(response);
          isJoin.value = true;
          // router.go();
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const modal = document.getElementsByClassName("detailModal");
    const clickable = document.querySelectorAll(".clickable");

    /* 오프 모임 상세 조회 모달 열기 이벤트 */
    const openDetailModalFunc = (selectedMarker) => {
      modal[0].style.display = "block";
      try {
        /* axios 비동기통신 */
        const getOffMeetingDetailPage = async () => {
          try {
            axios.defaults.headers.common["AUTHORIZATION"] =
              sessionStorage.getItem("token");
            const res = await axios.get(
              `/offMeetings/${selectedMarker.getTitle()}`
            );
            board.value = { ...res.data };
            console.log("board => " + JSON.stringify(board.value, null, 2));
            offMeetingIdx.value = board.value.offMeetingIdx;
            hostMemberIdx.value = board.value.host.memberIdx;
            hostId.value = board.value.host.memberId;
            console.log("호스트 idx : " + hostMemberIdx.value);
            console.log("호스트 아이디 : " + hostId.value);
            title.value = board.value.title;
            meetingDate.value = board.value.meetingDate.substring(0, 10);
            limit.value = board.value.limit;
            contents.value = board.value.contents;
            createDate.value = board.value.createDate;
            updateDate.value = board.value.updateDate;
            status.value = board.value.status;
            latitude.value = board.value.latitude;
            longitude.value = board.value.longitude;
            locationAddress.value = board.value.locationAddress;
            startTime.value = board.value.startTime;
            headcount.value = board.value.headcount;
          } catch (err) {
            console.log(err);
          }
        };
        getOffMeetingDetailPage();
      } catch (err) {
        console.log("err!!!!" + err);
      }
    };

    /* 오프 모임 삭제 */
    const deleteOffMeeting = async () => {
      Swal.fire({
        title: "정말 삭제하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: "삭제",
        cancelButtonText: "취소",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          axios.defaults.headers.common["AUTHORIZATION"] =
            sessionStorage.getItem("token");
          axios
            .post(`/offMeetings/${offMeetingIdx.value}`, {
              offMeetingIdx: offMeetingIdx.value,
            })
            .then(function (response) {
              console.log("response => " + JSON.stringify(response, null, 2));
            })
            .catch(function (error) {
              console.log(error);
            });
          // 모임 삭제
          Swal.fire(
            "삭제 완료",
            "모임이 성공적으로 삭제되었습니다.",
            "success"
          );
        }
        setTimeout(() => {
          router.go();
        }, 500);
      });
    };

    /* 상세 조회 모달 닫기 */
    const closeDetailModalFunc = () => {
      modal[0].style.display = "none";
    };

    for (let i = 0; i < clickable.length; i++) {
      clickable[i].openModalFunc;
    }

    onMounted(() => {
      window.onclick = function (event) {
        if (event.target == modal[0]) {
          modal[0].style.display = "none";
        }
      };
    });
    return {
      openDetailModalFunc,
      closeDetailModalFunc,
      activeJoin,
      checkJoinMember,
      joinMemberModal,
      offMeetingIdx,
      title,
      meetingDate,
      limit,
      contents,
      createDate,
      updateDate,
      status,
      latitude,
      longitude,
      locationAddress,
      startTime,
      headcount,
      likeBtn,
      myIdx,
      hostMemberIdx,
      hostId,
      modifyOffMeeting,
      isOpen,
      deleteOffMeeting,
      showModal,
      isJoin,
    };
  },
};
</script>

<style lang="scss" scoped>
.box {
  border-radius: 15px 15px 15px 15px;
  width: 100%;
  padding: 10px;
  text-align: center;
  color: #555;
  border: 1px solid transparent;
}
.ivory {
  background-color: #fcf8e3;
  border-color: #faebcc;
  color: #8a6d3b;
}
.joinBtn {
  margin-left: 20px;
  height: 30px;
  border-radius: 20px;
  font-size: 13px;
  color: white;
  width: 70px;
  background-color: lightpink;
}
.modifyBtn {
  border-radius: 20px;
  font-size: 13px;
  color: white;
  width: 100px;
  background-color: rgb(130, 199, 145);
}
.deleteBtn {
  border-radius: 20px;
  font-size: 13px;
  color: white;
  width: 100px;
  background-color: lightslategray;
}
.cancelBtn {
  border-radius: 20px;
  font-size: 13px;
  color: white;
  width: 100px;
  background-color: lightgray;
}
.inputText {
  background-color: transparent;
}
/* 찜하기 버튼 */
.heart-button {
  cursor: pointer;
  outline: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  .heart-flip {
    --base: 32px;
    --duration: 0.6s;
    --active: #ea4673;
    --inactive: #d1d6ee;
    width: var(--base);
    height: calc(var(--base) + var(--base) / 2);
    border-radius: calc(var(--base) / 2) calc(var(--base) / 2) 0 0;
    position: relative;
    transform-origin: 50% 66.66%;
    transform-style: preserve-3d;
    transform: rotate(var(--rotate, -45deg));
    transition: background var(--duration), transform var(--duration) ease;
    background: var(--heart-background, var(--inactive));
    &:before,
    &:after {
      content: "";
      width: calc(var(--base) / 2);
      height: var(--base);
      border-radius: var(
        --pseudo-border-radius,
        calc(var(--base) / 2) 0 0 calc(var(--base) / 2)
      );
      position: absolute;
      left: var(--pseudo-left, -50%);
      transform-origin: var(--pseudo-origin, 100%) 50%;
      bottom: 0;
      background: var(--heart-background, var(--inactive));
      filter: brightness(var(--pseudo-filter, 50%));
      transform: translateX(1%) rotateY(var(--pseudo-rotate, 90deg))
        translateZ(0);
      transition: background var(--duration), transform var(--duration) ease,
        filter var(--duration);
    }
    &:after {
      --pseudo-border-radius: 0 calc(var(--base) / 2) calc(var(--base) / 2) 0;
      --pseudo-left: 100%;
      --pseudo-origin: 0;
      filter: brightness(var(--pseudo-filter-second, 100%));
      transform: translateX(-1%) rotateY(var(--pseudo-rotate-second, 0deg))
        translateZ(0);
    }
  }
  &.active {
    display: inline-block;
    .heart-flip {
      --rotate: 45deg;
      --pseudo-filter: 100%;
      --pseudo-filter-second: 50%;
      --pseudo-rotate: 0deg;
      --pseudo-rotate-second: 90deg;
      --heart-background: var(--active);
    }
  }
}
.heart-button {
  --duration: 0.4s;
  --color: #404660;
  --color-hover: #2b3044;
  --color-active: #fff;
  --border: #d1d6ee;
  --border-hover: #bbc1e1;
  --border-active: #ea4673;
  --background: #fff;
  --background-active: #ea4673;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.6;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: 7px;
  color: var(--button-color, var(--color));
  border: 1px solid var(--button-border, var(--border));
  background: var(--button-background, var(--background));
  transform: scale(var(--button-scale, 1)) translateZ(0);
  transition: background var(--duration), border-color var(--duration),
    color var(--duration), transform 0.2s;
  .heart-flip {
    --base: 8px;
    --active: #fff;
    --inactive: #bbc1e1;
    display: inline-block;
    vertical-align: top;
    margin: 4px 6px 0 0;
  }
  span {
    display: inline-block;
    vertical-align: top;
  }
  & > span {
    transform: translateX(var(--text-x, 4px));
    transition: transform var(--duration);
    span {
      display: inline-block;
      vertical-align: top;
      opacity: var(--span-opacity, 0);
      transform: translateX(var(--span-x, 4px));
      transition: opacity var(--duration), transform var(--duration);
    }
  }
  &:active {
    --button-scale: 0.95;
    width: 100px;
  }
  &:hover {
    --button-color: var(--color-hover);
    --button-border: var(--border-hover);
  }
  &.active {
    --text-x: 0;
    --button-color: var(--color-active);
    --button-border: var(--border-active);
    --button-background: var(--background-active);
    --span-opacity: 1;
    --span-x: 0;
  }
}
.detailBadge {
  background-color: mediumaquamarine;
  color: white;
}

/*************/
/*   MODAL   */
/*************/
.detailModal {
  display: none;
  /* Hidden by default */
  position: absolute;
  /* Stay in ㄹㅊ place */
  z-index: 3;
  /* Sit on top */
  left: 0;
  top: 12%;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  /* overflow: hidden; */
  /* Black w/ opacity */
  transition: all 0.5s ease 0.06s;
}

/* Modal Content/Box */

.modal-content {
  background-color: #fff;
  margin: 15% auto;
  /* 15% from the top and centered */
  padding: 1.2rem;
  max-width: 35%;
  min-width: 400px;
  height: 650px;
  overflow-y: auto;
  /* Could be more or less, depending on screen size */
  visibility: hidden;
  box-shadow: 2px 2px 10px 0px rgba(99, 106, 119, 0.6);
  border-radius: 5px;
}

/* The Close Button */
.close {
  color: #dedede;
  /*float: right;*/
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.close:before {
  content: "Close";
  font-size: 1rem;
  display: none;
  text-decoration: none;
  align-self: center;
  margin-top: 0.2rem;
  font-weight: 400;
}

.close:hover:before {
  display: initial;
  color: #dedede;
}

.close:hover,
.close:focus {
  color: hsl(0, 100%, 70%);
  text-decoration: none;
  cursor: pointer;
}

.close:active,
.close:before:active {
  transition: all 60ms ease;
  transform: scale(0.97);
}

/***********************/
/*  modal form layout  */
/***********************/

.modal-content {
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 2em;
  font-weight: bold;
}

.modal-footer {
  text-align: center;
  display: inline-block;
  /* flex-direction: row-reverse; */
  align-items: center;
}

.modal-footer > input {
  margin-top: 0.8rem;
  margin-bottom: 0rem;
  margin-left: 0rem;
  margin-right: 0rem;
}

.modal-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form-row {
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0.4rem 0.4rem;
}

.form-row:nth-child(odd) {
  background: #f2f2f2;
}

.form-row label {
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 50%;
}

.form-row input,
.form-row select {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 50%;
  border: 1px solid hsl(0, 0%, 90%);
  padding: 0.2rem 0.2rem;
  max-width: 50%;
  background: transparent;
}

.slideDown {
  animation-name: slideDown;
  -webkit-animation-name: slideDown;
  animation-duration: 0.6s;
  -webkit-animation-duration: 0.6s;
  animation-timing-function: ease;
  -webkit-animation-timing-function: ease;
  visibility: visible !important;
}
@keyframes slideDown {
  0% {
    transform: translateY(-100%);
  }
  50% {
    transform: translateY(4%);
  }
  65% {
    transform: translateY(-2%);
  }
  80% {
    transform: translateY(2%);
  }
  95% {
    transform: translateY(-1%);
  }
  100% {
    transform: translateY(0%);
  }
}

.input-group-text {
  background: #9fd6cd;
  border-color: rgba(224, 224, 224, 0.531);

  color: white;
  width: 80px;
}

.inputText {
  color: #5f5f5f;
  border-color: rgba(224, 224, 224, 0.531);
}

.custom-file-input .custom-file {
  border-color: rgba(224, 224, 224, 0.531);
}
</style>
