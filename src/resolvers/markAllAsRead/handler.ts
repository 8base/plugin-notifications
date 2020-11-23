import * as R from 'ramda';

import { USER_NOTIFICATIONS_QUERY, UPDATE_USER_NOTIFICATION_MUTATION } from './queries';

type MarkAllAsReadResponse = {
  data: {
    success: boolean;
    updatedIds: string[];
    failedIds: string[];
  };
  errors?: Array<Record<string, any>>;
};

type UserNotification = {
  id: string;
};

const DEFAULT_FILTER = {
  notifier: { id: { equals: '__loggedInUserId' } },
  read: { equals: false },
};

export default async (event: any, ctx: any): Promise<MarkAllAsReadResponse> => {
  let { filter = {} } = event.data;
  filter = R.mergeDeepRight(DEFAULT_FILTER, filter);

  const updatedIds: string[] = [];
  const failedIds: string[] = [];

  const { userNotificationsList } = await ctx.api.gqlRequest(
    USER_NOTIFICATIONS_QUERY,
    { filter },
    { checkPermissions: false },
  );

  const notificationsToMark: UserNotification[] = R.pathOr([], ['items'], userNotificationsList);

  const updateNotificationPromises = notificationsToMark.map(async notification => {
    try {
      await ctx.api.gqlRequest(UPDATE_USER_NOTIFICATION_MUTATION, { data: { id: notification.id, read: true } });
      updatedIds.push(notification.id);
    } catch (e) {
      failedIds.push(notification.id);
    }
  });

  await Promise.all(updateNotificationPromises);

  return {
    data: {
      success: failedIds.length <= 0 ? true : false,
      updatedIds,
      failedIds,
    },
  };
};
