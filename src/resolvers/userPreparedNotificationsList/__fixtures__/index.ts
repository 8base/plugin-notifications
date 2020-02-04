export const TABLE_SCHEMA = {
  id: '5e3836df9564db0007a4a525',
  fields: [
    {
      name: 'id',
      displayName: 'ID',
      fieldType: 'ID',
      isSystem: true,
      relation: null,
    },
    {
      name: 'createdAt',
      displayName: 'Created At',
      fieldType: 'DATE',
      isSystem: true,
      relation: null,
    },
    {
      name: 'updatedAt',
      displayName: 'Updated At',
      fieldType: 'DATE',
      isSystem: true,
      relation: null,
    },
    {
      name: 'createdBy',
      displayName: 'Created By',
      fieldType: 'RELATION',
      isSystem: true,
      relation: {
        refTable: {
          name: 'Users',
          fields: [
            {
              id: '5e381797dcb2b80008734828',
              name: 'id',
              fieldType: 'ID',
              isSystem: true,
            },
            {
              id: '5e381797dcb2b80008734829',
              name: 'createdAt',
              fieldType: 'DATE',
              isSystem: true,
            },
            {
              id: '5e381797dcb2b8000873482c',
              name: 'updatedAt',
              fieldType: 'DATE',
              isSystem: true,
            },
            {
              id: '5e38179bdcb2b800087349b9',
              name: 'createdBy',
              fieldType: 'RELATION',
              isSystem: true,
            },
            {
              id: '5e381797dcb2b80008734832',
              name: 'email',
              fieldType: 'TEXT',
              isSystem: true,
            },
            {
              id: '5e38179ddcb2b80008734a10',
              name: 'status',
              fieldType: 'SWITCH',
              isSystem: true,
            },
            {
              id: '5e38179ddcb2b80008734a13',
              name: 'origin',
              fieldType: 'SWITCH',
              isSystem: true,
            },
            {
              id: '5e38179bdcb2b800087349b6',
              name: 'is8base',
              fieldType: 'SWITCH',
              isSystem: true,
            },
            {
              id: '5e381797dcb2b80008734838',
              name: 'firstName',
              fieldType: 'TEXT',
              isSystem: true,
            },
            {
              id: '5e381797dcb2b8000873483b',
              name: 'lastName',
              fieldType: 'TEXT',
              isSystem: true,
            },
            {
              id: '5e381797dcb2b8000873483e',
              name: 'timezone',
              fieldType: 'TEXT',
              isSystem: true,
            },
            {
              id: '5e381797dcb2b80008734943',
              name: 'avatar',
              fieldType: 'FILE',
              isSystem: true,
            },
            {
              id: '5e381797dcb2b80008734956',
              name: 'roles',
              fieldType: 'RELATION',
              isSystem: true,
            },
            {
              id: '5e381be2dcb2b800087524ea',
              name: 'sentNotifications',
              fieldType: 'RELATION',
              isSystem: false,
            },
            {
              id: '5e3a7ceed8955e00087a635e',
              name: 'clientNotifications',
              fieldType: 'RELATION',
              isSystem: false,
            },
          ],
        },
      },
    },
    {
      name: 'notification',
      displayName: 'Notification',
      fieldType: 'RELATION',
      isSystem: false,
      relation: {
        refTable: {
          name: 'Notifications',
          fields: [
            {
              id: '5e381adf8caf0200089283ba',
              name: 'id',
              fieldType: 'ID',
              isSystem: true,
            },
            {
              id: '5e381adf8caf0200089283bb',
              name: 'createdAt',
              fieldType: 'DATE',
              isSystem: true,
            },
            {
              id: '5e381adf8caf0200089283be',
              name: 'updatedAt',
              fieldType: 'DATE',
              isSystem: true,
            },
            {
              id: '5e381adf8caf0200089283c4',
              name: 'createdBy',
              fieldType: 'RELATION',
              isSystem: true,
            },
            {
              id: '5e381be2dcb2b800087524e7',
              name: 'actor',
              fieldType: 'RELATION',
              isSystem: false,
            },
            {
              id: '5e381b488caf02000892ada2',
              name: 'template',
              fieldType: 'RELATION',
              isSystem: false,
            },
            {
              id: '5e38375b9564db0007a4ee0d',
              name: 'entity',
              fieldType: 'RELATION',
              isSystem: false,
            },
            {
              id: '5e3a7d3dd8955e00087ab73b',
              name: 'clientNotifications',
              fieldType: 'RELATION',
              isSystem: false,
            },
          ],
        },
      },
    },
    {
      name: 'post',
      displayName: 'Post',
      fieldType: 'RELATION',
      isSystem: false,
      relation: {
        refTable: {
          name: 'Posts',
          fields: [
            {
              id: '5e381a36d1978f00089e37f0',
              name: 'id',
              fieldType: 'ID',
              isSystem: true,
            },
            {
              id: '5e381a36d1978f00089e37f1',
              name: 'createdAt',
              fieldType: 'DATE',
              isSystem: true,
            },
            {
              id: '5e381a36d1978f00089e37f4',
              name: 'updatedAt',
              fieldType: 'DATE',
              isSystem: true,
            },
            {
              id: '5e381a36d1978f00089e37fa',
              name: 'createdBy',
              fieldType: 'RELATION',
              isSystem: true,
            },
            {
              id: '5e381a4e8caf020008922bf1',
              name: 'title',
              fieldType: 'TEXT',
              isSystem: false,
            },
            {
              id: '5e381a54dcb2b80008744cf3',
              name: 'message',
              fieldType: 'TEXT',
              isSystem: false,
            },
            {
              id: '5e3837209564db0007a4cbca',
              name: 'notificationEntities',
              fieldType: 'RELATION',
              isSystem: false,
            },
            {
              id: '5e3839ee3e61f90007d9ce68',
              name: 'hidden',
              fieldType: 'SWITCH',
              isSystem: false,
            },
            {
              id: '5e396a82be370200087caef2',
              name: 'comments',
              fieldType: 'RELATION',
              isSystem: false,
            },
          ],
        },
      },
    },
    {
      name: 'comment',
      displayName: 'Comment',
      fieldType: 'RELATION',
      isSystem: false,
      relation: {
        refTable: {
          name: 'Comments',
          fields: [
            {
              id: '5e396a61be370200087c8745',
              name: 'id',
              fieldType: 'ID',
              isSystem: true,
            },
            {
              id: '5e396a61be370200087c8746',
              name: 'createdAt',
              fieldType: 'DATE',
              isSystem: true,
            },
            {
              id: '5e396a61be370200087c8749',
              name: 'updatedAt',
              fieldType: 'DATE',
              isSystem: true,
            },
            {
              id: '5e396a61be370200087c874f',
              name: 'createdBy',
              fieldType: 'RELATION',
              isSystem: true,
            },
            {
              id: '5e396a6f97c4ef0007ebcf0f',
              name: 'message',
              fieldType: 'TEXT',
              isSystem: false,
            },
            {
              id: '5e396a82be370200087caeef',
              name: 'post',
              fieldType: 'RELATION',
              isSystem: false,
            },
            {
              id: '5e396aea1f790b00082e6a7a',
              name: 'notificationEntities',
              fieldType: 'RELATION',
              isSystem: false,
            },
          ],
        },
      },
    },
  ],
};

export const NOTIFICATION_ENTITIES_SCHEMA_RESPONSE = {
  system: {
    table: TABLE_SCHEMA,
  },
};

export const NOTIFICATIONS_LIST_RESPONSE = {
  userNotificationsList: {
    items: [
      {
        notification: {
          entity: {
            post: {
              id: 'postId',
              title: 'post title',
              message: 'post message',
            },
          },
          template: {
            entityType: 'Posts',
            title: 'New post "{{ post.title }}"',
            message: '{{ actor.firstName }} {{ actor.lastName }} created a new post "{{ post.title }}"',
          },
          actor: {
            id: 'actorId',
            email: 'zouxuoz@gmail.com',
            firstName: 'Vladimir',
            lastName: 'Osipov',
          },
        },
        id: 'notficationId',
        readed: false,
      },
    ],
  },
};
