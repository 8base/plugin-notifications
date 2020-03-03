import gql from 'graphql-tag';

export const USER_NOTIFICATIONS_LIST_QUERY = gql`
  query UserNotifications(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $filter: UserNotificationFilter
    $sort: [UserNotificationSort!]
  ) {
    userNotificationsList(after: $after, before: $before, first: $first, last: $last, filter: $filter, sort: $sort) {
      items {
        notification {
          template {
            key
            entityType
            title
            message
            coverImageUrl
          }
          actor {
            id
            firstName
            lastName
            email
          }
        }
        createdAt
        id
        read
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
