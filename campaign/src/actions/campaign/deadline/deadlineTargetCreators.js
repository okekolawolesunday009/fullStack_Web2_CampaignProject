import { UPDATE_DEADLINE, UPDATE_TARGET } from "./deadlineTargetTypes";


// Action creators
export const updateTarget = (campaignId, newTarget) => ({
  type: UPDATE_TARGET,
  payload: { campaignId, newTarget }
});

export const updateDeadline = (campaignId, newDeadline) => ({
  type: UPDATE_DEADLINE,
  payload: { campaignId, newDeadline }
});
