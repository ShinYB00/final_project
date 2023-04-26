<template>
  <div class="container m-auto p-10 text-grey-darkest" id="app">
    <div style="margin-top: 30px" class="filters row">
      <div class="form-group col-sm-3">
        <label style="font-weight: bold; font-size: 20px" for="search-element"
          >👉🏻 나의 오프모임 조회
        </label>
        <input
          v-model="search"
          type="search"
          placeholder="참여한 모임을 확인해보세요!"
          class="form-control focus:outline-none"
          id="search-element"
          @input="searchGroup($event)"
          required
        />
      </div>
    </div>
    <table style="min-width: 550px" class="table">
      <thead>
        <tr>
          <th>🙋🏻</th>
          <th>모임제목</th>
          <th>날짜</th>
          <th>시간</th>
          <th>위치</th>
          <th class="col-sm-2">✏️</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="group-item"
          v-for="(list, index) in myMeetingList"
          :key="index"
        >
          <td>{{ Number(index) + 1 }}</td>
          <td>
            {{ list.title }}
            <span class="glyphicon glyphicon-euro" aria-hidden="true"></span>
          </td>
          <td>
            {{ list.meetingDate }}
            <span class="glyphicon glyphicon-euro" aria-hidden="true"></span>
          </td>
          <td>
            {{ list.startTime }}
            <span class="glyphicon glyphicon-euro" aria-hidden="true"></span>
          </td>
          <td>
            {{ list.locationAddress }}
            <span class="glyphicon glyphicon-euro" aria-hidden="true"></span>
          </td>
          <td>
            <a class="btn btn-warning btn-xs modifyBtn">조회</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { onMounted } from "@vue/runtime-core";
export default {
  setup() {
    const myIdx = Number(sessionStorage.getItem("memberIdx"));
    const myMeetingList = ref(null);
    const route = useRoute();
    const search = "";
    let searchGroup = function () {};
    /* 나의 오프모임 조회 axios 비동기 통신 */
    const myOffMeeting = async () => {
      try {
        axios.defaults.headers.common["AUTHORIZATION"] =
          sessionStorage.getItem("token");

        const res = await axios.get("/offMeetings/myOffMeetings", {
          params: { onMeetingIdx: route.params.id, memberIdx: myIdx },
        });
        myMeetingList.value = { ...res.data };

        // console.log(JSON.stringify(res, null, 2));
      } catch (err) {
        console.log(err);
      }
    };

    myOffMeeting();

    // console.log(myMeetingList.value.length);
    /* 키워드 조회 */

    onMounted(() => {
      window.onload = () => {
        searchGroup = (event) => {
          const len = Object.keys(myMeetingList.value).length;
          console.log("len => " + len);

          for (let i = 0; i < len; i++) {
            if (
              myMeetingList.value[i].title.includes(event.target.value) ===
              false
            ) {
              document.querySelector(".group-item")[i].style.display = "none";
            } else {
              document.querySelector(".group-item")[i].style.display = "flex";
            }
          }
        };
      };
    });

    return {
      myOffMeeting,
      myIdx,
      myMeetingList,
      search,
      searchGroup,
    };
  },
};
</script>

<style scoped>
.form-group {
  max-width: 500px;
}

.actions {
  padding: 10px 0;
}

.glyphicon-euro {
  font-size: 12px;
}
.modifyBtn {
  margin-right: 10px;
  border-radius: 20px;
  font-size: 13px;
  color: white;
  width: 80px;
  background-color: rgb(130, 199, 145);
  border: none;
}
.deleteBtn {
  border-radius: 20px;
  font-size: 13px;
  color: white;
  width: 70px;
  border: none;
  background-color: lightslategray;
}
</style>
