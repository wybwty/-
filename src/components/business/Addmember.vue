<template>
  <div class="Dialog">
    <div class="main">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="人员" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="contain">
          <el-input v-model="ruleForm.contain"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="time">
          <el-date-picker
            v-model="ruleForm.time"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            type="daterange"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div class="add-footer">
      <el-button @click="cancel('ruleForm')" size="mini">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')" size="mini">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { verifyForm } from "../../assets/js/require.js";
let ruleObj = new verifyForm();

export default {
  name: "addMember",
  props: {
    ruleForm: {
    }
  },
  data() {
    return {
      //表单验证规则
      rules: ruleObj.rules
    };
  },
  methods: {
    //提交表单,把数据传给父组件
      submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.centerDialogVisible = false;
          this.$emit("sendData", this.ruleForm);
          this.$message({
            message: "操作成功",
            type: "success"
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      })
    },
    //  取消
    cancel(formName) {
      this.$emit("cancel");
      //  重置表单验证
      this.$refs[formName].clearValidate()
    }
  }
};
</script>

