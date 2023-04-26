<template>
  <div id="modal">
    <header>
      <h2>Customize your view</h2>
    </header>
    <main>
      <p>Background</p>
      <div class="radio-buttons">
        <label class="light">
          <input
            type="radio"
            checked
            name="background-option"
            data-theme="light"
          />
          <span>Light</span>
          <span class="border"></span>
        </label>
        <label class="dim">
          <input type="radio" name="background-option" data-theme="dim" />
          <span>Dim</span>
          <span class="border"></span>
        </label>
        <label class="dark">
          <input type="radio" name="background-option" data-theme="dark" />
          <span>Dark</span>
          <span class="border"></span>
        </label>
      </div>
      <p>Navigation style</p>
      <div class="radio-buttons">
        <label class="nav-style">
          <input type="radio" name="nav-style" data-nav="opened" />
          <span>Opened</span>
          <span class="border"></span>
        </label>
        <label class="nav-style">
          <input type="radio" checked name="nav-style" data-nav="closed" />
          <span>Closed</span>
          <span class="border"></span>
        </label>
      </div>
    </main>
  </div>
  <div id="modal-overlay"></div>

  <div id="more-popout-overlay"></div>
  <div id="more-popout" class="nav-closed">
    <div class="nav-item">
      <div class="icon-container">

      </div>
      <div class="nav-text">
        <p>Ian | Gibbu</p>
        <span>@Gibbu_</span>
      </div>
    </div>
    <div class="nav-item">
      <div class="icon-container">
        <i class="fas fa-bolt"></i>
      </div>
      <div class="nav-text">
        <p>Moments</p>
      </div>
    </div>
    <div class="nav-item">
      <div class="icon-container">
        <i class="fas fa-chart-bar"></i>
      </div>
      <div class="nav-text">
        <p>Twitter ADS</p>
      </div>
    </div>
    <div class="nav-item">
      <div class="icon-container">
        <i class="fas fa-cog"></i>
      </div>
      <div class="nav-text">
        <p>Settings & privacy</p>
      </div>
    </div>
    <div class="nav-item">
      <div class="icon-container">
        <i class="fas fa-question-circle"></i>
      </div>
      <div class="nav-text">
        <p>Help Center</p>
      </div>
    </div>
    <div class="nav-item display">
      <div class="icon-container">
        <i class="fas fa-palette"></i>
      </div>
      <div class="nav-text">
        <p>Display</p>
      </div>
    </div>
    <div class="nav-item logout">
      <div class="icon-container">
        <i class="fas fa-sign-out-alt"></i>
      </div>
      <div class="nav-text">
        <p>Logout</p>
      </div>
    </div>
  </div>

  <!-- <nav class="nav-closed">
	<div class="nav-item home" aria-label="Home" data-balloon-pos="right" data-balloon-blunt>
		<div class="icon-container">
			<i class="fab fa-twitter"></i>
		</div>
		<div class="nav-text">
			<p>Home</p>
		</div>
	</div>
	<div class="nav-item" aria-label="Explore" data-balloon-pos="right" data-balloon-blunt>
		<div class="icon-container">
			<i class="fas fa-hashtag"></i>
		</div>
		<div class="nav-text">
			<p>Explore</p>
		</div>
	</div>
	<div class="nav-item" aria-label="Notifications" data-balloon-pos="right" data-balloon-blunt>
		<div class="icon-container">
			<i class="fas fa-bell"></i>
		</div>
		<div class="nav-text">
			<p>Notifications</p>
		</div>
	</div>
	<div class="nav-item" aria-label="Messages" data-balloon-pos="right" data-balloon-blunt>
		<div class="icon-container">
			<i class="fas fa-envelope"></i>
		</div>
		<div class="nav-text">
			<p>Messages</p>
		</div>
	</div>
	<div class="nav-item" aria-label="Bookmarks" data-balloon-pos="right" data-balloon-blunt>
		<div class="icon-container">
			<i class="fas fa-bookmark"></i>
		</div>
		<div class="nav-text">
			<p>Bookmarks</p>
		</div>
	</div>
	<div class="nav-item" aria-label="Profile" data-balloon-pos="right" data-balloon-blunt>
		<div class="icon-container">
			<img src="https://pbs.twimg.com/profile_images/1153329245248053248/xONN2R7u_400x400.png">
		</div>
		<div class="nav-text">
			<p>Profile</p>
		</div>
	</div>
	<button class="nav-item" aria-label="More" data-balloon-pos="right" data-balloon-blunt>
		<span class="icon-container">
			<i class="fas fa-ellipsis-h"></i>
		</span>
		<p>More</p>
	</button>
</nav> -->

  <header class="nav-closed" :src="onMeetingInfo.thumbnail">
    <div class="wrapper" style="margin-left: 20px">
      <div class="top">
        <img
          :src="onMeetingInfo.thumbnail"
        />
        <div class="user">
          <h2 style="color: white">{{ onMeetingInfo.onMeetName}}</h2>
        </div>
      </div>
      <div class="bottom">
        <a href="#">
          <p><strong>총 게시글</strong></p>
           <!-- {{ boards[0].boardList.length }} Object.keys(onMeetingInfo.replyList).lengt -->
          <!-- {{boards[0].lengt}} -->
        
          <h3 style="color: white;text-align:center;">{{ boardCnt }}</h3>
        </a>
        <a href="#">
          <p><strong>멤버</strong></p>
          <h3 style="color: white;text-align:center;">{{ registerMemsCnt }}</h3>
        </a>
      </div>
    </div>
  </header>

  <div id="container" class="wrapper nav-closed">
    <div id="timeline" v-if="!settingOpen">
      <!-- 게시물 글 작성하는 곳  -->
      <div class="new-tweet" style="border: 2px solid;border-radius: 2em;color:	#C0C0C0;margin-bottom:20px">
        
        
        
        <form @submit.prevent="addPost">
        <textarea placeholder="새로운 소식을 남겨보세요." v-model="newPost" style="color:black"></textarea>
        <div class="btns">
          <div class="btn">
            <!-- <button>
              <img
                src="@/assets/images/onMeeting/upload-file-icon.png"
                alt=""
              />
            </button> -->
          </div>
          <div class="btn">
            <!-- <button @click="toggleMap">
              <img
                src="@/assets/images/onMeeting/map-icon2.png"
                alt=""
                width="25"
                height="25"
              />
            </button> -->
            <!-- <MapModal ref="map" @close="closeMapModal" /> -->
            <MapModal v-if="isOpen" @close-req="toggleMap" @send-addr="sendAddr" />
          </div>
          <div class="btn">
            <button type="submit" style="font-weight: bold">게시</button>
          </div>
        </div>
         </form>
      <!-- {{comments}} -->


      </div>
      <!--게시물 올라오는 곳 --> <!--이게 반복되면 되는 것임!! -->
      <!-- 이거 클릭하면 해당 게시물 디테일 나오면 됨..--> 

      <div class="wrap">
         
       
      <div class="tweet" v-for="(board, index) in onMeetingInfo.boardList" :key="board.onMeetingBoardIdx" :board="board" style="border: 0.5px solid; margin-top:30px;border: 1px solid;border-radius: 1em;color:	#C0C0C0">
      
  
        <div class="left" style="display:inline-block">
          

        <div class="kang" style="margin-left:20px;width:100%;">
          <p class="deleteButton" style="margin-right:-430px;float:right;font-size:15px" @click="deleteBoard(board.onMeetingBoardIdx)"><strong>X</strong></p>
          <!-- <button class="deleteButton" style="margin-right:-430px;float:right">ddd</button> -->
            <div class="info">
              <img
              :src="board.boardMember.memberImg"
              />
              <p><strong style="margin-left:10px;color:black">{{ board.boardWriter }}</strong></p>
              <time>{{ board.boardCreateDate.split('T')[0] }}</time>
              
            </div>
            
          <div class="message">
            <p style="color:black">{{board.boardContents}}</p>
            <!-- <img
              src="https://img.dogpre.com/web/dogpre/event/popular_keyword_theme/43_pc_main_page_banner_0036.jpg"
            /> -->
          </div>
        </div>
        <!-- <div>
            <div id="postLyMenu_view729" class="lyMenu _postMoreMenu" style="min-width: 145px;" tabindex="-1">
                    <ul class="_postMoreMenuUl">
                <li>
                  <a href="#" data-menueventname="postMoreAction:modifyPost">글 수정</a>
                </li>
                <li><a href="#" data-menueventname="postMoreAction:deletePost">삭제하기</a></li></ul>
                </div>
        </div> -->
        <!-- <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" href="#">수정하기</a></li>
            <li><a class="dropdown-item" href="#">삭제하기</a></li>
          </ul>
        </div> -->
        </div> 
        <!-- left 끝 -->

        <!-- <hr> -->

        <div class="right" @click="boardDetailModal()">


          <!--댓글 클릭했을 때 모당창 뜨게 -->
          <div class="btns" >
            <button class="blue" type="button" style="margin-left:10px">
              <!-- <img
                src="@/assets/images/onMeeting/down.png"
                height="20"
                width="20"
                style="margin-right: 10px;margin-bottom:5px"
              /> -->
              댓글
            </button>
          </div>

    
          <!-- <hr> -->
          <!--!!!!댓글 출력 // getCommentsByPostId(board.onMeetingBoardIdx)!!!!-->
          <!-- <ul v-if="board.replyList.length > 0"> -->
            <!-- <ul v-if="board.replyList.length"> -->
             
              <!-- {{comments[0].replyList}} -->
             
           <!-- {{board.onMeetingBoardIdx}} -->
            <!-- {{comments}} -->
            
        <div v-if="comments != null">
          <div v-for="(reply, index) in comments" :key="index"  class="commentItem" style="background-color:#F5F5F5;">
           <!-- {{reply}} -->
            <div v-if="board.onMeetingBoardIdx === reply.onMeetingBoardIdx && reply.replyContents != null">

             
            <!-- <div v-if="(reply, index) in obj" :key="index"> -->
            <ul>
            <li> 
             <!-- <hr> -->
              <div >
                <hr style="margin:0">
              
                <!--댓글창이었음.. -->
                <!-- <CreateReply/>   -->
       
                <!-- {{reply.onMeetingBoardIdx}} -->

                <!-- <div class="left">
                  <img
                      :src="reply.replyWriterImg"
                  />
                </div> -->

                  
                  <div class="right left" >
                    
                      <div class="info">
                        <img
                            :src="reply.replyWriterImg"
                        />
                          <!-- {{ 이름 }} -->
                          <span style="color:black;font-size:15px"><strong>{{ reply.replyWriter }}</strong></span>
                      </div>
                      <!-- {{ 게시일 }} -->
                          <span style="color:#C0C0C0;font-size:13px;margin-left:50px">{{ reply.replyCreateDate.split('T')[0] }}</span>
                      <div>
                      <!-- {{ 내용 }} -->
                      <span style="color:black;margin-left:50px">{{ reply.replyContents }}</span>
                      </div>
                  </div> 


                  <div class="btns" style="margin-top:auto"> 
                  <b-button style="text-align:right;width:100%" class="btn" @click="updateReply()">수정</b-button>
                  <b-button style="text-align:right" class="btn" @click="deleteReply()">삭제</b-button>        
                  </div>
                  </div>
            </li>
            </ul>
            </div >
            <!-- <div v-else style="display:none">
                ll
            </div > -->

       

          </div>
            
          </div>
          <!-- </ul> -->

          <!-- <hr> -->

             <!-- 댓글 작성하는 곳 -->
            <div class="reply" style="margin-bottom:10px; padding:10px;"> 
                <form @submit.prevent="submitComment(index, board.onMeetingBoardIdx)">
                  <span>
                    <textarea
                        :id="'comment' + index"
                        placeholder="댓글을 입력하세요"
                        style="border: 1px solid;border-radius: 2em;color:#C0C0C0;"
                    ></textarea>
                  </span>
                  <span>
                    <button type="submit" style="border: 1px solid;border-radius: 2em;color:#fff;font-weight: bold">보내기</button>
                  </span>
                </form>
            </div>
            

        </div>
          <!-- <BoardDetail ref="boardDetail" @close="closeBoardModal" /> -->
        </div>
       
        <!-- 하나의 트윗이 끝나는 곳-->
      </div><br><br>
      
       <!-- <CreateReply v-if="isOpenDetail" @close="boardDetailModal()" /> -->

        <footer>
            <!-- <i class="fab fa-twitter"></i>
            <button>Load More!!!</button> -->
        </footer>
    </div>
    <OnMeetingSetting v-if="settingOpen && !withdrawal" @member-withdrawal="clickMemberWithdrawal"/>
    <OnMeetingMemWithdrawal v-if="withdrawal" :memberList="registerMems" />
    <div id="right">
      <div class="search-container" style="border: 1px solid;border-radius: 2em;color:	#C0C0C0">
        <div class="search-input">
                <img src="@/assets/images/onMeeting/search-icon.png">
				        <input id="search" type="text" placeholder="글 내용 검색" autocomplete="off" v-model="searchKeyword" @keyup.enter="submitSearch">
        </div>

      </div>
      <section>
        <header>
          <h3>{{ onMeetingInfo.onMeetName }}</h3>
        </header>
        <main>
          <a href="#" class="trend">
            <div class="trend">
              <p>{{ onMeetingInfo.introduction }}</p>
            </div>
          </a>
          <!-- <hr> -->
          <p align="right" style="font-size:13px" @click="clickSetting">
            <img src="@/assets/images/onMeeting/setting.png" style="width:15px;height:15px;margin-right:10px;">
            모임 설정
          </p>
          
          <button class="blue" type="button" style="margin-left:10px;width:100%;height:40px;border-radius:2em">
              <router-link :to="{name: 'OffMeeting', params: {id: onMeetingIdx}}">
                <img
                  src="@/assets/images/offMeeting/paw-print.png"
                  height="10"
                  width="10"
                  style="margin-right: 10px;margin-left:15px;height:20px;width:20px"
                />
                <a style="color:white; font-weight: bold;text-align:center">OFF 미팅</a>
              </router-link>
          </button>

        </main>
      </section>
      <section>
        <header>
          <h3>모임 멤버</h3>
          <a href="#">View All</a>
        </header>
        <main>
          <!--카페 멤버-->
           <a href="#" v-for="(member, index) in registerMems" :key="index">
            <img
              :src="member.memberList[0].memberImg"
            />
            <div class="user">
              <p>{{ member.memberList[0].memberName }}</p>
            </div>
          </a> 
        </main>
      </section>
    </div>
  </div>
</template>

<script>
import OnMeetingSetting from "../OnMeetingSetting.vue";
import OnMeetingMemWithdrawal from "../OnMeetingMemWithdrawal.vue";
//import RegisterModal from '@/components/meeting/onMeeting/board/registerModal/registerModal.vue';
import MapModal from "@/components/meeting/onMeeting/board/modal/mapModal.vue";
import ReplyList from "@/components/meeting/onMeeting/board/reply/replyList.vue";
import CreateReply from "@/components/meeting/onMeeting/board/reply/createReply.vue";
//import BoardDetail from "@/components/meeting/onMeeting/board/boardDetailModal.vue";
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";


export default {
  name: "RegisterModal",
  components: {
    OnMeetingSetting,
    OnMeetingMemWithdrawal,
    //RegisterModal,
    MapModal,
    ReplyList,
    CreateReply,
   // BoardDetail,
  },
  data() {
    return {
      mapModal: false,
      boardModal: false,
      registerModal: false,
     // openBoardModal: null,
    };
  },
  methods: {
    // openMapModal() {
    //   this.mapModal = true;
    // },
    // closeMapModal() {
    //   this.mapModal = false;
    // },
    // openBoardModal() {
    //     base.openBoardModal();
    // //     console.log("###")
    // //   this.boardModal = true;
    // },
    // closeBoardModal() {
    //   this.boardModal = false;
    // },
    // openRegisterModal() {
    //   this.registerModal = true;
    // },
    // closeRegisterModal() {
    //   this.registerModal = false;
    // },
  },
  mounted() {
      let base = this;

     // getBoardList();
    //  base.openBoardModal = this.$refs.boardDetail.openBoardModalFunc;
     // base.openMapModal = this.$refs.map.openMapModalFunc;

     // console.log(`!!! ${base.openMapModal}`);

  },
  setup() {

    const route = useRoute();
    const router = useRouter();
    const isOpen = ref(false);
    const isOpenDetail = ref(false);
  //  const onMeetingIdx = ref("");

    const onMeetingIdx = route.params.id;
    console.log(`@@@KANG ${onMeetingIdx}`)

    const onMeetingInfo = ref([]);

    const toggleMap = () => {
      console.log("KANG!!!")
            isOpen.value = !isOpen.value;
            // emit('toggle-modal', isOpen.value);
    }

     const boardDetailModal = () => {
      console.log("보드 디테일 모달 열려라");
      
      // 그래서 해당 인덱스에 있는 댓글을 보여주면 되는 것
      // 버튼 누른다고 해서 모든 댓글창이 나오면 안됨

      isOpenDetail.value = !isOpenDetail.value;
    };

    const sendAddr = (addr) => {
            address.value = addr;
        }


    //  onMounted(() => {
    //    console.log(`kkkk ${comments.value}`)
    //   for (const key of Object.keys(comments.value)) {
    //     const replyContents = comments.value[key].replyContents;
    //     console.log(`MOUNT::: ${replyContents}`);
    //   }
    // });   



    const boards = ref("");
    const boardCnt = ref(0);
    const boardInfo = ref([]);


    // 게시물 출력
    const getBoardList = async() => {
      axios.defaults.headers.common['AUTHORIZATION'] = sessionStorage.getItem('token');

      // onMeetingIdx 넣어주면 됨
      await axios.get(`/onMeetings/${onMeetingIdx}/board`, {})
        .then((response) => {

          boards.value = response.data
          console.log(`KANG_BOARd: ${JSON.stringify(boards.value, null, 2)}`)
          onMeetingInfo.value = {...response.data[0]};

         // console.log(`^^^^^^^BOARD^^^^^^ ${JSON.stringify(boards.value, null, 2)}`);
         // console.log(`^^^^^^^BOARD_INFO^^^^^^ ${JSON.stringify(onMeetingInfo.value, null, 2)}`);


          boardCnt.value = onMeetingInfo.value.boardList.length;
          console.log(`CNT:: ${boardCnt.value}`)

        })
        .catch ((error) => {
          console.log(`BOARD ERR ${error}`);
        });

    };

    getBoardList();
    //onMounted(getBoardList());

//console.log(`^^^^^^^BㅌㅌOARD^^^^^^ ${JSON.stringify(boards.value, null, 2)}`);

    const registerMems = ref([]);
    const registerMemsCnt = ref(0); 
    // 전체 가입멤버 출력
    const getOnMeetingMembers = async() => {
      axios.defaults.headers.common['AUTHORIZATION'] = sessionStorage.getItem('token');

      // onMeetingIdx 넣어주면 됨
      await axios.get(`/onMeetings/${onMeetingIdx}/board/members`, {})
        .then((response) => {
          registerMems.value = {...response.data}

          registerMemsCnt.value = Object.keys(registerMems.value).length;
          console.log(`### ${registerMemsCnt.value}`)

        })
        .catch ((error) => {
          console.log(`getOnMeetingMembers ERR ${error}`)
        })
    };
    getOnMeetingMembers();


    const member = ref([]);
    //회원 정보
    const getMemberInfo = async () => {
      axios.defaults.headers.common['AUTHORIZATION'] = sessionStorage.getItem('token');
        try{
            const res = await axios.get('/members/my');
            member.value = {...res.data};
        } catch(err) {
            console.log(err);
        }
    }
    getMemberInfo();


    // 게시물 등록 버튼 눌렀을 떄
    const newPost = ref('');
    // 게시물 등록
    const addPost = () => {
      //axios.defaults.headers.common['AUTHORIZATION'] = sessionStorage.getItem('token');
      console.log("Click!!");
      console.log("###NEWWWW###" + newPost.value);

      axios.post(`/onMeetings/${onMeetingIdx}/board`,
      {
        onMeetingIdx: onMeetingIdx,
        boardContents: newPost.value,
        boardWriter: member.value.memberName, // memberIdx 로 회원 이름 알려주기
        memberIdx: member.value.memberIdx,
        onMeetingBoardAddr: "주소입니다."
      }
      )
      .then((response) => {
        console.log("입력됐나요~~~")
        newPost.value = '';
      })
      .catch((error) => {
        console.log("게시 에러 입니다.")
        newPost.value = '';
        console.log(error);
      })
      router.go();

    };


      const replies = ref([]);
      const replyInfo = ref("");
      // 이거 아님...
      const getReplyList = async() => {

        // onMeetingIdx, onMeetingBoardIdx 넣으면 됨
        await axios.get(`/onMeetings/${onMeetingIdx}/board/4/reply`, {})
            .then((response) => {
                replies.value = {...response.data};
                replyInfo.value = {...response.data};

                console.log(`###REPLY ${JSON.stringify(replies.value, null, 2)}`)
                console.log("$ㅇㅇㅇ$")
               // console.log(`###REPLY_INFO ${JSON.stringify(replyInfo.value, null, 2)}`);
            })
            .catch ((error) => {
                console.log(`REPLY ERR: ${error}`);
            });
      };
     // getReplyList();


    // 게시물 갯수
     const boardCNT = computed(() => {
      // console.log(`BOARDCNT : ${onMeetingInfo.value.boardList.length} `)
      // return onMeetingInfo.value.boardList.length;
     });


    // 댓글 갯수
    const replyCnt = computed((index) => {
      // let cnt = Object.keys(boards.replyList).length;
      let cnt = 0;
     // let boardCNT = onMeetingInfo.value.boardList.length;
     // console.log(`@@@@CNT:: ${JSON.stringify(boardCNT, null, 2)}`)
     console.log(`@@@@CNT:: ${JSON.stringify(onMeetingInfo.value.boardList[index], null, 2)}`)

      // for (let reply in onMeetingInfo.value.boardList[index].replyList) {
      //     cnt++;
      // }
      console.log(`CNT@@@ ${cnt}`);
      return cnt;
     });




    //  const getCommentsByPostId = (onMeetingBoardIdx) => {
    //    console.log(`JSON_IDX; ${onMeetingBoardIdx}`)
    //    console.log(`JSON_REPLIES; ${JSON.stringify(replies.value, null, 2)}`)
    //    console.log(`JSON_REPLY; ${JSON.stringify(replies.value[0], null, 2)}`)
    //  //  console.log(`JSON_REPLY; ${JSON.stringify(replies.value[0].onMeetingReplyIdx, null, 2)}`)
    //   return computed(() => {
    //     return replies.value.filter((reply) => reply.onMeetingBoardIdx === onMeetingBoardIdx);
    //   });
    // };



    
    
     // 댓글 작성 
    const addReply = () => {

        console.log("버튼 눌림");
        console.log(`onMEETING@@@ ${JSON.stringify(onMeetingInfo.value, null, 2)}`)
        

        replies.value.push({
            contents: contents.value,
            writer: writer.value,
            createDate: createDate.value,
        }),
            (writer.value = ""),
            (createDate.value = ""),
            (contents.value = "");

            console.log(`LIST: ${JSON.stringify(replies.value)}`)
            
    };


    const comments = ref([]);
    const newCommentText = ref('');

    
     fetchComments();
    // 댓글 가져오기 
    async function fetchComments() {
      try {
        const response = await axios.get(`/onMeetings/${onMeetingIdx}/board/reply`);
        comments.value = {...response.data};
        console.log(`COMMENccccTSSSSSSS : ${JSON.stringify(comments.value, null, 2)}`)
      //  console.log(`IDX::: ${comments.value[0].onMeetingBoardIdx}`)

     
     } catch (error) {
        console.error(error);
      }
    }

    // 댓글 작성 함수 - 진짜
    const submitComment = (index, id) => {

      // (onMeetingBoard_seq.nextval,
      //           #{onMeetingMemIdx},
      //           #{onMeetingIdx},
      //           #{memberIdx},
      //           #{writer},
      //           #{contents},
      //           #{onMeetingBoardAddr},
      //           sysdate,
      //           sysdate
      //   )
      try {
        console.log('board id: ' + id) 
        const commentId = 'comment' + index
        const currComment = document.getElementById(commentId).value
        console.log('comment: ' + currComment);
        console.log('comment: ' + commentId);

      axios.defaults.headers.common['AUTHORIZATION'] = sessionStorage.getItem('token');
   
        axios.post(`/onMeetings/${onMeetingIdx}/board/reply`,
          {
            onMeetingBoardIdx: id,
            //onMeetingMemIdx: 1,
            onMeetingIdx: onMeetingIdx,
            memberIdx: member.value.memberIdx,
            replyContents: currComment,
            replyWriter: member.value.memberName, // memberIdx 로 회원 이름 알려주기
            replyWriterImg: member.value.memberImg
          }
          )
          .then((response) => {
            console.log("댓글 입력됐나요~~~")
            document.getElementById(commentId).value="";
          })
          .catch((error) => {
            console.log("댓글 에러 입니다.")
            document.getElementById(commentId).value="";
            console.log(error);
          })

          router.go();



        // console.log(`NEW COMMENTS: ${newCommentText.value}`)
        // const response = await axios.post(`/onMeetings/1/board`, {
        //   replyContents: newCommentText.value
        // });
        // newCommentText.value = '';
      } catch (error) {
        console.error(error);
      }
    }

    // 게시물 아이디가 변경될 때
    //watch(() => props.postId, fetchComments);

    let searchKeyword = ref("");
    const boardList = ref({});
    const submitSearch = async () => {
      // 검색어를 이용한 검색 로직 구현
      console.log(`Searching for ${searchKeyword.value}`);

      try{
          const res = await axios.get(`/onMeetings/${onMeetingIdx}/board/search`, {params: {keyword: searchKeyword.value}});
          boardList.value = res.data;

          console.log(`SEARCH:::: ${JSON.stringify(boardList.value, null, 2)}`);
          console.log(`원래:: ${JSON.stringify(onMeetingInfo.value, null, 2)}`);

         
      
         //   console.log(`KANG111: ${JSON.stringify(onMeetingInfo.value.boardList, null, 2)}`);
            console.log(typeof onMeetingInfo.value)
         //   console.log(`KANG222: ${JSON.stringify(boardList.value[0].boardList, null, 2)}`);
            console.log(typeof boardList.value)


            onMeetingInfo.value.boardList = boardList.value[0].boardList;
            //  Object.assign(onMeetingInfo.value.boardList, boardList.value[0].boardList);
           // console.log(`덮어씌워졌니0000:: ${JSON.stringify(onMeetingInfo.value.boardList, null, 2)}`)
             console.log(`덮어씌워졌니:: ${JSON.stringify(onMeetingInfo.value, null, 2)}`)
           // onMeetingInfo.value = boardList.value;
   

          // for(let i in res.data){
          //     if(res.data[i].introduction != null){
          //         onMeetingList.value[i].introduction = res.data[i].introduction.replace(/<br>/g, ' ');
          //     } 
          // }
       //  router.go()

      } catch(err){
          console.log(err);
      }
    //  router.go();

      // if (searchKeyword.value !== "") {
      //   emit("send-type", "search");
      //   router.push({
      //     name: "ProductPage",
      //     query: { keywords: searchKeyword.value },
      //   });
      // }

      searchKeyword.value = "";
    };

          const deleteBoard = (boardIdx) => {
            console.log(`$$$$$ ${boardIdx}`)
        Swal.fire({
            title: '게시물을 삭제하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '삭제',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {

              axios.defaults.headers.common['AUTHORIZATION'] = sessionStorage.getItem('token');
              const memberIdx = sessionStorage.getItem('memberIdx');
              console.log("onMeetingIdx => " + onMeetingIdx);
              console.log("boardIdx => " + boardIdx);

               axios.delete(`/onMeetings/${onMeetingIdx}/board`,
               {params: {
                  onMeetingBoardIdx: boardIdx
               }}
               ).then(res => {
                 console.log(`deleteBoard:: ${res.data}`);
                  Swal.fire(
                      '삭제되었습니다.',
                      'success'
                  )
                  router.go();

               })
               .catch ((error) => {
                 console.log(`DELETE BOARD ERR::: ${error}`);
               });
            }
        })
        ;

      }

      const settingOpen = ref(false);

      const clickSetting = () => {
        settingOpen.value = true;
      }

      const withdrawal = ref(false);
      const clickMemberWithdrawal = () => {
        withdrawal.value = true;
      }


    return {
      settingOpen,
      clickSetting,
      withdrawal,
      clickMemberWithdrawal,

      onMeetingIdx,
      isOpen,
      toggleMap,
      sendAddr,

      getBoardList,
      boards,
      boardCnt,
      onMeetingInfo,
      getOnMeetingMembers,
      registerMems,
      registerMemsCnt,
      newPost,


      replies,
      replyCnt,
      replyInfo,
      getReplyList,

      boardDetailModal,
      isOpenDetail,

      
      //getCommentsByPostId,

      boardInfo,
      boardCNT,

      addReply,


      fetchComments,
      submitComment,
      newCommentText,
      comments,

      addPost,

      member,
      router,
      submitSearch,
      searchKeyword,


      deleteBoard
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Nunito:300,400,600,700,800|Roboto:300,400,500,700");
* {
  outline-width: 0 !important;
  font-family: "Roboto";
}
body,
html {
  padding: 0;
  margin: 0;
}

body > header.nav-closed {
  margin-left: 64px;
}
body > header {
  background: url(https://source.unsplash.com/2560x1440/daily) center/cover;
  display: flex;
  align-items: center;
  position: relative;
  margin-left: 250px;
}

$nav: 64px;
$blue: #03a9f4;
$green: #4caf50;
$red: #ff2f20;
$bgImage: "https://app-storage-edge-003.cafe24.com/bannermanage2/woohua/2020/01/03/9ef96bbacc205f6a2b825e7fa0025b2d.jpg";

:root {
  --bg1: #e5e5e5;
  --bg2: #eee;
  --bg3: #fff;

  --color: #000;
}

#modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 12;
  opacity: 0;
  visibility: hidden;
  transition: 0.2s ease;
  background: var(--bg3);
  width: 550px;
  overflow: hidden;
  border-radius: 5px;
  header {
    border-bottom: 1px solid var(--bg2);
    padding: 15px;
    box-sizing: border-box;
    h2 {
      margin: 0;
      font-weight: 400;
      color: var(--color);
    }
  }
  main {
    padding: 15px;
    box-sizing: border-box;
    overflow-y: auto;
    > p {
      margin: 0 0 5px 0;
      color: var(--color);
    }
    .radio-buttons {
      display: flex;
      grid-gap: 15px;
      background: rgb(31, 39, 48);
      padding: 15px;
      box-sizing: border-box;
      label {
        flex: 1;
        display: flex;
        justify-content: center;
        cursor: pointer;
        position: relative;
        padding: 20px 0;
        span {
          color: #fff;
          display: block;
        }
        input {
          display: none;
          &:checked ~ .border {
            box-shadow: inset 0 0 0 2px $blue;
          }
        }
        .border {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          user-select: none;
          pointer-events: none;
        }
        &.light {
          background: #fff;
          span {
            color: #000;
          }
        }
        &.dim {
          background: #15202b;
        }
        &.dark {
          background: #111;
        }
        &.nav-style {
          background: var(--bg3);
          span {
            color: var(--color);
          }
        }
      }
    }
  }
  &.toggle {
    opacity: 1;
    visibility: visible;
  }
}
#modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  visibility: hidden;
  transition: 0.2s ease;
  z-index: 11;
  &.toggle {
    opacity: 1;
    visibility: visible;
  }
}

#more-popout-overlay {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  visibility: hidden;
  opacity: 0;
  transition: 0.2s ease;
  &.toggle {
    opacity: 1;
    visibility: visible;
  }
}
#more-popout {
  position: fixed;
  width: 250px;
  left: -1px;
  background: var(--bg3);
  height: 100%;
  z-index: 10;
  border-left: 1px solid var(--bg2);
  transition: 0.2s ease;
  .nav-item:first-of-type {
    border-bottom: 1px solid var(--bg2);
    .nav-text span {
      opacity: 0.5;
      font-size: 12px;
      display: block;
    }
  }
  &.nav-closed {
    left: -187px;
    &.toggle {
      left: 64px;
    }
  }
  &.toggle {
    left: 250px;
    &.nav-closed {
      left: 64px;
    }
  }
}

.wrapper {
  max-width: 1024px;
  margin: 0 auto;
  width: 100%;
  padding-left: 250px;
  &.nav-closed {
    padding-left: $nav;
  }
}

body {
  background: var(--bg1);
}

nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: $nav;
  background: var(--bg3);
  height: 100vh;
  z-index: 10;
  &.nav-closed {
    width: $nav;
    .nav-item p {
      display: none;
    }
  }
}

.nav-item {
  width: 100%;
  height: $nav;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  color: var(--color);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  user-select: none;
  &.home {
    border-bottom: 1px solid var(--bg2);
    color: $blue;
  }
  .icon-container {
    width: $nav;
    height: $nav;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  i {
    font-size: 18px;
  }
  img {
    width: 32px;
    height: 32px;
    display: block;
    border-radius: 50%;
  }
  p {
    margin: 0;
    font-size: 16px;
  }
  &:hover {
    background: var(--bg2);
  }
  &.logout {
    color: $red !important;
  }
}

header.nav-closed {
  background: url($bgImage) center/cover;
  display: flex;
  align-items: center;
  position: relative;
  margin-left: 250px;
  .wrapper {
    position: relative;
    padding-left: 0;
  }
  .top {
    display: flex;
    align-items: center;
    margin: 30px 0;
    img {
      width: 72px;
      height: 72px;
      display: block;
      border-radius: 50%;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }
    .user {
      margin-left: 15px;
      color: #fff;
      text-shadow: 0 2px 5px rgba(0, 0, 0, 1);
      h2 {
        margin: 0;
        font-weight: 400;
      }
      p {
        margin: 0;
        opacity: 0.5;
      }
    }
  }
  .bottom {
    display: flex;
    align-items: center;
    a {
      text-decoration: none;
      color: #fff;
      padding: 0 5px 10px;
      margin-right: 15px;
      text-shadow: 0 2px 5px rgba(0, 0, 0, 1);
      p {
        margin: 0;
        font-size: 14px;
        opacity: 0.5;
      }
      h3 {
        margin: 0;
        font-weight: 400;
      }
      &:hover {
        box-shadow: inset 0 -4px 0 #fff;
      }
    }
  }
  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 125px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.6) 90%);
  }
  &.nav-closed {
    margin-left: $nav;
  }
}

#container {
  display: grid;
  grid-template-columns: 650px auto;
  grid-gap: 20px;
  align-items: flex-start;
  margin: 20px auto 50px;
}
#timeline {
  background: var(--bg3);
  border-radius: 5px;
  overflow: hidden;
  footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px 0;
    border-top: 1px solid var(--bg2);
    i {
      margin-bottom: 10px;
      color: var(--color);
    }
    button {
      background: transparent;
      border: none;
      padding: 10px 20px;
      cursor: pointer;
      font-weight: 600;
      border-radius: 5px;
      color: var(--color);
      &:hover {
        background: var(--bg2);
      }
    }
  }
}
.new-tweet {
  textarea {
    border: none;
    width: 100%;
    resize: none;
    padding: 15px;
    height: auto;
    box-sizing: border-box;
    height: 200px;
    cursor: pointer;
    color: var(--color);
    background: var(--bg3);
    &:focus,
    &:not(:placeholder-shown) {
      height: 200px;
      cursor: text;
    //   ~ .btns {
    //     height: 100%;
    //     padding: 0 15px 15px;
    //   }
    }
  }
  .btns {
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    overflow: visible;
    height: 0;
    .btn {
      margin-right: 10px;
      button {
        margin-bottom: 50px;
        padding: 0;
        padding: 0;
        display: block;
        width: 32px;
        height: 32px;
        background: transparent;
        border: none;
        cursor: pointer;
        border-radius: 50%;
        color: var(--color);
        &:hover {
          background: var(--bg2);
        }
      }
      &:last-child {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        margin-right: 0;
        button {
          width: auto;
          border-radius: 3px;
          padding: 0 10px;
          background: #87cefa;
          color: #fff;
          &:hover {
            background: darken($blue, 3%);
          }
          i {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
.tweet {

  // border-top: 1px solid var(--bg2);
  // padding: 15px;
  // box-sizing: border-box;
  // display: flex;
  // align-items: flex-start;

  cursor: pointer;
  .left {
    margin-right: 15px;
    //margin-left: 20px;
    margin-top: 10px;
    display: inline-block;
    .info {
      display: flex;
      align-items: center;
      color: var(--color);
      margin-bottom: 10px;
      p {
        margin: 0;
        display: flex;
        align-items: center;
        span {
          margin: 0 10px;
          font-size: 12px;
          opacity: 0.5;
        }
      }
      time {
        display: flex;
        align-items: center;
        font-size: 12px;
        opacity: 0.5;
        &:before {
          content: "";
          height: 2px;
          width: 2px;
          margin-right: 10px;
          border-radius: 50%;
          background: var(--color);
        }
      }
    }
    .message {
      p {
        margin: 0;
        color: var(--color);
        line-height: 20px;
        margin-left: 50px;
      }
      img {
        display: block;
        width: 100%;
        border-radius: 5px;
        margin-top: 10px;
      }
    }
    img {
      width: 42px;
      height: 42px;
      display: block;
      object-fit: cover;
      border-radius: 50%;
      user-select: none;
    }
  }

  .right {
    width: 100%;
    .info {
      display: flex;
      align-items: center;
      color: var(--color);
      margin-bottom: 5px;
      // p {
      //   margin: 0;
      //   display: flex;
      //   align-items: center;
      //   span {
      //     margin: 0 10px;
      //     font-size: 12px;
      //     opacity: 0.5;
      //   }
      // }
      // time {
      //   display: flex;
      //   align-items: center;
      //   font-size: 12px;
      //   opacity: 0.5;
      //   &:before {
      //     content: "";
      //     height: 2px;
      //     width: 2px;
      //     margin-right: 10px;
      //     border-radius: 50%;
      //     background: var(--color);
      //   }
      // }
    }
    .message {
      p {
        margin: 0;
        color: var(--color);
        line-height: 20px;
      }
      img {
        display: block;
        width: 100%;
        border-radius: 5px;
        margin-top: 10px;
      }
    }
    .btns {
      margin-top: 20px;
      display: flex;
      align-items: center;
      cursor: pointer;
      button {
        background: transparent;
        border: none;
        padding: 0;
        display: flex;
        align-items: center;
        margin-right: 15px;
        cursor: pointer;
        color: var(--color);
        font-size: 12px;
        i {
          width: 32px;
          height: 32px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          margin-right: 5px;
          font-size: 16px;
        }
        &.blue:hover {
          i {
            background: rgba($blue, 0.1);
          }
          color: $blue;
        }
        &.green:hover {
          i {
            background: rgba($green, 0.1);
          }
          color: $green;
        }
        &.red:hover {
          i {
            background: rgba($red, 0.1);
          }
          color: $red;
        }
      }
    }
  }
  &:hover {
    background: var(--bg2);
  }
   .commentItem{
      z-index: 100;
    //  border:0.5px solid #C0C0C0;
      // margin-top: 20px;
      // margin-bottom:10px;
      // padding:10px;
      cursor: pointer;
   //   display: flex; 
      justify-content: flex-end;
      margin:0 auto;
  .left {
      margin-right: 15px;
      img {
            width: 42px;
            // height: 42px;
            display: block;
            object-fit: cover;
            border-radius: 50%;
            user-select: none;
        }
  }
  .right {
    //float: right;
    
    margin-left: 20px;
    width: 100%;
    .info {
        margin-bottom: 5px;
        display: block;
          //p {
            margin: 0;
            display: flex;
            align-items: center;
            position: relative;
            span {
              margin: 0 10px;
              font-size: 12px;
              //opacity: 0.5;
              //display: block;
            }
          //}
    }
  }
  .btns {
      display:flex;
      .btn {
          font-size: 13px;
          position: relative;
          //top: 50px
      }
  }

}
}
.iframe-container {
  overflow: hidden;
  padding-top: 56.25%;
  position: relative;
  border-radius: 5px;
  display: block;
  margin-top: 10px;
  iframe {
    border: 0;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
}

.search-container {
  margin-bottom: 20px;
  .search-input {
    width: 100%;
    position: relative;
    input {
      background: var(--bg3);
      position: relative;
      border: none;
      box-sizing: border-box;
      width: 100%;
      color: var(--color);
      padding: 15px 15px 15px 55px;
      border-radius: 5px;
      font-size: 14px;
      font-weight: 500;
      &:not(:placeholder-shown) ~ i {
        opacity: 1;
      }
    }
    i {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0.4;
      pointer-events: none;
      user-select: none;
      color: var(--color);
    }
    img {
        position: absolute;
        display: flex;
        width: 20px;
        height: 20px;
        margin-top: 17px;
        margin-left: 20px;
    }
  }
  .search-results {
    border-top: 1px solid var(--bg2);
    background: var(--bg3);
    border-radius: 0 0 5px 5px;
    overflow: hidden;
    display: none;
    .result {
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      color: var(--color);
      p {
        margin: 0;
      }
      img {
        width: 42px;
        height: 42px;
        display: block;
        margin-right: 15px;
        object-fit: cover;
        border-radius: 50%;
      }
      span {
        display: block;
        opacity: 0.5;
        font-size: 12px;
      }
      &:hover {
        background: var(--bg2);
        cursor: pointer;
      }
      &:last-child p {
        font-size: 12px;
      }
    }
    hr {
      border: none;
     // height: 1px;
      background: var(--bg2);
      margin: 0;
    }
  }
}

#right {
  section {
    padding: 15px;
    box-sizing: border-box;
    border-bottom: 1px solid var(--bg2);
    background: var(--bg3);
    overflow: hidden;
    header {
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      h3 {
        flex: 1;
        font-weight: 400;
        margin: 0;
        color: var(--color);
      }
      button {
        padding: 0;
        border-radius: 50%;
        background: transparent;
        border: none;
        cursor: pointer;
        width: 24px;
        height: 24px;
        color: var(--color);
        &:hover {
          background: var(--bg2);
        }
      }
      a {
        text-decoration: none;
        font-size: 12px;
        color: $blue;
      }
    }
    &:first-of-type {
      border-radius: 3px 3px;
    }
    &:last-of-type {
      border-bottom: none;
      border-radius: 0 0 3px 3px;
    }
  }
  main {
    a {
      text-decoration: none;
      color: var(--color);
      margin-bottom: 15px;
      display: block;
      &:not(.trend) {
        display: flex;
        align-items: center;
      }
      img {
        width: 42px;
        height: 42px;
        display: block;
        object-fit: cover;
        border-radius: 50%;
      }
      .trend-num {
        font-size: 12px;
        opacity: 0.5;
      }
      .trend {
        p {
          margin: 2px 0;
        }
        span {
          display: block;
          opacity: 0.5;
          font-size: 12px;
        }
        .quote {
          border-radius: 5px;
          overflow: hidden;
          display: flex;
          align-items: center;
          border: 1px solid var(--bg2);
          margin-top: 5px;
          .info {
            flex: 1;
            padding: 10px;
            box-sizing: border-box;
            border-right: 1px solid var(--bg2);
          }
          img {
            border-radius: 0;
            width: 61px;
            height: 61px;
          }
          &:hover {
            background: var(--bg2);
            .info > p {
              color: $blue;
            }
          }
        }
      }
      .user {
        margin-left: 15px;
        p {
          margin: 0;
          display: flex;
          align-items: center;
          small {
            margin-left: 5px;
          }
        }
        span {
          font-size: 12px;
          opacity: 0.5;
          display: block;
        }
      }
      &:hover > .user p,
      &:hover > .trend > p {
        color: $blue;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.reply
    textarea{
        width: 80%;
        height: 40px;
        resize: none;
        overflow:hidden;
        font-size: 15px;
        vertical-align:middle;
    }
    button {
        width: 20%;
        vertical-align:middle;
        background-color: #87cefa;
	    color: black;
    }

.ReplyCnt
    button {
        color: black;
        font-size: 10dp;
    }


 



</style>
