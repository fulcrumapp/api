---
title: Format Text Fields
excerpt: >-
  Here's a quick tutorial on how to use this custom formatting for converting
  text into HTML with specific tags based on control characters. This method
  allows you to add line breaks, lists, bold, and italic styling without needing
  HTML knowledge. Simply include specific markers in your text, and a JavaScript
  function will convert them into proper HTML elements.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---


**Step 1: Embed the convertToHtml function**

You need to embed the function within a 

<htmlblock>{`
<script>
This can be done by adding the following code snippet to your HTML page within the
<script>
`}</htmlblock>

```Text Script
<script>
function convertToHtml(text) {
    // Inline processing of -- to <ul> and <li> elements
    text = text.replace(/(?:^|\n)--\s*(.*?)\s*(?=\n|$)/g, '<ul><li>$1</li></ul>');
    // Remove any consecutive <ul> tags created, maintaining only one <ul> and appending <li> items
    text = text.replace(/<\/ul>\s*<ul>/g, '');
    // Convert // to line breaks <br>
    text = text.replace(/\/\//g, '<br>');
    // Convert -*...*- to bold <strong>
    text = text.replace(/-\*(.*?)\*-/g, '<strong>$1</strong>');
    
    // Convert -/.../- to italic <em/>
    text = text.replace(/-\/(.*?)\/-/g, '<em/>$1</em>'); 
    return text;
}
</script>

```

**Explanation**:

* This function will detect and replace special markers (--, //, - *...*-, -/ ... /-) in the text with corresponding HTML tags like <ul/>, <li/>, <br/>, <strong/>, and <em/>.
* The function can handle multiline text, converting it into well-structured HTML that supports lists, bold, and italicized text.