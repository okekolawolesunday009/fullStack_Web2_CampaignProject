export const selectCampaignById = (state, campaignId) => state.campaigns.byId[campaignId];

export const selectTarget = (state, campaignId) => selectCampaignById(state, campaignId).target;

export const selectDeadline = (state, campaignId) => selectCampaignById(state, campaignId).deadline;

export const selectFilteredNotifications = (state) => {
    const { notifications, filter } = state.notifications;

    if (filter === 'ALL') {
        return notifications; // Return all notifications
    }

    return notifications.filter(notification => notification.level === filter);
};
