---
title: Report Builder Introduction
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
Reports enable you to transform your raw field data into professional, customizable PDF documents that can be printed, shared, or archived.

# Report Templates

Report Templates allow you to customize how your data is displayed when printed. An app can have multiple templates and any active reports are available for selection when printing records from web and mobile. If you haven't created any reports for an app, records will automatically print to the standard system report template. If more than one report is active, printing on the web or generating a report on mobile will present you with a list of report templates to chose from.

Members granted the *Manage Apps* Role Permission have access to manage reports via the **REPORTS** button in the app builder.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/54c310c-reports-templates.png",
        "reports-templates.png",
        2878,
        1590,
        "#86898a"
      ],
      "caption": "Report Template Manager"
    }
  ]
}
[/block]
# Basic Report Builder

The Basic Report Builder is available on all Fulcrum plans and can be accessed via the **REPORTS** button in the app builder. If you have not saved any report templates, records will print to the standard system report template, which includes the following elements:

- Cover Page with Photo, App Information, Record Metadata, Location Map
- Header with App Name and Record ID
- Footer with Organization Name, Image, and Address
- All visible form fields

The Basic Report Builder allows you to create customized templates where you can explicitly show or hide the standard report elements listed above. You can also set the page size and layout and control which fields should be displayed on the PDF. You can save multiple templates and set them to *active* to make them available when printing or *inactive* to remove them from the print list.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/9a0e859-reports-basic.png",
        "reports-basic.png",
        2880,
        1598,
        "#a0a2a0"
      ],
      "caption": "Basic Report Builder"
    }
  ]
}
[/block]
# Advanced Report Builder

While the Basic Report Builder allows you to customize the standard report template via input controls, the Advanced Report Builder includes full code editor access for complete customization of report templates. Fulcrum's reporting engine provides a templating language, editor, preview generator, and rendering stack.

Report templates are written in standard HTML, JavaScript, and CSS. External resources such as front-end frameworks and JavaScript libraries can be referenced and there are many variables and functions available to pull in [organization](https://docs.fulcrumapp.com/docs/variables#organization), [form](https://docs.fulcrumapp.com/docs/variables#form), [record](https://docs.fulcrumapp.com/docs/variables#record), and [user](https://docs.fulcrumapp.com/docs/variables#user) information.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/a746837-report-advanced.png",
        "report-advanced.png",
        2880,
        1596,
        "#e3e3e0"
      ],
      "caption": "Advanced Report Builder"
    }
  ]
}
[/block]