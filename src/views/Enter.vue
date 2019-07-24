<template>
  <div class="container">
    <!-- 头部组件 -->
    <Header></Header>
    <!-- 主体部分 -->
    <div class="main">
      <div class="contain">
        <!-- 搜索组件 -->
        <div class="search">
          <Search @searchData="searchData" @showDialog="showDialog"></Search>
          <el-button type="success" @click="showDialog">新增</el-button>
        </div>
        <!-- 表格组件 -->
        <Table
          :tableData="tableData"
          :tableHeader="tableHeader"
          :page='page'
          :size='size'
          @updateRow="updateRow"
          @delect="delect"
        ></Table>
        <!-- 分页部分 -->
        <div class="footer">
          <el-pagination
            background
            layout="sizes,prev, pager, next,total"
            :page-sizes="[20, 40, 60]"
            :page-size="20"
            :total="1000"
            :page-count="10"
            @current-change="setPage"
            @size-change="handleSizeChange"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 修改弹窗 -->
    <el-dialog title="修改" :visible.sync="centerDialogVisible" width="30%">
      <addMember :ruleForm="rowData" @sendData="acceptData" @cancel="cancel"></addMember>
    </el-dialog>
    <!-- 新建弹窗 -->
    <el-dialog title="新建" :visible.sync="newDialogVisible" width="30%">
      <addMember @sendData="acceptData" @cancel="cancel"></addMember>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Enter",
  computed: {
    ...mapState("enter", [
      //  表格数据
      "tableData",
      //  表头数据
      "tableHeader"
    ])
  },
  data() {
    return {
      //  控制弹窗显示和隐藏的属性
      centerDialogVisible: false,
      //  控制新建弹窗的控制和隐藏
      newDialogVisible: false,
      // 传给弹窗组件的表格的某行的数据
      rowData: {},
      // 查询条件
      queryCondition: {
        //  时间
        date: "",
        //  姓名
        name: "",
        //  内容
        contain: "",
        //  一页的条数
        size: 20,
        //  页码
        page: 1
      },
      //  页码
      size:20,
      //  页数
      page:1,
    };
  },
  mounted() {

    // 获取表格数据
    this.getListData(this.queryCondition);
    //  获取表头数据
    this.getListHeader();
  },
  methods: {
    ...mapActions("enter", [
      //  获取表格数据的函数
      "getListData",
      //  表头数据
      "getListHeader",
      //  更新表格数据
      "updataTableData",
      //  新增表格数据
      "addTableData",
      //  删除表格数据
      "delectTableData"
    ]),
    //  修改每页的页数
    handleSizeChange(val){
      this.size = val
      this.queryCondition.size = val
      this.getListData(this.queryCondition);
    },
    //  修改事件
    updateRow(row) {
      this.rowData = row;
      this.centerDialogVisible = true;
    },
    //  跳页
    setPage(val) {
      this.page = val
      this.queryCondition.page = val;
      this.getListData(this.queryCondition);
    },
    //  显示弹窗
    showDialog() {
      //  置空传给子组件的，表格的行的数据
      this.rowData = {};
      this.centerDialogVisible = true;
    },
    // 取消
    cancel() {
      this.centerDialogVisible = false;
      this.newDialogVisible = false;
    },
    //  接受弹窗子组件返回的数据
    acceptData(data) {
      //  通过id判断是新增还是修改
      if (data._id) {
        console.log(data)
        let newData = {
          contain:data.contain,
          name:data.name,
          time:data.time[0],
          _id:data._id
        }
        //  更改列表数据
        this.updataTableData(newData).then(res => {
            this.getListData(this.queryCondition);
        });
      } else {
        //  饿了吗时间是数组，参数时间是字符串（此处换成字符串）
        data.time = data.time[0];
        console.log(data)
        //  新增表格数据
        this.addTableData(data).then(res => {
            this.getListData(this.queryCondition);
        });
      }
      //  弹窗隐藏
      this.centerDialogVisible = false;
      this.newDialogVisible = false;
    },
    //  拆出的删除模板方法
    delectTemplate(data,string) {
      this.$confirm(string, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //  批量删除成员
          this.delectTableData(data).then(res => {
              //  删除成功后重新拉取数据
              this.getListData(this.queryCondition);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //  删除操作
    delect(data){
      console.log(data)
      let string
      if(data.length == 1){
        string = '是否要将该成员删除'
        this.delectTemplate(data,string)
      }else{
        string = '是否确认进行批量删除操作'
        this.delectTemplate(data,string)
      }
    },
       //  搜索按钮的子组件触发的父组件的事件
    searchData(searchData) {
      //  子组件的值赋给父组件
      this.queryCondition = Object.assign(this.queryCondition, searchData);
      this.getListData(this.queryCondition);
    },
  }
};
</script>

