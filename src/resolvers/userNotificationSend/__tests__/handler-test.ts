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
                {
                  id: 'currentUserId',
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
    { data: { entityId: 'entityId', notificationTemplateId: 'notificationTemplateId' } },
    CONTEXT,
  );

  expect(CONTEXT.api.gqlRequest).toHaveBeenNthCalledWith(1, CURRENT_USER__QUERY);

  expect(CONTEXT.api.gqlRequest).toHaveBeenNthCalledWith(
    2,
    NOTIFICATION_TEMPLATE_QUERY,
    {
      id: 'notificationTemplateId',
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
        clientNotifications: {
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
        template: { connect: { id: 'notificationTemplateId' } },
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
