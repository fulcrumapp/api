---
title: FORMATNUMBER
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
Formats a number in a given locale. This function is useful when including a number in a longer piece of text. To display just a number in a calculated field, it&#39;s recommended to set the display type of the calculated field to &#39;Number&#39; and just return a number in the expression. When the display type of the calculated field is set to &#39;Number&#39;, the number is automatically displayed as a formatted number.

# Parameters

`value` Number (__required__) - argument

`language` String (optional)  [default = locale default] - the BCP 47 language identifier to use when formatting the number. e.g. `en-US`, `fr-FR`, `en-AU` or `pt-BR`

# Returns

String - formatted number as text

# Examples

```js
FORMATNUMBER(1234.56789999)

// returns "1,234.568"
```


```js
FORMATNUMBER(1234.56789999, 'fr-FR')

// returns "1 234,568"
```


```js
FORMATNUMBER(1234.56789999, 'pt-BR')

// returns "1.234,568"
```