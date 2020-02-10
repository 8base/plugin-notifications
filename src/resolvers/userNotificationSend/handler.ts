import * as R from 'ramda';
import * as pluralize from 'pluralize';

import { CURRENT_USER__QUERY, NOTIFICATION_TEMPLATE_QUERY, NOTIFICATION_CREATE_MUTATION } from './queries';

type UserNotificationSendResponse = {
  data: {
    success: boolean;
  };
};

export default async (event: any, ctx: any): Promise<UserNotificationSendResponse> => {
  let success = false;

  const {
    user: { id: userId },
  } = await ctx.api.gqlRequest(CURRENT_USER__QUERY);

  const { entityId, notificationTemplateId, filter } = event.data;

  let userFilter = {
    AND: [
      {
        id: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          not_equals: '__loggedInUserId',
        },
      },
    ],
  };

  if (filter) {
    userFilter = R.over(R.lensProp('AND'), R.append(filter), userFilter);
  }

  const { notificationTemplate } = await ctx.api.gqlRequest(
    NOTIFICATION_TEMPLATE_QUERY,
    {
      id: notificationTemplateId,
      userFilter,
    },
    {
      checkPermissions: false,
    },
  );

  const notifiers = R.pipe(
    R.pathOr([], ['roles', 'items']),
    R.map(R.pathOr([], ['users', 'items'])),
    R.flatten,
  )(notificationTemplate);

  let entityItem = pluralize(notificationTemplate.entityType, 1);

  entityItem = entityItem.charAt(0).toLowerCase() + entityItem.slice(1);

  await ctx.api.gqlRequest(
    NOTIFICATION_CREATE_MUTATION,
    {
      data: {
        template: {
          connect: {
            id: notificationTemplateId,
          },
        },
        actor: {
          connect: {
            id: userId,
          },
        },
        userNotifications: {
          create: notifiers.map(notifier => ({
            notifier: {
              connect: notifier,
            },
          })),
        },
        entity: {
          create: {
            [entityItem]: {
              connect: {
                id: entityId,
              },
            },
          },
        },
      },
    },
    {
      checkPermissions: false,
    },
  );

  success = true;

  return {
    data: {
      success,
    },
  };
};
