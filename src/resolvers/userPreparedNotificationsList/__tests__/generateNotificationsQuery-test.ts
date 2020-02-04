import { generateNotificationsQuery } from '../generateNotificationsQuery';
import { TABLE_SCHEMA } from '../__fixtures__';

it('Should returns user notifications.', async () => {
  expect(generateNotificationsQuery(TABLE_SCHEMA)).toMatchSnapshot();
});
