---
title: Calculations Reference
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
Calculation fields can be used to write simple expressions to calculate values dynamically based on inputs from other form fields or any other custom logic. This can be simple ‘total’ calculations or complex equations referencing other calculation fields and even data contained in repeatable sections. Expressions are written in standard [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) with some custom functions for accessing form data and record values.

# Reference

Check out the full documentation on available formulae by browsing the complete list of calculation expressions below.

# Examples

We have a [library of examples](https://fulcrum.readme.io/docs/calculations-examples) available for showcasing what you can do with calculation fields.

# Display Formats

You must select a format for displaying the expression result.

* **Text** - Use this for displaying text or unknown values.
* **Number** - Use this only for displaying numeric values.
* **Date** - Use this for displaying formatted date values. The value should be in the following format: `YYYY-MM-DD`.
* **Currency** - Use this for displaying formatted currency values. The value should be a number and you'll need to select a specific currency.

# Debugging

You can enable verbose error reporting in the app when building or troubleshooting complex expressions by setting `SHOWERRORS(true)`. Another useful way to interactively test expressions is to use the `eval()` function in combination with a text field and `INSPECT()`. This allows you to type in your code and immediately inspect how it is being evaluated.

## Setting Up An Eval Calculation

![672](https://files.readme.io/f026eef-calc-eval.png "calc-eval.png")

## Evaluating A Calculation

![770](https://files.readme.io/135b8f2-calc-eval-demo.png "calc-eval-demo.png")
