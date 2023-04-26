<template>
<div class="services_section layout_padding">
  <div class="container">
    <div class="error">
      <h2>404 Not Found</h2>
      <p>Sorry, you don't have permission to access this page.</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Error",
  created() {
    document.title = "404 Not Found";
  },
};
</script>

<style scoped>
.error {
  text-align: center;
  font-size: 20px;
}
.header_section {
  width: 0;
  height: 0;
}
</style>