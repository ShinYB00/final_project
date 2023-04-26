<template>
  <div class="services_section layout_padding">
    <div class="container">
      <article class="purchase-sec">
        <div class="product_wrap">
          <div class="shopView" style="margin-bottom: -30px">
            <router-link :to="{ name: 'ProductPage' }" @click="moveToPage()">
              <h1 class="services_taital">
                <span>스토어</span>
                <img
                  src="@/assets/images/offMeeting/paw-print.png"
                  style="width: 70px"
                />
                <span style="color: #1f1f1f">멍멍스토어</span>
              </h1>
            </router-link>

            <div class="viewHeader">
              <!-- 상품이미지 -->
              <img
                style="object-fit: cover; max-height: 600px"
                class="productDetailImg"
                id="imageMain"
                :src="product.productImg"
                alt=""
              />

              <!-- 상품 설명 -->
              <div class="productInfo" style="margin-bottom: 30px">
                <div class="infoItem title">
                  <div>
                    <h3>[{{ product.brand }}] {{ product.productName }}</h3>
                    <p class="guidetxt">{{ product.productDetail }}</p>

                    <span class="deliver">무료배송</span>

                    <strong class="price"
                      >{{ product.price.toLocaleString() }} 원</strong
                    >
                  </div>
                  <div class="btns-box">
                    <button class="purchase_like"><span>찜하기</span></button>
                  </div>
                </div>

                <div class="fourth" style="margin-bottom: -30px">
                  <small>상품후기</small>
                  <p class="star">★★★★★4.9</p>
                  <h5 @click="moveToReview" style="top: -10px">
                    후기 보러가기
                  </h5>
                </div>

                <div class="infoItem itemOptions">
                  <p class="title">제품선택</p>

                  <select
                    v-model="selectedOption"
                    @change="setSelect()"
                    id="colorOption"
                  >
                    <option
                      v-for="(item, index) in optionList"
                      :key="index"
                      :value="item.value"
                    >
                      {{ item.name }}
                    </option>
                  </select>

                  <div class="selectOptionResult">
                    <div id="white" class="options">
                      <ul>
                        <li>
                          <p>
                            <span style="font-weight: bold"
                              >[{{ product.brand }}]</span
                            >
                            {{ product.productName }}
                          </p>
                        </li>
                        <li>
                          <div class="count">
                            <div
                              class="countbtn"
                              @click="count('minus')"
                              value="-"
                            >
                              -
                            </div>
                            <input
                              type="number"
                              id="result"
                              value="1"
                              readonly
                            />
                            <div
                              class="countbtn"
                              @click="count('plus')"
                              value="+"
                            >
                              +
                            </div>
                          </div>
                        </li>
                        <li>
                          <span id="total">{{
                            product.price.toLocaleString()
                          }}</span
                          >원
                        </li>
                        <li @click="close">X</li>
                      </ul>
                    </div>

                    <span id="warning">1개 미만은 구매할 수 없습니다.</span>
                  </div>
                </div>

                <div class="all-price">
                  <p>총 상품금액</p>
                  <p><span id="alltotal">0</span>원</p>
                </div>

                <div class="btns-box">
                  <button @click="moveToCartPage" class="input_other">
                    장바구니 담기
                  </button>
                  <button class="input_primary" @click="order">
                    바로 구매하기
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <ProductDescription :product="product" />
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import ProductCategory from "@/components/store/product/ProductCategory.vue";
import ProductHeader from "@/components/store/product/ProductHeader.vue";
import ProductDescription from "@/components/store/product/ProductDescription.vue";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

export default {
  components: {
    ProductCategory,
    ProductHeader,
    ProductDescription,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const productIdx = route.params.id;
    const productName = ref("");

    const product = ref({});

    /* axios 사용!!! */
    const productDetailPage = async () => {
      // console.log("ok!!!!!");
      try {
        axios.defaults.headers.common["AUTHORIZATION"] =
          sessionStorage.getItem("token");
        const res = await axios.get(`/products/${productIdx}`);
        product.value = { ...res.data };
        productName.value = product.value.productName;
        // console.log(JSON.stringify(res, 2, null));
      } catch (err) {
        console.log(err);
      }
    };

    productDetailPage();

    const optionList = ref([
      { name: "선택해주세요.", value: "" },
      { name: productName, value: 1 },
    ]);

    const selectedOption = ref("");

    const setSelect = () => {
      if (selectedOption.value !== "") {
        const option = document.getElementsByClassName("options")[0];
        option.style.display = "block";
        document.getElementById("alltotal").innerHTML =
          product.value.price.toLocaleString();
      } else {
        const option = document.getElementsByClassName("options")[0];
        option.style.display = "none";
        document.getElementById("alltotal").innerHTML = 0;
      }
    };

    // 선택한 수량 결과 닫기 함수
    const close = () => {
      selectedOption.value = "";
      const option = document.getElementsByClassName("options")[0];
      option.style.display = "none";
      document.getElementById("total").innerHTML =
        product.value.price.toLocaleString();
      document.getElementById("alltotal").innerHTML = 0;
      document.getElementById("warning").style.display = "none";

      // 수량 결과를 표시할 element
      let resultElement = document.getElementById("result");

      resultElement.value = 1;
    };

    const count = (type) => {
      // 수량 결과를 표시할 element
      let resultElement = document.getElementById("result");

      // 현재 화면에 표시된 수량 값
      let number = resultElement.value;

      // 수량 더하기/빼기
      if (type === "plus") {
        number = parseInt(number) + 1;
      } else if (type === "minus") {
        number = parseInt(number) - 1;
      }
      if (number < 1) {
        number = 1;
        document.getElementById("warning").style.display = "block";
      } else {
        document.getElementById("warning").style.display = "none";
      }

      var p1 = (product.value.price * number).toLocaleString();
      var pa = (p1 * number).toLocaleString();

      var totalPrice = p1;
      document.getElementById("total").innerHTML = totalPrice;
      document.getElementById("alltotal").innerHTML = totalPrice;
      // 결과 출력
      resultElement.value = number;
    };

    /* 장바구니 페이지로 이동 */

      const moveToCartPage = async() => {
       let resultCnt = document.getElementById("result").value;

      console.log(`resultCnt@@@ ${resultCnt}`);

      await axios.post(`/cart`, {
        productIdx: productIdx,
        quantity: resultCnt
      })
      .then((response) => {
        console.log(`장바구니 추가`);
      }).catch((err) => {
        console.log(`장바구니 추가 에러: ${err}`)
      })

      router.push({
        name: "Cart",
      //  query: { id: productIdx, quantity: resultCnt },
      });
    };

    /* 리뷰 페이지로 이동 */
    const moveToReview = () => {
      router.push({ name: "ProductReviews", id: product.productIdx });
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

    const order = () => {
      let resultCnt = document.getElementById("result").value;
      router.push({
        name: "Order",
        query: { id: productIdx, quantity: resultCnt },
      });
    };

    return {
      checkFunc,
      setSelect,
      count,
      close,
      moveToReview,
      moveToCartPage,
      order,
      product,
      optionList,
      selectedOption,
      router,
      productName,
    };
  },
};
</script>

<style scoped>
@charset "utf-8";
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Crete+Round:ital@1&family=Hahmlet:wght@100;200;300;400;500;600;700;800&display=swap");

@font-face {
  font-family: "RIDIBatang";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

h1,
h2 {
  font-weight: 700;
}

h3,
h4,
h5 {
  font-weight: 500;
}

h2 {
  font-size: 2.8rem;
  line-height: 4rem;
}

h3 {
  font-size: 2.2rem;
  line-height: 3rem;
}

h4 {
  font-size: 1.8rem;
  line-height: 2.2rem;
}

h5 {
  font-size: 1.4rem;
  line-height: 2rem;
}

a:link {
  color: #111;
  line-height: 2rem;
  text-decoration: none;
}

a:hover,
a:focus {
  text-decoration: none;
}

li {
  list-style: none;
}

.productDetailImg {
  display: block;
  vertical-align: bottom;
}

button {
  width: auto;
  font-size: 1rem;
  font-weight: 700;
  background: transparent;
  border: transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: all 0.2s;
}

button img {
  height: 20px;
  vertical-align: middle;
}

textarea {
  width: 100%;
  padding: 14px;
  margin: 20px 0;
  background: #eee;
  border: 1px solid #ddd;
  color: #222;
  line-height: 1.2rem;
  text-align: left;
  resize: none;
}

/*----text start--------*/
.title {
  font-weight: 700;
}

.subtitle,
.import {
  font-weight: 500;
}

.pricetxt {
  font-weight: 700;
}

.guidetxt {
  font-size: 0.9rem;
  color: #888;
}

.moview.guidetxt {
  color: #f53d4f99;
}

/*----btns start--------*/
.main_primary {
  transition: all 0.2s;
  padding: 15px 25px;
  margin: 0px auto;
  border-radius: 50px;
  color: #fff;
  background: #4d4d4d;
  z-index: 10;
}

.main_primary:hover {
  background: #00bce7;
}

.main_secondry {
  padding: 10px 0;
  border-bottom: 2px solid #ffffff00;
}

.main_secondry:after {
  content: " 〉";
  font-weight: 800;
  margin-left: 10px;
  transform: translateX(0px);
  transition: all 0.2s;
}

.main_secondry:hover {
  border-bottom: 2px solid #fff;
}

.main_secondry:hover:after {
  transform: translateX(10px);
}

.input_primary {
  width: 100%;
  padding: 12px;
  margin: 0 auto;
  background: #000;
  color: #fff;
  outline: 1px solid #000;
}

.input_primary:hover {
  background: #00bce7;
  outline: 1px solid #00bce7;
}

.input_secondary {
  width: 100%;
  padding: 12px;
  margin: 0 auto;
  color: #fff;
  background: #4d4d4d;
  outline: 1px solid #3d3d3d;
}

.input_secondary:hover {
  background: #00bce7;
  outline: 1px solid #00bce7;
}

.input_other {
  width: 99%;
  padding: 12px;
  margin: 0 auto;
  background: #fff;
  color: #00bce7;
  outline: 1px solid #00bce7;
}

.input_other:hover {
  background: #e6e8fd;
}

.social_btn {
  width: 30px;
  height: 30px;
  padding: 6px;
  outline: 1px solid #d1d1d1;
}

/*----input start-------------*/
[type="text"].inputData,
[type="password"].inputData,
[type="email"].inputData,
[type="tel"].inputData {
  width: 100%;
  height: 45px;
  padding: 20px 0;
  border: 0px;
  border-bottom: 1.5px solid #e7e7e7;
  border-radius: 0;
  transition: all 0.2s;
}

.inputData:focus {
  border-bottom: 1.5px solid #00bce7;
}

.tab-content .input-option {
  font-size: 0.8rem;
  width: 100%;
  padding: 10px 0 15px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.tab-content .input-option > :nth-child(1) {
  display: flex;
  flex-direction: row;
  align-items: center;
}

[type="checkbox"].keepSave {
  width: 20px;
  height: 20px;
  padding: 0;
  background-position: top;
  outline: none;
  appearance: none;
  display: block;
  cursor: pointer;
}

/* 체크 상태 */
[type="checkbox"]:checked.keepSave {
  width: 20px;
  height: 20px;
  padding: 0;
  outline: none;
  appearance: none;
  background-position: bottom;
  cursor: pointer;
}

.keepSave + label {
  margin-left: 10px;
  cursor: pointer;
}

.tab-content .guidetxt {
  padding: 10px 0 14px 0;
}

.tab-content .guidetxt li {
  font-size: 0.8rem;
  line-height: 1.2rem;
  text-align: left;
  padding: 6px;
}

.tab-content .btns-box {
  width: 100%;
  padding: 30px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tab-content .btns-box .social_btn {
  width: 30px;
  height: 30px;
  margin-left: 5px;
  outline: 1px solid #d1d1d1;
  display: inline-block;
}

/*--하트버튼 시작-----*/
.swiper-slide .btn-like {
  position: absolute;
  top: 40px;
  right: 40px;
  /* background: url("../images/ic/ic_heart_000.png") no-repeat; */
  background-size: cover;
  background-position: center;
  width: 30px;
  height: 30px;
  display: block;
  cursor: pointer;
  z-index: 1;
  opacity: 0.3;
}

.swiper-slide .btn-like:hover {
  opacity: 0.9;
}

.swiper-slide .btn-like.liked {
  transition: all 0.1s;
  width: 30px;
  height: 30px;
  /* background: url("../images/ic/ic_heart_001.png") no-repeat; */
  background-size: cover;
  background-position: center;
  opacity: 9;
  animation: move-top 0.5s;
  animation-fill-mode: forwards;
}

.swiper-slide .btn-like span {
  visibility: hidden;
}

/*--슬라이드 옵션아이템 class 시작----*/
.event:before {
  content: "EVENT";
  /* font-family: ; */
  line-height: 2rem;
  width: 100%;
  padding: 0 6px;
  color: #fff;
  background: #7f7f7f;
  border: 1px solid #e1e1e1;
  border-radius: 6px;
}

.new:before {
  content: "NEW";
  /* font-family: ; */
  display: block;
  color: #fc7600;
}

.hot:before {
  content: "HOT";
  /* font-family: ; */
  display: block;
  color: #e70000;
}

.soldout:before {
  content: "일시품절";
  /* font-family: ; */
  display: block;
  color: #888;
}

.swiper-slide .product-img.color1:after {
  content: "+1 colors";
  position: absolute;
  bottom: 4px;
  left: 4px;
  display: block;
  padding: 0px 4px;
  background: #ffffff99;
  transition: all 0.3s;
  opacity: 0;
}

/*supports box*/
.select {
  position: relative;
  width: 260px;
}

.select_default {
  padding: 13px 30px 13px 14px;
  text-align: left;
  line-height: 1rem;
  border: 1.5px solid #c4c4c4;
  border-radius: 10px;
  /* background: url("../images/ic/ic_all_angle_down.png") center right 14px */
  /* no-repeat; */
  background-size: 14px;
  background-color: #fff;
  cursor: pointer;
  /* 말줄임 */
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.select_default:hover {
  border: 1.5px solid #00bce7;
}

.option_list {
  display: none;
  position: absolute;
  width: 100%;
  top: 49px;
  left: 0;
  border: 1.5px solid #c4c4c4;
  box-shadow: 4px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  background: #fff;
  z-index: 10;
}

.select_default.on {
  background-size: 14px;
  border: 1.5px solid #00bce7;
}

.select_default.on + .option_list {
  display: block;
}

.option_list .option {
  padding: 7px 13px;
  background: #fff;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  /* 말줄임 */
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.option_list .option:hover {
  background: #5865f511;
}

/*----keyframes start--------*/
@keyframes move-top {
  0% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes fade-show-right {
  0% {
    transform: translateX(20px);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fade-show-left {
  0% {
    transform: translateX(-20px);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fade-show-top {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }

  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

@keyframes fade-show {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes scale {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.05);
  }
}

/*--nav start--------------*/
header {
  width: 100%;
  height: 60px;
  padding: 0 6%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  position: relative;
}

header .logo_link {
  height: 20px;
}

header .logo_link img {
  height: 100%;
}

header .head_menu {
  display: flex;
  align-items: center;
  gap: 20px;
}

header .head_menu .menu_item {
  color: #000;
  transition: color 0.2s;
  cursor: pointer;
}

header .head_menu .menu_item:hover {
  color: #00bce7;
}

header .head_menu .menu_item.pcview {
  display: none;
}

header .head_menu .material-symbols-outlined {
  font-size: 2rem;
  font-weight: 400;
  display: block;
}

/* nav 시작 */
header nav {
  position: absolute;
  top: 0;
}

header nav .nav-item {
  padding: 0 6%;
  position: relative;
}

header nav .nav-item .material-symbols-outlined {
  font-size: 2rem;
  line-height: 3.8rem;
  transform: rotate(0deg);
  transition: all 0.2s;
  cursor: pointer;
}

header nav .nav-item .material-symbols-outlined:hover {
  transform: rotate(180deg);
}

header nav .nav-item .nav_status {
  padding: 20px 0;
  color: #212121;
  transition: all 0.2s;
}

header nav .nav-item .nav_status img {
  width: 40px;
  cursor: pointer;
}

header nav .nav-item .nav_option {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
}

header nav .nav-item .nav_option li {
  font-size: 1.2rem;
  font-weight: 500;
  width: 100%;
  color: #464a4c;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
}

header nav .nav-item .nav_option li:hover {
  color: #00bce7;
  background: #5865f511;
}

header nav .nav-item .nav_option li:not(:last-child):after {
  content: "";
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translateY(-50%);
  width: 2px;
  height: 2rem;
  background: #ddd;
  display: block;
}

header nav .nav-item .gnb .gnb-d1 span {
  font-size: 1.2rem;
  font-weight: 500;
  padding: 14px 0;
  color: #464a4c;
  display: block;
  transition: all 0.3s;
  cursor: pointer;
}

header nav .nav-item .gnb .gnb-d1 span:hover {
  color: #00bce7;
}

#mognb {
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(100%);
  width: 100%;
  max-width: 500px;
  height: 100vh;
  background: #fff;
  z-index: 100;
  transition: all 0.2s;
  overflow-x: hidden;
  position: fixed;
}

#mognb.on {
  transform: translateX(-0%);
}

#mognb.hide {
  transform: translateX(100%);
}

header .search-item {
  padding: 0 6%;
}

header .search-item .material-symbols-outlined {
  font-size: 2rem;
  line-height: 3.8rem;
  transform: rotate(0deg);
  transition: all 0.2s;
  cursor: pointer;
}

header .search-item .material-symbols-outlined:hover {
  transform: rotate(180deg);
}

header .search-item .input_wrap {
  display: flex;
  align-items: center;
}

header .search-item .input_wrap button {
  width: 30px;
  height: 30px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xml:space='preserve' style='enable-background:new 0 0 40 40' viewBox='0 0 40 40'%3E%3Cpath d='m30.6 28.1 7.7 7.7-2.6 2.6-7.7-7.7c-7 5.6-17.2 4.5-22.8-2.6S.8 10.8 7.8 5.2 25 .8 30.6 7.8c4.7 5.9 4.7 14.3 0 20.3zM27 26.7c4.9-5 4.7-13-.3-17.9s-13-4.7-17.9.3-4.7 13 .3 17.9c4.9 4.8 12.7 4.8 17.6 0l.3-.3z'/%3E%3C/svg%3E");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

header .search-item .input_wrap button span {
  visibility: collapse;
}

header .search-item .remove {
  display: none;
}

header .search-item img {
  width: 100%;
}

header .subject {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

#search {
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(100%);
  width: 100%;
  max-width: 500px;
  height: 100vh;
  background: #fff;
  z-index: 100;
  transition: all 0.2s;
  overflow-x: hidden;
  position: fixed;
}

#search.on {
  transform: translateX(-0%);
}

#search.hide {
  transform: translateX(100%);
}

/*------------------------------------*/
.btns-box .purchase_like {
  /* background: url("../images/ic/ic_heart_000.png") no-repeat; */
  background-size: cover;
  background-position: center;
  width: 30px;
  height: 30px;
  display: block;
  cursor: pointer;
  opacity: 0.3;
}

.btns-box .purchase_like:hover {
  opacity: 0.9;
}

.btns-box {
  margin-top: -20px;
}

.btns-box .purchase_like.liked {
  transition: all 0.1s;
  width: 30px;
  height: 30px;
  /* background: url("../images/ic/ic_heart_001.png") no-repeat; */
  background-size: cover;
  background-position: center;
  opacity: 9;
  animation: move-top 0.5s;
  animation-fill-mode: forwards;
}

.btns-box .purchase_like span {
  visibility: hidden;
}

/*--article start-----*/
.purchase-sec {
  width: 100%;
  padding: 0 0;
  margin: 0 auto;
  /* border-top: 1px solid #ddd; */
}

.purchase-sec .product_wrap {
  margin: 0 auto;
}

.product_wrap .shopView .viewHeader {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.product_wrap .shopView .viewHeader .productImg {
  width: 100%;
  margin: 0 auto;
  background: #f1f1f1;
}

.product_wrap .shopView .viewHeader .productImg .mainImg {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px 0;
}

.product_wrap .shopView .viewHeader .productImg .mainImg img {
  width: 100%;
  object-fit: cover;
}

.product_wrap .shopView .viewHeader .productImg .subImg .swiper-slide {
  max-width: 600px;
  padding: 30px;
  cursor: pointer;
}

.product_wrap .shopView .viewHeader .productImg .subImg .swiper-slide img {
  transform: scale(1);
  transition: all 0.3s;
}

.product_wrap
  .shopView
  .viewHeader
  .productImg
  .subImg
  .swiper-slide:hover
  img {
  transform: scale(1.2);
}

.product_wrap .mySwiperProd .swiper-button-prev {
  width: 30px;
  height: 30px;
  /* background: url("../images/ic/ic_all_angle_left.png") no-repeat center left; */
  background-size: cover;
  opacity: 0.5;
  transform: translateX(-5px);
  transition: all 0.2s;
}

.product_wrap .mySwiperProd .swiper-button-next {
  width: 30px;
  height: 30px;
  /* background: url("../images/ic/ic_all_angle_right.png") no-repeat center right; */
  background-size: cover;
  opacity: 0.5;
  transform: translateX(5px);
  transition: all 0.2s;
}

.product_wrap .mySwiperProd .swiper-button-prev:hover {
  opacity: 1;
  transform: translateX(-10px);
}

.product_wrap .mySwiperProd .swiper-button-next:hover {
  opacity: 1;
  transform: translateX(10px);
}

.product_wrap .mySwiperProd .swiper-button-next::after,
.product_wrap .mySwiperProd .swiper-button-prev::after {
  display: none;
}

.product_wrap .shopView .viewHeader .productImg .subImg img {
  width: 100%;
  object-fit: cover;
}

.product_wrap .shopView .viewHeader .productInfo {
  width: 100%;
  padding: 0 6%;
  margin: 0 auto;
}

.product_wrap .shopView .viewHeader .productInfo .infoItem {
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #e6e6e6;
}

.product_wrap .shopView .viewHeader .productInfo .infoItem.title {
  padding: 30px 0 20px 0;
  display: flex;
  justify-content: space-between;
}

.product_wrap .shopView .viewHeader .productInfo .title .deliver {
  margin-top: 30px;
  color: #00bce7;
  display: block;
}

.product_wrap .shopView .viewHeader .productInfo .title .price {
  font-size: 2rem;
  font-weight: 700;
  line-height: 3rem;
}

.product_wrap
  .shopView
  .viewHeader
  .productInfo
  .infoItem.title
  .btns-box
  .purchase_like {
  margin-top: 10px;
}

.product_wrap .shopView .viewHeader .productInfo .itemOptions {
  padding: 16px 0;
}

.product_wrap .shopView .viewHeader .productInfo .membership > p {
  margin-bottom: 30px;
}

.product_wrap .shopView .viewHeader .productInfo .membership ul {
  display: flex;
  gap: 30px;
}

.product_wrap .shopView .viewHeader .productInfo .membership ul .vip {
  color: #00bce7;
}

.product_wrap .shopView .viewHeader .productInfo .colors {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.product_wrap .shopView .viewHeader .productInfo .colors .color-option {
  width: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product_wrap .shopView .viewHeader .productInfo .colors .color-option li {
  width: 24px;
  height: 24px;
  border: 3px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}

.product_wrap
  .shopView
  .viewHeader
  .productInfo
  .colors
  .color-option
  li:hover {
  border: 3px solid #00bce7;
}

.product_wrap .shopView .viewHeader .productInfo .colors .color-option .white {
  background: #ddd;
}

.product_wrap .shopView .viewHeader .productInfo .colors .color-option .black {
  background: #000;
}

.product_wrap .shopView .viewHeader .productInfo .colors .color-option li span {
  visibility: hidden;
}

.product_wrap .shopView .viewHeader .productInfo .itemOptions select {
  width: 100%;
  height: 40px;
  padding: 6px;
  display: block;
  border: 1px solid #cdcdcd;
}

/** 수정중! */
.selectOptionResult .options {
  display: none;
}

.selectOptionResult .options ul {
  width: 100%;
  padding: 30px 10px;
  margin-top: 15px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 10px 0;
  border: 1px solid #ddd;
}

.selectOptionResult .options ul li .count {
  margin: 0 10px;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
}

.selectOptionResult .options ul li .count .countbtn {
  width: 30px;
  padding: 0 10px;
  color: #bbb;
  cursor: pointer;
  /* transition: background: */
}

.selectOptionResult .options ul li .count input[type="number"] {
  font-weight: 700;
  width: 35px;
  text-align: right;
  outline: 0px;
  border: 0px;
}

.selectOptionResult .options ul > :nth-child(3) {
  min-width: 100px;
  text-align: right;
}

.product_wrap .shopView .viewHeader .productInfo .all-price {
  font-size: 1.2rem;
  padding: 20px 0;
  text-align: right;
  white-space: nowrap;
  display: block;
}

.product_wrap .shopView .viewHeader .productInfo .all-price span {
  font-size: 2rem;
  font-weight: 700;
  margin-right: 3px;
  color: #00bce7;
}

.product_wrap .shopView .viewHeader .productInfo > .btns-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

#warning {
  font-weight: 400;
  color: #00bce7;
  display: none;
}

/*----article start-------------*/
.purchaseinfo-sec .viewBody {
  max-width: 1200px;
  margin-top: 60px;
  padding: 120px 6%;
  margin: 0 auto;
}

.purchaseinfo-sec .viewBody .tabList {
  display: flex;
  justify-content: space-between;
}

.purchaseinfo-sec .viewBody .tabList .list {
  width: calc(100% / 3);
  line-height: 3rem;
  text-align: center;
  display: block;
  cursor: pointer;
  transition: 0.2s;
  border-bottom: 2px solid #ddd;
}

.purchaseinfo-sec .viewBody .tabList .list:hover,
.purchaseinfo-sec .viewBody .tabList .list.on {
  color: #00bce7;
  border-bottom: 2px solid #00bce7;
}

.purchaseinfo-sec .viewBody .tabCont {
  width: 100%;
}

.purchaseinfo-sec .viewBody .tabCont .tabInner {
  display: none;
}

.purchaseinfo-sec .viewBody .tabCont .tabInner.on {
  display: block;
}

@media screen and (min-width: 900px) {
  .purchase-sec {
    padding: 0 0;
  }

  .product_wrap .shopView {
    width: 88%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .product_wrap .shopView .viewHeader {
    flex-direction: row;
    gap: 60px;
  }

  .product_wrap .shopView .viewHeader .productImg {
    min-width: auto;
    max-width: 700px;
    padding: 0 0;
  }

  .product_wrap .shopView .viewHeader .productImg .mainImg {
    height: 600px;
  }

  .product_wrap .shopView .viewHeader .productImg .mainImg {
    max-width: 800px;
    padding: 0 0;
    max-height: auto;
  }

  .product_wrap .shopView .viewHeader .productInfo {
    width: 100%;
    max-width: auto;
    padding: 0 0;
  }

  .product_wrap .shopView .viewHeader .productInfo .membership ul li {
    display: flex;
    justify-content: space-between;
    gap: 15px;
  }

  .product_wrap .shopView .viewHeader .productInfo .all-price {
    width: 100%;
    padding: 15px 0 30px 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  /*----article start-------------*/
  .purchaseinfo-sec .viewBody {
    padding: 60px 0 120px 0;
    margin: 0 auto;
  }
}

.fourth h5,
.size1 h5 {
  font-family: "Noto Sans KR", sans-serif;
  float: right;
  font-size: 14px;
  color: #999;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

.third small,
.fourth small,
.detail small,
.size1 small,
.won small {
  font-size: 14px;
  line-height: 4rem;
  color: #000;
}

.fourth {
  width: 500px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
}

.fourth h5 {
  margin: 24px 10px 15px 0px;
}

.star {
  font-size: 15px;
  font-weight: bold;
  color: gold;
  cursor: pointer;
}
</style>
