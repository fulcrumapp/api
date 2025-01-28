---
title: Pull Selected Choice Option Label
excerpt: >-
  This example can be used to pull in a selected choice option's label. This
  will only work on choice fields where the choice options are defined in the
  choice field. This will not work for predefined choice lists.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
```
function findChoiceLabel(dataName) {
  var selectedChoiceValue = CHOICEVALUE(VALUE(dataName));

  var choice = FIELD(dataName).choices.find(function(choice) {
    return choice.value === selectedChoiceValue;
  });

  return choice ? choice.label : null;
}

SETRESULT(findChoiceLabel('choicefield'));
```

All you need to do is replace the 'choicefield' to the data name of the choice field in your app.

This next example demonstrates how to do the same as above, but for a Multiple Choice field.

```
function findChoiceLabels(dataName) {
  var selectedChoiceValues = CHOICEVALUES(VALUE(dataName));
  var selectedChoiceLabels = [];

  if ($choicefield) {
    for (let i = 0; i < selectedChoiceValues.length; i++) {
      var choice = FIELD(dataName).choices.find(function (choice) {
        return choice.value === selectedChoiceValues[i];
      });

      selectedChoiceLabels.push(choice ? choice.label : null);

    }
    return selectedChoiceLabels;
  }
}

SETRESULT(findChoiceLabels('choicefield'));
```

All you need to do is replace the 'choicefield'/$choicefield to the data name of the choice field in your app.