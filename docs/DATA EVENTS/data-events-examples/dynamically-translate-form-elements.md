---
title: Dynamically translate form elements
excerpt: >-
  This example demonstrates how to use the
  [SETLABEL](https://docs.fulcrumapp.com/docs/data-events-setlabel) and
  [SETCHOICES](https://docs.fulcrumapp.com/docs/data-events-setchoices)
  functions to dynamically update the form elements when a user selects their
  language from a choice list. The translations are stored as simple JavaScript
  objects. Note that in addition to labels and choices, you can also use this
  method to translate field descriptions with
  [SETDESCRIPTION](https://docs.fulcrumapp.com/docs/data-events-setdescription).
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
```js
var labels = {
  'name': {
    'Spanish': 'Nombre',
    'French': 'Nom'
  },
  'age': {
    'Spanish': 'Años',
    'French': 'Âge'
  },
  'gender': {
    'Spanish': 'Género',
    'French': 'Sexe'
  }
};

var choices = {
  'gender': {
    'Spanish': [
      {
        'label': 'Varón',
        'value': 'Male'
      },
      {
        'label': 'Hembra',
        'value': 'Female'
      }
    ],
    'French': [
      {
        'label': 'Mâle',
        'value': 'Male'
      },
      {
        'label': 'Femelle',
        'value': 'Female'
      }
    ]
  }
};

function translate(e) {
  var language = CHOICEVALUE($language);
  DATANAMES().forEach(function(dataName) {
    // Update field labels
    if (labels[dataName]) {
      SETLABEL(dataName, labels[dataName][language]);
    } else {
      SETLABEL(dataName, null);
    }
    // Update choice values
    if (choices[dataName] && choices[dataName][language]) {
      SETCHOICES(dataName, choices[dataName][language]);
    } else {
      SETCHOICES(dataName, null);
    }
  });
}

ON('load-record', translate);
ON('change', 'language', translate);
```
