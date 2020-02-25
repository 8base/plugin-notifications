import gql from 'graphql-tag';

export const CURRENT_USER__QUERY = gql`
  query CurrentUser {
    user {
      id
    }
  }
`;

export const NOTIFICATION_TEMPLATE_QUERY = gql`
  query NotificationTemplate($id: ID, $key: String, $userFilter: UserFilter) {
    notificationTemplate(id: $id, key: $key) {
      entityType
      roles {
        items {
          users(filter: $userFilter) {
            items {
              id
              email
            }
          }
        }
      }
    }
  }
`;

export const NOTIFICATION_CREATE_MUTATION = gql`
  mutation NotificationCreate($data: NotificationCreateInput!) {
    notificationCreate(data: $data) {
      id
    }
  }
`;
