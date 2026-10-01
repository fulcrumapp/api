---
title: Get Single Audit Log
excerpt: ''
api:
  file: rest-api.json
  operationId: audit-logs-get-single
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
# API Library Examples

```python Python
from fulcrum import Fulcrum
fulcrum = Fulcrum('{token}')

log = fulcrum.audit_logs.find('{id}')

print(log['audit_log']) # entire log
# print(log['audit_log']['description']) # just the log description
```
```javascript JavaScript
const { FulcrumClient, FulcrumRegion } = require('@fulcrumapp/fulcrum-js');
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

client.auditLogs.getById('{id}')
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    // There was a problem with the request. Is the API token correct?
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')
log = client.audit_logs.find('{id}')

puts log # entire log definition
# puts log['description'] # just the log description
```