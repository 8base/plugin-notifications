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

export const TABLES_SCHEMA_QUERY = gql`
  query TablesSchema {
    system {
      tablesList {
        items {
          id
          name
          fields {
            name
            displayName
            fieldType
            isList
            isSystem
            relation {
              refTable {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;
