import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/index.vue";
import Signup from "../pages/member/signup.vue";
import Login from "../pages/member/login.vue";
import FindId from "../pages/member/findId.vue";
import Modify from "../pages/member/modify.vue";
import Register from "../pages/member/pet/register.vue";
import MyPage from "../pages/member/myPage.vue";
import OffMeeting from "../pages/meeting/offMeeting/index.vue";
import OnMeeting from "../pages/meeting/onMeeting/index.vue";
import OnMeetingCreate from "../pages/meeting/onMeeting/create/index.vue";
import RegisterModal from "../pages/meeting/onMeeting/board/index.vue";
import ProductPage from "../pages/store/product/index.vue";
import ProductDetail from "../pages/store/product/detail/_id.vue";
import ProductReviews from "../pages/store/review/index.vue";
import OnMeetingDetail from "../pages/meeting/onMeeting/_id.vue";
import OnMeetingSearch from "../pages/meeting/onMeeting/search/index.vue";
import OnMeetingDetailSetting from "../pages/meeting/onMeeting/modify/index.vue";
import OnMeetingModify from "../pages/meeting/onMeeting/modify/_id.vue";
import Order from "../pages/store/order/index.vue";
import OrderSuccess from "../pages/store/order/success/index.vue";
import OrderList from "../pages/store/order/list/index.vue";
import OrderDetail from "../pages/store/order/_id.vue";
import Cart from "../pages/store/cart/index.vue";
import Error from "../pages/error.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,

    },
    {
      path: "/members/signup",
      name: "Signup",
      component: Signup,
    },
    {
      path: "/members/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/members/findId",
      name: "FindId",
      component: FindId,
    },
    {
      path: "/members/modify",
      name: "Modify",
      component: Modify,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/members/pet/register",
      name: "Register",
      component: Register,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/members/myPage",
      name: "MyPage",
      component: MyPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/onMeeting/:id/offMeetings",
      name: "OffMeeting",
      component: OffMeeting,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/onMeeting",
      name: "OnMeeting",
      component: OnMeeting,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/onMeeting/create",
      name: "OnMeetingCreate",
      component: OnMeetingCreate,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/onMeeting/:id/board",
      name: "RegisterModal",
      component: RegisterModal,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/products",
      name: "ProductPage",
      component: ProductPage,
    },
    {
      path: "/products/:id",
      name: "ProductDetail",
      component: ProductDetail,
    },
    {
      path: "/products/:id/reviews",
      name: "ProductReviews",
      component: ProductReviews,
    },
    {
      path: "/onMeeting/:id",
      name: "OnMeetingDetail",
      component: OnMeetingDetail,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/onMeeting/search",
      name: "OnMeetingSearch",
      component: OnMeetingSearch,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/onMeeting/:id/setting",
      name: "OnMeetingDetailSetting",
      component: OnMeetingDetailSetting,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/onMeeting/:id/modify",
      name: "OnMeetingModify",
      component: OnMeetingModify,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/store/order",
      name: "Order",
      component: Order,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/store/order/success/:id",
      name: "OrderSuccess",
      component: OrderSuccess,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/store/order/list",
      name: "OrderList",
      component: OrderList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/store/order/:id",
      name: "OrderDetail",
      component: OrderDetail,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: "/404",
      name: "Error",
      component: Error,
    },
    {
      path: "/cart",
      name: "Cart",
      component: Cart,
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = sessionStorage.getItem('token')

  if (requiresAuth && !isAuthenticated) {
    alert("회원 전용 서비스입니다.");
    window.location.href = '/';
  } else {
    next()
  }
})

export default router;
