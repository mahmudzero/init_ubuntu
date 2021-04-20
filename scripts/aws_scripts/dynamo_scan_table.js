const dynamo  = require('./lib/utils/dynamo');
const n_utils = require('util');

const scan_table = n_utils.promisify(dynamo.db.scan).bind(dynamo.db);

let results_dirty = [];
let LastEvaluatedKey = '';
let response;
const params = {
  TableName: '',
};
let page = 0;

while (LastEvaluatedKey !== null) {
  console.log(`getting page ${page} of data...`);
  if (LastEvaluatedKey.length > 0  ) params.LastEvaluatedKey = LastEvaluatedKey;
  if (LastEvaluatedKey.length === 0) delete params.LastEvalutedKey;
  respone = await scan_table(params);
  LastEvaluatedKey = response.LastEvalutedKey;
  results_dirty.push(response.Items);
  page = page + 1;
}
