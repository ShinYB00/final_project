<template>
  <transition name="modal">
    <form @submit.prevent="submitModifyReviewForm">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div
              style="decoration-line: none; border: none"
              class="modal-header"
            >
              <h2 style="color: gray; font-weight: bolder; margin-bottom: -7px">
                ✏️ 리뷰 수정
              </h2>
            </div>
            <label for="title" style="font-weight: bold">🐶 제목</label>
            <input
              type="text"
              class="form-control inputText"
              id="title"
              aria-describedby="emailHelp"
              placeholder="제목을 입력해주세요."
              v-model="review.title"
            />

            <div class="form-group">
              <label for="content" style="margin-top: 20px; font-weight: bold"
                >📝 내용</label
              >
              <textarea
                class="form-control inputText"
                id="content"
                rows="3"
                placeholder="내용을 입력해주세요."
                v-model="review.content"
              ></textarea>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <button type="submit" class="btn modifyBtn">수정</button>
                <button @click="$emit('close')" class="btn deleteBtn">
                  취소
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </form>
  </transition>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  props: ["productReviewIdx", "productIdx"],
  setup(props) {
    const router = useRouter();
    const review = ref(null);
    const myIdx = Number(sessionStorage.getItem("memberIdx"));

    /* 기존의 리뷰 정보 가져오기 */
    const showReview = async () => {
      try {
        axios.defaults.headers.common["AUTHORIZATION"] =
          sessionStorage.getItem("token");

        const res = await axios.get(
          `/products/${props.productIdx}/reviews/${props.productReviewIdx}`
        );
        review.value = { ...res.data };

        // console.log(JSON.stringify(res, null, 2));
      } catch (err) {
        console.log(err);
      }
    };

    showReview();

    /* 리뷰 수정 */
    const submitModifyReviewForm = async () => {
      axios
        .patch(
          `/products/${review.value.productIdx}/reviews/${review.value.productReviewIdx}`,
          {
            title: review.value.title,
            content: review.value.content,
          }
        )
        .then(function (response) {
          console.log(JSON.stringify(response, null, 2));
          router.go();
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    return {
      review,
      showReview,
      submitModifyReviewForm,
    };
  },
};
</script>

<style scoped>
.modal-mask {
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
  width: 600px;
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
</style>
