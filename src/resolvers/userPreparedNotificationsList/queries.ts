import gql from 'graphql-tag';

export const USER_NOTIFICATIONS_LIST_QUERY = gql`
  query UserNotifications {
    userNotificationsList {
      items {
        notification {
          template {
            entityType
            title
            message
          }
          actor {
            id
            firstName
            lastName
            email
          }
        }
        id
        readed
      }
      count
    }
  }
`;

export const NOTIFICATION_ENTITIES_SCHEMA_QUERY = gql`
  query NotificationEntitiesSchema {
    system {
      table(name: "NotificationEntities") {
        id
        fields {
          name
          displayName
          fieldType
          isSystem
          relation {
            refTable {
              name
              fields {
                id
                name
                fieldType
                isSystem
              }
            }
          }
        }
      }
    }
  }
`;
