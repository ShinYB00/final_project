<template>
    <div
        style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; word-spacing: -2px; margin: 0 20px; padding: 25px 0 9px; border-bottom: 2px solid #666; color: #333; font-size: 20px; font-weight: bold;">
        주문상품
    </div>
        
    <div style="overflow: hidden; margin: 0 20px;"
        v-for="detail in orderDetails" :key="detail.productIdx">
        <router-link
            style="float: left; :70 px; :70 px; margin: 20px 0;"
            :to="`/products/` + detail.productIdx" id="productImg">
            <img
                style="border: 0; width: 70px; height: 70px;"
                :src='`${detail.productImg}`'
                alt="">
        </router-link>
        <div
            style="float: left; width: 68%; margin: 0 0 0 15px; padding: 17px 0 15px;">
            <router-link
                style="color: #333; font-size: 17px; line-: 18px; display: block; text-decoration: none; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; :36 px; -webkit-box-orient: vertical; -webkit-line-clamp: 2; font-family: '맑은고딕', 'malgun gothic', 'dotum', sans-serif;"
                :to="`/products/` + detail.productIdx">
                <span style="font-weight: bolder;">[ {{detail.brand}} ]</span><br>{{detail.productName}}
            </router-link>
            <div
                style="color: #999; font-size: 12px; line-height: 16px; font-weight: bold;">
            </div>
            <div
                style="color: #999; font-size: 15px; line-height: 16px; font-weight: bold;">
                구매수량 : {{detail.orderQuantity}} 개
            </div>
            <div style="padding: 4px 0 0;">
            <span
                style="color: #333; font-size: 20px; font-weight: bold; padding: 0 0 0 7px;">
                {{detail.orderPrice}}
                <em
                    style="display: inline-block; color: #b0b0b0; font-style: normal; font-size: 15px; vertical-align: 1px; color: #333 !important; padding: 0 0 0 2px; vertical-align: 2px !important;">
                    원
                </em>
            </span>
            </div>
        </div>
        <input type="hidden" name="total_amount" value="{{detail.orderQuantity}}"/>
        <input type="hidden" name="price" value="{{detail.orderPrice}}"/>
    </div>
</template>

<script>
import {ref} from 'vue';

export default {
    props: {
        orderDetails: Object
    },
    setup(props, {emit}) {
        // const orderDetails = ref([
        //     {id: 1, quantity: 2, 
        //         productDTO: {id: 1, brand: '스윗밸런스', price: 5900, name: '오늘의 샐러드', img_url: 'https://img-cf.kurly.com/shop/data/goods/1655775819130l0.jpg'}}
        // ]);

        // return{
        //     orderDetails
        // }
    }

}
</script>

<style scoped>
h4{
    font-size: 24px;
}
h6{
    font-size: 16px;
}

</style>