<template>
  <MainHeader />
  <router-view />
  <MainFooter />
</template>

<script>
import MainHeader from "@/components/common/MainHeader.vue";
import MainFooter from "@/components/common/MainFooter.vue";

export default {
  name: "App",
  components: {
    MainHeader,
    MainFooter,
  },
  setup() {},
};
</script>
