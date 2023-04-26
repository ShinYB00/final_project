<template>
  <router-link :to="{ name: 'ProductPage' }" @click="moveToPage">
    <h1 class="services_taital">
      <span>스토어</span>
      <img src="@/assets/images/offMeeting/paw-print.png" style="width: 70px" />
      <span style="color: #1f1f1f">멍멍스토어</span>
    </h1>
  </router-link>

  <SearchAndSelectBox @send-type="sendType" :isMain="isMain" />
  <br />
</template>

<script>
import SearchAndSelectBox from "./SearchAndSelectBox.vue";

export default {
  props: {
    isMain: Boolean,
  },
  components: {
    SearchAndSelectBox,
  },
  setup(props, { emit }) {
    const sendType = () => {
      emit("send-type", "search");
    };

    const moveToPage = () => {
      emit("send-type");
    };

    return {
      sendType,
      moveToPage,
    };
  },
};
</script>

<style></style>
