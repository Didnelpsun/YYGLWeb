// 备件管理接口
import {reqURL} from './api'
// 备件类型列表
export const GetSpareTypList = `${reqURL}/BJGL/SpareType/GetSpareTypList` // pc备件类型
export const GetIdSpareTypList = `${reqURL}/BJGL/SpareType/GetIdSpareTypList` // pc根据id获取备件类型详情
export const DeleteSpareTyp = `${reqURL}/BJGL/SpareType/DeleteSpareTyp` // 删除备件类型
export const EditSpareTyp = `${reqURL}/BJGL/SpareType/EditSpareTyp` // 修改备件类型
export const AddSpareTyp = `${reqURL}/BJGL/SpareType/AddSpareTyp` // 添加备件类型

// 备件型号列表
export const GetSpareConfigList = `${reqURL}/BJGL/SpareConfig/GetSpareConfigList` // 获取备件型号列表
export const DeleteSpareConfig = `${reqURL}/BJGL/SpareConfig/DeleteSpareConfig` // 删除备件型号
export const EditSpareConfig = `${reqURL}/BJGL/SpareConfig/EditSpareConfig` // 修改备件型号
export const AddSpareConfig = `${reqURL}/BJGL/SpareConfig/AddSpareConfig` // 添加备件型号
export const GetSpareConfigIdList = `${reqURL}/BJGL/SpareConfig/GetSpareConfigIdList` // 根据id备件型号详情

// 备件厂家
export const Addsparepartsmanufacturer = `${reqURL}/BJGL/sparepartsmanufacturerSevice/Addsparepartsmanufacturer` // 添加备件厂家
export const Editsparepartsmanufacturer = `${reqURL}/BJGL/sparepartsmanufacturerSevice/Editsparepartsmanufacturer` // 修改备件厂家
export const Deletesparepartsmanufacturer = `${reqURL}/BJGL/sparepartsmanufacturerSevice/Deletesparepartsmanufacturer` // 删除备件厂家
export const GetsparepartsmanufacturerList = `${reqURL}/BJGL/sparepartsmanufacturerSevice/GetsparepartsmanufacturerList` //  获取备件厂家列表
export const GetIdsparepartsmanufacturerList = `${reqURL}/BJGL/sparepartsmanufacturerSevice/GetIdsparepartsmanufacturerList` //  根据id备件厂家详情

// 备件存放点
export const Addwarehouse = `${reqURL}/BJGL/warehouseSevcie/Addwarehouse` // 添加存放点
export const Editwarehouse = `${reqURL}/BJGL/warehouseSevcie/Editwarehouse` // 修改存放点
export const Deletewarehouse = `${reqURL}/BJGL/warehouseSevcie/Deletewarehouse` // 删除存放点
export const GetwarehouseList = `${reqURL}/BJGL/warehouseSevcie/GetwarehouseList` //  获取存放点列表
export const GetwarehouseIdList = `${reqURL}/BJGL/warehouseSevcie/GetwarehouseIdList` //  根据id获取存放点
