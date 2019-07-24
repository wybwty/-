<template>
  <!-- 表格组件 -->
  <div>
    <!-- 表格上面部分 -->
    <div class="table-handle">
      <div class="table-handle-left">
        <span style="margin-right:10px">共{{tableData.length}}条</span>
        <span style="margin-right:10px">已选：{{multipleSelection.length}}</span>
        <span style="margin-right:10px">|</span>
        <span>
          <el-button type="danger" plain @click="batchDelect" :disabled="canDelect">批量删除</el-button>
        </span>
      </div>
      <div class="table-handle-right">
        <img src="../../assets/img/loadLogo.png" alt>
        <img src="../../assets/img/documentLogo.png" alt>
        <img src="../../assets/img/downLoadLogo.png" alt>
      </div>
    </div>
    <!-- 表格部分 -->
    <div class="table">
      <el-table
        ref="multipleTable"
        border
        highlight-current-row
        :data="tableData"
        tooltip-effect="dark"
        :cell-style="cellStyle"
        :header-cell-style="getRowClass"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @row-click="clickRow"
      >
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column label="序号" width="120" type="index" :index="indexMethod">
        </el-table-column>
        <el-table-column
          v-for="(item, index) in tableHeader"
          :key="index"
          :prop="item.value"
          :label="item.name"
        ></el-table-column>
        <el-table-column label="操作" width="139">
          <template slot-scope="scope">
            <span class="change-btn">
              <el-button @click="updateRow(scope.row)" type="text" size="small">修改</el-button>
            </span>
            <span class="line-btn">|</span>
            <span class="delect-btn">
              <el-button type="text" size="small" @click="delectMember(scope.row)">删除</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    //  表格数据
    tableData: Array,
    //  表格头部数据
    tableHeader: Array,
    //  页码
    page:Number,
    //  每页的条数
    size:Number
  },
  data() {
    return {
      //  行数据
      rowData: [],
      //  选中的行的数据
      multipleSelection: [],
      //  控制批量删除按钮能不能操作的属性
      canDelect: true
    };
  },
  methods: {
       indexMethod(index) {
        return index + 1 + (this.size * (this.page -1))
      },
    //  删除成员按钮
    delectMember(row) {
      console.log(row)
      let data = [row._id]
      this.$emit("delect", data);
    },
    //  修改按钮
    updateRow(row) {
      this.$emit("updateRow", row);
    },
    //  批量删除按钮
    batchDelect() {

      //  批量删除的id
      let rowId = this.multipleSelection.map(item => item._id);
      //  处理成接口需要的参数形式
      let data = rowId;
      this.$emit("delect", data);
      this.canDelect = true;
    },
    //  全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length !== 0) {
        this.canDelect = false;
      } else {
        this.canDelect = true;
      }
    },
    //  点击某行时，复选按钮被选中
    clickRow(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    //  修改列的样式
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex !== 5) {
        //指定列号
        return "padding-left:10px!important";
      } else if (columnIndex === 5) {
        return "text-align: center!important";
      }
    },
    //  设置表头颜色
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 5) {
        return "text-align: center!important;background:#eee;";
      }
      if (rowIndex === 0) {
        return "padding-left:10px!important;background:#eee;height:40px;font-size:12px;color:black；";
      } else {
        return "";
      }
    }
  }
};
</script>

