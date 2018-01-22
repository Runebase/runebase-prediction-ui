const dashboardActions = {
  GET_TOPICS_REQUEST: 'GET_TOPICS_REQUEST',
  GET_TOPICS_SUCCESS: 'GET_TOPICS_SUCCESS',
  GET_TOPICS_ERROR: 'GET_TOPICS_ERROR',
  getTopics: (filters) => ({
    type: dashboardActions.GET_TOPICS_REQUEST,
    filters,
  }),
  GET_ORACLES_REQUEST: 'GET_ORACLES_REQUEST',
  GET_ORACLES_SUCCESS: 'GET_ORACLES_SUCCESS',
  GET_ORACLES_ERROR: 'GET_ORACLES_ERROR',
  getOracles: (filters) => ({
    type: dashboardActions.GET_ORACLES_REQUEST,
    filters,
  }),
  TAB_VIEW_CHANGED: 'TAB_VIEW_CHANGED',
  tabViewChanged: (value) => ({
    type: dashboardActions.TAB_VIEW_CHANGED,
    value,
  }),
};
export default dashboardActions;
