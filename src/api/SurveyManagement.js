// 任务管理/勘察接口
import {reqURL} from './api'
import axios from 'axios/index'

export const GetEqipmentList = `${reqURL}/ZYGL/Equipment/GetEqipmentList` // 根据站点id获取设备列表
export const GetEnergyTaskList = `${reqURL}/ZYGL/Task/GetEnergyTaskList` // 获取能源任务列表
export const AddEnergyTask = `${reqURL}/ZYGL/Task/AddEnergyTask` // 能源任务新增
export const GetTaskEquipmentList = `${reqURL}/ZYGL/TaskEquipment/GetTaskEquipmentList` // 查看任务设备列表
export const GetTaskResourceList = `${reqURL}/ZYGL/TaskResource/GetTaskResourceList` // 获取能源任务列表
export const UpdateTaskResource = `${reqURL}/ZYGL/TaskResource/UpdateTaskResource` // 修改任务站点信息
export const GetEnergySubmitAudit = `${reqURL}/ZYGL/Task/GetEnergySubmitAudit` // 能源提交审核
export const AuditEnergyTask = `${reqURL}/ZYGL/Task/AuditEnergyTask` // 能源审核

// 任务设备
export const GetChargingPileTaskEquipment = `${reqURL}/ZYGL/ChargingPile/GetChargingPileTaskEquipment` // 获取充电桩任务设备详情
export const EditChargingPileTaskEquipment = `${reqURL}/ZYGL/ChargingPile/EditChargingPileTaskEquipment` // 修改充电桩任务设备
export const DelTaskEquipment = `${reqURL}/ZYGL/TaskEquipment/DelTaskEquipment` // 删除任务设备
export const GetSwitchCabinetTaskEquipment = `${reqURL}/ZYGL/SwitchCabinets/GetSwitchCabinetTaskEquipment` // 获取换电柜任务设备详情
export const EditSwitchCabinetTaskEquipment = `${reqURL}/ZYGL/SwitchCabinets/EditSwitchCabinetTaskEquipment` // 修改换电柜任务设备
export const GetTaskEquipmentReservepoverInfo = `${reqURL}/ZYGL/Reservepover/GetTaskEquipmentReservepoverInfo` // 获取备电任务设备详情
export const EditTaskEquipmentReservepover = `${reqURL}/ZYGL/Reservepover/EditTaskEquipmentReservepover` // 修改备电任务设备
export const EditTaskEquipmentBattery = `${reqURL}/ZYGL/Battery/EditTaskEquipmentBattery` // 修改电池任务设备信息
export const GetTaskEquipmentBatteryInfo = `${reqURL}/ZYGL/Battery/GetTaskEquipmentBatteryInfo` // 获取电池任务设备详情
export const EditTaskEquipmentOilFiredGenerator = `${reqURL}/ZYGL/OilFiredGenerator/EditTaskEquipmentOilFiredGenerator` // 修改燃油发电机任务设备信息
export const GetTaskEquipmentOilFiredGeneratorInfo = `${reqURL}/ZYGL/OilFiredGenerator/GetTaskEquipmentOilFiredGeneratorInfo` // 获取燃油发电机任务设备详情
export const EditTaskEquipmentBatteryGenerator = `${reqURL}/ZYGL/BatteryGenerator/EditTaskEquipmentBatteryGenerator` // 修改电池发电装置任务设备信息
export const GetTaskEquipmentBatteryGeneratorInfo = `${reqURL}/ZYGL/BatteryGenerator/GetTaskEquipmentBatteryGeneratorInfo` // 获取电池发电装置任务设备详情

export const AddReservepover = `${reqURL}`
export const AddChargingPileTaskEquipment = `${reqURL}`

// 勘察项目管理
export const GetProjectList = `${reqURL}/KCGL/Project/GetProjectList` // 获取项目列表
export const AddProject = `${reqURL}/KCGL/Project/AddProject` // 新增项目
export const GetProjectInfo = `${reqURL}/KCGL/Project/GetProjectInfo` // 获取项目详情
export const UpdateProject = `${reqURL}/KCGL/Project/UpdateProject` // 修改项目
export const DelProject = `${reqURL}/KCGL/Project/DelProject` // 删除项目
export const GetProjectExcel = `${reqURL}/KCGL/Project/GetProjectExcel` // 项目管理导出
export const GetKCProjectExcel = `${reqURL}/KCGL/Project/GetKCProjectExcel` // 项目管理项目资料导出

// 勘察任务管理
export const GetWebTaskList = `${reqURL}/KCGL/Task/GerWebTaskList` // 获取勘察任务管理列表
export const DelTask = `${reqURL}/KCGL/Task/DelTask` // 删除任务
export const AuitTask = `${reqURL}/KCGL/Task/AuitTask` // 审核
export const GetTaskAuitLogList = `${reqURL}/KCGL/Task/GetTaskAuitLogList` // 获取任务审核记录
export const GetTaskStateList = `${reqURL}/KCGL/Task/GetTaskStateList` // web任务管理获取审核状态
export const GetTaskExcel = `${reqURL}/KCGL/Task/GetTaskExcel` // 导出任务数据
export const GetTaskAuitLogExcel = `${reqURL}/KCGL/Task/GetTaskAuitLogExcel` // 导出任务审核记录

// 勘察新建站普查管理
export const GetNewResourceCensusInfo = `${reqURL}/KCGL/NewResourceCensus/GetNewResourceCensusInfo` // 获取新建站普查详情
export const GetStockResourceCensusInfo = `${reqURL}/KCGL/StockResourceCensus/GetStockResourceCensusInfo` // 获取存量站详情
export const GetResourceList = `${reqURL}/KCGL/Project/GetResourceList` // 获取存量筛查列表
export const GetDistributeProject = `${reqURL}/KCGL/Project/GetDistributeProject` // 项目派发
// 勘察图片配置管理
export const GetInvestigateImgConfigurationNameInfo = `${reqURL}/KCGL/InvestigateImgConfigurationInfo/GetInvestigateImgConfigurationNameInfo` // 根据图片名称获取图片配置
export const GetInvestigateImgConfigurationInfo = `${reqURL}/KCGL/InvestigateImgConfigurationInfo/GetInvestigateImgConfigurationInfo` // 获取图片配置详情
export const GetInvestigateImgConfigurationList = `${reqURL}/KCGL/InvestigateImgConfigurationInfo/GetInvestigateImgConfigurationList` // 后台获取勘察图片配置列表
export const AddInvestigateImgConfiguration = `${reqURL}/KCGL/InvestigateImgConfigurationInfo/AddInvestigateImgConfiguration` // 新增勘察图片配置
export const UpdateInvestigateImgConfiguration = `${reqURL}/KCGL/InvestigateImgConfigurationInfo/UpdateInvestigateImgConfiguration` // 修改勘察图片配置
export const DelInvestigateImgConfiguration = `${reqURL}/KCGL/InvestigateImgConfigurationInfo/DelInvestigateImgConfiguration` // 删除勘察图片配置
