<template>
    <div
        style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 20px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; margin: 0; padding: 0; border: 0; box-sizing: border-box; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; word-spacing: -2px; margin: 0 20px; padding: 25px 0 9px; border-bottom: 2px solid #666; color: #333; font-size: 20px; font-weight: bold;">
        결제 정보
    </div>
    <div
        style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 0 20px;">
        <div
            style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; overflow: hidden; padding: 6px 0 7px; padding: 8px 0 9px; background: url('http://m.oliveyoung.co.kr/mc-static-root/image/comm/bg_dashed02.png') repeat-x 0 0; background-size: 6px 1px; background: none;">
            <div
                style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; overflow: hidden; padding: 6px 0 7px;">
                <strong
                    style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; float: left; font-weight: normal;">
                    총 상품금액
                </strong>
                <span
                    style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; float: right; color: #f47330; font-weight: bold; letter-spacing: 0;">
                    {{totalPrice}}
                    <em
                        style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; display: inline-block; margin-left: 3px; font-style: normal; font-weight: bold; vertical-align: 2px; letter-spacing: -1px;">
                        원
                    </em>
                </span>
            </div>
        </div>

        <div
            style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; overflow: hidden; padding: 6px 0 7px; padding: 8px 0 9px;">

            <div
                style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; overflow: hidden; padding: 6px 0 7px;">
                <strong
                    style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; float: left; font-weight: normal;">
                    보유 포인트
                </strong>
                <span
                    style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; float: right; color: #f47330; font-weight: bold; letter-spacing: 0;">
                    {{member.point}}
                    <em
                        style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; display: inline-block; margin-left: 3px; font-style: normal; font-weight: bold; vertical-align: 2px; letter-spacing: -1px;">
                        원
                    </em>
                </span>
            </div>
            <div
                style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; overflow: hidden; padding: 6px 0 7px;">
                <strong
                    style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; float: left; font-weight: normal;">
                    사용 포인트
                </strong><br>
                <div id="errorMsg" v-show="toggleErrorMsg" style="color:red; font-size: 15px">입력한 포인트를 사용할 수 없습니다</div>
                <span
                    style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; float: right; color: #f47330; font-weight: bold; letter-spacing: 0;">
                    <input type="text" id="usePointNum" v-model="usePoint" @change="inputPoint" style="width: 90%">
                    <em
                        style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; display: inline-block; margin-left: 3px; font-style: normal; font-weight: bold; vertical-align: 2px; letter-spacing: -1px;">
                        원
                    </em>
                </span>
            </div>
            <div
                style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; overflow: hidden; padding: 6px 0 7px;">
                <strong
                    style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; float: left; font-weight: normal;">
                    결제수단
                </strong>
                <span
                    style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; float: right; color: #f47330; font-weight: bold; letter-spacing: 0;">
                    <select name="paymentMethod" id="method" :disabled="toggleDisabledPayMethod" v-model="selected">
                        <option id="optionId">선택</option>
                        <option value="카드">카드</option>
                        <option value="계좌이체">계좌이체</option>
                    </select>
                    <!-- <input type="hidden" name="method" id="methodInput" v-model="payment.method"/> -->
                </span>
            </div>
        </div>
        
        <div
            style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; overflow: hidden; padding: 6px 0 7px; padding: 8px 0 9px; background: url('http://m.oliveyoung.co.kr/mc-static-root/image/comm/bg_dashed02.png') repeat-x 0 0; background-size: 6px 1px; background: none;">
            <div
                style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; overflow: hidden; padding: 6px 0 7px;">
                <strong
                    style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; float: left; font-weight: normal;">
                    적립예정 포인트
                </strong>
                <span
                    style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; float: right; color: #f47330; font-weight: bold; letter-spacing: 0;">
                    {{accPoint}}
                    <em
                        style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; display: inline-block; margin-left: 3px; font-style: normal; font-weight: bold; vertical-align: 2px; letter-spacing: -1px;">
                        원
                    </em>
                </span>
            </div>
        </div>
        <div
            style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; border-top: 1px solid #e6e6e6">
            <div
                style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; overflow: hidden; padding: 10px 0 14px;">
                <strong
                    style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; float: left; padding: 11px 0 0; color: #ff2828;">
                    총 결제금액
                </strong>
                <span
                    style="margin: 0; padding: 0; border: 0; box-sizing: border-box; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; float: right; color: #ff2828; font-weight: bold; font-size: 28px; line-height: 38px; letter-spacing: 0;">
                    <p id="finalPrice" style="display: inline; color: #ff2828; margin-right: 5px; font-weight: bold;">{{paymentAmount}}</p>
                    <em
                        style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; display: inline-block; margin-left: 3px; font-style: normal; font-weight: bold; vertical-align: 2px; letter-spacing: -1px;">
                        원
                    </em>
                </span>
            </div>
        </div>
        
    </div>
</template>

<script>
import {ref, watchEffect} from 'vue';

export default {
    props: {
        orderDetails: Object,
        member: Object
    },
    emits: ['send-payInfo'],
    setup(props, {emit}){
        // const member = ref(
        //     // {id: 1, name: '홍길동', email: 'kosa@metanet.com', phone: '010-1234-5678', address: '서울', point: 0}
        // );
        const usePoint = ref(0);
        const totalPrice = ref(0);
        const paymentAmount = ref(0);
        const toggleErrorMsg = ref(false);
        const selected = ref('선택');
        const toggleDisabledPayMethod = ref(false);
        const accPoint = ref(0);

        const inputPoint = () => {
            toggleDisabledPayMethod.value = false;
            if(totalPrice.value < usePoint.value || props.member.point < usePoint.value){
                toggleErrorMsg.value = true;
                usePoint.value = 0;
                paymentAmount.value = totalPrice.value - usePoint.value;
            }
            else{
                toggleErrorMsg.value = false;
                paymentAmount.value = totalPrice.value - usePoint.value;
                if(paymentAmount.value == 0){
                    selected.value = '적립금';
                    toggleDisabledPayMethod.value = true;
                }
            }
        }

        const calTotalPrice = () => {
            totalPrice.value = 0;
            accPoint.value = 0;
            for(let i = 0; i < Object.keys(props.orderDetails).length; i++){
                totalPrice.value = totalPrice.value + props.orderDetails[i].orderPrice;
                accPoint.value += props.orderDetails[i].point;
            }
            paymentAmount.value = totalPrice.value;
        }

        console.log("포인트 줘" + props.member.point);

        watchEffect(() => {
            calTotalPrice();
            emit('send-payInfo', {
                method: selected.value,
                totalPrice: totalPrice.value,
                paymentPrice: paymentAmount.value,
                usePoint: usePoint.value
            });
        });

        return{
            // member,
            usePoint,
            totalPrice,
            paymentAmount,
            toggleErrorMsg,
            selected,
            accPoint,
            toggleDisabledPayMethod,
            inputPoint,
        }
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