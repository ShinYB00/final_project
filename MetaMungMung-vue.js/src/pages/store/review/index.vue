<template>
  <div style="z-index: 1000" class="services_section layout_padding">
    <ReviewHeader :productIdx="productIdx" />
    <div class="container">
      <div id="app">
        <label>제목</label>
        <input
          v-model="title"
          @input="title = $event.target.value"
          type="text"
        /><br />

        <label>내용</label>
        <textarea
          v-model="content"
          @input="content = $event.target.value"
        ></textarea>

        <button class="register-btn" v-on:click="addReview">리뷰등록</button>

        <div
          v-for="(review, index) in reviewList"
          :key="review.productReviewIdx"
          class="review"
          style="margin-top: 50px"
        >
          <div class="review-memberImg">
            <img :src="review.reviewMember.memberImg" />
          </div>

          <div class="review-box" id="review-detail">
            <div class="review-author">
              <p>
                <strong>{{ review.title }}</strong> -
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                - {{ review.reviewMember.memberId }}
              </p>
            </div>
            <div class="review-comment">
              <div>
                <p>{{ review.content }}</p>
              </div>
            </div>

            <div class="review-date">
              <time>{{ review.createDate }}</time>
            </div>

            <button
              v-if="myIdx == review.reviewMember.memberIdx"
              @click="
                deleteOffMeeting(idx, review.productReviewIdx, productIdx)
              "
              class="btn deleteBtn"
            >
              삭제
            </button>
            <button
              v-if="myIdx == review.reviewMember.memberIdx"
              @click="
                modifyOffMeeting(index, review.productReviewIdx, productIdx)
              "
              class="btn modifyBtn"
            >
              수정
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ReviewModifyModal
    :productIdx="productIdx"
    :productReviewIdx="productReviewIdx"
    v-if="showModal"
    @close="showModal = false"
  />
</template>

<script>
import ReviewHeader from "@/components/store/product/ReviewHeader.vue";
import ReviewModifyModal from "@/components/store/product/ReviewModifyModal.vue";
import axios from "axios";
import { ref, watchEffect } from "vue";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

export default {
  components: {
    ReviewHeader,
    ReviewModifyModal,
  },
  setup() {
    let showModal = ref(false);
    const route = useRoute();
    const router = useRouter();
    // const isOpen = ref(true);

    const myIdx = Number(sessionStorage.getItem("memberIdx"));

    let productIdx = Number(route.params.id);
    let productReviewIdx = ref(null);
    let memberId = ref("");
    let memberIdx = ref(0);
    let memberImg = ref(
      "https://i.pinimg.com/474x/d7/70/33/d7703333ad8ba85827b60fccf42f9c25.jpg"
    );
    let title = ref("");
    let content = ref("");
    let createDate = ref("");
    let updateDate = ref("");

    let reviewList = ref(null);

    onMounted(() => {
      reviewDetailPage();
      // console.log("memberIdx : " + myIdx);
    });

    /* 리뷰조회 axios 비동기 통신 */
    const reviewDetailPage = async () => {
      try {
        axios.defaults.headers.common["AUTHORIZATION"] =
          sessionStorage.getItem("token");

        const res = await axios.get(`/products/${productIdx}/reviews`);
        reviewList.value = { ...res.data };

        // console.log("id => " + productReviewIdx.value);
        // console.log(JSON.stringify(res, null, 2));
      } catch (err) {
        console.log(err);
      }

      // console.log(JSON.stringify(reviewList.value, null, 2));
    };

    /* 리뷰 추가 */
    const addReview = () => {
      axios.defaults.headers.common["AUTHORIZATION"] =
        sessionStorage.getItem("token");
      axios
        .post(`/products/${productIdx}/reviews`, {
          memberIdx: myIdx,
          title: title.value,
          content: content.value,
        })
        .then(function (response) {
          // console.log(response);
          console.log("등록됨");
          router.go();
        })
        .catch(function (error) {
          console.log(error);
        }),
        (title.value = ""),
        (content.value = "");
    };

    /* 리뷰 상세 조회 (모달 열기)*/
    const modifyOffMeeting = (index, prId, productIdx) => {
      productReviewIdx.value = prId;
      showModal.value = true;
    };

    /* 리뷰 삭제 */
    const deleteOffMeeting = async (idx, productReviewIdx, productIdx) => {
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
            .post(`/products/${productIdx}/reviews/${productReviewIdx}`)
            .then(function (response) {
              console.log("눌렀다~ => " + JSON.stringify(response));
              router.go();
            })
            .catch(function (error) {
              console.log(error);
            });
          // 모임 삭제
          Swal.fire(
            "삭제 완료",
            "리뷰가 성공적으로 삭제되었습니다.",
            "success"
          );
        }
        setTimeout(() => {
          router.go();
        }, 500);
      });
    };

    return {
      addReview,
      modifyOffMeeting,
      productIdx,
      productReviewIdx,
      memberId,
      memberIdx,
      memberImg,
      title,
      content,
      createDate,
      updateDate,
      reviewList,
      myIdx,
      showModal,
      deleteOffMeeting,
    };
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.header {
  width: 100%;
  font-size: 2em;
  text-align: center;
  background: #34495e;
  color: #fff;
  padding: 0.5em;
}
body {
  max-width: 1024px;
  margin: 20px auto;
  font-size: 16px;
  font-family: "Poppins", sans-serif;
}
img {
  max-width: 100%;
  display: block;
}
p {
  margin: 0;
}
.fa.fa-star {
  color: #fec902;
}
label {
  width: 15%;
  margin: 10px 1% 0 0;
  display: inline-block;
  float: left;
}
input[type="text"] {
  width: 84%;
  margin: 10px 0;
  height: 40px;
  border: none;
  background: #f6f6f6;
  padding: 1em;
}
textarea {
  width: 84%;
  border: none;
  background: #f6f6f6;
  margin: 10px 0;
  height: 100px;
  padding: 1em;
}
button {
  float: right;
  width: 20%;
  height: 40px;
  border: none;
  background: #2ecc71;
  font-size: 16px;
  color: white;
}
.review {
  width: 100%;
  display: inline-block;
  margin: 10px 0;
}
.review-memberImg {
  height: 80px;
  width: 80px;
  object-fit: cover;
  display: inline-block;
  float: left;
  margin-right: 3em;
}
.review-box {
  min-width: 490px;
  float: left;
  display: inline-block;
  width: 87.5%;
  background: #f6f6f6;
  padding: 1.5em;
  position: relative;
}
.review-box:after,
.review-box:before {
  right: 100%;
  top: 10%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.review-box:after {
  border-right-color: #f6f6f6;
  border-width: 25px;
}
.review-comment {
  color: #9a9999;
}
.review-date {
  color: #c7c7c7;
}
.review-author {
  color: #c7c7c7;
}
.review-author strong {
  color: black;
}
.modifyBtn {
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

.register-btn {
  min-width: 100px;
  border-radius: 20px;
  font-size: 13px;
  color: white;
  width: 100px;
  background-color: rgb(140, 185, 230);
}
</style>
