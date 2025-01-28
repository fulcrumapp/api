---
title: Update Classification Set
excerpt: ''
api:
  file: rest-api.json
  operationId: put_v-version-classification-sets-classification-set-id-json
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
      "code": "from fulcrum import Fulcrum\nfulcrum = Fulcrum('{token}')\n\nobj = {\n  \"classification_set\": {\n    \"name\": \"Wildlife Types\",\n    \"items\": [{\n      \"label\": \"Bird\",\n      \"value\": \"Bird\",\n      \"child_classifications\": [{\n        \"label\": \"Cormorant\",\n        \"value\": \"Cormorant\"\n      }, {\n        \"label\": \"Egret\",\n        \"value\": \"Egret\"\n      }, {\n        \"label\": \"Frigate Bird\",\n        \"value\": \"Frigate Bird\"\n      }, {\n        \"label\": \"Heron\",\n        \"value\": \"Heron\"\n      }, {\n        \"label\": \"Osprey\",\n        \"value\": \"Osprey\"\n      }, {\n        \"label\": \"Pelican\",\n        \"value\": \"Pelican\"\n      }, {\n        \"label\": \"Pigeon\",\n        \"value\": \"Pigeon\"\n      }, {\n        \"label\": \"Tern\",\n        \"value\": \"Tern\"\n      }]\n    }, {\n      \"label\": \"Butterfly\",\n      \"value\": \"Butterfly\"\n    }, {\n      \"label\": \"Fish\",\n      \"value\": \"Fish\"\n    }, {\n      \"label\": \"Manatee\",\n      \"value\": \"Manatee\"\n    }, {\n      \"label\": \"Shellfish\",\n      \"value\": \"Shellfish\",\n      \"child_classifications\": [{\n        \"label\": \"Crab\",\n        \"value\": \"Crab\",\n        \"child_classifications\": [{\n          \"label\": \"Blue Crab\",\n          \"value\": \"Blue Crab\"\n        }, {\n          \"label\": \"Fiddler Crab\",\n          \"value\": \"Fiddler Crab\"\n        }, {\n          \"label\": \"Hermit Crab\",\n          \"value\": \"Hermit Crab\"\n        }]\n      }]\n    }, {\n      \"label\": \"Turtle\",\n      \"value\": \"Turtle\"\n    }, {\n      \"label\": \"Frog\",\n      \"value\": \"Frog\"\n    }]\n  }\n}\n\nclassification_set = fulcrum.classification_sets.update('{id}', obj)\nprint(classification_set['classification_set']['id'] + ' has been updated!')",
      "language": "python",
      "name": "Python"
    },
    {
      "code": "const { Client } = require('fulcrum-app');\nconst client = new Client('{token}');\n\nconst obj = {\n  \"name\": \"Wildlife Types\",\n  \"items\": [{\n    \"label\": \"Bird\",\n    \"value\": \"Bird\",\n    \"child_classifications\": [{\n      \"label\": \"Cormorant\",\n      \"value\": \"Cormorant\"\n    }, {\n      \"label\": \"Egret\",\n      \"value\": \"Egret\"\n    }, {\n      \"label\": \"Frigate Bird\",\n      \"value\": \"Frigate Bird\"\n    }, {\n      \"label\": \"Heron\",\n      \"value\": \"Heron\"\n    }, {\n      \"label\": \"Osprey\",\n      \"value\": \"Osprey\"\n    }, {\n      \"label\": \"Pelican\",\n      \"value\": \"Pelican\"\n    }, {\n      \"label\": \"Pigeon\",\n      \"value\": \"Pigeon\"\n    }, {\n      \"label\": \"Tern\",\n      \"value\": \"Tern\"\n    }]\n  }, {\n    \"label\": \"Butterfly\",\n    \"value\": \"Butterfly\"\n  }, {\n    \"label\": \"Fish\",\n    \"value\": \"Fish\"\n  }, {\n    \"label\": \"Manatee\",\n    \"value\": \"Manatee\"\n  }, {\n    \"label\": \"Shellfish\",\n    \"value\": \"Shellfish\",\n    \"child_classifications\": [{\n      \"label\": \"Crab\",\n      \"value\": \"Crab\",\n      \"child_classifications\": [{\n        \"label\": \"Blue Crab\",\n        \"value\": \"Blue Crab\"\n      }, {\n        \"label\": \"Fiddler Crab\",\n        \"value\": \"Fiddler Crab\"\n      }, {\n        \"label\": \"Hermit Crab\",\n        \"value\": \"Hermit Crab\"\n      }]\n    }]\n  }, {\n    \"label\": \"Turtle\",\n    \"value\": \"Turtle\"\n  }, {\n    \"label\": \"Frog\",\n    \"value\": \"Frog\"\n  }]\n};\n\nclient.classificationSets.update('{id}', obj)\n  .then((classificationSet) => {\n    console.log(classificationSet.id + ' has been updated!');\n  })\n  .catch((error) => {\n    console.log(error.message);\n  });",
      "language": "javascript",
      "name": "JavaScript"
    },
    {
      "code": "require 'fulcrum'\n\nclient = Fulcrum::Client.new('{token}')\n\nclassification_set = {\n  \"name\"=>\"Wildlife Types\",\n  \"items\"=>[{\n    \"label\"=>\"Bird\",\n    \"value\"=>\"Bird\",\n    \"child_classifications\"=>[{\n      \"label\"=>\"Cormorant\",\n      \"value\"=>\"Cormorant\"\n    }, {\n      \"label\"=>\"Egret\",\n      \"value\"=>\"Egret\"\n    }, {\n      \"label\"=>\"Frigate Bird\",\n      \"value\"=>\"Frigate Bird\"\n    }, {\n      \"label\"=>\"Heron\",\n      \"value\"=>\"Heron\"\n    }, {\n      \"label\"=>\"Osprey\",\n      \"value\"=>\"Osprey\"\n    }, {\n      \"label\"=>\"Pelican\",\n      \"value\"=>\"Pelican\"\n    }, {\n      \"label\"=>\"Pigeon\",\n      \"value\"=>\"Pigeon\"\n    }, {\n      \"label\"=>\"Tern\",\n      \"value\"=>\"Tern\"\n    }]\n  }, {\n    \"label\"=>\"Butterfly\",\n    \"value\"=>\"Butterfly\"\n  }, {\n    \"label\"=>\"Fish\",\n    \"value\"=>\"Fish\"\n  }, {\n    \"label\"=>\"Manatee\",\n    \"value\"=>\"Manatee\"\n  }, {\n    \"label\"=>\"Shellfish\",\n    \"value\"=>\"Shellfish\",\n    \"child_classifications\"=>[{\n      \"label\"=>\"Crab\",\n      \"value\"=>\"Crab\",\n      \"child_classifications\"=>[{\n        \"label\"=>\"Blue Crab\",\n        \"value\"=>\"Blue Crab\"\n      }, {\n        \"label\"=>\"Fiddler Crab\",\n        \"value\"=>\"Fiddler Crab\"\n      }, {\n        \"label\"=>\"Hermit Crab\",\n        \"value\"=>\"Hermit Crab\"\n      }]\n    }]\n  }, {\n    \"label\"=>\"Turtle\",\n    \"value\"=>\"Turtle\"\n  }, {\n    \"label\"=>\"Frog\",\n    \"value\"=>\"Frog\"\n  }]\n};\n\nresponse = client.classification_sets.update('{id}', classification_set)\n\nputs response['id'] + ' has been updated!'",
      "language": "ruby",
      "name": "Ruby"
    }
  ]
}
[/block]