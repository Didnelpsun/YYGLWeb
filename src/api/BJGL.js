// 备件管理接口
import {reqURL} from './api'
// 备件类型列表
export const GetSpareTypList = `${reqURL}/BJGL/SpareType/GetSpareTypList` // pc备件类型
export const GetIdSpareTypList = `${reqURL}/BJGL/SpareType/GetIdSpareTypList` // pc根据id获取备件类型详情
export const DeleteSpareTyp = `${reqURL}/BJGL/SpareType/DeleteSpareTyp` // 删除备件类型
export const EditSpareTyp = `${reqURL}/BJGL/SpareType/EditSpareTyp` // 修改备件类型
export const AddSpareTyp = `${reqURL}/BJGL/SpareType/AddSpareTyp` // 添加备件类型
export const SpareTypeImport = `${reqURL}/BJGL/SpareType/ImportBBUExcel` // 备件类型列表导入
export const SpareTypeExport = `${reqURL}/BJGL/SpareType/ExportExcel` // 备件类型列表导出
// 备件型号列表
export const GetSpareConfigList = `${reqURL}/BJGL/SpareConfig/GetSpareConfigList` // 获取备件型号列表
export const DeleteSpareConfig = `${reqURL}/BJGL/SpareConfig/DeleteSpareConfig` // 删除备件型号
export const EditSpareConfig = `${reqURL}/BJGL/SpareConfig/EditSpareConfig` // 修改备件型号
export const AddSpareConfig = `${reqURL}/BJGL/SpareConfig/AddSpareConfig` // 添加备件型号
export const GetSpareConfigIdList = `${reqURL}/BJGL/SpareConfig/GetSpareConfigIdList` // 根据id备件型号详情
export const SpareConfigImport = `${reqURL}/BJGL/SpareConfig/ImportBBUExcel` // 备件型号列表导入
export const SpareConfigExport = `${reqURL}/BJGL/SpareConfig/ExportExcel` // 备件型号列表导出

// 备件厂家
export const Addsparepartsmanufacturer = `${reqURL}/BJGL/sparepartsmanufacturerSevice/Addsparepartsmanufacturer` // 添加备件厂家
export const Editsparepartsmanufacturer = `${reqURL}/BJGL/sparepartsmanufacturerSevice/Editsparepartsmanufacturer` // 修改备件厂家
export const Deletesparepartsmanufacturer = `${reqURL}/BJGL/sparepartsmanufacturerSevice/Deletesparepartsmanufacturer` // 删除备件厂家
export const GetsparepartsmanufacturerList = `${reqURL}/BJGL/sparepartsmanufacturerSevice/GetsparepartsmanufacturerList` //  获取备件厂家列表
export const GetIdsparepartsmanufacturerList = `${reqURL}/BJGL/sparepartsmanufacturerSevice/GetIdsparepartsmanufacturerList` //  根据id备件厂家详情
export const manufacturerImport = `${reqURL}/BJGL/sparepartsmanufacturerSevice/ImportBBUExcel` //  备件厂家列表导入
export const manufacturerExport = `${reqURL}/BJGL/sparepartsmanufacturerSevice/ExportExcel` //  备件厂家列表导出
// 备件存放点
export const Addwarehouse = `${reqURL}/BJGL/warehouseSevcie/Addwarehouse` // 添加存放点
export const Editwarehouse = `${reqURL}/BJGL/warehouseSevcie/Editwarehouse` // 修改存放点
export const Deletewarehouse = `${reqURL}/BJGL/warehouseSevcie/Deletewarehouse` // 删除存放点
export const GetwarehouseList = `${reqURL}/BJGL/warehouseSevcie/GetwarehouseList` //  获取存放点列表
export const GetwarehouseIdList = `${reqURL}/BJGL/warehouseSevcie/GetwarehouseIdList` //  根据id获取存放点
export const warehouseImport = `${reqURL}/BJGL/warehouseSevcie/ImportBBUExcel` //  存放点列表导入
export const warehouseExport = `${reqURL}/BJGL/warehouseSevcie/ExportExcel` //  存放点列表导出
// 备件管理维修厂家(售后合同)
export const Addmanufacturerinfo = `${reqURL}/BJGL/manufacturerinfoServcie/Addmanufacturerinfo` // 添加备件管理维修厂家
export const Editmanufacturerinfo = `${reqURL}/BJGL/manufacturerinfoServcie/Editmanufacturerinfo` // 编辑备件管理维修厂家
export const Deletemanufacturerinfo = `${reqURL}/BJGL/manufacturerinfoServcie/Deletemanufacturerinfo` // 删除备件管理维修厂家
export const Getmanufacturerinfo = `${reqURL}/BJGL/manufacturerinfoServcie/Getmanufacturerinfo` // 获取备件管理维修厂家
export const Getidmanufacturerinfo = `${reqURL}/BJGL/manufacturerinfoServcie/Getidmanufacturerinfo` // 根据id获取详情
export const manufacturerinfoImport = `${reqURL}/BJGL/manufacturerinfoServcie/ImportBBUExcel` // 导入
// 维修项目 (备件管理维修厂家配置)
export const Addmaintenanceconfig = `${reqURL}/BJGL/maintenanceconfigSevcie/Addmaintenanceconfig` // 添加备件管理维修厂家配置
export const Editmaintenanceconfig = `${reqURL}/BJGL/maintenanceconfigSevcie/Editmaintenanceconfig` // 编辑备件管理维修厂家配置
export const Deletemaintenanceconfig = `${reqURL}/BJGL/maintenanceconfigSevcie/Deletemaintenanceconfig` // 删除备件管理维修厂家配置
export const maintenanceconfig = `${reqURL}/BJGL/maintenanceconfigSevcie/maintenanceconfig` // 获取备件管理维修厂家配置
export const Getidmaintenanceconfig = `${reqURL}/BJGL/maintenanceconfigSevcie/Getidmaintenanceconfig` // 获取备件管理维修厂家配置
export const maintenanceconfigImport = `${reqURL}/BJGL/maintenanceconfigSevcie/ImportBBUExcel` // 导入
// 存放点操作配置列表(备件管理仓库配置)
export const Addconfiguration = `${reqURL}/BJGL/configurationSevcie/Addconfiguration` // 添加存放点操作配置列表(添加仓库配置)
export const Editconfiguration = `${reqURL}/BJGL/configurationSevcie/Editconfiguration` // 编辑存放点操作配置列表(修改仓库配置)
export const GetUserOperation = `${reqURL}/BJGL/configurationSevcie/GetUserOperation` // 查看当前用户操作
export const GetIdconfigurationsList = `${reqURL}/BJGL/configurationSevcie/GetIdconfigurationsList` // 获取配置详情
export const GetconfigurationsList = `${reqURL}/BJGL/configurationSevcie/GetconfigurationsList` // 获取存放点操作配置列表(查看仓库配置)
export const Deleteconfiguration = `${reqURL}/BJGL/configurationSevcie/Deleteconfiguration` // 删除
// 备件管理备件
export const GetsparepartsList = `${reqURL}/BJGL/spareparts/GetsparepartsList` // 获取备件列表
export const Addspareparts = `${reqURL}/BJGL/spareparts/Addspareparts` // 添加备件
export const Editspareparts = `${reqURL}/BJGL/spareparts/Editspareparts` // 备件点验，替换，上站
export const Dispatchoutbound = `${reqURL}/BJGL/spareparts/Dispatchoutbound` // 调度接口
export const Deletespareparts = `${reqURL}/BJGL/spareparts/Deletespareparts` // 删除备件
export const GetsparepartsidList = `${reqURL}/BJGL/spareparts/GetsparepartsidList` // 获取备件详情
export const Sparecode = `${reqURL}/BJGL/spareparts/Sparecode` // 扫码查找备件
export const Outwarehouse = `${reqURL}/BJGL/spareparts/Outwarehouse` // 出入库方法
export const Addborrow = `${reqURL}/BJGL/spareparts/Addborrow` // 生成借件还件记录
export const sparepartsImport = `${reqURL}/BJGL/spareparts/ImportBBUExcel` // 备件导入
// 调度日志 调度审核
export const Operationlog = `${reqURL}/BJGL/schedulingSevice/Operationlog` // 查看调度日志
export const Schedulingdetails = `${reqURL}/BJGL/schedulingSevice/Schedulingdetails` // 查看调度日志详情
export const schedulingtype = `${reqURL}/BJGL/schedulingSevice/schedulingtype` // 查看调度日志详情
export const AuditScrapRecord = `${reqURL}/BJGL/schedulingSevice/AuditScrapRecord` // 提交
// 盘存任务
export const AddInventoryTask = `${reqURL}/BJGL/inventorySevcie/AddInventoryTask` // 添加盘存任务
export const EditInventoryTask = `${reqURL}/BJGL/inventorySevcie/EditInventoryTask` // 编辑盘存任务
export const DeleteInventoryTask = `${reqURL}/BJGL/inventorySevcie/DeleteInventoryTask` // 删除盘存任务
export const GetInventoryTaskList = `${reqURL}/BJGL/inventorySevcie/GetInventoryTaskList` // 查看盘存任务
export const GetIdInventoryTaskList = `${reqURL}/BJGL/inventorySevcie/GetIdInventoryTaskList` // 根据任务id获取盘存任务
export const EndInventory = `${reqURL}/BJGL/inventorySevcie/EndInventory` // 结束盘存

// 盘存记录
export const Addinventoryrecords = `${reqURL}/BJGL/inventoryrecordsSevice/Addinventoryrecords` // 添加盘存
export const GetInventoryrecords = `${reqURL}/BJGL/inventoryrecordsSevice/GetInventoryrecords` // 获取盘存
// 还件记录
export const GetAlsorecord = `${reqURL}/BJGL/AlsorecordSevcie/GetAlsorecord` // 还件记录
export const Getdetails = `${reqURL}/BJGL/AlsorecordSevcie/Getdetails` // 还件详情
// 维修记录
export const Maintenancerecord = `${reqURL}/BJGL/maintenance/Maintenancerecord` // 维修记录
// 报废记录
export const ScrapRecord = `${reqURL}/BJGL/schedulingSevice/ScrapRecord` // 报废记录
