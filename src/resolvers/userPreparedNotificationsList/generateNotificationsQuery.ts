import * as R from 'ramda';
import { print } from 'graphql';

import { USER_NOTIFICATIONS_LIST_QUERY } from './queries';

export const generateNotificationsQuery = (tableSchema: any) => {
  const result = R.pipe<Record<string, any>, Record<string, any>[], Record<string, any>[], Record<string, any>[]>(
    R.propOr([], 'fields'),
    R.reject(
      R.anyPass([
        R.propEq('isSystem', true),
        R.propEq('name', 'notification'),
        R.complement(R.propEq('fieldType', 'RELATION')),
      ]),
    ),
    R.map((field: any) => ({
      kind: 'Field',
      name: {
        kind: 'Name',
        value: R.prop('name', field),
      },
      arguments: [],
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: R.pipe(
          R.pathOr([], ['relation', 'refTable', 'fields']),
          R.reject(R.propEq('fieldType', 'RELATION')),
          R.map((item: any) => ({
            kind: 'Field',
            name: {
              kind: 'Name',
              value: R.prop('name', item),
            },
            arguments: [],
            directives: [],
          })),
        )(field),
      },
    })),
  )(tableSchema);

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
        selectionSet: {
          kind: 'SelectionSet',
          selections: result,
        },
      }),
      USER_NOTIFICATIONS_LIST_QUERY,
    ),
  );
};
