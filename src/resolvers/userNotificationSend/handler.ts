import * as R from 'ramda';
import errorCodes from '@8base/error-codes';

import { CURRENT_USER__QUERY, NOTIFICATION_TEMPLATE_QUERY, NOTIFICATION_CREATE_MUTATION } from './queries';

type UserNotificationSendResponse = {
  data: {
    success: boolean;
  };
  errors?: Array<Record<string, any>>;
};

const userNotificationSend = async (event: any, ctx: any): Promise<UserNotificationSendResponse> => {
  const { entity, templateId, templateKey, filter, actorId } = event.data;

  if (!templateKey && !templateId) {
    return {
      data: {
        success: false,
      },
      errors: [
        {
          message: 'The request is invalid.',
          code: errorCodes.ValidationErrorCode,
          details: {
            query: 'Please specify exactly one template filter parameter.',
          },
        },
      ],
    };
  }

  const {
    user: { id: userId },
  } = await ctx.api.gqlRequest(CURRENT_USER__QUERY, {}, { checkPermissions: false });

  const { notificationTemplate } = await ctx.api.gqlRequest(
    NOTIFICATION_TEMPLATE_QUERY,
    {
      ...(filter ? { userFilter: filter } : {}),
      ...(templateId
        ? {
            id: templateId,
          }
        : { key: templateKey }),
    },
    {
      checkPermissions: false,
    },
  );

  const notifiers = R.pipe(
    R.pathOr([], ['roles', 'items']),
    R.map(R.pathOr([], ['users', 'items'])),
    R.flatten,
    R.uniqWith<{ id: string }, {}>((a, b) => a.id === b.id),
  )(notificationTemplate);

  try {
    await ctx.api.gqlRequest(
      NOTIFICATION_CREATE_MUTATION,
      {
        data: {
          template: {
            connect: templateId
              ? {
                  id: templateId,
                }
              : { key: templateKey },
          },
          actor: (actorId || userId) && {
            connect: {
              id: actorId || userId,
            },
          },
          userNotifications: {
            create: notifiers.map(notifier => ({
              notifier: {
                connect: notifier,
              },
            })),
          },
          entity,
        },
      },
      {
        checkPermissions: false,
      },
    );
  } catch (e) {
    console.log(e);
    throw e;
  }

  return {
    data: {
      success: true,
    },
  };
};

export default userNotificationSend;
