import gql from 'graphql-tag';

export const USER_NOTIFICATION_UPDATE_MUTATION = gql`
  mutation UserNotificationUpdate($data: UserNotificationUpdateInput!) {
    userNotificationUpdate(data: $data) {
      id
    }
  }
`;
