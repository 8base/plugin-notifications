import gql from 'graphql-tag';

export const USER_NOTIFICATIONS_QUERY = gql`
  query UserNotifications($filter: UserNotificationFilter) {
    userNotificationsList(filter: $filter) {
      items {
        id
      }
    }
  }
`;

export const UPDATE_USER_NOTIFICATION_MUTATION = gql`
  mutation UpdateUserNotification($data: UserNotificationUpdateInput!) {
    userNotificationUpdate(data: $data) {
      id
    }
  }
`;
