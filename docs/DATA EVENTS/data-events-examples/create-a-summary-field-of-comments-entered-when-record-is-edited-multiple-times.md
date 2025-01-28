---
title: >-
  Create a summary field of comments entered when record is edited multiple
  times
excerpt: >-
  This example will create a summary field to keep track of comments past users
  have entered. You will need to add a text field (read-only optional) to your
  form.  To utilize the below code, you will name the summary text field
  `summary` and have a text field called  `comment`.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
```js
ON('save-record', function(event){

  var name = USERFULLNAME();

  var time = TIMESTAMP();

  if(($additional_comments) != null && ($comment_summary) != null){

    var temp = $comment_summary;

    SETVALUE('comment_summary', temp + CONCAT(name, ' at ', time, ' : ', $additional_comments, '\n'));

  } else if ($additional_comments != null && ($comment_summary) == null) {

    SETVALUE('comment_summary', CONCAT(name, ' at ', time, ' : ', $additional_comments, '\n') )

  }

});

ON('load-record', function(event){

  SETVALUE('additional_comments', null)

})
```