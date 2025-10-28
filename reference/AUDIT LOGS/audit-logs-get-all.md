---
title: Get All Audit Logs
excerpt: ''
api:
  file: rest-api.json
  operationId: audit-logs-get-all
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
# API Library Examples

```python Python
from fulcrum import Fulcrum
fulcrum = Fulcrum('{token}')

logs = fulcrum.audit_logs.search(url_params={'per_page':5,'page':1})

for log in logs['audit_logs']:
  # print(log) # entire audit log
  print(log['description']) # just the audit log description
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

client.auditLogs.all({'per_page':5,'page':1})
  .then((page) => {
    page.objects.forEach(log => {
      // console.log(log); // entire audit log
      console.log(log.description); // just the audit log description
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')
logs = client.audit_logs.all({'per_page':5,'page':1})

for log in logs.objects do
  # puts log # entire log definition
  puts log['description'] # just the log description
end
```