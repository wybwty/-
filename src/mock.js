import Mock from 'mockjs' // 引入mockjs

let page = 1;

let data = Mock.mock({
  'list|25': [{
    //属性值自动加1,后面1是初始值
    'id|+1': page,
    //测试这个词语 重复随机次数：最大9次，最小重复2次
    'name|2-9': '名',
    //随机日期
    'birthday': '@date',
    //测试这个词语 重复随机次数：最大9次，最小重复2次
    'contain|2-9': '内容',
  }]
})


Mock.mock('/data/index', 'post', data) // 根据数据模板生成模拟数据
