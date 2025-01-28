---
title: Create Classification Set
excerpt: ''
api:
  file: rest-api.json
  operationId: classification-sets-create
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

obj = {
  "classification_set": {
    "name": "Wildlife Types",
    "items": [{
      "label": "Bird",
      "value": "Bird",
      "child_classifications": [{
        "label": "Cormorant",
        "value": "Cormorant"
      }, {
        "label": "Egret",
        "value": "Egret"
      }, {
        "label": "Frigate Bird",
        "value": "Frigate Bird"
      }, {
        "label": "Heron",
        "value": "Heron"
      }, {
        "label": "Osprey",
        "value": "Osprey"
      }, {
        "label": "Pelican",
        "value": "Pelican"
      }, {
        "label": "Pigeon",
        "value": "Pigeon"
      }, {
        "label": "Tern",
        "value": "Tern"
      }]
    }, {
      "label": "Butterfly",
      "value": "Butterfly"
    }, {
      "label": "Fish",
      "value": "Fish"
    }, {
      "label": "Manatee",
      "value": "Manatee"
    }, {
      "label": "Shellfish",
      "value": "Shellfish",
      "child_classifications": [{
        "label": "Crab",
        "value": "Crab",
        "child_classifications": [{
          "label": "Blue Crab",
          "value": "Blue Crab"
        }, {
          "label": "Fiddler Crab",
          "value": "Fiddler Crab"
        }, {
          "label": "Hermit Crab",
          "value": "Hermit Crab"
        }]
      }]
    }, {
      "label": "Turtle",
      "value": "Turtle"
    }]
  }
}

classification_set = fulcrum.classification_sets.create(obj)
print(classification_set['classification_set']['id'] + ' has been created!')
```
```javascript JavaScript
const { Client } = require('fulcrum-app');
const client = new Client('{token}');

const obj = {
  "name": "Wildlife Types",
  "items": [{
    "label": "Bird",
    "value": "Bird",
    "child_classifications": [{
      "label": "Cormorant",
      "value": "Cormorant"
    }, {
      "label": "Egret",
      "value": "Egret"
    }, {
      "label": "Frigate Bird",
      "value": "Frigate Bird"
    }, {
      "label": "Heron",
      "value": "Heron"
    }, {
      "label": "Osprey",
      "value": "Osprey"
    }, {
      "label": "Pelican",
      "value": "Pelican"
    }, {
      "label": "Pigeon",
      "value": "Pigeon"
    }, {
      "label": "Tern",
      "value": "Tern"
    }]
  }, {
    "label": "Butterfly",
    "value": "Butterfly"
  }, {
    "label": "Fish",
    "value": "Fish"
  }, {
    "label": "Manatee",
    "value": "Manatee"
  }, {
    "label": "Shellfish",
    "value": "Shellfish",
    "child_classifications": [{
      "label": "Crab",
      "value": "Crab",
      "child_classifications": [{
        "label": "Blue Crab",
        "value": "Blue Crab"
      }, {
        "label": "Fiddler Crab",
        "value": "Fiddler Crab"
      }, {
        "label": "Hermit Crab",
        "value": "Hermit Crab"
      }]
    }]
  }, {
    "label": "Turtle",
    "value": "Turtle"
  }]
};

client.classificationSets.create(obj)
  .then((classificationSet) => {
    console.log(classificationSet.id + ' has been created!');
  })
  .catch((error) => {
    console.log(error.message);
  });
```
```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

classification_set = {
  "name"=>"Wildlife Types",
  "items"=>[{
    "label"=>"Bird",
    "value"=>"Bird",
    "child_classifications"=>[{
      "label"=>"Cormorant",
      "value"=>"Cormorant"
    }, {
      "label"=>"Egret",
      "value"=>"Egret"
    }, {
      "label"=>"Frigate Bird",
      "value"=>"Frigate Bird"
    }, {
      "label"=>"Heron",
      "value"=>"Heron"
    }, {
      "label"=>"Osprey",
      "value"=>"Osprey"
    }, {
      "label"=>"Pelican",
      "value"=>"Pelican"
    }, {
      "label"=>"Pigeon",
      "value"=>"Pigeon"
    }, {
      "label"=>"Tern",
      "value"=>"Tern"
    }]
  }, {
    "label"=>"Butterfly",
    "value"=>"Butterfly"
  }, {
    "label"=>"Fish",
    "value"=>"Fish"
  }, {
    "label"=>"Manatee",
    "value"=>"Manatee"
  }, {
    "label"=>"Shellfish",
    "value"=>"Shellfish",
    "child_classifications"=>[{
      "label"=>"Crab",
      "value"=>"Crab",
      "child_classifications"=>[{
        "label"=>"Blue Crab",
        "value"=>"Blue Crab"
      }, {
        "label"=>"Fiddler Crab",
        "value"=>"Fiddler Crab"
      }, {
        "label"=>"Hermit Crab",
        "value"=>"Hermit Crab"
      }]
    }]
  }, {
    "label"=>"Turtle",
    "value"=>"Turtle"
  }]
};

response = client.classification_sets.create(classification_set)

puts response['id'] + ' has been created!'
```
