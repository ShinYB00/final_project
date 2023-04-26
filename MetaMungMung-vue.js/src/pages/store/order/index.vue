<template>
  <div class="services_section layout_padding">
    <div class="container">

      <router-link :to="{ name: 'ProductPage' }">
        <h1 class="services_taital" style="margin-left: 10px; margin-bottom: 30px;">
          <span>스토어</span>
          <img
            src="@/assets/images/offMeeting/paw-print.png"
            style="width: 70px"
          />
          <span style="color: #1f1f1f">멍멍스토어</span>
        </h1>
      </router-link>
        
      <div class="page-section">
        <div class="container">
          <!--중단 상품리스트 -->
          <div style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 11px 0 0; color: #55b9eb; font-size: 32px; line-height: 41px; letter-spacing: -2px; font-weight: bold">
            주문하기
          </div>
        </div>
      </div>

      <form @submit.prevent="doPay">
      <!-- <form> -->
        <div class="contents">

          <OrderMemInfo :member="memberInfo" @send-msg="sendMsg"/>
          <OrderProductInfo :orderDetails="orderDetails"/>
          <OrderPayInfo :orderDetails="orderDetails" @send-payInfo="sendPayInfo" :member="memberInfo" />
          
          <div class="btnFooter">
            <button type="button" class="_btnCancel uButton -sizeXL -cancel" @click="cancel">취소</button>
            <button type="submit" class="_btnConfirm uButton -sizeXL -disabled" id="paymentBtn" @click="check">결제</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {useRoute, useRouter} from 'vue-router';
import {ref} from 'vue';
import axios from 'axios';
import OrderMemInfo from '../../../components/store/order/OrderMemInfo.vue';
import OrderProductInfo from '../../../components/store/order/OrderProductInfo.vue';
import OrderPayInfo from '../../../components/store/order/OrderPayInfo.vue';

export default {
  components:{
      OrderMemInfo,
      OrderProductInfo,
      OrderPayInfo
  },
  setup(){
    const route = useRoute();
    const router = useRouter();
    const productIdx = route.query.id;
    const orderQuantity = route.query.quantity;
    // const orderProducts = ref([]);
    const memberInfo = ref({}
      //  {memberIdx: 1, memberName: '홍길동', email: 'kosa@metanet.com', phone: '010-1234-5678', address1: '서울', address2: '5동 206호', point: 0}
    );
    const orderDetails = ref([
      // {id: 1, quantity: 2, 
      //   productDTO: {id: 1, brand: '스윗밸런스', price: 5900, name: '오늘의 샐러드', img_url: 'https://img-cf.kurly.com/shop/data/goods/1655775819130l0.jpg'}}
    ]);
    const usePoint = ref(0);
    const paymentAmount = ref(0);
    const totalPrice = ref(0);
    const msg = ref('');
    const selected = ref('');
    axios.defaults.headers.common['AUTHORIZATION'] = sessionStorage.getItem('token');
    const memberIdx = sessionStorage.getItem('memberIdx');
    

    // 주문상품 정보
    // const getProductsInfo = () => {
    //   orderProducts.add({
    //     productIdx: route.params.id,
    //     orderQuantity: route.params.quantity
    //   });
    // }

    // getProductsInfo();

    //회원 정보
    const getMemberInfo = async () => {
      try{
        const res = await axios.get('/members/my');
        memberInfo.value = {...res.data};
      } catch(err) {
        console.log(err);
      }
    }

    // 주문서 페이지
    const getOrderPage = async () => {
      let arr = [];
      for(let i = 0; i < route.query.id.length; i++){
        console.log(i);
        arr.push({
          productIdx: route.query.id[i],
          orderQuantity: route.query.quantity[i]
        });
      }
      try{
        const res = await axios.post('/orders', {
            orderProductList: arr
        });
        console.log(res.data.length);
        orderDetails.value = {...res.data};
        console.log(orderDetails.value);
      } catch(err) {
        console.log(err);
      }
    }

    getMemberInfo();
    getOrderPage();

    // 결제
    const doPay = async () => {
      if(paymentAmount.value !== 0 && selected.value === '선택'){
        return;
      }
      if(selected.value === '선택'){
        selected.value = '';
      }
      
      let totalQuantity = 0;
      let arr = [];
      for(let i = 0; i < Object.keys(orderDetails.value).length; i++){
        totalQuantity = totalQuantity + orderDetails.value[i].orderQuantity;
        let obj = {
          productIdx: orderDetails.value[i].productIdx,
          orderQuantity: orderDetails.value[i].orderQuantity
        }
        arr.push(obj);
      }

      console.log("총 수량: "+ totalQuantity);

      try{
        const res = await axios.post('/orders/payment', {
          deliveryMsg: msg.value,
          orderProductList: arr,
          orderQuantity: totalQuantity,
          orderPrice: totalPrice.value,
          method: selected.value,
          paymentPrice: paymentAmount.value,
          usePoint: usePoint.value
        });
        console.log("주문번호: " + res.data.order.orderIdx);
        router.push({
          name: 'OrderSuccess',
          params: {
            id: res.data.order.orderIdx
          }
        });
      }catch(err) {
        console.log("err !!!!!!!!!!!! :  " + err);
      }
      
    }

    const sendMsg = (deliveryMsg) => {
      msg.value = deliveryMsg;
    }

    const sendPayInfo = (obj) => {
      totalPrice.value = obj.totalPrice;
      selected.value = obj.method;
      paymentAmount.value = obj.paymentPrice;
      usePoint.value = obj.usePoint;
    }

    const cancel = () => {
      router.go(-1);
    }

    return {
      usePoint,
      memberInfo,
      orderDetails,
      totalPrice,
      paymentAmount,
      msg,
      doPay,
      sendMsg,
      sendPayInfo,
      cancel,
    }
  }
}
</script>

<style scoped>
button {
  padding: 20px 50px;
  border: none;
  border-radius: 40px;
  background-color: #89cbeb;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}
/* button {
  width: 90%;
  margin: 1rem 5% 5rem 5%;
  padding: 13px 0;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  background: #5f0080;
  border-radius: 4px;
  cursor: pointer;
} */
.btnFooter {
    margin: 40px 0 58px;
    text-align: center;
}
.btnFooter .-cancel {
    background: 0 0;
}
.btnFooter button {
    margin: 0 15px;
}
.uButton.-cancel {
    border: 1px solid #ccc;
    background: #fff;
    color: #666;
}
</style>