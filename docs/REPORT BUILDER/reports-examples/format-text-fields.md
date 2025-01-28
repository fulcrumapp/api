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
Formatting rules

1. **Line Breaks (//)**:\
   `Use // to insert a line break. Each // will be converted to a <br> tag.`
2. **Bullet Points (--)**:\
   `Use -- at the beginning of a line to turn it into a bullet point within an unordered list (<ul><li>)`.
3. **Bold Text (- *...*-):**\
   `Surround text with -_ at the start and _- at the end to make it bold. This will be converted to <strong>.`
4. **Italic Text (-/ ... /-):**\
   `Surround text with -/ at the start and /- at the end to italicize it. This will be converted to <em>.`

**Examples**

Here are some sample sentences using the format:

**Example 1: Line Breaks**

The project is progressing as expected.\
// Additional resources were allocated to ensure timely completion.

**Output:**

The project is progressing as expected.\
Additional resources were allocated to ensure timely completion.

**Example 2: Bullet Points**

The following tasks need completion:

\-- Finalize window installation.\
\-- Inspect roof sealant application.\
\-- Clean and clear the worksite perimeter.

**Output:**

The following tasks need completion:

* Finalize window installation.
* Inspect roof sealant application.
* Clean and clear the worksite perimeter.

**Example 3: Bold Text**

The review concluded that -*all safety measures*- were adequately implemented.

**Output:**

The review concluded that **all safety measures** were adequately implemented.

**Example 4: Italic Text**

The contractor recommended using -/high-quality materials/- for longevity.

**Output:**

The contractor recommended using high-quality materials for longevity.

**Example 5: Combining Formatting**

Site conditions were assessed as follows:\
//-*Weather conditions*- were favorable.\
//-*Equipment-* is on-site and ready.\
\-- Ensure all staff members are briefed on safety protocols.\
\-- Confirm that --/all permits are approved/-.

**Output:**\
Site conditions were assessed as follows:

**Weather conditions** were favorable.\
**Equipment** is on-site and ready.

* Ensure all staff members are briefed on safety protocols.
* Confirm that *all permits are approved*.

<br />

**Step-by-Step guide to embedding and using the convertToHtml function**

In this section, we'll go through how to integrate the convertToHtml function into your report builder. This function will parse text formatted with special markers and convert it into styled HTML. By following these steps, you'll be able to apply this function to any text field, allowing HTML formatting to be rendered directly on the page.

**Step 1: Embed the convertToHtml function**

You need to embed the function within a <HTMLBlock>{`
<script>
`}</HTMLBlock> tag. This can be done by adding the following code snippet to your HTML page within the <HTMLBlock>{`
<script>
`}</HTMLBlock> tag:

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
    
    // Convert -/.../- to italic <em>
    text = text.replace(/-\/(.*?)\/-/g, '<em>$1</em>'); 
    return text;
}
</script>

```

**Explanation**:

* This function will detect and replace special markers (--, //, - *...*-, -/ ... /-) in the text with corresponding HTML tags like <ul>, <li>, <br>, <strong>, and <em>.
* The function can handle multiline text, converting it into well-structured HTML that supports lists, bold, and italicized text.
