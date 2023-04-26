<template>
  <div style="margin-top: 50px; margin-bottom: 50px">
    <img class="productDetailImg" :src="product.productDetailImg" alt="" />
  </div>

  <div class="shCMSshop">
    <div class="shopView">
      <div class="viewBody">
        <!-- 상품정보 -->
        <table class="tproduct-info active">
          <tr>
            <td>상품명</td>
            <td>{{ productName }}</td>
            <td>분류</td>
            <td>{{ category }}</td>
          </tr>
          <tr>
            <td>용량</td>
            <td>{{ volume }}</td>
            <td>브랜드</td>
            <td>{{ brand }}</td>
          </tr>
          <tr>
            <td>제조년월일</td>
            <td>제조일로부터 일주일이내 포장된 제품으로 발송됩니다.</td>
            <td>품질유지기한</td>
            <td>제조일로부터 120일</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["product"],
  setup(props) {
    let productIdx = ref(0);
    let category = ref("");
    let productName = ref("");
    let brand = ref("");
    let price = ref(0);
    let productImg = ref("");
    let productDetail = ref("");
    let volume = ref("");
    let productDetailImg = ref("");

    productIdx.value = props.product.productIdx;
    category.value = props.product.category;
    productName.value = props.product.productName;
    brand.value = props.product.brand;
    price.value = props.product.price;
    productImg.value = props.product.productImg;
    productDetail.value = props.product.productDetail;
    volume.value = props.product.volume;
    productDetailImg.value = props.product.productDetailImg;

    return {
      productIdx,
      category,
      productName,
      brand,
      price,
      productImg,
      productDetail,
      volume,
      productDetailImg,
    };
  },
};
</script>

<style scoped>
/*테이블 기본 셋팅*/
table tr {
  border-top: 1px solid #d4d4d4;
}

/*상품 정보*/
.tproduct-info {
  width: 100%;
}
.tproduct-info tr:first-child {
  border-top: 1px solid #d4d4d4;
}
.tproduct-info tr td {
  padding: 0 13px;
  line-height: 20px;
}
.tproduct-info tr td:first-child {
  background: #f2f2f2;
  height: 50px;
  padding-left: 20px;
  width: 16.5%;
}
.tproduct-info tr td:nth-child(3) {
  background: #f2f2f2;
  width: 16.5%;
  padding-left: 20px;
}
</style>
