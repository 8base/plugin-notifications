import gql from 'graphql-tag';

export const CURRENT_USER__QUERY = gql`
  query CurrentUser {
    user {
      id
    }
  }
`;

export const NOTIFICATION_TEMPLATE_QUERY = gql`
  query NotificationTemplate($id: ID!) {
    notificationTemplate(id: $id) {
      entityType
      roles {
        items {
          users {
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
