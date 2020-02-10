import { USER_NOTIFICATION_UPDATE_MUTATION } from './queries';

type UserNotificationMarkAsReadResponse = {
  data: {
    success: boolean;
  };
};

export default async (event: any, ctx: any): Promise<UserNotificationMarkAsReadResponse> => {
  let success = false;

  const { id } = event.data;

  await ctx.api.gqlRequest(USER_NOTIFICATION_UPDATE_MUTATION, {
    data: {
      id,
      read: true,
    },
  });

  success = true;

  return {
    data: {
      success,
    },
  };
};
