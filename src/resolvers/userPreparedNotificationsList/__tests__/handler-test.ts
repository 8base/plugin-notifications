import handler from '../handler';
import { NOTIFICATIONS_LIST_RESPONSE, TABLES_SCHEMA_RESPONSE } from '../__fixtures__';
import { TABLES_SCHEMA_QUERY } from '../queries';

const CONTEXT = {
  api: {
    gqlRequest: jest.fn(),
  },
};

afterEach(() => {
  jest.resetAllMocks();
});

it('Should returns user prepared notifications list.', async () => {
  CONTEXT.api.gqlRequest.mockResolvedValueOnce(TABLES_SCHEMA_RESPONSE);

  CONTEXT.api.gqlRequest.mockResolvedValueOnce(NOTIFICATIONS_LIST_RESPONSE);

  const result = await handler({}, CONTEXT);

  expect(CONTEXT.api.gqlRequest).toHaveBeenNthCalledWith(1, TABLES_SCHEMA_QUERY);

  expect(CONTEXT.api.gqlRequest.mock.calls[1][0]).toMatchSnapshot();

  expect(CONTEXT.api.gqlRequest).toHaveBeenCalledTimes(2);

  expect(result).toEqual({
    data: {
      items: [
        {
          title: 'New post "post title"',
          message: 'Vladimir Osipov created a new post "post title" 10/30/2019, 6:05 PM',
          id: 'notficationId',
          read: false,
          createdAt: '2019-10-30T15:05:48.988Z',
        },
      ],
      count: 0,
    },
  });
});
