// 配置 ElementUI
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// https://segmentfault.com/q/1010000020408160
// console.log(Element)
// 表格
Element.Table.props.border = {default: true} // 表格边框
Element.Table.props.stripe = {default: true}// 表格分开颜色
Element.Table.props.size = {default: 'mini'}// 表格分开颜色
Element.Table.props.headerCellClassName = {default: 'table-headerStyle'}

// 表单
Element.Form.props.labelWidth = {default: '100px'}
Element.Form.props.size = {default: 'small'}
Element.Input.props.size = {default: 'small'}
Element.Button.props.size = {default: 'small'}
Element.Button.props.type = {default: 'primary'}

Element.Dialog.props.modalAppendToBody.default = false

Vue.use(Element)
