import * as type from '../Mutation/index'
import api from '../../api/Enter/get_list_data'

const state = {
  //  消息数量
  information: 30,
  //  文档数量
  document: 40,
  //  列表数据
  tableData: [],
  //  表头数据
  tableHeader: [],
}


const mutations = {
  //  获取列表数据
  [type.GET_LIST_DATA](state, data) {
    state.tableData = data
  },
  //  获取表头
  [type.GET_LIST_HEADER](state, data) {
    state.tableHeader = data
  },
}

const actions = {
  //  获取列表数据
  getListData: function ({ commit, state }, data) {
    api.getListData(data.page,data.size,data).then(res => {
      commit(type.GET_LIST_DATA, res.data)
    })
  },
  //  获取列表的表头数据
  getListHeader: function ({ commit, state }, data) {
    api.getListHeader().then(res => {
      commit(type.GET_LIST_HEADER, res.data)
    })
  },
  //  更新表格数据
  updataTableData:function({ commit, state }, data) {
    return api.updataTableData(data)
  },
  //  添加表格数据
  addTableData:function({ commit, state }, data){
    return api.addTableData(data)
  },
  //  删除表格数据
  delectTableData:function({ commit, state }, data){
    return api.delectTableData(data)
  }

}


export default ({
  namespaced: true,
  state,
  mutations,
  actions,
})
