---
title: Update Classification Set
excerpt: ''
api:
  file: rest-api.json
  operationId: classification-sets-update
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
    }, {
      "label": "Frog",
      "value": "Frog"
    }]
  }
}

classification_set = fulcrum.classification_sets.update('{id}', obj)
print(classification_set['classification_set']['id'] + ' has been updated!')
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
  }, {
    "label": "Frog",
    "value": "Frog"
  }]
};

client.classificationSets.update('{id}', obj)
  .then((classificationSet) => {
    console.log(classificationSet.id + ' has been updated!');
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
  }, {
    "label"=>"Frog",
    "value"=>"Frog"
  }]
};

response = client.classification_sets.update('{id}', classification_set)

puts response['id'] + ' has been updated!'
```