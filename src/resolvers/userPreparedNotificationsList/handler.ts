import * as R from 'ramda';
import * as Handlebars from 'handlebars';
import { DateTime } from 'luxon';

import { generateNotificationsQuery, TableSchema } from './generateNotificationsQuery';
import { TABLES_SCHEMA_QUERY } from './queries';

type UserNotification = {
  id: string;
  read: boolean;
  createdAt: string;
  notification: {
    entity: object;
    template: {
      key: string;
      entityType: string;
      title: string;
      message: string;
      coverImageUrl?: string | null;
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
  type: string;
  title: string;
  message: string;
  read: boolean;
  coverImageUrl?: string | null;
};

type UserPreparedNotificationsListResponse = {
  data: {
    items: UserPreparedNotification[];
    count: number;
  };
};

export default async (event: any, ctx: any): Promise<UserPreparedNotificationsListResponse> => {
  const { timezone, meta = {}, ...userNotificationsQueryArgs } = event.data;

  Handlebars.registerHelper('dt', (format: string, dt: string) => {
    return DateTime.fromISO(dt)
      .setZone(timezone || DateTime.local().zoneName)
      .toFormat(format);
  });

  const tablesSchemaResponse = await ctx.api.gqlRequest(TABLES_SCHEMA_QUERY);

  const schema: TableSchema[] | undefined = R.path(['system', 'tablesList', 'items'], tablesSchemaResponse);

  if (!schema) {
    throw new Error(`Error during get notifications entities table schema.`);
  }

  const notificationQuery = generateNotificationsQuery(schema);

  const userNotificationsListResponse = await ctx.api.gqlRequest(notificationQuery, userNotificationsQueryArgs);

  const notifications: UserNotification[] = R.pathOr(
    [],
    ['userNotificationsList', 'items'],
    userNotificationsListResponse,
  );
  const count = R.pathOr(0, ['userNotificationsList', 'count'], userNotificationsListResponse);

  const userNotifications: UserPreparedNotification[] = R.map(
    ({ id, read, createdAt, notification: { actor, template, entity } }) => {
      const context = { ...entity, actor, meta };

      const title = Handlebars.compile(template.title)(context);
      const message = Handlebars.compile(template.message)(context);
      const coverImageUrl = Handlebars.compile(template.coverImageUrl)(context);
      const type = template.key;

      return { id, type, title, message, coverImageUrl, read, createdAt };
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
