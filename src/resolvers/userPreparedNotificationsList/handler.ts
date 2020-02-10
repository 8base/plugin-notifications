import * as R from 'ramda';
import * as Handlebars from 'handlebars';
import { generateNotificationsQuery, TableSchema } from './generateNotificationsQuery';
import { TABLES_SCHEMA_QUERY } from './queries';

type UserNotification = {
  id: string;
  read: boolean;
  createdAt: string;
  notification: {
    entity: object;
    template: {
      entityType: string;
      title: string;
      message: string;
    };
    actor: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
  };
};

type UserPreparedNotification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
};

type UserPreparedNotificationsListResponse = {
  data: {
    items: UserPreparedNotification[];
    count: number;
  };
};

export default async (event: any, ctx: any): Promise<UserPreparedNotificationsListResponse> => {
  const tablesSchemaResponse = await ctx.api.gqlRequest(TABLES_SCHEMA_QUERY);

  const schema: TableSchema[] | undefined = R.path(['system', 'tablesList', 'items'], tablesSchemaResponse);

  if (!schema) {
    throw new Error(`Error during get notifications entities table schema.`);
  }

  const notificationQuery = generateNotificationsQuery(schema);

  const userNotificationsListResponse = await ctx.api.gqlRequest(notificationQuery);

  const notifications: UserNotification[] = R.pathOr(
    [],
    ['userNotificationsList', 'items'],
    userNotificationsListResponse,
  );
  const count = R.pathOr(0, ['userNotificationsList', 'count'], userNotificationsListResponse);

  const userNotifications: UserPreparedNotification[] = R.map(
    ({ id, read, createdAt, notification: { actor, template, entity } }) => {
      const context = { ...entity, actor };

      const title = Handlebars.compile(template.title)(context);
      const message = Handlebars.compile(template.message)(context);

      return { title, message, id, read, createdAt };
    },
    notifications,
  );

  return {
    data: {
      items: userNotifications,
      count,
    },
  };
};
