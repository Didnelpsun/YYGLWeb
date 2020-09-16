import * as types from './mutation-types'

const mutations = {
  [types.SET_TOKEN] (state, token) {
    state.token = token
  },
  [types.SET_USER_INFO] (state, UserInfo) {
    state.UserInfo = UserInfo
  },
  [types.SET_PROJECTSURVEY_INFO] (state, ProjectSurveyInfo) {
    state.ProjectSurveyInfo = ProjectSurveyInfo
  },
  [types.SET_MYPROJECT_INFO] (state, MyProject) {
    state.MyProject = MyProject
  },
  [types.SET_TASKSURVEY_INFO] (state, TaskSurveyInfo) {
    state.TaskSurveyInfo = TaskSurveyInfo
  },
  [types.SET_SURVEYINFOTYPE] (state, SurveyInfoType) {
    state.SurveyInfoType = SurveyInfoType
  }
}

export default mutations
