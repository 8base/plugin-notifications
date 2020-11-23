import handler from '../handler';
import { USER_NOTIFICATIONS_QUERY } from '../queries';

const CONTEXT = {
  api: {
    gqlRequest: jest.fn(),
  },
};

afterEach(() => {
  jest.resetAllMocks();
});

describe('With some rejected notifications', () => {
  it('Should mark all users notifications as read.', async () => {
    const mockedSuccessUserNotifications = [{ id: 'user-notification-01' }, { id: 'user-notification-02' }];
    const mockedFailedUserNotifications = [{ id: 'user-notification-03' }];

    const mockedUserNotifications = [...mockedFailedUserNotifications, ...mockedSuccessUserNotifications];

    CONTEXT.api.gqlRequest.mockResolvedValueOnce({
      userNotificationsList: {
        items: mockedUserNotifications,
      },
    });

    mockedUserNotifications.forEach(userNotification => {
      const isFailedNotification = mockedFailedUserNotifications.some(
        failedNotification => failedNotification.id === userNotification.id,
      );

      if (isFailedNotification) {
        CONTEXT.api.gqlRequest.mockRejectedValueOnce([
          {
            message: 'Some reason for the error',
          },
        ]);

        return;
      }

      CONTEXT.api.gqlRequest.mockResolvedValueOnce({
        userNotificationUpdate: {
          id: userNotification.id,
        },
      });
    });

    const result = await handler({ data: { filter: { someFilter: { equals: true } } } }, CONTEXT);

    expect(CONTEXT.api.gqlRequest).toHaveBeenNthCalledWith(
      1,
      USER_NOTIFICATIONS_QUERY,
      {
        filter: {
          notifier: { id: { equals: '__loggedInUserId' } },
          read: { equals: false },
          someFilter: { equals: true },
        },
      },
      { checkPermissions: false },
    );

    expect(result).toEqual({
      data: {
        success: false,
        updatedIds: mockedSuccessUserNotifications.map(({ id }) => id),
        failedIds: mockedFailedUserNotifications.map(({ id }) => id),
      },
    });
  });
});

describe('With all successfully updated notifications', () => {
  it('Should mark all users notifications as read.', async () => {
    const mockedUserNotifications = [{ id: 'user-notification-01' }, { id: 'user-notification-02' }];

    CONTEXT.api.gqlRequest.mockResolvedValueOnce({
      userNotificationsList: {
        items: mockedUserNotifications,
      },
    });

    mockedUserNotifications.forEach(userNotification => {
      CONTEXT.api.gqlRequest.mockResolvedValueOnce({
        userNotificationUpdate: {
          id: userNotification.id,
        },
      });
    });

    const result = await handler({ data: {} }, CONTEXT);

    expect(result).toEqual({
      data: {
        success: true,
        updatedIds: mockedUserNotifications.map(({ id }) => id),
        failedIds: [],
      },
    });
  });
});
