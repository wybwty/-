<template>
  <div class="header">
    <el-container>
      <el-header>
        <div class="header-main">
          <div class="header-main-left">
            <img src="../../assets/img/logo.jpg" alt>
            <span>千家MIS |</span>
            <span>至哲篇</span>
          </div>
          <div class="header-main-right">
            <div class="messageLogo">
              <img src="../../assets/img/messageLogo.png" alt>
              <div class="message-number">{{information}}</div>
            </div>
            <div class="documentLogo">
              <img src="../../assets/img/documentLogo.png" alt>
              <div class="document-number">{{document}}</div>
            </div>
            <img src="../../assets/img/userLogo.png" alt>
            <div class="line"></div>
          </div>
        </div>
        <div class="clone">
          <img src="../../assets/img/clone.png" alt>
        </div>
      </el-header>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "Header",
  computed: {
    ...mapState('enter',[
    "information",
    "document"
    ])
  },
  data() {
    return {
    };
  }
};
</script>

