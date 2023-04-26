<template>
  <!-- on meeting게시물 작성 모달 start -->
  <transition class="modal">
    <!-- Modal content -->
    <div class="modal-content slideDown" @click.self="$emit('close')">
      <div class="modal-header">
        <span @click="$emit('close')" class="close" id="closeModal"
          >&times;</span
        >
        <h2>글쓰기</h2>
      </div>
      <div class="modal-body">
        <div class="form-row">
          <label for="">내용</label>
          <textarea v-model="content" />
        </div>
      </div>
      <div class="MapModal">
        <MapModal @close="closeModal" v-if="modal" />
      </div>
      <div class="modal-footer">
        <button @click="$emit('close')" class="btn btn-submit">게시</button>
        <button class="btn btn-file">파일</button>
        <button class="btn btn-map" @click="openModal">지도</button>
      </div>
      <!--footer end -->
    </div>
  </transition>
  <!-- on meeting게시물 작성 모달 end -->
</template>

<script>
import MapModal from "@/components/meeting/onMeeting/board/modal/mapModal.vue";

export default {
  name: "RegisterModal",
  props: {},
  components: {
    MapModal,
  },
  data() {
    return {
      modal: false,
      content: "",
    };
  },
  methods: {
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    },
    doSend() {
      if (this.message.length > 0) {
        alert(this.message);
        this.message = "";
        this.closeModal();
      } else {
        alert("메시지를 입력해주세요.");
      }
    },
  },
};
</script>

<style scoped>
textarea {
  width: 500px;
  height: 100px;
  resize: none; /* 크기고정 */
  /*   resize: horizontal; // 가로크기만 조절가능
	resize: vertical;  세로크기만 조절가능  */
}

.modal {
  width: 100%;
  height: 80%;
}
</style>
