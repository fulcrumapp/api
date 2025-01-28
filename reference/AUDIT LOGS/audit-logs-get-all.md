---
title: Get All Audit Logs
excerpt: ''
api:
  file: rest-api.json
  operationId: get_v-version-audit-logs-json
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
[block:code]
{
  "codes": [
    {
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nlogs = fulcrum.audit_logs.search(url_params={'per_page':5,'page':1})\n\nfor log in logs['audit_logs']:\n  # print(log) # entire audit log\n  print(log['description']) # just the audit log description",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.auditLogs.all({'per_page':5,'page':1})\n  .then((page) => {\n    page.objects.forEach(log => {\n      // console.log(log); // entire audit log\n      console.log(log.description); // just the audit log description\n    });\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\nlogs = client.audit_logs.all({'per_page':5,'page':1})\n\nfor log in logs.objects do\n  # puts log # entire log definition\n  puts log['description'] # just the log description\nend",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]