import gql from 'graphql-tag';

const TABLE_FIELD_FRAGMENT = gql`
  fragment TableFieldFragment on SystemTableField {
    ...CommonTableFieldFragment
    fieldTypeAttributes {
      ...TextFieldTypeAttributes
      ...NumberFieldTypeAttributes
      ...FileFieldTypeAttributes
      ...DateFieldTypeAttributes
      ...SwitchFieldTypeAttributes
      ...SmartFieldTypesAttributes
      ...MissingRelationFieldTypeAttributes
    }
  }

  fragment CommonTableFieldFragment on SystemTableField {
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
    fieldTypeAttributes {
      ...TextFieldTypeAttributes
      ...NumberFieldTypeAttributes
      ...FileFieldTypeAttributes
      ...DateFieldTypeAttributes
      ...SwitchFieldTypeAttributes
      ...MissingRelationFieldTypeAttributes
    }
  }

  fragment DateFieldTypeAttributes on SystemDateFieldTypeAttributes {
    format
  }

  fragment TextFieldTypeAttributes on SystemTextFieldTypeAttributes {
    format
    fieldSize
  }

  fragment NumberFieldTypeAttributes on SystemNumberFieldTypeAttributes {
    format
    precision
    currency
    minValue
    maxValue
    isBigInt
  }

  fragment FileFieldTypeAttributes on SystemFileFieldTypeAttributes {
    format
    maxSize
    typeRestrictions
  }

  fragment SmartFieldTypesAttributes on SystemSmartFieldTypeAttributes {
    format
    innerFields {
      name
      displayName
      description
      fieldType
      isList
      isRequired
      isUnique
      fieldTypeAttributes {
        ...TextFieldTypeAttributes
        ...NumberFieldTypeAttributes
        ...FileFieldTypeAttributes
        ...DateFieldTypeAttributes
        ...SwitchFieldTypeAttributes
        ...MissingRelationFieldTypeAttributes
      }
    }
  }

  fragment SwitchFieldTypeAttributes on SystemSwitchFieldTypeAttributes {
    format
    listOptions
  }

  fragment MissingRelationFieldTypeAttributes on SystemMissingRelationFieldTypeAttributes {
    missingTable
  }
`;

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
            ...TableFieldFragment
          }
        }
      }
    }
  }

  ${TABLE_FIELD_FRAGMENT}
`;
