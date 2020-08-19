// 油机接口
import {reqURL} from './api'

// 站点列表
export const GetpowerpositionList = `${reqURL}/YJGL/powerposition/GetwerpositionList` // pc获取站点列表
export const GetpowerpositionInfo = `${reqURL}/YJGL/powerposition/werpositiondetails` // pc获取站点详情
export const Getmonitoringsites = `${reqURL}/YJGL/powerposition/Getmonitoringsites` // 根据站点id获取监控站点
export const GetOperatorSiteList = `${reqURL}/YJGL/powerposition/GetOperatorSiteList` // 运营商站点
export const Deletepowerposition = `${reqURL}/YJGL/powerposition/Deletepowerposition` // 删除发电位置和站点

// 发电
export const GetSitepowerposition = `${reqURL}/YJGL/powerposition/GetSitepowerposition` // 根据站点获取发电列表

// 任务
export const JobList = `${reqURL}/YJGL/Job/GetJobList` // 任务列表
export const JobInfo = `${reqURL}/YJGL/Job/GetJobInfo` // 任务详情
export const TaskIdOperationLog = `${reqURL}/YJGL/Job/TaskIdOperationLog` // 调度日志
export const TaskIdMonitoring = `${reqURL}/YJGL/Job/TaskIdMonitoring` // 告警列表

// 油机
export const AddEngine = `${reqURL}/YJGL/engine/AddEngine` // 添加油机
export const EditEngine = `${reqURL}/YJGL/engine/EditEngine` // 修改油机
export const EngineUnbundling = `${reqURL}/YJGL/engine/EngineUnbundling` // 油机解绑
export const AppGetEngineIdListInfo = `${reqURL}/YJGL/engine/AppGetEngineIdListInfo` // app,pc端 根据id查询审核通过油机详情
export const GetEngineListInfo = `${reqURL}/YJGL/engine/GetEngineListInfo` // pc 获取列表
export const DeletEngine = `${reqURL}/YJGL/engine/DeletEngine` // 删除油机
export const GetEngineidlog = `${reqURL}/YJGL/engine/GetEngineidlog` // pc 根据油机id获取调度日志

// 油机审核
export const Machineaudit = `${reqURL}/YJGL/engineaudit/machineaudit` // 油机审核
export const MachineauditInfo = `${reqURL}/YJGL/engineaudit/machineauditInfo` // 审核详情
export const MachineauditList = `${reqURL}/YJGL/engineaudit/machineauditList` // pc端查看油机审核列表

// 模块
export const Addcollector = `${reqURL}/YJGL/collectorSevice/Addcollector` // 添加模块
export const Editcollector = `${reqURL}/YJGL/collectorSevice/Editcollector` // 修改模块
export const Deletecollector = `${reqURL}/YJGL/collectorSevice/Deletecollector` // 删除模块
export const GetcollectorIdInfo = `${reqURL}/YJGL/collectorSevice/GetcollectorIdInfo` // 获取模块详情
export const GetcollectorList = `${reqURL}/YJGL/collectorSevice/Getcollector` // 获取模块列表

// 标签
export const AddTag = `${reqURL}/YJGL/tag/AddTag` // 添加标签
export const EditTag = `${reqURL}/YJGL/tag/EditTag` // 修改标签
export const DelteTag = `${reqURL}/YJGL/tag/DelteTag` // 删除标签
export const GetTagListInfo = `${reqURL}/YJGL/tag/GetTagListInfo` // 获取标签列表
export const GetTagIdListInfo = `${reqURL}/YJGL/tag/GetTagIdListInfo` // 根据id获取标签详情

// 台区
export const AddCourts = `${reqURL}/YJGL/courts/AddCourts` // 添加台区
export const EditCourts = `${reqURL}/YJGL/courts/EditCourts` // 修改台区
export const DeleteCourts = `${reqURL}/YJGL/courts/DeleteCourts` // 删除台区
export const GetIdCourtsInfo = `${reqURL}/YJGL/courts/GetIdCourtsInfo` // 根据id获取台区详情
export const GetCourtsIdScope = `${reqURL}/YJGL/courts/GetCourtsIdScope` // 根据台区id获取台区范围
export const GetCourtsList = `${reqURL}/YJGL/courts/GetCourts` // 获取台区列表

// 发电审核
export const ObtainAuditList = `${reqURL}/YJGL/powerrecordInfoauditServcie/ObtainAudit` // pc 获取发电记录待审核记录
export const ObtainAuObtainAuditInfo = `${reqURL}/YJGL/powerrecordInfoauditServcie/ObtainAuditInfo` // 根据id获取发电记录详情
export const PowerInfoAudit = `${reqURL}/YJGL/powerrecordInfoauditServcie/audit` // pc 发电记录审核

// 协管员
export const AddAssistant = `${reqURL}/YJGL/Assistant/AddAssistant` // 添加协管员
export const EditAssistant = `${reqURL}/YJGL/Assistant/EditAssistant` // 修改协管员
export const DeleteAssistant = `${reqURL}/YJGL/Assistant/DeleteAssistant` // 删除协管员
export const GetIdAssistantInfo = `${reqURL}/YJGL/Assistant/GetIdAssistantInfo` // 获取协管员详情
export const GetAssistantInfoList = `${reqURL}/YJGL/Assistant/GetAssistant` // APP,后端协管员列表
export const GetSiteidAssistantInfo = `${reqURL}/YJGL/Assistant/GetSiteidAssistantInfo` // 根据站点id获取协管详情
export const GetIdscope = `${reqURL}/YJGL/assistantstation/GetIdscope` // 根据协管员id获取管理范围

// 协管员审核
export const GetAssistantList = `${reqURL}/YJGL/assistantstation/Getassistantstation` // 协管员审核列表
export const AuditApply = `${reqURL}/YJGL/assistantstation/AuditApply` // 协管员范围审核
export const AuditApplyInfo = `${reqURL}/YJGL/assistantstation/AuditApplyInfo` // 审核详情

// 停电预警
export const AddPowerwarning = `${reqURL}/YJGL/powerwarning/AddPowerwarning` // 添加停电预警
export const EditPowerwarning = `${reqURL}/YJGL/powerwarning/EditPowerwarning` // 修改停电预警
export const DeletePowerwarning = `${reqURL}/YJGL/powerwarning/DeletePowerwarning` // 删除停电预警
export const GetPowerwarningList = `${reqURL}/YJGL/powerwarning/GetPowerwarningList` // 后台停电监控列表
export const GetIdPowerwarningInfo = `${reqURL}/YJGL/powerwarning/GetIdPowerwarningList` // pc获取停电计划详情

// 油机调度记录
export const PowerDispatchRecordList = `${reqURL}/YJGL/powerdispatch/RecordList` // 油机调度列表

// 固定油机部署
export const AddEnginestorageposition = `${reqURL}/YJGL/enginestorageposition/AddEnginestorageposition` // 添加油机部署
export const EditEnginestorageposition = `${reqURL}/YJGL/enginestorageposition/EditEnginestorageposition` // 修改油机部署
export const DeteleEnginestorageposition = `${reqURL}/YJGL/enginestorageposition/DeteleEnginestorageposition` // 删除油机部署
export const MachineUnbundling = `${reqURL}/YJGL/enginestorageposition/MachineUnbundling` // 油机部署解绑
export const EnginestoragepositionList = `${reqURL}/YJGL/enginestorageposition/EnginestoragepositionList` // 油机部署列表
export const EnginestoragepositionInfo = `${reqURL}/YJGL/enginestorageposition/GetIdEnginestoragepositionList` // 油机部署详情

// 固定油机部署审核
export const Audit = `${reqURL}/YJGL/enginestoragepositionaudit/Audit` // 固定油机审核
// export const ApplyFor = `${reqURL}/YJGL/enginestoragepositionaudit/ApplyFor` // 获取固定油机部署列表
export const AuditList = `${reqURL}/YJGL/enginestoragepositionaudit/AuditList` // 固定油机审核列表
