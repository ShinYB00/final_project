<template>
  <!--header section start -->
  <div class="header_section">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3">
          <div class="logo">
            <router-link :to="{ name: 'Home' }" @click="moveToMain">
              <!-- <img src="@/assets/images/common/logo.png"> -->
              <div class="logo1 ex-table">
                Meta
                <div class="logo2 ex-table-row">
                  <div class="ex-table-cell">MungMung</div>
                  <div class="ex-table-cell">
                    <img src="@/assets/images/common/icons8-dog-heart-64.png" />
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div class="col-md-9">
          <div class="menu_text">
            <ul style="float: right; margin-right: 40px;">
              <div class="togle_3">
                <div class="menu_main">
                  <div class="padding_left0">
                    <router-link v-if="!loggedIn" :to="{ name: 'Signup' }" @click="moveToPage">Signup</router-link>
                    <span class="padding_left0"><router-link v-if="!loggedIn" :to="{ name: 'Login' }" @click="moveToPage">Login</router-link></span>
                    <router-link v-if="loggedIn" :to="{ name: 'MyPage' }" @click="moveToPage" style="color:black"><img src="@/assets/images/member/my.png"/> My</router-link>
                    <span class="padding_left0"><router-link v-if="loggedIn" :to="{ name: 'Home' }" @click="logout">Logout</router-link></span>
                  </div>
                </div>
                <!-- <div class="shoping_bag">
                  <img src="@/assets/images/common/search-icon.png" />
                </div> -->
              </div>
              <div id="myNav" class="overlay">
                <a href="javascript:void(0)" class="closebtn" @click="closeNav"
                  >&times;</a
                >
                <div class="overlay-content">
                  <router-link :to="{ name: 'Home' }" @click="moveToMain"
                    >Home</router-link
                  >
                  <router-link :to="{ name: 'OnMeeting' }" @click="moveToPage"
                    >Meeting</router-link
                  >
                  <router-link :to="{ name: 'ProductPage' }" @click="moveToPage"
                    >Store</router-link
                  >
                </div>
              </div>
              <span class="navbar-toggler-icon"></span>
              <span @click="openNav"
                ><img
                  src="@/assets/images/common/toggle-icon.png"
                  class="toggle_menu"
              /></span>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- banner section start -->
    <div id="bannerDiv" class="banner_section layout_padding">
      <div class="container">
        <div class="row">
          <div class="col-sm-5">
            <h1 class="banner_taital_1">
              메타멍멍 ☺︎
              <!-- <img src="@/assets/images/common/paw.png" class="image-small"> -->
            </h1>
            <p class="banner_text">
              메타멍멍은 온/오프 모임을 생성하고 참여할 수 있습니다.
              또한 멍멍스토어에서 필요한 물품을 살 수 있습니다.
            </p>
            <div class="contact_bt">
              <!-- <a href="contact.html"
                >CONTACT US<span class="contact_padding"
                  ><img src="@/assets/images/common/contact-icon.png" /></span
              ></a> -->
            </div>
          </div>
          <div class="col-sm-2">
            <div class="play_icon">
              <a href="#"><img src="@/assets/images/common/play-icon.png" /></a>
            </div>
          </div>
          <div class="col-sm-5">
            <div>
              <img src="@/assets/images/common/paw.png" class="image_1" />
              <!-- <img src="@/assets/images/common/free-sticker-play-with-pet-7449880.png" class="image_1"> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- banner section end -->
  </div>
  <!-- header section end -->
</template>

<script>
import { computed, onMounted } from 'vue';

export default {
  name: "MainHeader",
  setup() {
    const token = sessionStorage.getItem("token");
    const memberId = sessionStorage.getItem("memberId");
    const memberIdx = sessionStorage.getItem("memberIdx");

    console.log(memberId);

    const loggedIn = computed(() => {
      return token !== null;
    });

    onMounted(() => {
      if (token == null) {
        sessionStorage.removeItem("memberId");
        sessionStorage.removeItem("memberIdx");
      }
    });

    let overlay = null;
    let headerSection = null;

    const check = () => {
      if (overlay == null) {
        overlay = document.getElementsByClassName("overlay")[0];
      }
      if (headerSection == null) {
        headerSection = document.getElementsByClassName("header_section")[0];
      }
    };

    const openNav = () => {
      check();
      overlay.style.width = "100%";
    };
    const closeNav = () => {
      check();
      overlay.style.width = "0%";
    };
    const moveToMain = () => {
      closeNav();
      headerSection.classList.remove("background_bg");
      document.getElementById("bannerDiv").style.display = "block";
    };
    const moveToPage = () => {
      closeNav();
      headerSection.classList.add("background_bg");
      document.getElementById("bannerDiv").style.display = "none";
    };

    const logout = () => {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("memberId");
      sessionStorage.removeItem("memberIdx");
      sessionStorage.removeItem("status");
      window.location.reload(true);
    };

    return {
      loggedIn,
      token,
      memberId,
      memberIdx,
      openNav,
      closeNav,
      moveToMain,
      moveToPage,
      logout
    };
  },
};
</script>

<style scoped>
.logo1 {
  font-size: 35px;
  font-weight: 600;
  color: white;
  position: absolute;
}
.logo2 {
  padding: 0;
  margin: 0;
  left: 60px;
  top: -35px;
  position: relative;
}
.ex-table {
  display: table;
}
.ex-table-row {
  display: table-row;
}
.ex-table-cell {
  display: table-cell;
}
</style>
