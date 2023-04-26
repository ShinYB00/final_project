<template>
  <div class="container my-3">
    <div class="input-group">
      <select class="form-select" aria-label="Default select example">
        <option value="1" selected>전체</option>
        <option value="2">상품명</option>
        <option value="3">브랜드</option>
      </select>

      <div class="topInputSearch _searchBox">
        <input
          :type="text"
          id="input_search_view62"
          class="inputBandSearch _gnbInputSearch"
          role="search"
          placeholder="검색어를 입력해주세요."
          autocomplete="off"
          v-model="searchKeyword"
          @keyup.enter="submitSearch"
        />

        <button
          type="submit"
          class="btnSearch"
          id="btn_search"
          @click="submitSearch"
        >
          <span class="gSrOnly">검색</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  emits: ["send-type"],
  props: {
    isMain: Boolean,
  },
  setup(props, { emit }) {
    const route = useRoute();
    const router = useRouter();
    let searchKeyword = ref("");

    const init = () => {
      searchKeyword.value = route.query.keywords;
    };

    init();

    const submitSearch = () => {
      // 검색어를 이용한 검색 로직 구현
      console.log(`Searching for ${searchKeyword.value}`);

      if (searchKeyword.value !== "") {
        emit("send-type", "search");
        console.log("찾는 키워드다~! => " + searchKeyword.value);
        router.push({
          name: "ProductPage",
          query: {
            keyword: searchKeyword.value,
          },
        });
      }
      return false;
    };

    watchEffect(() => {
      if (props.isMain) {
        console.log("메인!!!!!!" + props.isMain);
        searchKeyword.value = "";
      }
    });

    return {
      submitSearch,
      searchKeyword,
    };
  },
};
</script>

<style scoped>
.form-select {
  font-size: 12px;
  text-align: center;
  display: inline-block;
  border-color: lightgray;
  font-weight: bold;
  color: gray;
  width: 130px;
  margin-right: 20px;
  border-radius: 14px;
  height: 40px;
}

.topInputSearch {
  position: relative;
  -webkit-box-flex: 0;
  flex: 0 0 auto;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  width: 60%;
  height: 40px;
  margin-left: 9px;
  padding: 0 0 0 13px;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  background-color: #f5f6f8;
  float: right;
}
.gSrOnly {
  overflow: hidden !important;
  position: absolute !important;
  height: 1px !important;
  width: 1px !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
}
.topInputSearch .inputBandSearch {
  -webkit-box-flex: 0;
  flex: 0 1 auto;
  width: 100%;
  height: 100%;
  border: 0;
  font-size: 12px;
  color: #222;
  background-color: transparent;
}
input,
textarea {
  color: #444;
  border-radius: 0;
}
button {
  border: 0;
  background-color: transparent;
  border-radius: 0;
  cursor: pointer;
}
.topInputSearch .btnSearch {
  -webkit-box-flex: 0;
  flex: 0 0 auto;
  width: 36px;
  height: 100%;
}
.topInputSearch .btnSearch:before {
  width: 24px;
  height: 24px;
  -webkit-mask-image: url(@/assets/images/common/search-icon.png);
  mask-image: url(@/assets/images/common/search-icon.png);
  -webkit-mask-size: 24px 24px;
  mask-size: 24px 24px;
  background-color: #222;
  display: inline-block;
  vertical-align: top;
  margin-top: 3px;
  margin-left: -3px;
  width: 17px;
  height: 17px;
  -webkit-mask-size: 17px 17px;
  mask-size: 17px 17px;
  content: "";
}
</style>
