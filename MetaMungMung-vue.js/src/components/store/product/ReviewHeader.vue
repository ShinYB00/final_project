<template>
  <div class="container" style="margin-bottom: 130px">
    <router-link :to="{ name: 'ProductDetail' }" @click="moveToPageDetail()">
      <h1 class="services_taital">
        <span>리뷰</span>
        <img
          src="@/assets/images/offMeeting/paw-print.png"
          style="width: 70px"
        />
        <span style="color: #1f1f1f">상품으로 돌아가기</span>
      </h1>
    </router-link>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  props: ["productIdx"],
  setup(props) {
    const reviewList = ref([{}]);
    const id = props.productIdx;
    const router = useRouter();

    const moveToPageDetail = () => {
      router.push({ name: "ProductDetail" });
    };

    onMounted(() => {
      checkFunc();
    });

    const checkFunc = () => {
      let overlay = null;
      let headerSection = null;

      check();

      function check() {
        if (overlay == null) {
          overlay = document.getElementsByClassName("overlay")[0];
        }
        if (headerSection == null) {
          headerSection = document.getElementsByClassName("header_section")[0];
        }
      }

      headerSection.classList.add("background_bg");
      document.getElementById("bannerDiv").style.display = "none";
    };

    return {
      moveToPageDetail,
      reviewList,
      id,
    };
  },
};
</script>
