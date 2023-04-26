<template>
    <div class="page-section">
        <div class="container">
            <!--중단 상품리스트 -->
            <div style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 11px 0 0; color: #222; font-size: 32px; line-height: 41px; letter-spacing: -2px;">
                주문이 정상적으로 
                <strong style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; color: #222; font-size: 32px; line-height: 41px; letter-spacing: -2px;">
                    완료
                </strong>
                되었습니다.
            </div>
            <router-link :to="{name: 'OrderDetail', params: {id: orderIdx}}" style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-: 22px; font-family: '맑은고딕', 'malgun gothic', 'dotum', sans-serif; letter-spacing: -1px; display: inline-block; min-: 135px; :40 px; margin: 19px 0 0; padding: 8px 15px 10px; border-radius: 5px; border: 0; background: #89cbeb; color: #fff; font-size: 17px; line-: 22px; letter-spacing: -1px; font-family: 'nanumbarungothicbold'; font-weight: bold; cursor: pointer; text-decoration: none; text-align: center;">
                주문내역조회
            </router-link>
        </div>
    </div>

    <div class="contents">
        <div
            style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; word-spacing: -2px; margin: 0 20px; padding: 25px 0 9px; border-bottom: 2px solid #666; color: #333; font-size: 20px; font-weight: bold;">
            주문자 정보
        </div>
        <div
            style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 0 20px;">
            <table
                style="border-collapse: collapse; margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 0; line-height: 0; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; border-spacing: 0; border-collapse: collapse; table-layout: fixed; width: 100%;">
                <caption
                    style="visibility: hidden; width: 0; height: 0; font-size: 0; line-height: 0;">
                </caption>
                <colgroup>
                    <col
                        style="margin: 0; padding: 0; border: 0; box-sizing: border-box; width: 120px;">
                    <col
                        style="margin: 0; padding: 0; border: 0; box-sizing: border-box; width: *;">
                </colgroup>
                <tbody>
                    <tr>
                        <th colspan="1" rowspan="1" scope="row"
                            style="width: 120px; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 17px 0 16px 16px; line-height: 20px; text-align: left; font-weight: normal; vertical-align: top; background: #f6f6f6; border-bottom: 1px solid #e6e6e6;">
                            주문자
                        </th>
                        <td
                            style="width: 558px; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 17px 0 16px 16px; line-height: 20px; color: #333; border-bottom: 1px solid #e6e6e6;">
                            {{member.memberName}}
                        </td>
                    </tr>
                    <tr>
                        <th colspan="1" rowspan="1" scope="row"
                            style="width: 120px; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 17px 0 16px 16px; line-height: 20px; text-align: left; font-weight: normal; vertical-align: top; background: #f6f6f6; border-bottom: 1px solid #e6e6e6;">
                            주문일자
                        </th>
                        <td
                            style="width: 558px; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 17px 0 16px 16px; line-height: 20px; color: #333; border-bottom: 1px solid #e6e6e6;">
                            <strong
                                style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; color: #666;">
                                {{order.createDate}}
                            </strong>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="1" rowspan="1" scope="row"
                            style="width: 120px; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 17px 0 16px 16px; line-height: 20px; text-align: left; font-weight: normal; vertical-align: top; background: #f6f6f6; border-bottom: 1px solid #e6e6e6;">
                            주문번호
                        </th>
                        <td
                            style="width: 558px; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 17px 0 16px 16px; line-height: 20px; color: #333; border-bottom: 1px solid #e6e6e6;">
                            <strong
                                style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; color: #89cbeb; letter-spacing: 0;">
                                {{order.orderIdx}}
                            </strong>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div
            style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; word-spacing: -2px; margin: 0 20px; padding: 25px 0 9px; border-bottom: 2px solid #666; color: #333; font-size: 20px; font-weight: bold;">
            배송상품 정보
        </div>


        <div style="overflow: hidden; margin: 0 20px;"
            v-for="detail in order.orderDetailList" :key="detail.productDTO.productIdx">
            <router-link target="_blank"
                style="float: left; :70 px; :70 px; margin: 20px 0;"
                :to="`/products/` + detail.productDTO.productIdx" id="productImg">
                <img
                    style="border: 0; width: 70px; height: 70px;"
                    :src='detail.productDTO.productImg'
                    alt="">
            </router-link>

            <div
                style="float: left; width: 68%; margin: 0 0 0 15px; padding: 17px 0 15px;">
                <router-link target="_blank"
                    style="color: #333; font-size: 17px; line-: 18px; display: block; text-decoration: none; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; :36 px; -webkit-box-orient: vertical; -webkit-line-clamp: 2; font-family: '맑은고딕', 'malgun gothic', 'dotum', sans-serif;"
                    :to="`/products/` + detail.productDTO.productIdx">
                    {{detail.productDTO.brand}}<br>{{detail.productDTO.productName}}
                </router-link>
                <div
                    style="color: #999; font-size: 12px; line-height: 16px; font-weight: bold;">
                </div>
                <div
                    style="color: #999; font-size: 15px; line-height: 16px; font-weight: bold;">
                    구매수량 : {{detail.quantity}} 개
                </div>
                <div style="padding: 4px 0 0;">

                    <span
                        style="color: #333; font-size: 20px; font-weight: bold; padding: 0 0 0 7px;">
                        {{order.orderPrice}}
                        <em
                            style="display: inline-block; color: #b0b0b0; font-style: normal; font-size: 17px; vertical-align: 1px; color: #333 !important; padding: 0 0 0 2px; vertical-align: 2px !important;">
                            원
                        </em>
                    </span>
                    
                </div>
            </div>
        </div>


        <div
            style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 20px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; margin: 0; padding: 0; border: 0; box-sizing: border-box; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; word-spacing: -2px; margin: 0 20px; padding: 25px 0 9px; border-bottom: 2px solid #666; color: #333; font-weight: bold;">
            배송지 정보
        </div>
        <div
            style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 0 20px;">
            <table
                style="border-collapse: collapse; margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 0; line-height: 0; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; border-spacing: 0; border-collapse: collapse; table-layout: fixed; width: 100%;">
                <caption
                    style="visibility: hidden; width: 0; height: 0; font-size: 0; line-height: 0;"></caption>
                <colgroup>
                    <col
                        style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; width: 120px;">
                    <col
                        style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; width: *">
                </colgroup>
                <tbody>
                    <tr>
                        <th colspan="1" rowspan="1" scope="row"
                            style="width: 120px; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 17px 0 16px 16px; line-height: 20px; text-align: left; font-weight: normal; vertical-align: top; background: #f6f6f6; border-bottom: 1px solid #e6e6e6;">
                            받는분
                        </th>
                        <td
                            style="width: 558px; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 17px 0 16px 16px; line-height: 20px; color: #333; border-bottom: 1px solid #e6e6e6;">
                            {{member.memberName}}
                        </td>
                    </tr>
                    <tr>
                        <th colspan="1" rowspan="1" scope="row"
                            style="width: 120px; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 17px 0 16px 16px; line-height: 20px; text-align: left; font-weight: normal; vertical-align: top; background: #f6f6f6; border-bottom: 1px solid #e6e6e6;">
                            연락처1
                        </th>
                        <td
                            style="width: 558px; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 17px 0 16px 16px; line-height: 20px; color: #333; border-bottom: 1px solid #e6e6e6;">
                            <span
                                style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; letter-spacing: 0;">
                                {{member.phone}}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="1" rowspan="1" scope="row"
                            style="width: 120px; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 17px 0 16px 16px; line-height: 20px; text-align: left; font-weight: normal; vertical-align: top; background: #f6f6f6; border-bottom: 1px solid #e6e6e6;">
                            주소
                        </th>
                        <td
                            style="width: 558px; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 17px 0 16px 16px; line-height: 20px; color: #333; border-bottom: 1px solid #e6e6e6;">
                            {{ member.address1 }} {{ member.address2 }}
                        </td>
                    </tr>
                    <tr>
                        <th colspan="1" rowspan="1" scope="row"
                            style="width: 120px; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 17px 0 16px 16px; line-height: 20px; text-align: left; font-weight: normal; vertical-align: top; background: #f6f6f6; border-bottom: 1px solid #e6e6e6;">
                            택배메세지
                        </th>
                        <td
                            style="width: 558px; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 17px 0 16px 16px; line-height: 20px; color: #333; border-bottom: 1px solid #e6e6e6;">
                            {{order.deliveryMsg}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div
            style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 20px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; margin: 0; padding: 0; border: 0; box-sizing: border-box; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; word-spacing: -2px; margin: 0 20px; padding: 25px 0 9px; border-bottom: 2px solid #666; color: #333; font-weight: bold;">
            결제정보
        </div>
        <div
            style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; padding: 0 20px;">
            <div
                style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; overflow: hidden; padding: 6px 0 7px; padding: 8px 0 9px; background: url('http://m.oliveyoung.co.kr/mc-static-root/image/comm/bg_dashed02.png') repeat-x 0 0; background-size: 6px 1px; background: none;">
                <div
                    style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; overflow: hidden; padding: 6px 0 7px;">
                    <strong
                        style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 20px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; float: left; font-weight: normal;">
                        총 상품금액
                    </strong>
                    <span
                        style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 20px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; float: right; color: #f47330; font-weight: bold; letter-spacing: 0;">
                        {{order.orderPrice}}
                        <em
                            style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 20px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; display: inline-block; margin-left: 3px; font-style: normal; font-weight: bold; vertical-align: 2px; letter-spacing: -1px;">
                            원
                        </em>
                    </span>
                </div>
            </div>

            <div
                style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; overflow: hidden; padding: 6px 0 7px; padding: 8px 0 9px; background: url('http://m.oliveyoung.co.kr/mc-static-root/image/comm/bg_dashed02.png') repeat-x 0 0; background-size: 6px 1px;">

                <div
                    style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; overflow: hidden; padding: 6px 0 7px;">
                    <strong
                        style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; float: left; font-weight: normal;">
                        메타멍멍 포인트
                    </strong>
                    <span
                        style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; float: right; color: #f47330; font-weight: bold; letter-spacing: 0;">
                        - {{payment.usePoint}}
                        <em
                            style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; display: inline-block; margin-left: 3px; font-style: normal; font-weight: bold; vertical-align: 2px; letter-spacing: -1px;">
                            원
                        </em>
                    </span>
                </div>
            </div>

            <div
                style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; border-top: 1px solid #e6e6e6;">
                <div
                    style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; overflow: hidden; padding: 10px 0 17px;">
                    <strong
                        style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; float: left; padding: 11px 0 0; color: #ff2828;">
                        총 결제금액
                    </strong>
                    <span
                        style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; float: right; color: #ff2828; font-weight: bold; font-size: 28px; line-height: 38px; letter-spacing: 0;">
                        {{payment.paymentPrice}}
                        <em
                            style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; display: inline-block; margin-left: -3px; font-style: normal; font-weight: bold; vertical-align: 2px; letter-spacing: -1px;">
                            원
                        </em>
                    </span>
                    <br><br>
                    <strong
                        style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; float: left; padding: 11px 0 0; color: #f47330;">
                        포인트 적립 예정
                    </strong>
                    <span
                        style="margin: 0; margin-right: -10px; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; float: right; color: #f47330; font-weight: bold; letter-spacing: 0;">
                         + {{payment.accPoint}} 원
                        <em
                            style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; display: inline-block; margin-left: 3px; font-style: normal; font-weight: bold; vertical-align: 2px; letter-spacing: -1px;">
                            
                        </em>
                    </span>
                </div>
            </div>


            <div
                style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; overflow: hidden; padding: 6px 0 7px; padding: 8px 0 9px; background: url('http://m.oliveyoung.co.kr/mc-static-root/image/comm/bg_dashed02.png') repeat-x 0 0; background-size: 6px 1px;">
                <div
                    style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; overflow: hidden; padding: 6px 0 7px;">
                    <strong
                        style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; float: left; font-weight: normal;">
                        결제수단
                    </strong>
                    <span
                        style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; float: right; font-weight: bold; text-align: right;">

                        {{payment.method}}
                        <em
                            style="margin: 0; padding: 0; border: 0; box-sizing: border-box; font-size: 17px; line-height: 22px; font-family: '맑은고딕', 'Malgun Gothic', 'dotum', sans-serif; letter-spacing: -1px; display: block; font-style: normal; letter-spacing: -0.5px;">

                            <p v-if="payment.method === '카드'" style="margin: 0; font-size: 17px">
                                일시불({{payment.createDate.split('T')[0]}})
                            </p>
                            <p v-else-if="payment.method === '계좌이체'" style="margin: 0; font-size: 17px">
                                입금 완료({{payment.createDate.split('T')[0]}})
                            </p>
                        </em>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue';
import {useRoute} from 'vue-router';
import axios from 'axios';

export default {
    setup(){
        axios.defaults.headers.common['AUTHORIZATION'] = sessionStorage.getItem('token');
        const memberIdx = sessionStorage.getItem('memberIdx');

        const route = useRoute();
		const member = ref({}
			// {memberIdx: 1, memberName: '홍길동', email: 'kosa@metanet.com', phone: '010-1234-5678', address1: '서울', address2: '5동 206호', point: 0}
		);
		const products = ref([
			// {id: 3, brand: '크리넥스', price: 28800, name: '데코앤소프트 화장지', img_url: '1637926173262l0.jpeg', quantity: 1}
		]);
		const order = ref({}
			// {id: 1, orders_date: '2023-03-27', status: '배송완료', total_amount: 2, price: 11800, m_id: 5}
		);
		const orderDetails = ref([
			// {o_id: 1, quantity: 1, productDTO: {id: 3, brand: '크리넥스', price: 28800, name: '데코앤소프트 화장지', img_url: '1637926173262l0.jpeg', quantity: 1}}
		]);
		const payment = ref({}
			// {id: 1, o_id: 1, m_id: 5, method: '카드', payment_amount: 28800}
		);
		const usePoint = ref(0);
    	const totalPrice = ref(0);
        const orderIdx = ref(route.params.id);
		// const msg = ref('');

		const getSuccessPage = async () => {
			try{
				const res = await axios.get('/orders/' + route.params.id);
				console.log(res);
				payment.value = {...res.data.payment};
				order.value = {...res.data.order};
				// orderDetails.value = {...res.data.orderProducts};
				// totalPrice.value = orderDetails.value[0].productDTO.price * orderDetails.value[0].productDTO.quantity;
			}catch(err) {
				console.log("err !!!!!!!!!!!! :  " + err);
			}
		}
		getSuccessPage();

        //회원 정보
        const getMemberInfo = async () => {
            try{
                const res = await axios.get('/members/my');
                member.value = {...res.data};
            } catch(err) {
                console.log(err);
            }
        }
        getMemberInfo();

		return{
			member,
			order,
			orderDetails,
			payment,
			usePoint,
			totalPrice,
            orderIdx
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