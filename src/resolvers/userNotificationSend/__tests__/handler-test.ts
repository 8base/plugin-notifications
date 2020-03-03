import handler from '../handler';
import { CURRENT_USER__QUERY, NOTIFICATION_TEMPLATE_QUERY, NOTIFICATION_CREATE_MUTATION } from '../queries';

const CONTEXT = {
  api: {
    gqlRequest: jest.fn(),
  },
};

afterEach(() => {
  jest.resetAllMocks();
});

it('Should send a new user notification.', async () => {
  CONTEXT.api.gqlRequest.mockResolvedValueOnce({
    user: {
      id: 'currentUserId',
    },
  });

  CONTEXT.api.gqlRequest.mockResolvedValueOnce({
    notificationTemplate: {
      entityType: 'MyPosts',
      roles: {
        items: [
          {
            users: {
              items: [
                {
                  id: 'userNotifierId1',
                },
                {
                  id: 'userNotifierId2',
                },
              ],
            },
          },
          {
            users: {
              items: [
                {
                  id: 'userNotifierId1',
                },
                {
                  id: 'userNotifierId3',
                },
              ],
            },
          },
        ],
      },
    },
  });

  CONTEXT.api.gqlRequest.mockResolvedValueOnce({
    notificationCreate: {
      id: 'notificationid',
    },
  });

  const result = await handler(
    {
      data: {
        entity: { create: { myPost: { connect: { id: 'entityId' } } } },
        templateId: 'templateId',
        filter: {
          AND: [
            {
              id: {
                // eslint-disable-next-line @typescript-eslint/camelcase
                not_equals: '__loggedInUserId',
              },
            },
          ],
        },
      },
    },
    CONTEXT,
  );

  expect(CONTEXT.api.gqlRequest).toHaveBeenNthCalledWith(1, CURRENT_USER__QUERY);

  expect(CONTEXT.api.gqlRequest).toHaveBeenNthCalledWith(
    2,
    NOTIFICATION_TEMPLATE_QUERY,
    {
      id: 'templateId',
      userFilter: {
        AND: [
          {
            id: {
              // eslint-disable-next-line @typescript-eslint/camelcase
              not_equals: '__loggedInUserId',
            },
          },
        ],
      },
    },
    {
      checkPermissions: false,
    },
  );

  expect(CONTEXT.api.gqlRequest).toHaveBeenNthCalledWith(
    3,
    NOTIFICATION_CREATE_MUTATION,
    {
      data: {
        actor: { connect: { id: 'currentUserId' } },
        entity: { create: { myPost: { connect: { id: 'entityId' } } } },
        userNotifications: {
          create: [
            {
              notifier: {
                connect: {
                  id: 'userNotifierId1',
                },
              },
            },
            {
              notifier: {
                connect: {
                  id: 'userNotifierId2',
                },
              },
            },
            {
              notifier: {
                connect: {
                  id: 'userNotifierId3',
                },
              },
            },
          ],
        },
        template: { connect: { id: 'templateId' } },
      },
    },
    {
      checkPermissions: false,
    },
  );

  expect(result).toEqual({
    data: {
      success: true,
    },
  });
});

it('Should send a new user notification with key.', async () => {
  CONTEXT.api.gqlRequest.mockResolvedValueOnce({
    user: {
      id: 'currentUserId',
    },
  });

  CONTEXT.api.gqlRequest.mockResolvedValueOnce({
    notificationTemplate: {
      entityType: 'MyPosts',
      roles: {
        items: [
          {
            users: {
              items: [
                {
                  id: 'userNotifierId1',
                },
                {
                  id: 'userNotifierId2',
                },
              ],
            },
          },
          {
            users: {
              items: [
                {
                  id: 'userNotifierId3',
                },
              ],
            },
          },
        ],
      },
    },
  });

  CONTEXT.api.gqlRequest.mockResolvedValueOnce({
    notificationCreate: {
      id: 'notificationid',
    },
  });

  const result = await handler(
    { data: { entity: { create: { myPost: { connect: { id: 'entityId' } } } }, templateKey: 'templateKey' } },
    CONTEXT,
  );

  expect(CONTEXT.api.gqlRequest).toHaveBeenNthCalledWith(1, CURRENT_USER__QUERY);

  expect(CONTEXT.api.gqlRequest).toHaveBeenNthCalledWith(
    2,
    NOTIFICATION_TEMPLATE_QUERY,
    {
      key: 'templateKey',
    },
    {
      checkPermissions: false,
    },
  );

  expect(CONTEXT.api.gqlRequest).toHaveBeenNthCalledWith(
    3,
    NOTIFICATION_CREATE_MUTATION,
    {
      data: {
        actor: { connect: { id: 'currentUserId' } },
        entity: { create: { myPost: { connect: { id: 'entityId' } } } },
        userNotifications: {
          create: [
            {
              notifier: {
                connect: {
                  id: 'userNotifierId1',
                },
              },
            },
            {
              notifier: {
                connect: {
                  id: 'userNotifierId2',
                },
              },
            },
            {
              notifier: {
                connect: {
                  id: 'userNotifierId3',
                },
              },
            },
          ],
        },
        template: { connect: { key: 'templateKey' } },
      },
    },
    {
      checkPermissions: false,
    },
  );

  expect(result).toEqual({
    data: {
      success: true,
    },
  });
});
