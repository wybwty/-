export class verifyForm {
  constructor() {
    this.rules = {
      name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
      contain: [{ required: true, message: "请输入内容", trigger: "blur" }],
      time: [{ required: true, message: "请选择日期", trigger: "blur" }]
    }
  }
}
