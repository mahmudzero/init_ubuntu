const dynamo  = require('./lib/utils/dynamo');
const n_utils = require('util');

const list_tables = n_utils.promisify(dynamo.db.listTables).bind(dynamo.db);

let table_names_dirty = [];
let LastEvaluatedTableName = '';
let response;
const params = {
  Limit: 100,
};
let page = 0;

while (LastEvaluatedTableName !== null) {
  console.log(`getting page ${page} of tables...`);
  if (LastEvaluatedTableName.length > 0  ) params.ExclusiveStartTableName = LastEvaluatedTableName;
  if (LastEvaluatedTableName.length === 0) delete params.ExclusiveStartTableName;
  response = await list_tables(params);
  LastEvaluatedTableName = response.LastEvaluatedTableName || null;
  table_names_dirty.push(response.TableNames);
  page = page + 1;
}
