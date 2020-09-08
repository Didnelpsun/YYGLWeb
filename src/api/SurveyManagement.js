// 任务管理/勘察接口
import {reqURL} from './api'

export const GetEqipmentList = `${reqURL}/ZYGL/Equipment/GetEqipmentList` // 根据站点id获取设备列表
export const GetEnergyTaskList = `${reqURL}/ZYGL/Task/GetEnergyTaskList` // 获取能源任务列表
export const AddTask = `${reqURL}/ZYGL/Task/AddTask` // 能源任务新增
export const GetTaskEquipmentList = `${reqURL}/ZYGL/TaskEquipment/GetTaskEquipmentList` // 查看任务设备列表
export const GetTaskResourceList = `${reqURL}/ZYGL/TaskResource/GetTaskResourceList` // 获取能源任务列表
export const UpdateTaskResource = `${reqURL}/ZYGL/TaskResource/UpdateTaskResource` // 修改任务站点信息
export const GetsubmitEquipmentaudit = `${reqURL}/ZYGL/ZY/GetsubmitEquipmentaudit` // 能源提交审核
export const TaskAudit = `${reqURL}/ZYGL/Task/TaskAudit` // 能源审核
export const TaskEquipment = `${reqURL}/ZYGL/Task/TaskEquipment` // 添加任务-选择添加设备-返回设备所在站点
export const GetEquipmentInfoList = `${reqURL}/ZYGL/Task/GetEquipmentInfoList` // 根据设备ID获取设备详情
export const GetEnergyResourecEquipmentList = `${reqURL}/ZYGL/ResoureEquipment/GetEnergyResourecEquipmentList` // 获取当前站点可添加的设备
export const GetTaskResourceEquipment = `${reqURL}/ZYGL/ResoureEquipment/GetTaskResourceEquipment` // 添加任务设备选择设备类型判断

// 任务设备
export const GetChargingPileTaskEquipment = `${reqURL}/ZYGL/ChargingPile/GetChargingPileTaskEquipment` // 获取充电桩任务设备详情
export const EditChargingPileTaskEquipment = `${reqURL}/ZYGL/ChargingPile/EditChargingPileTaskEquipment` // 修改充电桩任务设备
export const AddChargingPileTaskEquipment = `${reqURL}/ZYGL/ChargingPile/AddChargingPileTaskEquipment` // 添加充电桩任务设备
export const DelTaskEquipment = `${reqURL}/ZYGL/TaskEquipment/DelTaskEquipment` // 删除任务设备
export const GetSwitchCabinetTaskEquipment = `${reqURL}/ZYGL/SwitchCabinets/GetSwitchCabinetTaskEquipment` // 获取换电柜任务设备详情
export const AddSwitchCabinetTaskEquipment = `${reqURL}/ZYGL/SwitchCabinets/AddSwitchCabinetTaskEquipment` // 添加换电柜任务设备
export const EditSwitchCabinetTaskEquipment = `${reqURL}/ZYGL/SwitchCabinets/EditSwitchCabinetTaskEquipment` // 修改换电柜任务设备
export const GetTaskEquipmentReservepoverInfo = `${reqURL}/ZYGL/Reservepover/GetTaskEquipmentReservepoverInfo` // 获取备电任务设备详情
export const AddTaskEquipmentReservepover = `${reqURL}/ZYGL/Reservepover/AddTaskEquipmentReservepover` // 添加备电任务设备
export const EditTaskEquipmentReservepover = `${reqURL}/ZYGL/Reservepover/EditTaskEquipmentReservepover` // 修改备电任务设备
export const EditTaskEquipmentBattery = `${reqURL}/ZYGL/Battery/EditTaskEquipmentBattery` // 修改电池任务设备信息
export const GetTaskEquipmentBatteryInfo = `${reqURL}/ZYGL/Battery/GetTaskEquipmentBatteryInfo` // 获取电池任务设备详情
export const AddTaskEquipmentBattery = `${reqURL}/ZYGL/Battery/AddTaskEquipmentBattery` // 添加换电电池任务设备
export const EditTaskEquipmentOilFiredGenerator = `${reqURL}/ZYGL/OilFiredGenerator/EditTaskEquipmentOilFiredGenerator` // 修改燃油发电机任务设备信息
export const GetTaskEquipmentOilFiredGeneratorInfo = `${reqURL}/ZYGL/OilFiredGenerator/GetTaskEquipmentOilFiredGeneratorInfo` // 获取燃油发电机任务设备详情
export const AddTaskEquipmentOilFiredGenerator = `${reqURL}/ZYGL/OilFiredGenerator/AddTaskEquipmentOilFiredGenerator` // 添加燃油发电机任务设备
export const EditTaskEquipmentBatteryGenerator = `${reqURL}/ZYGL/BatteryGenerator/EditTaskEquipmentBatteryGenerator` // 修改电池发电装置任务设备信息
export const GetTaskEquipmentBatteryGeneratorInfo = `${reqURL}/ZYGL/BatteryGenerator/GetTaskEquipmentBatteryGeneratorInfo` // 获取电池发电装置任务设备详情
export const AddTaskEquipmentBatteryGenerator = `${reqURL}/ZYGL/BatteryGenerator/AddTaskEquipmentBatteryGenerator` // 添加电池发电装置任务设备
export const GetTaskElectricIntroducedInfo = `${reqURL}/ZYGL/AnElectricIntroduced/GetTaskElectricIntroducedInfo` // 获取外电引入详情
export const AddTaskAnElectricIntroduced = `${reqURL}/ZYGL/AnElectricIntroduced/AddTaskAnElectricIntroduced` // 添加外电引入任务设备
export const UpdateTaskElectricIntroduced = `${reqURL}/ZYGL/AnElectricIntroduced/UpdateTaskElectricIntroduced` // 修改外电引入任务设备
export const GetTaskElectricMeterList = `${reqURL}/ZYGL/ElectricMeter/GetTaskElectricMeterList` // 获取电表任务列表
export const AddTaskElectricMeter = `${reqURL}/ZYGL/ElectricMeter/AddTaskElectricMeter` // 添加电表任务设备
export const GetTaskElectricMeterInfo = `${reqURL}/ZYGL/ElectricMeter/GetTaskElectricMeterInfo` // 获取电表任务设备详情
export const UpdateTaskElectricMeter = `${reqURL}/ZYGL/ElectricMeter/UpdateTaskElectricMeter` // 修改电表任务设备
export const GetHiddenDangerList = `${reqURL}/ZYGL/HiddenDanger/GetHiddenDangerList` // 获取隐患列表
export const GetHiddenDangerInfo = `${reqURL}/ZYGL/HiddenDanger/GetHiddenDangerInfo` // 获取隐患详情
export const UpdateHiddenDanger = `${reqURL}/ZYGL/HiddenDanger/UpdateHiddenDanger` // 修改隐患详情
export const AddHiddenDanger = `${reqURL}/ZYGL/HiddenDanger/AddHiddenDanger` // 添加隐患
export const GetHiddenDangerExcel = `${reqURL}/ZYGL/HiddenDanger/GetHiddenDangerExcel` // 隐患台账导出
export const GetMaintainList = `${reqURL}/ZYGL/Maintain/GetMaintainList` // 获取上站维护列表
export const GetMaintainInfo = `${reqURL}/ZYGL/Maintain/GetMaintainInfo` // 获取上站维护详情
export const UpdateMaintain = `${reqURL}/ZYGL/Maintain/UpdateMaintain` // 修改上站维护详情
export const AddMaintain = `${reqURL}/ZYGL/Maintain/AddMaintain` // 添加上站维护
export const GetMaintainExcel = `${reqURL}/ZYGL/Maintain/GetMaintainExcel` // 上站维护导出
export const GetTaskState = `${reqURL}/ZYGL/Task/GetTaskState` // 查看任务状态

// 能源统计
export const GetEnergyStatisticalList = `${reqURL}/ZYGL/ZYStatistical/GetEnergyStatisticalList` // 获取能源设备统计
export const GetEnergytaskstatisticsList = `${reqURL}/ZYGL/ZYStatistical/GetEnergytaskstatisticsList` // 获取能源任务统计

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
export const GetInvestigateImgConfigurationInfo = `${reqURL}/KCGL/ImgConfiguration/GetImgConfiguration` // 获取图片配置详情
export const GetInvestigateImgConfigurationList = `${reqURL}/KCGL/ImgConfiguration/GetImgConfigurationList` // 后台获取勘察图片配置列表
export const AddInvestigateImgConfiguration = `${reqURL}/KCGL/ImgConfiguration/AddImgConfiguration` // 新增勘察图片配置
export const UpdateInvestigateImgConfiguration = `${reqURL}/KCGL/ImgConfiguration/UpdateImgConfiguration` // 修改勘察图片配置
export const DelInvestigateImgConfiguration = `${reqURL}/KCGL/ImgConfiguration/DelImgConfiguration` // 删除勘察图片配置

// 开关电源
export const GetSwitchingPowerSupplyList = `${reqURL}/ZYGL/SwitchingPowerSupply/GetSwitchingPowerSupplyList` // 获取开关电源列表
export const GetSwitchingPowerSupplyInfo = `${reqURL}/ZYGL/SwitchingPowerSupply/GetSwitchingPowerSupplyInfo` // 获取开关电源详情
export const AddSwitchingPowerSupplyTaskEquipment = `${reqURL}/ZYGL/SwitchingPowerSupply/AddSwitchingPowerSupplyTaskEquipment` // 新增开关电源任务设备
export const EditSwitchingPowerSupplyTaskEquipment = `${reqURL}/ZYGL/SwitchingPowerSupply/EditSwitchingPowerSupplyTaskEquipment` // 修改开关电源任务设备
export const GetSwitchingPowerSupplyTaskEquipmentInfo = `${reqURL}/ZYGL/SwitchingPowerSupply/GetSwitchingPowerSupplyTaskEquipmentInfo` // 获取开关电源设备任务详情
export const GetSwitchingPowerSupplyExcel = `${reqURL}/ZYGL/SwitchingPowerSupply/GetSwitchingPowerSupplyExcel` // 开关电源导出

// 网络设备
export const GetOperatorEquipmentInfo = `${reqURL}/ZYGL/OperatorEquipment/GetOperatorEquipmentInfo` // 获取网络设备详情
export const GetOperatorEquipmentList = `${reqURL}/ZYGL/OperatorEquipment/GetOperatorEquipmentList` // 获取网络设备列表
export const AddOperatorEquipmentTaskEquipment = `${reqURL}/ZYGL/OperatorEquipment/AddOperatorEquipmentTaskEquipment` // 创建网络设备任务
export const EditOperatorEquipmentTaskEquipment = `${reqURL}/ZYGL/OperatorEquipment/EditOperatorEquipmentTaskEquipment` // 修改网络设备任务信息
export const GetOperatorEquipmentTaskEquipmentInfo = `${reqURL}/ZYGL/OperatorEquipment/GetOperatorEquipmentTaskEquipmentInfo` // 获取网络设备任务详情
export const GetOperatorEquipmentExcel = `${reqURL}/ZYGL/OperatorEquipment/GetOperatorEquipmentExcel` // 网络设备导出

// 铁塔
export const GetTheTowerInfo = `${reqURL}/ZYGL/TheTower/GetTheTowerInfo` // 获取铁塔详情
export const GetTheTowerList = `${reqURL}/ZYGL/TheTower/GetTheTowerList` // 获取铁塔列表
export const AddTheTowerTaskEquipment = `${reqURL}/ZYGL/TheTower/AddTheTowerTaskEquipment` // 创建铁塔设备任务
export const EditTheTowerTaskEquipment = `${reqURL}/ZYGL/TheTower/EditTheTowerTaskEquipment` // 修改铁塔任务信息
export const GetTheTowerTaskEquipmentInfo = `${reqURL}/ZYGL/TheTower/GetTheTowerTaskEquipmentInfo` // 获取铁塔任务详情
export const GetTheTowerExcel = `${reqURL}/ZYGL/TheTower/GetTheTowerExcel` // 铁塔导出

// 机房
export const GetComputerRoomInfo = `${reqURL}/ZYGL/ComputerRoom/GetComputerRoomInfo` // 获取机房详情
export const GetComputerRoomList = `${reqURL}/ZYGL/ComputerRoom/GetComputerRoomList` // 获取机房列表
export const AddComputerRoomTaskEquipment = `${reqURL}/ZYGL/ComputerRoom/AddComputerRoomTaskEquipment` // 创建机房设备任务
export const EditComputerRoomTaskEquipment = `${reqURL}/ZYGL/ComputerRoom/EditComputerRoomTaskEquipment` // 修改机房任务信息
export const GetComputerRoomTaskEquipmentInfo = `${reqURL}/ZYGL/ComputerRoom/GetComputerRoomTaskEquipmentInfo` // 获取机房任务详情
export const GetComputerRoomExcel = `${reqURL}/ZYGL/ComputerRoom/GetComputerRoomExcel` // 机房导出

// 交流配电箱
export const GetAcDistriButionBoxInfo = `${reqURL}/ZYGL/AcDistriButionBox/GetAcDistriButionBoxInfo` // 获取交流配电箱详情
export const GetAcDistriButionBoxList = `${reqURL}/ZYGL/AcDistriButionBox/GetAcDistriButionBoxList` // 获取交流配电箱列表
export const AddTaskEquipmentAcDistriButionBox = `${reqURL}/ZYGL/AcDistriButionBox/AddTaskEquipmentAcDistriButionBox` // 创建交流配电箱设备任务
export const EditTaskEquipmentAcDistriButionBox = `${reqURL}/ZYGL/AcDistriButionBox/EditTaskEquipmentAcDistriButionBox` // 修改交流配电箱任务信息
export const GetTaskEquipmentAcDistriButionBoxInfo = `${reqURL}/ZYGL/AcDistriButionBox/GetTaskEquipmentAcDistriButionBoxInfo` // 获取交流配电箱任务详情
export const GetAcDistriButionBoxExcel = `${reqURL}/ZYGL/AcDistriButionBox/GetAcDistriButionBoxExcel` // 交流配电箱导出

// 整流模块
export const GetRectifierModuleInfo = `${reqURL}/ZYGL/RectifierModule/GetRectifierModuleInfo` // 获取整流模块详情
export const GetRectifierModuleList = `${reqURL}/ZYGL/RectifierModule/GetRectifierModuleList` // 获取整流模块列表
export const AddRectifierModuleTaskEquipment = `${reqURL}/ZYGL/RectifierModule/AddRectifierModuleTaskEquipment` // 创建整流模块设备任务
export const EditRectifierModuleTaskEquipment = `${reqURL}/ZYGL/RectifierModule/EditRectifierModuleTaskEquipment` // 修改整流模块任务信息
export const GetRectifierModuleTaskEquipmentInfo = `${reqURL}/ZYGL/RectifierModule/GetRectifierModuleTaskEquipmentInfo` // 获取整流模块任务详情
export const GetRectifierModuleExcel = `${reqURL}/ZYGL/RectifierModule/GetRectifierModuleExcel` // 整流模块导出
