<!--댓글 속성: 작성자, 작성일자 및 시간, 내용 / + 수정 삭제  -->
<template>
  <div class="commentItem" style="color:#C0C0C0;margin-top:20px">
        <div class="left">
            <img
            src="https://yt3.ggpht.com/-uJh4oSQAwak/AAAAAAAAAAI/AAAAAAAAAAA/AMGKfKvDP3w/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"
          />
        </div>
        <div class="right">
            <div class="info">
                <!-- {{ 이름 }} -->
                <div style="color:black"><strong>강혜경</strong></div>
                <!-- {{ 게시일 }} -->
                <div style="color:#C0C0C0;font-size:13px">2023.04.15</div>
                <!-- {{ 내용 }} -->
                <div style="color:black">댓글입니다요...댓글이 있을 때만 보여야 함</div>
            </div>
        </div>
        <div class="btns">
           <b-button style="text-align:right;width:100%" class="btn" @click="updateComment">수정</b-button>
           <b-button style="text-align:right;width:100%" class="btn" @click="deleteComment">삭제</b-button>
            
            
        </div>
  </div>
</template>

<script>
export default {
    name:"PrCommentListItem",
  props:{
    commentItem:Object,
    reload:Function
  },
  data(){
    return{
      name:'',
    }
  },
  created(){
  //  this.name = data.User.filter(item => item.user_id === this.commentItem.user_id)[0].name
  },
  methods:{
    updateComment(){

    },
    deleteComment(){
      const commentIdx = this.commentItem.comment_id;
     // const deleteArrayId = data.Comment.findIndex(item => item.comment_id === commentIdx);
     // data.Comment.splice(deleteArrayId, 1);
      this.reload();

    }
  }

}
</script>

<style lang="scss" scoped>
.commentItem{
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