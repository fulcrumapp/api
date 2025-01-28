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
[block:code]
{
  "codes": [
    {
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nlog = fulcrum.audit_logs.find('{id}')\n\nprint(log['audit_log']) # entire log\n# print(log['audit_log']['description']) # just the log description",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nclient.auditLogs.find('{id}')\n  .then((log) => {\n    console.log(log);\n  })\n  .catch((error) => {\n    // There was a problem with the request. Is the API token correct?\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\nlog = client.audit_logs.find('{id}')\n\nputs log # entire log definition\n# puts log['description'] # just the log description",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]