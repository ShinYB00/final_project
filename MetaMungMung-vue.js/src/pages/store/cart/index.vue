<template>
        <div class="page-section">
          <div class="container">
            <div class="cart_table" id="kang">
                <p><strong style="color:black;margin-top:30px">장바구니</strong><img src="@/assets/images/offMeeting/paw-print.png"/></p>
                <ul class="cart_list">
                  <!--맨 위 전체선태그 삭제 버튼-->
                  <li> 
                        <!-- <div class="checkbox"> -->
                            <!-- <input type="checkbox" name="all_chk" id="all_chk"  @click="checkAll($event.target.checked)"> -->
                            <!-- <input type="checkbox" v-model="allSelected" @change="selectAll">
                            <label for="all_chk" style="margin-left:5px" >전체선택</label>
                        </div> -->
                        <!-- <div class="del_btn">삭제 (<span class="num">0</span>)</div> -->
                  </li>
                    
  
                    <!--장바구니 리스트-->
                <div>
                </div>

                  <div v-for="(cart, index) in cartList" :key="index" >
                      <li class="cell">
                          <!-- 상품 체크박스 부분--> 
                            <div class="checkbox">
                              <input type="checkbox" v-model="selectedProducts" :value="index"> 
                            </div>
                    
                          <div class="item_detail">
                              <tr>
                                  <td class="td_width cart_info_td">
                                      <!--상품 개당 가격,  상품 갯수, 상품 갯수에 맞는 가격 -->
                                      <!-- <input class="productPrice" type="hidden"><span>{{ cart.price }}</span>
                                      <input class="productQuantitiy" type="hidden"><span>{{ cart.quantity }}</span> -->
                                      <!-- <input class="productTotalPrice" type="hidden"><span>{{ cart.price * cart.price }}</span> -->
                                          <!-- <div class="productPrice"><span>{{ cart.price }}</span></div>
                                          <div class="productQuantitiy"><span>{{ cart.quantity }}</span></div>
                                          <div class="productTotalPrice"><span>{{ cart.product_price * cart.quantity }}</span></div> -->
                                  </td>
                              </tr>
                              <!--상품 이미지, 상품 이름-->
                              <img class="cart-img" :src=cart.productList[0].productImg>
                              <p class="productName"><span>{{ cart.productList[0].productName }}</span></p>
                          </div> 
                          <!--상품 갯수 변경하는 버튼과 상품 갯수에 따른 가격 변동-->
                          <div class="opt_info">
                              <div class="price_btn" style="white-space:nowrap">
                                  <strong class="price_unit">{{ cart.productList[0].price }}</strong>원
                                  <input type="button" class="minus_btn" @click="minusBtn(index)"> 
                                  {{cart.quantity}}
                                  <!-- <input type="text" v-model="cart.quantity" min="1" max="10"> -->
                                  <!-- <span class="product_count" style="margin-left:10px">{{ product.quantity }}</span> -->
                                  <!-- <input type="text" class="product_count" style="margin-left:10px">{{ cart.quantity }} -->
                                  <input type="button" class="plus_btn" style="margin-left:5px" @click="plusBtn(index)">
                                <span class="total_p">
                                  <strong class="price_amount" style="margin-left:10px" ><span>{{ cart.productList[0].price * cart.quantity }}</span></strong><span style="margin-left:10px">원</span>
                                  <span type="button" @click="removeItem(index, cart.productIdx)" class="del_li_btn"><img src="https://tictoc-web.s3.ap-northeast-2.amazonaws.com/web/img/icon/btn_del_circle.svg"></span>
                                </span>
                              </div>
                          </div>
                      </li>
                  </div> <!-- for 문 끝남 -->
                  <span></span>
                </ul>
    
                <!--밑에 결제 정보 텍스트-->
                <div class="cart_total_area">
                    <p><strong>결제 정보</strong></p>
    
                    <div class="cart_total_price" style="white-space : nowrap;text-align: center">
                        <div style="margin-left:200px">
                        <p>총 상품금액 <strong class="item_price" style="color:#87cefa"><span>{{ totalPrice }}</span></strong>원<span class="plus_ic"></span></p>
                        <p><strong class="total_price color-red" style="color:#87cefa">무료배송<img src="@/assets/images/offMeeting/paw-print.png" style="width:8%;height:8%"/></strong></p>
                        </div>
                    </div>
                </div>
    
                <!--밑에 계속 쇼핑하기, 결제하기 버튼-->
                <div class="btn_box">
                    <button type="button" onclick="history.go(-1);return false;" class="btn wh-btn" style="border-color:#87cefa;background:white">계속 쇼핑하기</button>
                    <button type="button" @click="order" class="btn black-btn" style="background-color:#87cefa">구매하기</button>
                </div>
              </div>
            </div>
        </div>
    
      <div class="agree"></div> <!-- 이거 지우지 마세요! -->
  </template>
  <script>
  import { computed, ref, onMounted } from "vue";
  import axios from 'axios';
  import { useRouter } from "vue-router";
  export default {
        setup() {

            const router = useRouter();
                
            const selectedProducts = ref([]);
            const allSelected = ref(false);

            const cartList = ref([]);
            let allChecked = false;

            let total = ref(0);

            const removeItem = (index, productID) => {
                 console.log("삭제 버튼 눌렸음");
                 cartList.value.splice(index, 1);

                 axios.delete('/cart/' + productID, {})
                .then(res => {
                    console.log(res.data)
                })
                .catch((error) => {
                    console.log(error);
                });
            };


            onMounted(async () => {
                
                    const response = await axios.get('/cart');
                    cartList.value = response.data;

                    console.log(`!!!!! :: ${JSON.stringify(cartList.value, null)}`)

            })


            const totalPrice = computed(() => {
            //    console.log(`"000000!!!" ${JSON.stringify(cartList.value[0].productList[0].price, null, 2)}`)
                
                let total = 0;
                for (let i = 0; i < Object.keys(cartList.value).length; i++) {
                    total += cartList.value[i].productList[0].price * cartList.value[i].quantity;
                }
                return total;
            });

            function selectAll() {
                console.log(`"SELECT ALL" ${allSelected.value}`)
                allSelected.value = !allSelected.value;

                if (allSelected.value) {
                    selectedProducts.value = [...Object.keys(cartList.value)];
                    console.log(`#### ${JSON.stringify(selectedProducts.value, null, 2)}`)
                } else {
                    selectedProducts.value = [];
                }
            };
        

        const minusBtn = (index) => {
            if (cartList.value[index].quantity > 1) {
                const cnt = --cartList.value[index].quantity;

                const cartIdx = cartList.value[index].cartIdx;
                const productIdx = cartList.value[index].productIdx;

                axios.patch('/cart/' + cartIdx, 
                    {
                        quantity: cnt,
                        productIdx: productIdx,
                       // memberIdx: member.value.memberIdx
                    }).then(res => {
                        console.log(`HYE!! :     ${res.data}`)
                    })
                    .catch((error) => {
                    console.log(error);
                    });
             } else {
                 // TODO: alert 창 띄우기
                 return 0;
             }
        };
    
        const plusBtn = (index) => {
            const cnt = ++cartList.value[index].quantity

            const cartIdx = cartList.value[index].cartIdx;
            const productIdx = cartList.value[index].productIdx;

            axios.patch('/cart/' + cartIdx , 
            {
                quantity: cnt,
                productIdx: productIdx,
              //  memberIdx: member.value.memberIdx,
            }
            ).then(res => {
                console.log(`!! ${res.data}`)
            })
            .catch((error) => {
            console.log(error);
            });

            return cnt;
        };
        // i : index / index : productId
        const deleteBtn = (i, index) => {
            // index => cart.productIdx

            console.log("삭제 버튼 눌렸음");
            console.log(`INDEX: ${index}`)
            console.log(`$$$$$tt삭제될 카드 인덱스99999 ${JSON.stringify(cartList.value[index], null, 2)}`);

         //   const cnt = cartList.value[index].quantity
         //   const cartIdx = cartList.value[index].cartIdx;
           // const productIdx = cartList.value[index].productIdx;

         //   console.log(`####### ${productIdx}`);
                console.log(`CART!!!!: ${JSON.stringify(cartList.value[i].productIdx, null, 2)}`);
                console.log(`cartList@@@ ${JSON.stringify(cartList.value, null, 2)}`);
                console.log(`cartLiiiiiiiii ${i}`);
            
            delete cartList.value[i];
 

              //  cartList.value.splice(index, 1);
           // cartList.value.splice(index, 1);
        
     //  console.log(`$$$$$tt삭제될 카드 인덱스111 ${productIdx}`);
       console.log(`$$$$$tt삭제될 카드 인덱스222 ${index}`);



                // router.go();

                
        };

            function deleteProduct(index) {
                cartList.splice(index, 1);
            }

        const checkedAll = (checked) => {
            this.allChecked = checked
                for (let i in this.cartList) {
                    this.cartList[i].selected = this.allChecked;
                }
        };

        const selected = (event) => {
            for (let i in this.boardList) {
                    if(! this.boardList[i].selected) {
                        this.allChecked = false;
                        return;
                    } else {
                        this.allChecked = true;
                    }
                }
        };

       // !!!!!!현주 구매하기 버튼!!!!!! cartList 보내주기
        const order = () => {
            console.log(`@@@ ${JSON.stringify(cartList.value, null, 2)}`)
            /*axios.post('/orders/', 
                {
                    cartList: cartList.value,
                    
                }).then(res => {
                    console.log(`order ERR!! : ${res.data}`)
                })
                .catch((error) => {
                console.log(error);
                });*/
               
            let productIdxArr = [];
            let quantityArr = [];
            for(let item in cartList.value){
                console.log(cartList.value[item]);
                productIdxArr.push(cartList.value[item].productList[0].productIdx);
                quantityArr.push(cartList.value[item].quantity);
            }
            console.log(productIdxArr);
            console.log(quantityArr);
             /*배열로 보내기*/
            router.push({
                name: "Order",
                query: { id: productIdxArr, quantity: quantityArr },
            });
        };

    

        return {
            cartList,
            //getCartProductList,
            minusBtn,
            plusBtn,
            deleteBtn,
            total,
            selected,
            checkedAll,
            allChecked,

            selectedProducts,
            selectAll,
            totalPrice,
            deleteProduct,
            allSelected,

            order,
            router,
           // member,
           removeItem,
        
        };
        }
  };
  </script>
  <style scoped>
    .cart_table {
        padding-top: 4.5rem;
    }
    .cart_table > p {
        margin-top: 60px;
        font-size: 3rem;
        border-bottom: 3px solid #87cefa;
        padding-bottom: 10px;
        padding: 0 0 10px 40px;
    }
    .cart_table  > p > img{
        width: 70px;
        height: 70px;
    }
    .cart_table .cart_list {
        padding: 4rem;
        font-size: 14px;
    }
    .cart_table .cart_list li > div {
        display: inline-block;
        position: relative;
    }
    .cart_table .cart_list li:first-of-type .del_btn {
        float: right;
        background: url(https://tictoc-web.s3.ap-northeast-2.amazonaws.com/web/img/icon/icon_trash.svg)
        no-repeat 5px;
        border: 1px solid #222;
        margin-bottom: 1.5rem;
        padding: 2px 5px 2px 25px;
    }
    .cart_table .cart_list li {
        border-bottom: 1px solid #ccc;
        padding: 15px 0;
        position: relative;
    }
    .cart_table .cart_list li > div.item_detail span {
        display: inline-block;
        font-size: 20px;
        width: 60%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        margin-left: 100px;
        color: #666;
    }
    .cart_table .cart_list li > div.item_detail .txt {
        margin-top: 1rem;
    }
    
    
    .cart_table .cart_list li > div.opt_info {
        position: absolute;
        right: 0;
        top: 34%;
        max-width: 39%;
        width: 300px;
    }
    
    .cart_table .cart_list li > div.opt_info .price_btn input {
        font-size: 25px;
        margin-left: 2px;
        cursor: pointer;
        color: #ccc;
        width: 30px;
        height: 30px;
        border: 0;
        outline: 0;
        display: inline-block;
        text-align: center;
        vertical-align: top;
        background-size: cover !important;
    }
    .cart_table .cart_list li > div.opt_info .price_btn input.minus_btn {
        background: url(https://tictoc-web.s3.ap-northeast-2.amazonaws.com/web/img/icon/btn_minus.svg)
        no-repeat center;
    }
    .cart_table .cart_list li > div.opt_info .price_btn input.plus_btn {
        background: url(https://tictoc-web.s3.ap-northeast-2.amazonaws.com/web/img/icon/btn_plus.svg)
        no-repeat center;
    }
    .cart_table .cart_list li > div.opt_info .price_btn span.number .price_unit {
        padding-bottom: 20px;
        font-size: 25px;
        background: #f5f5f5;
        color: #666;
        margin: 0 5px;
    }
    .cart_table .cart_list li > div.opt_info > div.price_unit div.price {
        display: inline-block;
        padding-bottom: 20px;
    }
    .cart_table .cart_list li > div.opt_info > div.price_btn > span.total_p text{
        font-size: 22px;
        /* float: right; */
        margin-left: 20px;
        padding-bottom: 20px;
    }
    .cart_table .cart_list li > div.opt_info > div.price_btn > span.total_p strong {
        vertical-align: sub;
        margin-right: 30px;
        font-size: 20px;
        padding-bottom: 20px;
    }
    .cart_table .cart_list li > div.opt_info > div.price_btn > span.total_p span {
        width: 40px;
        display: inline-block;
        padding-bottom: 20px;
    }
    .cart_table .cart_list li > div.item_detail {
        width: 60%;
    }
    
    .cart_table .cart_list li > div.item_detail img {
        max-width: 150px;
        width: 25%;
        margin: 0 5%;
        float: left;
    }
    .cart_table .cart_total_area {
        padding: 0 4rem;
    }
    .cart_table .cart_total_area > p {
        font-size: 20px;
    }
    .cart_table .cart_total_area .cart_total_price {
        border: 2px solid #707070;
        padding: 2rem;
        margin: 2rem auto;
        text-align: center;
    }
    .cart_table .cart_total_area .cart_total_price p {
        display: inline-block;
        text-align: left;
    }
    .cart_table .cart_total_area .cart_total_price p > span {
        width: 22px;
        height: 22px;
        display: inline-block;
        vertical-align: middle;
        margin: 0 20px;
        background-size: cover !important;
    }
    .plus_ic {
        background: url(https://tictoc-web.s3.ap-northeast-2.amazonaws.com/web/img/icon/ic_plus_sqaure.svg);
    }
    .equal_ic {
        background: url(https://tictoc-web.s3.ap-northeast-2.amazonaws.com/web/img/icon/ic_equal_square.svg);
    }
    .cart_table .cart_total_area .cart_total_price p > strong {
        display: inline-block;
        margin-left: 10px;
        margin: 0 5px 0 10px;
        font-size: 30px;
        vertical-align: unset;
    }
    .cart_table .btn_box {
        padding: 4rem;
        text-align: center;
    }
    .cart_table .btn_box .btn {
        padding: 10px 0;
        width: 24%;
        margin: 0 1%;
    }
    .cart_table .btn_box .black-btn {
        float: none;
    }
  </style>