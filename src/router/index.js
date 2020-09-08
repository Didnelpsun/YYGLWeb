import Vue from 'vue'
import Router from 'vue-router'
import login from 'components/login' // 登录界面
import Main from 'components/main' // 主界面模块
import Mixin from 'components/mixin' // 测试控件页面
import notFound from 'components/notFound' // 404页面

// 首页
import index from 'components/main/index/index' // 首页
import UserInfo from 'components/main/index/UserInfo' // 个人信息
import Dictionaries from 'components/main/index/Dictionaries' // 字典
import Map from 'components/main/index/map' // 地图
import Statistics from 'components/main/index/Statistics' // 统计
import TenantList from 'components/main/index/TenantList' // 系统租户

// 系统
import UserList from 'components/main/System/UserList' // 系统用户
import MenuList from 'components/main/System/MenuList' // 系统菜单
import RoleList from 'components/main/System/RoleList' // 系统角色
import PermissionList from 'components/main/System/PermissionList' // 资源管理
import AreasList from 'components/main/System/AreasList' // 系统区域
import OrganizationList from 'components/main/System/OrganizationList' // 组织架构
import ImportTemplate from 'components/main/System/ImportTemplate' // 导入模板
import PageSpecification from 'components/main/System/PageSpecification'

// 站点资源
import MonitoringSite from 'components/main/Resource/MonitoringSite' // 监控站点
import SwitchCabinetList from 'components/main/Resource/SwitchCabinetList' // 换电柜
import ZYResource from 'components/main/Resource/ZYResource' // 资源站点列表
import NYResource from 'components/main/Resource/NYResource' // 能源站点列表
import OperatorSite from 'components/main/Resource/OperatorSite' //  运营商站点
import ChargingPile from 'components/main/Resource/ChargingPile' // 充电桩
import Reservepover from 'components/main/Resource/Reservepover' // 备电
import BatteryGenerator from 'components/main/Resource/BatteryGenerator' // 电池发电
import Battery from 'components/main/Resource/Battery' // 换电电池
import OilFiredGenerator from 'components/main/Resource/OilFiredGenerator' // 燃油发电机
import Ammeter from '../components/main/Resource/Ammeter' // 电表
import AnElectricIntroduced from '../components/main/Resource/AnElectricIntroduced' // 电表

// 网络资源
import SwitchingPowerSupply from '../components/main/ZYResource/SwitchingPowerSupply' // 开关电源
import OperatorEquipment from '../components/main/ZYResource/OperatorEquipment' // 网络设备
import TheTower from '../components/main/ZYResource/TheTower' // 铁塔
import ComputerRoom from '../components/main/ZYResource/ComputerRoom' // 机房
import AcDistriButionBox from '../components/main/ZYResource/AcDistriButionBox' // 交流配电箱
import ComputerRoomAirConditioning from '../components/main/ZYResource/ComputerRoomAirConditioning' // 机房空调
import RectifierModule from '../components/main/ZYResource/RectifierModule' // 整流模块

// 能源统计
import NYEquipmentStatistics from '../components/main/TaskManagement/NYEquipmentStatistics' // 能源资源统计
import NYTaskStatistics from '../components/main/TaskManagement/NYTaskStatistics' // 能源任务统计


// 维护管理
import HiddenDanger from 'components/main/Uphold/HiddenDanger' // 隐患台账
import Maintain from 'components/main/Uphold/Maintain' // 上站维护台账

// 油机调度
import TaskList from 'components/main/YJGL/TaskList' // 任务列表
import SiteList from 'components/main/YJGL/SiteList' // 站点列表
import EngineList from 'components/main/YJGL/EngineList' // 油机列表
import EngineAudit from 'components/main/YJGL/EngineAudit' // 油机审核
import TagList from 'components/main/YJGL/TagList' // 标签列表
import CollectorList from 'components/main/YJGL/CollectorList' // 监控模块列表
import PowerRecordInfoAudit from 'components/main/YJGL/PowerRecordInfoAudit' // 发电记录审核
import CourtsList from 'components/main/YJGL/CourtsList' // 台区列表
import AssistantList from 'components/main/YJGL/AssistantList' // 协管员列表
import AssistantAudit from 'components/main/YJGL/AssistantAudit' // 协管员审核列表
import PowerWarningList from 'components/main/YJGL/PowerWarningList' // 预警监控列表
import PowerDispatchRecord from 'components/main/YJGL/PowerDispatchRecord' // 预警监控列表
import EngineStoragePosition from 'components/main/YJGL/EngineStoragePosition' // 固定油机部署列表
import EngineStoragePositionAudit from 'components/main/YJGL/EngineStoragePositionAudit' // 固定油机部署审核列表

// 移动上站
import SiteManagement from 'components/main/YDSZ/SiteManagement' // 站址管理
import LogicStationManagement from 'components/main/YDSZ/LogicStationManagement' // 逻辑站管理
import RRUEquipment from 'components/main/YDSZ/RRUEquipment' // RRU设备管理
import BBUEquipment from 'components/main/YDSZ/BBUEquipment' // BBU设备管理
import EquipmentManagement from 'components/main/YDSZ/EquipmentManagement' // 设备管理
import ElectricityMeter from 'components/main/YDSZ/ElectricityMeter' // 电表管理

// 勘察管理
import NYTaskManagement from 'components/main/TaskManagement/NYTaskManagement' // 任务管理
import ProjectManagement from 'components/main/SurveyManagement/ProjectManagement' // 项目管理
import StockStation from 'components/main/SurveyManagement/StockStation' // 存量站

import TaskManagement from 'components/main/SurveyManagement/TaskManagement' // 任务管理
import NewBuildStation from 'components/main/SurveyManagement/NewBuildStation' // 新建站
import InvestigateImgConfiguration from 'components/main/SurveyManagement/InvestigateImgConfiguration' // 勘察图片配置管理
import TaskAuitLog from 'components/main/SurveyManagement/TaskAuitLog' // 任务审核记录

// 备件调度管理
import Sparetype from 'components/main/SpareManagement/Sparetype' // 备件类型列表
import SpareconModel from 'components/main/SpareManagement/SpareconModel' // 备件型号列表
import SparepartsManufacturer from 'components/main/SpareManagement/SparepartsManufacturer' // 备件厂家列表
import Warehouse from 'components/main/SpareManagement/SpareWarehouse' // 备件存放点
import AfterSaleContract from 'components/main/SpareManagement/AfterSaleContract' // 售后合同
import MaintenanceItems from 'components/main/SpareManagement/MaintenanceItems' // 维修厂家
import StoragePointOperation from 'components/main/SpareManagement/StoragePointOperation' //  存放点操作配置列表
import Spareparts from 'components/main/SpareManagement/Spareparts' //  备件列表
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      meta: {
        keepAlive: true
      },
      children: [
        {
          name: '404',
          path: 'notFound',
          component: notFound
        },
        { // 测试控件
          path: 'Mixin',
          name: 'mixin',
          component: Mixin
        },
        { // 用户的个人资料
          path: 'UserInfo',
          name: 'UserInfo',
          component: UserInfo
        },
        { // 字典
          path: 'Dictionaries',
          name: 'Dictionaries',
          component: Dictionaries
        },
        { // 首页
          path: 'index',
          name: 'index',
          component: index
        },
        { // 地图
          path: 'map',
          name: 'Map',
          component: Map
        },
        { // 统计
          path: 'Statistics',
          name: 'Statistics',
          component: Statistics
        },
        { // 系统租户
          path: 'TenantList',
          name: 'TenantList',
          component: TenantList
        },
        { // 系统菜单
          path: 'MenuList',
          name: 'MenuList',
          component: MenuList
        },
        { // 系统用户
          path: 'UserList',
          name: 'UserList',
          component: UserList
        },
        { // 系统角色
          path: 'RoleList',
          name: 'RoleList',
          component: RoleList
        },
        { // 资源管理
          path: 'PermissionList',
          name: 'PermissionList',
          component: PermissionList
        },
        { // 系统区域
          path: 'AreasList',
          name: 'AreasList',
          component: AreasList
        },
        { // 组织架构
          path: 'OrganizationList',
          name: 'OrganizationList',
          component: OrganizationList
        },
        { // 换电柜
          path: 'SwitchCabinetList',
          name: 'SwitchCabinetList',
          component: SwitchCabinetList
        },
        {// 开关电源
          path: 'SwitchingPowerSupply',
          name: 'SwitchingPowerSupply',
          component: SwitchingPowerSupply
        },
        {// 电表
          path: 'Ammeter',
          name: 'Ammeter',
          component: Ammeter
        },
        {// 外电引入
          path: 'AnElectricIntroduced',
          name: 'AnElectricIntroduced',
          component: AnElectricIntroduced
        },
        {// 网络设备
          path: 'OperatorEquipment',
          name: 'OperatorEquipment',
          component: OperatorEquipment
        },
        {// 铁塔
          path: 'TheTower',
          name: 'TheTower',
          component: TheTower
        },
		{// 机房
          path: 'ComputerRoom',
          name: 'ComputerRoom',
          component: ComputerRoom
		},
		{// 交流配电箱
          path: 'AcDistriButionBox',
          name: 'AcDistriButionBox',
          component: AcDistriButionBox
		},
		{// 机房空调
          path: 'ComputerRoomAirConditioning',
          name: 'ComputerRoomAirConditioning',
          component: ComputerRoomAirConditioning
		},
		{// 整流模块
          path: 'RectifierModule',
          name: 'RectifierModule',
          component: RectifierModule
		},
        {// 备件类型列表
          path: 'Sparetype',
          name: 'Sparetype',
          component: Sparetype
        },
        {// 备件型号列表
          path: 'SpareconModel',
          name: 'SpareconModel',
          component: SpareconModel
        },
        {// 备件类型列表
          path: 'SparepartsManufacturer',
          name: 'SparepartsManufacturer',
          component: SparepartsManufacturer
        },
        {// 备件存放点
          path: 'Warehouse',
          name: 'Warehouse',
          component: Warehouse
        },
        {// 售后合同
          path: 'AfterSaleContract',
          name: 'AfterSaleContract',
          component: AfterSaleContract
        },
        {// 维修厂家
          path: 'MaintenanceItems',
          name: 'MaintenanceItems',
          component: MaintenanceItems
        },
        {// 存放点操作配置列表
          path: 'StoragePointOperation',
          name: 'StoragePointOperation',
          component: StoragePointOperation
        },
        {// 存放点操作配置列表
          path: 'Spareparts',
          name: 'Spareparts',
          component: Spareparts
        },
        {
          path: 'ZYResource',
          name: 'ZYResource',
          component: ZYResource
        },
        {
          path: 'NYResource',
          name: 'NYResource',
          component: NYResource
        },
        {
          path: 'MonitoringSite',
          name: 'MonitoringSite',
          component: MonitoringSite
        },
        {
          path: 'OperatorSite',
          name: 'OperatorSite',
          component: OperatorSite
        },
        {
          path: 'ChargingPile',
          name: 'ChargingPile',
          component: ChargingPile
        },
        {
          path: 'Reservepover',
          name: 'Reservepover',
          component: Reservepover
        },
        {
          path: 'TaskList',
          name: 'TaskList',
          component: TaskList
        },
        {
          path: 'SiteList',
          name: 'SiteList',
          component: SiteList
        },
        {
          path: 'EngineList',
          name: 'EngineList',
          component: EngineList
        },
        {
          path: 'EngineAudit',
          name: 'EngineAudit',
          component: EngineAudit
        },
        {
          path: 'TagList',
          name: 'TagList',
          component: TagList
        },
        {
          path: 'CollectorList',
          name: 'CollectorList',
          component: CollectorList
        },
        {
          path: 'PowerRecordInfoAudit',
          name: 'PowerRecordInfoAudit',
          component: PowerRecordInfoAudit
        },
        {
          path: 'CourtsList',
          name: 'CourtsList',
          component: CourtsList
        },
        {
          path: 'AssistantList',
          name: 'AssistantList',
          component: AssistantList
        },
        {
          path: 'AssistantAudit',
          name: 'AssistantAudit',
          component: AssistantAudit
        },
        {
          path: 'PowerWarningList',
          name: 'PowerWarningList',
          component: PowerWarningList
        },
        {
          path: 'PowerDispatchRecord',
          name: 'PowerDispatchRecord',
          component: PowerDispatchRecord
        },
        {
          path: 'EngineStoragePosition',
          name: 'EngineStoragePosition',
          component: EngineStoragePosition
        },
        {
          path: 'EngineStoragePositionAudit',
          name: 'EngineStoragePositionAudit',
          component: EngineStoragePositionAudit
        },
        {
          path: 'BatteryGenerator',
          name: 'BatteryGenerator',
          component: BatteryGenerator
        },
        {
          path: 'Battery',
          name: 'Battery',
          component: Battery
        },
        {
          path: 'SiteManagement',
          name: 'SiteManagement',
          component: SiteManagement
        },
        {
          path: 'LogicStationManagement',
          name: 'LogicStationManagement',
          component: LogicStationManagement
        },
        {
          path: 'RRUEquipment',
          name: 'RRUEquipment',
          component: RRUEquipment
        },
        {
          path: 'BBUEquipment',
          name: 'BBUEquipment',
          component: BBUEquipment
        },
        {
          path: 'EquipmentManagement',
          name: 'EquipmentManagement',
          component: EquipmentManagement
        },
        {
          path: 'ElectricityMeter',
          name: 'ElectricityMeter',
          component: ElectricityMeter
        },
        {
          path: 'NYTaskStatistics',
          name: 'NYTaskStatistics',
          component: NYTaskStatistics
        },
        {
          path: 'NYEquipmentStatistics',
          name: 'NYEquipmentStatistics',
          component: NYEquipmentStatistics
        },
        {
          path: 'HiddenDanger',
          name: 'HiddenDanger',
          component: HiddenDanger
        },
        {
          path: 'Maintain',
          name: 'Maintain',
          component: Maintain
        },
        {
          path: 'ImportTemplate',
          name: 'ImportTemplate',
          component: ImportTemplate
        },
        {
          path: 'NYTaskManagement',
          name: 'NYTaskManagement',
          component: NYTaskManagement
        },
        {
          path: 'OilFiredGenerator',
          name: 'OilFiredGenerator',
          component: OilFiredGenerator
        },
        {
          path: 'ProjectManagement',
          name: 'ProjectManagement',
          component: ProjectManagement
        },
        {
          path: 'StockStation',
          name: 'StockStation',
          component: StockStation
        },
        {
          path: 'TaskManagement',
          name: 'TaskManagement',
          component: TaskManagement
        },
        {
          path: 'NewBuildStation',
          name: 'NewBuildStation',
          component: NewBuildStation
        },
        {
          path: 'InvestigateImgConfiguration',
          name: 'InvestigateImgConfiguration',
          component: InvestigateImgConfiguration
        },
        {
          path: 'PageSpecification',
          name: 'PageSpecification',
          component: PageSpecification
        },
        {
          path: 'TaskAuitLog',
          name: 'TaskAuitLog',
          component: TaskAuitLog
        },
        {
          path: '*', // 此处需特别注意至于最底部
          redirect: 'notFound'
        }
      ]
    }
  ]
})
