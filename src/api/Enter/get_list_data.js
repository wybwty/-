import axios from "@/assets/js/axios.js"

export default {
  //  获取列表数据
  getListData: function (page,size,data) {
    data.size = size
    data.page = page
    return axios.post(`/tableList`,data)
  },
  //  获取表格头部
  getListHeader: function () {
    return axios.get(`/tableHeader`)
  },
  //  修改表格数据
  updataTableData:function(data) {
    return axios.post(`/updateTableList`,data)
  },
  //  添加表格数据
  addTableData:function(data){
    return axios.post(`/tableList/add`,data)
  },
  //  删除表格数据
  delectTableData:function(data){
    console.log(data)
    return axios.post(`/delectTableData`,data)
  }
}
