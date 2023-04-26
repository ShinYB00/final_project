<template>
    <div style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; word-spacing: -2px; margin: 0 20px; padding: 25px 0 9px; border-bottom: 2px solid #666; color: #333; font-size: 20px; font-weight: bold;">
        주문자 정보
    </div>
    <div style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 14px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 0 20px;">
        <table style="border-collapse: collapse; margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 0; line-height: 0; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; border-spacing: 0; border-collapse: collapse; table-layout: fixed; width: 100%;">
            <caption style="visibility: hidden; width: 0; height: 0; font-size: 0; line-height: 0;"></caption>
            <colgroup>
                <col style="margin: 0; padding: 0; border: 0; box-sizing: border-box; width: 120px;">
                <col style="margin: 0; padding: 0; border: 0; box-sizing: border-box; width: *;">
            </colgroup>
            <tbody>
                <tr>
                    <th colspan="1" rowspan="1" scope="row"
                        style="width: 120px; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 14px 0 16px 16px; line-height: 20px; text-align: left; font-weight: normal; vertical-align: top; background: #f6f6f6; border-bottom: 1px solid #e6e6e6;">
                        이름
                    </th>
                    <td
                        style="width: 558px; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 14px 0 16px 16px; line-height: 20px; color: #333; border-bottom: 1px solid #e6e6e6;">
                        {{member.memberName}}
                    </td>
                </tr>
                <tr>
                    <th colspan="1" rowspan="1" scope="row"
                        style="width: 120px; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 14px 0 16px 16px; line-height: 20px; text-align: left; font-weight: normal; vertical-align: top; background: #f6f6f6; border-bottom: 1px solid #e6e6e6;">
                        핸드폰번호
                    </th>
                    <td
                        style="width: 558px; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 14px 0 16px 16px; line-height: 20px; color: #333; border-bottom: 1px solid #e6e6e6;">
                        <strong
                            style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; color: #666;">
                            {{member.phone}}
                        </strong>
                    </td>
                </tr>
                <tr>
                    <th colspan="1" rowspan="1" scope="row"
                        style="width: 120px; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 14px 0 16px 16px; line-height: 20px; text-align: left; font-weight: normal; vertical-align: top; background: #f6f6f6; border-bottom: 1px solid #e6e6e6;">
                        주소
                    </th>
                    <td
                        style="width: 558px; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 14px 0 16px 16px; line-height: 20px; color: #333; border-bottom: 1px solid #e6e6e6;">
                        <strong
                        style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; color: #55b9eb; letter-spacing: 0;">
                            {{ member.address1 }} {{ member.address2 }}
                        </strong>
                    </td>
                </tr>
                <tr>
                    <th colspan="1" rowspan="1" scope="row"
                        style="width: 120px; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 14px 0 16px 16px; line-height: 20px; text-align: left; font-weight: normal; vertical-align: top; background: #f6f6f6; border-bottom: 1px solid #e6e6e6;">
                        택배메세지
                    </th>
                    <td
                        style="width: 558px; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 14px 0 16px 16px; line-height: 20px; color: #333; border-bottom: 1px solid #e6e6e6;">
                        <input type="text" name="msg" id="msgInput" v-model="msg" style="width: 60%">
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {ref, watchEffect} from 'vue';

export default {
    props: {
        member: Object
    },
    emits: ['send-msg'],
    setup(props, {emit}){
        const msg = ref('');
        // const member = ref(
        //     // {id: 1, name: '홍길동', email: 'kosa@metanet.com', phone: '010-1234-5678', address: '서울', point: 0}
        // );

        // return{
        //     member
        // }
        watchEffect(() => {
            emit('send-msg', msg.value);
        });

        return{
            msg
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