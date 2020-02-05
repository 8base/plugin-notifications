import handler from '../handler';
import { USER_NOTIFICATION_UPDATE_MUTATION } from '../queries';

const CONTEXT = {
  api: {
    gqlRequest: jest.fn(),
  },
};

afterEach(() => {
  jest.resetAllMocks();
});

it('Should mark notification as read.', async () => {
  CONTEXT.api.gqlRequest.mockResolvedValueOnce({
    user: {
      id: 'userId',
    },
  });

  const result = await handler({ data: { id: 'notificationId' } }, CONTEXT);

  expect(CONTEXT.api.gqlRequest).toHaveBeenNthCalledWith(1, USER_NOTIFICATION_UPDATE_MUTATION, {
    data: {
      id: 'notificationId',
      readed: true,
    },
  });

  expect(result).toEqual({
    data: {
      success: true,
    },
  });
});
