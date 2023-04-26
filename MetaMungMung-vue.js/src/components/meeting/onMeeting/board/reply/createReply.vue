<!--댓글쓰고 댓글달기 버튼있는 곳 -->
<template>
<div id="replyModal" class="replyModal">
    <!-- <div class="ReplyCnt" style="margin-bottom:10px">
              <img
                src="@/assets/images/onMeeting/reply-icon.png"
                height="20"
                width="20"
                style="margin-right: 10px;"
              /><span style="font-size=4px">{{ replyCnt }}</span>
    </div> -->
    <!--댓글 목록 -->
    <div v-for="(reply, index) in replies" :key="index" class="commentItem" style="color:#C0C0C0;margin-top:20px">
            <div class="left">
                <img
                src="https://yt3.ggpht.com/-uJh4oSQAwak/AAAAAAAAAAI/AAAAAAAAAAA/AMGKfKvDP3w/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"
            />
            </div>
            <div class="right">
                <div class="info">
                    <!-- {{ 이름 }} -->
                    <div style="color:black"><strong>{{ reply.writer }}</strong></div>
                    <!-- {{ 게시일 }} -->
                    <div style="color:#C0C0C0;font-size:13px">{{ reply.createDate }}</div>
                    <!-- {{ 내용 }} -->
                    <div style="color:black">{{ reply.contents }}</div>
                </div>
            </div>
            <div class="btns">
            <b-button style="text-align:right;width:100%" class="btn" @click="updateReply(index)">수정</b-button>
            <b-button style="text-align:right;width:100%" class="btn" @click="deleteReply(index)">삭제</b-button>        
            </div>
    </div>
    <div class="reply">
        <span>
            <textarea
                placeholder="댓글을 입력하세요"
                v-model="content"
                style="border: 1px solid;border-radius: 2em;color:#C0C0C0;"
                ></textarea>
        </span>
        <span>
            <button @click="addReply()" style="border: 1px solid;border-radius: 2em;color:#fff">보내기</button>
        </span>
    </div>
</div>
</template>

<script>
import { ref, computed } from 'vue';
import axios from 'axios';

export default {
    props: ["onMeetingBoardIdx"],
    setup(props) {

   // const title = ref("");
    const boardIdx = props.onMeetingBoardIdx;

    console.log(`@@!@#$#$#%$ ${boardIdx}`)

    const memberImg = ref(
      "https://i.pinimg.com/474x/d7/70/33/d7703333ad8ba85827b60fccf42f9c25.jpg"
    );
    const writer = ref("");
    const createDate = ref("");
    const contents = ref("");


    const onMeetingInfo = ref([]);
    const onMeetingBoardIdx = ref("");
    const boards = ref([]);
    const boardCnt = ref(0);
    const boardInfo = ref([]);
    // 게시물 출력
    const getBoardList = async() => {

      await axios.get('/onMeetings/1/board', {})
        .then((response) => {

          boards.value = {...response.data[0].boardList};
          onMeetingInfo.value = {...response.data[0]};

          onMeetingBoardIdx.value = onMeetingInfo.value.onMeetingIdx;
          console.log(`^^^^^^^BOARD^^^^^^ ${JSON.stringify(onMeetingInfo.value, null, 2)}`);
            console.log(`#### ${onMeetingBoardIdx.value}`);


          boardCnt.value = Object.keys(boards.value).length;

        })
        .catch ((error) => {
          console.log(`BOARD ERR ${error}`);
        });

    };

    getBoardList();

    

    const replies = ref([]);
    //const replyCnt = ref(0);
    const replyInfo = ref("");
    
    // 댓글 리스트 가져오기
    const getReplyList = async() => {

        await axios.get('/onMeetings/1/board/2/reply', {})
            .then((response) => {
                replies.value = {...response.data};
                replyInfo.value = {...response.data};

                console.log(`###REPLY ${JSON.stringify(replies.value, null, 2)}`);
                console.log(`###REPLY_INFO ${JSON.stringify(replyInfo.value, null, 2)}`);

                // replyCnt.value = Object.keys(replies.value).length;
               // console.log(`@@@CNT ${replyCnt.value}`);

            })
            .catch ((error) => {
                console.log(`REPLY ERR: ${error}`);
            });
    };

     getReplyList();

     const replyCnt = computed(() => {
         let cnt = Object.keys(replies.value).length;
         console.log("8------"+cnt)
         return cnt;
     });


    // 댓글 작성
    const addReply = () => {

        console.log("버튼 눌림");
        

        replies.value.push({
            contents: contents.value,
            writer: writer.value,
            createDate: createDate.value,
        }),
            (writer.value = ""),
            (createDate.value = ""),
            (content.value = "");

            console.log(`LIST: ${JSON.stringify(replies.value)}`)


        // axios.post 
            
        };

        

    
    // 리뷰 수정
    const updateReply = (index) => {

        console.log(`UPDATe REPLY BTN ${index}`)
    };


    // 댓글 삭제
    const deleteReply = (index) => {

        console.log(`DELETE REPLY BTN ${index}`)

        // alert 창으로 진짜 삭제할건지 물어보기

        console.log(`@@ ${JSON.stringify(replies.value)}`)

        delete replies.value[index];

        // axios.delete('/onMeeting/1/board/1/reply')
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch((error) => {
        //         console.log(`DELETE REPLY ERR: ${error}`);
        //     })


    };



        return {
            replies,
            addReply,
            updateReply,
            deleteReply,

            memberImg,
            writer,
            createDate,
            contents,

            replyCnt,
            getReplyList,
            replyInfo,

            onMeetingInfo,
            boards,
            boardCnt,
            boardInfo,
            onMeetingBoardIdx,

            boardIdx,


        }
    }
    // name:"PrCommentCreate",
    // props:{
    //     contentId:Number,
    //     reload:Function
    // },
    // data(){
    //     return{
    //     context:'',
    //     replyList: []
    //     }
    // },
    // methods:{
    //     createComment(){
    //         const replyObj = {
    //             comment_id: replyList[replyList.length - 1].comment_id + 1,
    //             user_id: 1,
    //             content_id: this.contentId,
    //             context: this.context,
    //             created_at: '2019-03-29 14:11:11',
    //             updated_at: null
    //         }
    //         replyList.push(replyObj);
    //     // data.Comment.push(
    //     //     {
    //     //         comment_id: data.Comment[data.Comment.length - 1].comment_id + 1,
    //     //         user_id: 1,
    //     //         content_id: this.contentId,
    //     //         context: this.context,
    //     //         created_at: '2019-03-29 14:11:11',
    //     //         updated_at: null
    //     //     }
    //     // )
    //     this.reload();
    //     console.log(replyObj)
    //     }
    // },
}
</script>

<style lang="scss" scoped>
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

.commentItem{
  z-index: 100;
  border:1px solid #C0C0C0;
  margin-top: 20px;
  margin-bottom:10px;
  padding:10px;
  cursor: pointer;
  display: flex; 
  justify-content: flex-end;
  margin:0 auto;
  margin-bottom: 20px;
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
    width: 100%;
    .info {
        margin-bottom: 5px;
        //   p {
        //     margin: 0;
        //     display: flex;
        //     align-items: center;
        //     span {
        //       margin: 0 10px;
        //       font-size: 12px;
        //       opacity: 0.5;
        //     }
        //   }
    }
  }
  .btns {
      display:flex;
      .btn {
          font-size: 13px;
          position: relative;
          top: 50px
      }
  }

}
</style>