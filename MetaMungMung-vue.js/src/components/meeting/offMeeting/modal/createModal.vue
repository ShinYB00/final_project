<template>
  <form @submit.prevent="submitOffMeetingForm">
    <!-- 모임생성 모달 start -->
    <div id="myModal" class="modal" style="overflow: visible">
      <!-- Modal content -->
      <div class="modal-content slideDown">
        <div class="modal-header">
          <span @click="closeModalFunc" class="close" id="closeModal"
            >&times;</span
          >
          <h2 style="color: gray; font-weight: bolder">모임 생성</h2>
        </div>
        <div class="modal-body">
          <div style="margin-bottom: 20px">
            <middle
              id="location"
              style="text-align: center"
              class="form-text text-muted box ivory"
              >👉🏻 모임 생성 위치 : {{ currentLocation }} 👈🏻</middle
            >
          </div>
          <div class="form-group">
            <label for="title">🐶 제목</label>
            <input
              type="text"
              class="form-control inputText"
              id="title"
              aria-describedby="emailHelp"
              placeholder="제목을 입력해주세요."
              v-model="title"
            />
          </div>

          <div class="form-group" style="display: none">
            <label for="location">위치</label>
            <input
              type="text"
              class="form-control inputText disabledLabel"
              id="location"
              :value="currentLocation"
              disabled
            />
          </div>

          <div class="form-group" style="display: none">
            <label for="">위도</label>
            <input type="text" :value="currentLat" disabled />
          </div>
          <div class="form-group" style="display: none">
            <label for="">경도</label>
            <input type="text" :value="currentLng" disabled />
          </div>

          <div class="form-group">
            <label for="limit">💁🏼‍♀️ 제한인원</label>
            <input
              type="number"
              id="limit"
              :value="limit"
              name="usernumber"
              min="2"
              max="1000"
              class="form-control inputText"
            />
          </div>

          <div class="form-group">
            <label for="limit">📅 날짜</label>
            <input
              type="date"
              id="date"
              v-model="date"
              name="limit"
              class="form-control inputText"
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
            />
          </div>

          <div class="form-group">
            <label for="content">📝 내용</label>
            <textarea
              class="form-control inputText"
              id="content"
              rows="3"
              placeholder="내용을 입력해주세요."
              v-model="content"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="content">📸 파일첨부</label>
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                id="inputGroupFile04"
              />
              <label class="custom-file-label inputText" for="inputGroupFile04"
                >파일을 선택하세요.</label
              >
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn createBtn">모임생성</button>
          <a
            @click="closeModalFunc"
            style="color: white; width: 100px"
            class="btn cancelBtn"
            >취소</a
          >
        </div>
      </div>
    </div>
    <!-- 모임생성 모달 end -->
  </form>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "OffMeetingModal",
  props: ["currentLocation", "currentLat", "currentLng"],
  setup(props) {
    const myIdx = Number(sessionStorage.getItem("memberIdx"));
    let title = ref("");
    let date = ref("");
    let startTime = ref("");
    let content = ref("");
    let limit = ref("2");
    const route = useRoute();
    const router = useRouter();
    const modal = document.getElementsByClassName("modal");
    const clickable = document.querySelectorAll(".clickable");
    const openCreateModalFunc = () => {
      modal[0].style.display = "block";
    };
    const closeModalFunc = () => {
      modal[0].style.display = "none";
    };
    const submitOffMeetingForm = async () => {
      axios.defaults.headers.common["AUTHORIZATION"] =
        sessionStorage.getItem("token");
      axios
        .post("/offMeetings", {
          title: title.value,
          meetingDate: date.value,
          limit: limit.value,
          contents: content.value,
          latitude: props.currentLat,
          longitude: props.currentLng,
          locationAddress: props.currentLocation,
          startTime: startTime.value,
          memberIdx: myIdx,
          onMeetingIdx: route.params.id,
        })
        .then(function (response) {
          console.log("response => " + JSON.stringify(response, null, 2));
        })
        .catch(function (error) {
          console.log(error);
        });
      router.go();
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
      openCreateModalFunc,
      closeModalFunc,
      submitOffMeetingForm,
      title,
      date,
      startTime,
      content,
      limit,
      myIdx,
    };
  },
};
</script>

<style scoped>
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
.createBtn {
  border-radius: 20px;
  font-size: 13px;
  color: white;
  width: 100px;
  background-color: cornflowerblue;
}
.cancelBtn {
  border-radius: 20px;
  font-size: 13px;
  color: white;
  width: 100px;
  background-color: lightgray;
}

/*************/
/*   MODAL   */
/*************/
.modal {
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
