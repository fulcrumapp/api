---
title: Get Single Audit Log
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-audit-logs-audit-log-id-json
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
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.auditLogs.find('{id}')
  .then((log) => {
    console.log(log);
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
