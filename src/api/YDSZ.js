// 移动上站接口
import {reqURL} from './api'
import axios from 'axios'

export const GetSiteList = `${reqURL}/YDSZ/Site/GetSiteList` // 站址列表
export const GetSiteInfo = `${reqURL}/YDSZ/Site/GetSiteInfo` // 站址详情
export const DownSiteExcel = `${reqURL}/YDSZ/Site/DownSiteExcel` // 导出
export const ImportSiteExcel = `${reqURL}/YDSZ/Site/ImportSiteExcel` // 导入
export const CreateSite = `${reqURL}/YDSZ/Site/CreateSite` // 新增站址
export const UpdateSite = `${reqURL}/YDSZ/Site/UpdateSite` // 修改站址
export const GetSiteElectricMeterList = `${reqURL}/YDSZ/ElectricMeter/GetSiteElectricMeterList` // 根据站址ID获取电表列表

export const GetLogicStandList = `${reqURL}/YDSZ/LogicStand/GetLogicStandList` // 逻辑站列表
export const GetLogicStandInfo = `${reqURL}/YDSZ/LogicStand/GetLogicStandInfo` // 逻辑站详情
export const DownLogicStandExcel = `${reqURL}/YDSZ/LogicStand/DownLogicStandExcel` // 导出
export const ImportLogicStandExcel = `${reqURL}/YDSZ/LogicStand/ImportLogicStandExcel` // 导入
export const CreateLogicStand = `${reqURL}/YDSZ/LogicStand/CreateLogicStand` // 新增逻辑站
export const UpdateLogicStand = `${reqURL}/YDSZ/LogicStand/UpdateLogicStand` // 编辑逻辑站

export const GetBBUList = `${reqURL}/YDSZ/BBU/GetBBUList` // BBU设备列表
export const GetBBUInfo = `${reqURL}/YDSZ/BBU/GetBBUInfo` // BBU设备详情
export const BBUDownExcel = `${reqURL}/YDSZ/BBU/DownBBUExcel` // 导出
export const ImportBBUExcel = `${reqURL}/YDSZ/BBU/ImportBBUExcel` // 导入
export const CreateBBU = `${reqURL}/YDSZ/BBU/CreateBBU` // BBU新增
export const UpdateBBU = `${reqURL}/YDSZ/BBU/UpdateBBU` // BBU编辑

export const GetRRUList = `${reqURL}/YDSZ/RRU/GetRRUList` // RRU设备列表
export const GetRRUInfo = `${reqURL}/YDSZ/RRU/GetRRUInfo` // RRU设备详情
export const DownRRUExcel = `${reqURL}/YDSZ/RRU/DownRRUExcel` // 导出
export const ImportRRUExcel = `${reqURL}/YDSZ/RRU/ImportRRUExcel` // 导入
export const CreateRRU = `${reqURL}/YDSZ/RRU/CreateRRU` // 新增RRU
export const UpdateRRU = `${reqURL}/YDSZ/RRU/UpdateRRU` // 编辑RRU

export const GetEquipmentList = `${reqURL}/YDSZ/Equipment/GetEquipmentList` // 设备列表
export const GetEquipmentInfo = `${reqURL}/YDSZ/Equipment/GetEquipmentInfo` // 设备详情
export const DownEquipmentExcel = `${reqURL}/YDSZ/Equipment/DownEquipmentExcel` // 导出
export const CreateEquipment = `${reqURL}/YDSZ/Equipment/CreateEquipment` // 新增设备
export const UpdateEquipment = `${reqURL}/YDSZ/Equipment/UpdateEquipment` // 编辑设备

export const GetElectricMeterList = `${reqURL}/YDSZ/ElectricMeter/GetElectricMeterList` // 电表列表
export const GetElectricMeterInfo = `${reqURL}/YDSZ/ElectricMeter/GetElectricMeterInfo` // 获取电表详情
export const UpdateElectricMeterDoorNo = `${reqURL}/YDSZ/ElectricMeter/UpdateElectricMeterDoorNo` // 修改电表户号
export const GetSiteListByID = `${reqURL}/YDSZ/ElectricMeter/GetSiteList` // 根据电表ID获取站址列表
export const DelElectricMeter = `${reqURL}/YDSZ/ElectricMeter/DelElectricMeter` // 删除电表
export const DelSiteElectricMeter = `${reqURL}/YDSZ/ElectricMeter/DelSiteElectricMeter` // 删除站址电表关系
export const GetElectricMeterExcel = `${reqURL}/YDSZ/ElectricMeter/GetElectricMeterExcel` // 导出电表列表

export function exportMethod (data) {
  axios({
    method: data.method,
    url: data.url,
    params: data.data,
    responseType: 'blob'
  }).then((res) => {
    const link = document.createElement('a')
    let blob = new Blob([res], { type: 'application/vnd.ms-excel' })
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    link.download = data.fileName + '.xls' // 下载的文件名  注意：加.xls是兼容火狐浏览器
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }).catch(error => {
    console.log(error)
  })
}
