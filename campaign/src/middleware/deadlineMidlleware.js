const checkDeadlinesMiddleware = store => next => action => {
    const state = store.getState();
    if (action.type === UPDATE_DEADLINE || action.type === SOME_TIME_EVENT) {
      const currentDate = new Date();
      Object.values(state.campaigns.byId).forEach(campaign => {
        const deadlineDate = new Date(campaign.deadline);
        if ((deadlineDate - currentDate) < 7 * 24 * 60 * 60 * 1000) { // 7 days
          store.dispatch(showAlert(`Deadline approaching for ${campaign.name}`));
        }
      });
    }
    return next(action);
  };
  