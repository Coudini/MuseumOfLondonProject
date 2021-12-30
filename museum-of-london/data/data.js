import { ACCESS, SECRET } from '@env';
var AWS = require('aws-sdk/dist/aws-sdk-react-native');

// Configuring AWS SDK
AWS.config.update({
  region: 'eu-central-1',
  accessKeyId: ACCESS,
  secretAccessKey: SECRET,
});

// Initialize query client
const queryClient = new AWS.TimestreamQuery();

export default async function getAllRows(
  query,
  setMetersData,
  nextToken = undefined
) {
  const tempData = [];

  const params = {
    QueryString: query,
  };

  if (nextToken) {
    params.NextToken = nextToken;
  }

  await queryClient
    .query(params)
    .promise()
    .then(
      (response) => {
        parseQueryResult(response, setMetersData, tempData);
        if (response.NextToken) {
          getAllRows(query, setMetersData, response.NextToken);
        }
      },
      (err) => {
        console.error('Error while querying:', err);
      }
    );
}

function parseQueryResult(response, setMetersData, tempData) {
  const columnInfo = response.ColumnInfo;
  const rows = response.Rows;

  rows.forEach(function (row) {
    const parsedRow = parseRow(columnInfo, row);
    tempData.push(parsedRow);
  });

  setMetersData([...tempData]);
}

function parseRow(columnInfo, row) {
  const data = row.Data;
  const rowOutput = {};

  var i;
  for (i = 0; i < data.length; i++) {
    const info = columnInfo[i];
    const datum = data[i];
    const row = parseDatum(info, datum);
    rowOutput[row.name] = row.value;
  }

  return rowOutput;
}

function parseDatum(info, datum) {
  if (datum.NullValue != null && datum.NullValue === true) {
    return `${info.Name}=NULL`;
  }

  return parseScalarType(info, datum);
}

function parseScalarType(info, datum) {
  return { name: parseColumnName(info), value: datum.ScalarValue };
}

function parseColumnName(info) {
  return info.Name == null ? '' : `${info.Name}`;
}
