import { generateNotificationsQuery } from '../generateNotificationsQuery';
import { TABLES_SCHEMA } from '../__fixtures__';

it('Should returns user notifications.', async () => {
  expect(generateNotificationsQuery(TABLES_SCHEMA)).toMatchSnapshot();
});
