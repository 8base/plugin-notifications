import * as R from 'ramda';
import { print, SelectionSetNode, FieldNode } from 'graphql';

import { USER_NOTIFICATIONS_LIST_QUERY } from './queries';

export type TableFieldSchema = {
  name: string;
  relation?: {
    refTable: {
      id: string;
      name: string;
    };
  };
};

export type TableSchema = object;

const getTableByName = (tablesSchema: TableSchema[], tableName: string): TableSchema | undefined =>
  R.find<TableSchema>(R.propEq('name', tableName), tablesSchema);

const getTableFieldsByName = (tablesSchema: TableSchema[], tableName: string): TableFieldSchema[] => {
  const table = getTableByName(tablesSchema, tableName);

  if (!table) {
    return [];
  }

  return R.propOr([], 'fields', table);
};

const isRelationField = (tableField: TableFieldSchema): boolean => R.propEq('fieldType', 'RELATION', tableField);

const generateTableFieldNode = (
  tableField: TableFieldSchema,
  tablesSchema: TableSchema[],
  filters?: Array<(field: TableFieldSchema) => boolean>,
  depth = 0,
): FieldNode => {
  let field: FieldNode = {
    kind: 'Field',
    name: {
      kind: 'Name',
      value: tableField.name,
    },
    arguments: [],
    directives: [],
  };

  if (isRelationField(tableField) && depth <= 3) {
    const refTableName: string | undefined = R.path(['relation', 'refTable', 'name'], tableField);

    if (refTableName) {
      field = R.assoc(
        'selectionSet',
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        generateTableFieldsSelectionSet(tablesSchema, refTableName, filters, ++depth),
        field,
      );
    }
  }

  return field;
};

const generateTableFieldsSelectionSet = (
  tablesSchema: TableSchema[],
  tableName: string,
  filters?: Array<(field: TableFieldSchema) => boolean>,
  depth = 0,
): SelectionSetNode => {
  const tableFields = getTableFieldsByName(tablesSchema, tableName);

  const selections = R.pipe<TableFieldSchema[], TableFieldSchema[], FieldNode[]>(
    R.reject(filters ? filters[depth] : R.F),
    R.map((field: TableFieldSchema) => generateTableFieldNode(field, tablesSchema, filters, depth)),
  )(tableFields);

  return {
    kind: 'SelectionSet',
    selections,
  };
};

export const generateNotificationsQuery = (tablesSchema: TableSchema[]) => {
  const selectionSet: SelectionSetNode = generateTableFieldsSelectionSet(tablesSchema, 'NotificationEntities', [
    R.anyPass([
      R.propEq('isSystem', true),
      R.propEq('isList', true),
      R.propEq('name', 'notification'),
      R.complement(R.propEq('fieldType', 'RELATION')),
    ]),
    R.anyPass([R.propEq('isList', true)]),
    R.anyPass([R.propEq('fieldType', 'RELATION'), R.propEq('fieldType', 'FILE')]),
  ]);

  const queryLens = R.lensPath([
    'definitions',
    0,
    'selectionSet',
    'selections',
    0,
    'selectionSet',
    'selections',
    0,
    'selectionSet',
    'selections',
    0,
    'selectionSet',
    'selections',
    2,
  ]);

  return print(
    R.over(
      queryLens,
      R.append({
        kind: 'Field',
        name: {
          kind: 'Name',
          value: 'entity',
        },
        arguments: [],
        directives: [],
        selectionSet,
      }),
      USER_NOTIFICATIONS_LIST_QUERY,
    ),
  );
};
