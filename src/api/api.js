export let reqURL = 'http://111.47.173.162:8051'// 测试环境
// export const reqURL = 'http://119.96.226.157:8004' // 正式环境
// export const reqURL = 'http://192.163.0.162:8051' // 阮
// export const reqURL = 'http://192.163.0.162:8051' // 赵
// export const reqURL = 'http://localhost:5000'// 本地接口

// process.env.NODE_ENV === 'production' ? reqURL = 'http://111.47.173.162:8051' : reqURL = 'http://111.47.173.162:8051'
// 赵
// process.env.NODE_ENV === 'production' ? reqURL = 'http://111.47.173.162:8051' : reqURL = 'http://192.168.0.131:5000'
// 阮
process.env.NODE_ENV === 'production' ? reqURL = 'http://192.168.0.50:8081' : reqURL = 'http://192.168.0.50:8081'

export const test = `${reqURL}`

export const loginAPI = `${reqURL}/Admin/User/LoginAsync` // 登录
export const ValiImg = `${reqURL}/Admin/User/ImageCaptcha` // 登录图片验证码
export const UploadImg = `${reqURL}/Admin/UploadImage/Upload` // 上传图片
export const UserInfo = `${reqURL}/Admin/User/UserLoginInfoAsync` // 获取登录信息

// 导入模板
export const GetExcleTemplateList = `${reqURL}/Admin/ExcleTemplate/GetExcleTemplateList` // 获取模板配置列表
export const GetExcleTemplateInfo = `${reqURL}/Admin/ExcleTemplate/GetExcleTemplateInfo` // 获取模板详情
export const EditExcleTemplate = `${reqURL}/Admin/ExcleTemplate/EditExcleTemplate` // 模板修改
export const UploadFile = `${reqURL}/YDSZ/System/UploadFile` // 上传文件

// User用户
export const UserListAsync = `${reqURL}/Admin/User/GetUserListAsync` // 查询用户列表
export const AddUser = `${reqURL}/Admin/User/AddUserAsync` // 添加用户
export const EditUser = `${reqURL}/Admin/User/EditUserAsync` // 编辑用户
export const DelUser = `${reqURL}/Admin/User/DeletUserAsync` // 删除用户
export const ViewUserInfo = `${reqURL}/Admin/User/GetUserInfoAsync` // 根据用户id获取用户信息
export const ResetPassword = `${reqURL}/Admin/User/ResetPassword` // 重置密码
export const GetUserIdTenantUsers = `${reqURL}/Admin/User/GetUserIdTenantUsers` // 获取当前租户用户

// Menu菜单
export const NavMenu = `${reqURL}/Admin/Menu/NavigationMenuAsync` // 查看当前用户导航栏菜单
export const MenuList = `${reqURL}/Admin/Menu/GetMenuListAsync` // 查看菜单列表
export const AddMenu = `${reqURL}/Admin/Menu/AddMenuAsync` // 添加菜单
export const EditMenu = `${reqURL}/Admin/Menu/EditMenuAsync` // 修改菜单
export const DeleteMenu = `${reqURL}/Admin/Menu/DeleteMenuAsync` // 删除菜单
export const MeunResource = `${reqURL}/Admin/Menu/GetResourceIdMeunAsync` // 根据菜单id获取菜单对应资源
export const MoveMenu = `${reqURL}/Admin/Menu/MoveupMenuAsync` // 上移，下移

// Resource资源
export const AddResource = `${reqURL}/Admin/Resource/AddResourceAsync` // 添加资源
export const EditResource = `${reqURL}/Admin/Resource/EditResourceAsync` // 编辑资源
export const DelResource = `${reqURL}/Admin/Resource/DeleteResourceAsync` // 删除资源
export const ResourceInfo = `${reqURL}/Admin/Resource/GetIdResourceAsync` // 根据id获取资源详情
export const ResrouceList = `${reqURL}/Admin/Resource/GetResrouceListAsync` // 查看资源列表
export const AuthorizeRole = `${reqURL}/Admin/Permission/UserAuthorizeRoleAsync` // 角色授权资源 1 为角色 2 为用户

// Role角色
export const AddRole = `${reqURL}/Admin/Role/AddRoleAsync` // 添加角色
export const EditRole = `${reqURL}/Admin/Role/EditRoleAsync` // 编辑角色
export const DeleteRole = `${reqURL}/Admin/Role/DeleteRoleAsync` // 删除角色
export const RoleInfo = `${reqURL}/Admin/Role/GetRoleInfoAsync` // 根据角色id获取角色信息
export const RoleList = `${reqURL}/Admin/Role/GetRoleListAsync` // 查看角色列表
export const CopyRole = `${reqURL}/Admin/Role/CopyRoleAsync` // 复制角色

// Area区域
export const AreaList = `${reqURL}/Admin/Area/GetAreaListAsync` // 查询区域列表

// Permission授权
export const RoleOrArea = `${reqURL}/Admin/Permission/EditAuthorizeRoleOrAreaAsync` // 编辑授权区域和角色
export const DeleteAuthorizeRoleOrArea = `${reqURL}/Admin/Permission/DeleteAuthorizeRoleOrAreaAsync` // 删除授权区域和角色
export const DeleteUserAuthorizeRole = `${reqURL}/Admin/Permission/DeleteUserAuthorizeRoleAsync` // 删除授权资源
export const UserAuthorizesThoseResources = `${reqURL}/Admin/Permission/UserAuthorizesThoseResourcesAsync` // 根据用户查看授权资源
export const ViewUserAuthorizedOrArea = `${reqURL}/Admin/Permission/UserAuthorizedThoseRolesAsync` // 查看用户授权了那些角色 查看用户授权了那些区域
export const RolesAuthorizedResources = `${reqURL}/Admin/Permission/GetRolesAuthorizedResourcesAsync` // 根据角色id查看资源
export const RoleAuthorizeUser = `${reqURL}/Admin/Permission/GetRoleAuthorizeUserAsync` // 根据角色id获取授权用户
export const UserAuthorizeRoleOrAreaAsync = `${reqURL}/Admin/Permission/UserAuthorizeRoleOrAreaAsync` // 给用户授权角色区域
export const UserAuthorizeRoleAsync = `${reqURL}/Admin/Permission/UserAuthorizeRoleAsync` // 角色授权资源

// Organization部门
export const AddOrg = `${reqURL}/Admin/Organization/AddOrganizationAsync` // 添加部门
export const EditOrg = `${reqURL}/Admin/Organization/EditOrganizationAsync` // 修改部门
export const DeleteOrg = `${reqURL}/Admin/Organization/DeleteOrganizationAsync` // 删除部门
export const IdOrgInfo = `${reqURL}/Admin/Organization/GetIdOrganizationInfoAsync` // 根据id查找部门信息
export const OrgList = `${reqURL}/Admin/Organization/GetOrganizationList` // 获取部门列表
export const OrganizationListAsync = `${reqURL}/Admin/Organization/GetOrganizationListAsync` // 下拉框列表

// Tenant 租户
export const AddTenant = `${reqURL}/Admin/Tenant/AddTenantAsync` // 添加租户
export const EditTenant = `${reqURL}/Admin/Tenant/EditTenantAsync` // 编辑租户/Admin/Tenant/EditTenantAsync
export const InfoAsync = `${reqURL}/Admin/Tenant/GetTenantInfoAsync` // 通过id获取信息
export const DeleteTenant = `${reqURL}/Admin/Tenant/DeleteTenantAsync` // 删除租户
export const TenantList = `${reqURL}/Admin/Tenant/GetTenantListAsync` // 租户列表
export const TenantIdlistRole = `${reqURL}/Admin/Tenant/GetTenantIdlistRoleAsync` // Type = 1 根据租户 id 查看授权角色 Type = 2  根据租户 id 获取资源

// Dictionaries 字典
export const GetDictionarylist = `${reqURL}/Admin/Dictionarys/GetDictionarylist` // 查询字典列表
export const AddDictionary = `${reqURL}/Admin/Dictionarys/AddDictionary` // 新增字典
export const GetDictionaryinfo = `${reqURL}/Admin/Dictionarys/GetDictionaryinfo` // 获取字典详情
export const EditDictionary = `${reqURL}/Admin/Dictionarys/EditDictionary` // 字典修改
export const DelDictionary = `${reqURL}/Admin/Dictionarys/DelDictionary` // 字典删除
export const DictionaryInfoList = `${reqURL}/Admin/Dictionarys/GetDictionaryInfoList` // 根据字典字段查询所有数据

// PageSpecification 页面规范配置
export const GetPageSpecificationList = `${reqURL}/Admin/PageSpecification/GetPageSpecificationList` // 获取页面规范配置列表
export const GetPageSpecificationInfo = `${reqURL}/Admin/PageSpecification/GetPageSpecificationInfo` // 获取页面规范配置详情
export const AddPageSpecification = `${reqURL}/Admin/PageSpecification/AddPageSpecification` // 新增页面规范配置
export const UpdatePageSpecification = `${reqURL}/Admin/PageSpecification/UpdatePageSpecification` // 修改页面规范配置
export const DelPageSpecification = `${reqURL}/Admin/PageSpecification/DelPageSpecification` // 删除页面规范配置

// OperatorSite 运营商站点
export const GetOperatorSiteList = `${reqURL}/ZYGL/OperatorSite/GetOperatorSiteList` // 获取分页列表
export const GetOperatorSiteInfo = `${reqURL}/ZYGL/OperatorSite/GetOperatorSiteInfo` // 根据id查看运营商详情
export const AddOperatorSite = `${reqURL}/ZYGL/OperatorSite/AddOperatorSite` // 新增运营商站点
export const UpdateOperatorSite = `${reqURL}/ZYGL/OperatorSite/UpdateOperatorSite` // 修改运营商站点
export const DelOperatorSite = `${reqURL}/ZYGL/OperatorSite/DelOperatorSite` // 删除运营商站点

// 站点列表
export const AddZYResourceAsync = `${reqURL}/ZYGL/ZYResource/AddZYResourceAsync` // 添加站点
export const EditZYResourceAsync = `${reqURL}/ZYGL/ZYResource/EditZYResourceAsync` // 修改运营商站点
export const DeleteZYResourceAsync = `${reqURL}/ZYGL/ZYResource/DeleteZYResourceAsync` // 删除
export const GetZYResourceIdListAsync = `${reqURL}/ZYGL/ZYResource/GetZYResourceIdListAsync` // 根据id查询站点信息
export const GetZYResourceListAsync = `${reqURL}/ZYGL/ZYResource/GetZYResourceListAsync` // 查询资源站点列表
export const GetEnergyListAsync = `${reqURL}/ZYGL/ZYResource/GetEnergyListAsync` // 查询能源站点列表
export const Resourcelist = `${reqURL}/ZYGL/GetZYResourcelist` // 根据条件查询站点列表
export const GetResourceExcel = `${reqURL}/ZYGL/ZYResource/GetResourceExcel` // 站点导出
export const ImportResourceExcel = `${reqURL}/ZYGL/ZYResource/ImportResourceExcel` // 站点导入

// MonitoringSite  监控站点
export const AddMonitoringSite = `${reqURL}/ZYGL/MonitoringSite/AddMonitoringSiteAsync` // 添加监控站点
export const EditMonitoringSite = `${reqURL}/ZYGL/MonitoringSite/EditMonitoringSiteAsync` // 编辑
export const DeleteMonitoringSite = `${reqURL}/ZYGL/MonitoringSite/DeleteMonitoringSiteAsync` // 删除
export const MonitoringSiteIdInfo = `${reqURL}/ZYGL/MonitoringSite/GetMonitoringSiteIdInfoAsync` // 根据id查监控站点信息
export const GetMonitoringSite = `${reqURL}/ZYGL/MonitoringSite/GetMonitoringSiteAsync` // 查询监控站点列表

// ZY Resource 站点资源
export const GetZYResourcelist = `${reqURL}/ZYGL/GetZYResourcelist` // 根据条件查询站点列表

// ChargingPile 充电桩
export const AddChargingPile = `${reqURL}/ZYGL/ChargingPile/AddChargingPile` // 新增充电桩
export const EditChargingPile = `${reqURL}/ZYGL/ChargingPile/EditChargingPile` // 编辑充电桩
export const ChargingPileInfo = `${reqURL}/ZYGL/ChargingPile/GetChargingPileInfo` // 充电桩详情
export const ChargingPileList = `${reqURL}/ZYGL/ChargingPile/GetChargingPileListInfo` // 充电桩列表
export const GetChargingPileExcel = `${reqURL}/ZYGL/ChargingPile/GetChargingPileExcel` // 充电桩导出

// SwitchCabinets 换电柜
export const AddSwitchCabinet = `${reqURL}/ZYGL/SwitchCabinets/AddSwitchCabinet` // 换电柜新增
export const GetSwitchCabinetList = `${reqURL}/ZYGL/SwitchCabinets/GetSwitchCabinetList` // 获取分页列表
export const UpdateSwitchCabinet = `${reqURL}/ZYGL/SwitchCabinets/UpdateSwitchCabinet` // 换电柜修改
export const GetSwitchCabinetInfo = `${reqURL}/ZYGL/SwitchCabinets/GetSwitchCabinetInfo` // 查询换电柜详情
export const GetSwitchCabinetExcel = `${reqURL}/ZYGL/SwitchCabinets/GetSwitchCabinetExcel` // 换电柜导出

// Reservepover 备电
export const AddReservepover = `${reqURL}/ZYGL/Reservepover/AddReservepover` //
export const EditReservepover = `${reqURL}/ZYGL/Reservepover/EditReservepover` // 修改备电
export const GetReservepoverInfo = `${reqURL}/ZYGL/Reservepover/GetReservepoverInfo` // 获取备电详情
export const GetReservepoverList = `${reqURL}/ZYGL/Reservepover/GetReservepoverList` // 获取备电列表
export const AddTaskEquipmentReservepover = `${reqURL}/ZYGL/Reservepover/AddTaskEquipmentReservepover` // 新增备电任务设备信息
export const EditTaskEquipmentReservepover = `${reqURL}/ZYGL/Reservepover/EditTaskEquipmentReservepover` // 修改备电任务设备信息
export const GetTaskEquipmentReservepoverInfo = `${reqURL}/ZYGL/Reservepover/GetTaskEquipmentReservepoverInfo` // 获取备电任务设备详情
export const GetReservepoverExcel = `${reqURL}/ZYGL/Reservepover/GetReservepoverExcel` // 备电导出

// ZY 设备
export const ListEquipmentTypeInfo = `${reqURL}/ZYGL/ZY/GetListEquipmentTypeInfo` // 查询设备类型列表
export const ListEquipmentAllocation = `${reqURL}/ZYGL/ZY/GetListEquipmentAllocationInfo` // 通过表名查询设备配置列表数据
export const DelEquipment = `${reqURL}/ZYGL/ZY/DelEquipment` // 删除设备

// 换电电池
export const AddBattery = `${reqURL}/ZYGL/Battery/AddBattery` // 新增电池
export const EditBattery = `${reqURL}/ZYGL/Battery/EditBattery` // 修改电池
export const GetBatteryInfo = `${reqURL}/ZYGL/Battery/GetBatteryInfo` // 获取电池详情
export const GetBatteryList = `${reqURL}/ZYGL/Battery/GetBatteryList` // 获取电池列表
export const AddTaskEquipmentBattery = `${reqURL}/ZYGL/Battery/AddTaskEquipmentBattery` // 新增电池任务设备信息
export const EditTaskEquipmentBattery = `${reqURL}/ZYGL/Battery/EditTaskEquipmentBattery` // 修改电池任务设备信息
export const GetTaskEquipmentBatteryInfo = `${reqURL}/ZYGL/Battery/GetTaskEquipmentBatteryInfo` // 获取电池任务设备详情
export const GetBatteryExcel = `${reqURL}/ZYGL/Battery/GetBatteryExcel` // 电池导出

// BatteryGenerator 电池发电
export const AddBatteryGenerator = `${reqURL}/ZYGL/BatteryGenerator/AddBatteryGenerator` // 新增电池发电装置
export const EditBatteryGenerator = `${reqURL}/ZYGL/BatteryGenerator/EditBatteryGenerator` // 修改电池发电装置
export const BatteryGeneratorInfo = `${reqURL}/ZYGL/BatteryGenerator/GetBatteryGeneratorInfo` // 获取电池发电装置详情
export const BatteryGeneratorList = `${reqURL}/ZYGL/BatteryGenerator/GetBatteryGeneratorList` // 获取电池发电装置列表
export const GetBatteryGeneratorExcel = `${reqURL}/ZYGL/BatteryGenerator/GetBatteryGeneratorExcel` // 电池发电装置导出

// 外电引入
export const GetElectricIntroducedInfo = `${reqURL}/ZYGL/AnElectricIntroduced/GetElectricIntroducedInfo` // 获取外电引入详情
export const GetElectricIntroducedList = `${reqURL}/ZYGL/AnElectricIntroduced/GetElectricIntroducedList` // 获取外电引入列表
export const GetElectricIntroducedExcel = `${reqURL}/ZYGL/AnElectricIntroduced/GetBatteryExcel` // 外电引入导出

// 电表
export const GetElectricMeterInfo = `${reqURL}/ZYGL/ElectricMeter/GetElectricMeterInfo` // 获取电表详情
export const GetElectricMeterList = `${reqURL}/ZYGL/ElectricMeter/GetElectricMeterList` // 获取电表列表
export const GetAmmeterExcel = `${reqURL}/ZYGL/ElectricMeter/GetBatteryExcel` // 电表导出

// FuelGenerator 燃油发电机
export const AddOilFiredGenerator = `${reqURL}/ZYGL/OilFiredGenerator/AddOilFiredGenerator` // 新增燃油发电机
export const EditOilFiredGenerator = `${reqURL}/ZYGL/OilFiredGenerator/EditOilFiredGenerator` // 修改燃油发电机
export const GetOilFiredGeneratorInfo = `${reqURL}/ZYGL/OilFiredGenerator/GetOilFiredGeneratorInfo` // 获取燃油发电机详情
export const GetOilFiredGeneratorList = `${reqURL}/ZYGL/OilFiredGenerator/GetOilFiredGeneratorList` // 获取燃油发电机列表
export const GetOilFiredGeneratorExcel = `${reqURL}/ZYGL/OilFiredGenerator/GetOilFiredGeneratorExcel` // 燃油发电机导出

// ResourceEquipment 站点设备配置
export const AddResourceEquipment = `${reqURL}/ZYGL/ResoureEquipment/AddResourecEquipment` // 新增资源站点配置
export const AddEnergyResourceEquipment = `${reqURL}/ZYGL/ResoureEquipment/AddResourecEquipment` // 新增能源站点配置
export const UpdateResourceEquipment = `${reqURL}/ZYGL/ResoureEquipment/UpdateResourecEquipment` // 修改资源站点配置
export const UpdateEnergyResourceEquipment = `${reqURL}/ZYGL/ResoureEquipment/UpdateResourecEquipment` // 修改能源站点配置
export const DelResourceEquipment = `${reqURL}/ZYGL/ResoureEquipment/DelResourecEquipment` // 删除站点配置
export const GetResourceEquipmentList = `${reqURL}/ZYGL/ResoureEquipment/GetResourecEquipmentList` // 获取资源站点配置列表
export const GetEnergyResourceEquipmentList = `${reqURL}/ZYGL/ResoureEquipment/GetEnergyResourecEquipmentList` // 获取能源站点配置列表
export const GetResourceEquipmentInfo = `${reqURL}/ZYGL/ResoureEquipment/GetResourecEquipmentInfo` // 获取站点配置详情
export const GetEquipmentTypeList = `${reqURL}/ZYGL/ResoureEquipment/GetEquipmentTypeList` // 获取设备类型

// 设备整流模块
export const GetRectifierModuleList = `${reqURL}/ZYGL/RectifierModule/GetRectifierModuleList` // 获取整流模块列表
