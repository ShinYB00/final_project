<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div style="decoration-line: none; border: none" class="modal-header">
            <h2 style="color: gray; font-weight: bolder; margin-bottom: -7px">
              💁🏼‍♀️ 모임 참여 멤버
            </h2>
          </div>
          <div
            class="list-wrapper"
            ng-app="app"
            ng-controller="MainCtrl as ctrl"
          >
            <ul
              v-for="list in offMeetingMemberList"
              :key="list.offMeetingIdx"
              id="result"
              class="user-list"
            >
              <li
                v-for="member in list.offMeetingMembers"
                :key="member.memberIdx"
              >
                <img :src="member.memberImg" />
                <div class="user-info">
                  <h4>{{ member.memberId }}</h4>
                  <p>{{ member.sex }}</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button @click="$emit('close')" class="btn deleteBtn">
                닫기
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  props: ["offMeetingIdx"],
  setup(props) {
    const router = useRouter();
    const offMeetingMemberList = ref(null);
    const myIdx = Number(sessionStorage.getItem("memberIdx"));

    /* 모임 참여자 정보 가져오기 */
    const showOffMeetingMemebr = async () => {
      try {
        axios.defaults.headers.common["AUTHORIZATION"] =
          sessionStorage.getItem("token");

        const res = await axios.get(
          `/offMeetings/${props.offMeetingIdx}/offMeetingMembers`
        );
        offMeetingMemberList.value = { ...res.data };

        // console.log(JSON.stringify(res, null, 2));
        console.log("1. " + typeof offMeetingMemberList.value);
        console.log(JSON.stringify(offMeetingMemberList.value, null, 2));

        console.log("2 . " + typeof offMeetingMemberList.value[0]);
        console.log(offMeetingMemberList.value[0]);
        console.log(
          offMeetingMemberList.value[0].offMeetingMembers[0].memberImg
        );
      } catch (err) {
        console.log(err);
      }
    };

    showOffMeetingMemebr();

    return {
      offMeetingMemberList,
      showOffMeetingMemebr,
    };
  },
};
</script>

<style scoped>
.modal-mask {
  overflow: auto;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  color: #555555;
}

.modal-container {
  width: 400px;
  height: 600;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.modifyBtn {
  min-width: 100px;
  border-radius: 20px;
  font-size: 13px;
  color: white;
  width: 100px;
  background-color: rgb(130, 199, 145);
  margin-right: 10px;
}
.deleteBtn {
  min-width: 100px;
  border-radius: 20px;
  font-size: 13px;
  color: white;
  width: 100px;
  background-color: lightslategray;
}

.user-list {
  background-color: #fff;
  list-style-type: none;
  margin: 0;
  padding: 0;
  max-height: 400px;
  overflow-y: auto;
}

.user-list li {
  display: flex;
  padding: 20px;
}

.user-list img {
  border-radius: 50%;
  object-fit: cover;
  height: 50px;
  width: 50px;
}

.user-list .user-info {
  margin-left: 10px;
}

.user-list .user-info h4 {
  margin: 0 0 10px;
}

.user-list .user-info p {
  font-size: 12px;
}

.user-list li:not(:last-of-type) {
  border-bottom: 1px solid #eee;
}

.user-list li.hide {
  display: none;
}
</style>
