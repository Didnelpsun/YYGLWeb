// 备件管理接口
import {reqURL} from './api'
// 备件类型列表
export const GetSpareTypList = `${reqURL}/BJGL/SpareType/GetSpareTypList` // pc备件类型
export const GetIdSpareTypList = `${reqURL}/BJGL/SpareType/GetIdSpareTypList` // pc根据id获取备件类型详情
export const DeleteSpareTyp = `${reqURL}/BJGL/SpareType/DeleteSpareTyp` // 删除备件类型
export const EditSpareTyp = `${reqURL}/BJGL/SpareType/EditSpareTyp` // 修改备件类型
export const AddSpareTyp = `${reqURL}/BJGL/SpareType/AddSpareTyp` // 添加备件类型
