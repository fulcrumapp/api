---
title: Form Schema
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
# Print the Form Schema (Simple)

Using this code in your BODY and STYLES tabs to allow you to print your Fulcrum app and share it with others as a PDF. You do not need to make it active. Keep it inactive and download or print from the advanced report builder page.

```javascript BODY
<h1><%= form.name %></h1>
<br>
<div>
  <% RENDER(record, null, ({element, value, renderSection, renderRepeatableItems, container, index, feature, parent, allValues}) => { %>
    <% if (element.isSectionElement) { %>
      <div class='field-section'>
        <h1 class='field-section-title'><%= element.label %></h1>
        <div class='field-section-content'>
          <% renderSection() %>
        </div>
      </div>
    <% } else { %>
      <div class='field'>
        <h2 class='field-label'><%= element.label %></h2>
        <div class='field-value pre'>Required?: <%= element._isRequired %></div>
      </div>
    <% } %>
  <% }) %>
</div>
```
```Text HEADER
Leave Blank
```
```Text FOOTER
Leave Blank
```
```css STYLES
h1, h2, h3, h4, h5, h6 {
  margin: 0;
  padding: 0;
}

.flex-align-center {
  display: flex;
  align-items: center;
}

.field {
  padding: 5px 0;
  border-bottom: 1px solid #e1e1e1;
  page-break-inside: avoid;
  display: flex;
}

.photo-field {
  display: block;
  page-break-inside: auto;
}

.field:last-of-type {
  border-bottom: none;
}

.meta-field {
  border-bottom: 1px solid #ddd;
  margin-bottom: 5px;
  padding-bottom: 5px;
}

.meta-field-group .meta-field:first-of-type  {
  border-bottom: none;
}

.field-label {
  font-weight: 900;
  width: 30%;
  font-size: 12px;
  box-sizing: border-box;
}

.meta-field-label {
  box-sizing: border-box;
  color: #41403b;
  font-size: 13px;
  font-weight: 900;
  margin-bottom: 10px;
  text-transform: uppercase;
  width: 30%;
}

.field-label-full {
  font-weight: normal;
  width: 100%;
  box-sizing: border-box;
  font-size: 12px;
}

.field-value {
  width: 70%;
  box-sizing: border-box;
  border-left: 1px solid #e1e1e1;
  padding-left: 10px;
}

.meta-field-value {
  color: #7d7d7d;
  padding-bottom: 3px;
  font-size: 14px;
}

.meta-field-value.flex-align-center svg {
  padding-right: 5px;
}

.meta-field-value-large {
  font-size: 18px;
}

.cover-photo-container, .photo-column figure {
  position: relative;
}

.cover-photo-container img {
  height: 300px;
  object-fit: cover;
}

.cover-photo-container figcaption, .photo-column figcaption {
  position: absolute;
  bottom: 18px;
  margin: 0;
  padding: 10px;
  background: rgba(255,255,255,.85);
  border-radius: 0 7px 7px 0;
  border: 1px dashed #bbb;
  border-left: none;
  margin-right: 15px;
  left: 0;
}


.cover-photo-container img.photo-landscape { height: 500px; }
.cover-photo-container img.photo-legal { height: 560px; }
.cover-photo-container img.photo-legal-ls { height: 498px; }
.cover-photo-container img.photo-tabloid { height: 740px; }
.cover-photo-container img.photo-tabloid-ls { height: 740px; }
.cover-photo-container img.photo-ledger { height: 740px; }
.cover-photo-container img.photo-ledger-ls { height: 740px; }
.cover-photo-container img.photo-a4 { height: 380px; }
.cover-photo-container img.photo-a4-ls { height: 470px; }
.cover-photo-container img.photo-a3 { height: 840px; }
.cover-photo-container img.photo-a3-ls { height: 790px; }

.pre {
  white-space: pre-wrap;
}

.page-break-before {
  page-break-before: always;
}

.page-break-after {
  page-break-after: always;
}

.field-value .photo {
  max-width: 470px;
  max-height: 470px;
  margin-top: 6px;
}

.field-value .signature {
  max-width: 470px;
  max-height: 470px;
  margin-top: 6px;
}

.field-value .status-color {
  width: 14px;
  height: 14px;
  border-radius: 3px;
  margin-right: 8px;
  position: relative;
  float: left;
  top: 0px;
}

.meta-field-value .status-color {
  width: 14px;
  height: 14px;
  border-radius: 3px;
  margin-right: 8px;
  position: relative;
  float: left;
  top: 0px;
}

.field-section {
  border-bottom: 2px solid #e1e1e1;
  border-right: 2px solid #e1e1e1;
  margin-bottom: 8px;
}

.field-section.metadata {
  color: #41403b;
  margin: 10px 0;
  border: none;
}

.field-section-title {
  background: #f4f4f4;
  font-weight: bold;
  font-size: 18px;
  border-left: 3px solid #000;
  margin-top: 20px;
  margin-bottom: 8px;
  padding: 7px 12px;
}

.field-repeatable-title {
  background: #f4f4f4;
  font-weight: bold;
  font-size: 18px;
  border-left: 3px solid #000;
  margin-top: 20px;
  margin-bottom: 8px;
  padding: 7px 12px;
}

.field-repeatable-item {
  padding: 10px 0;
}

.field-repeatable-item .field-section-title,
.field-repeatable-item .field-repeatable-title {
  font-size: 16px;
  border-color: #ddd;
  background: #f9f9f9;
}

.field-repeatable-item > h2 {
  background: #f9f9f9;
  border-left: 3px solid #ddd;
  border-bottom: 2px solid #ddd;
  font-size: 16px;
  padding: 7px 12px;
  margin: 10px 0;
}

.field-repeatable-table {
  border-collapse: collapse;
  width: 100%;
  margin: 10px 0;
}

.field-repeatable-table thead {
  display: table-header-group;
  break-inside: avoid;
}

.field-repeatable-table td, .field-repeatable-table th {
  border: 1px solid #ccc;
  padding: 4px;
  text-align: left;
}

.field-repeatable-table th {
  background: #eee;
}

.field-repeatable-table tr {
  page-break-inside: avoid;
}

.field-repeatable-table tr:nth-child(even) {
  background-color: #f4f4f4;
}

.photo-row {
  padding-top: 4px;
}

.photo-column {
  box-sizing: border-box;
  display: inline;
}

.photo-column figure {
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  margin-block-start: 0px;
  margin-block-end: 0px;
  display: inline;
}

.photo-column figure img {
  max-height: 460px;
  max-width: 49%;
}

.photo-column figure img.photo-landscape { max-height: 760px; max-width: 47%; }
.photo-column figure img.photo-legal-ls { max-height: 680px; }
.photo-column figure img.photo-tabloid { max-height: 960px; }
.photo-column figure img.photo-tabloid-ls { max-height: 960px; }
.photo-column figure img.photo-ledger { max-height: 960px; }
.photo-column figure img.photo-ledger-ls { max-height: 740px; }
.photo-column figure img.photo-a4-ls { max-height: 760px; }
.photo-column figure img.photo-a3 { max-height: 960px; }
.photo-column figure img.photo-a3-ls { max-height: 960px; }


.footer {
  display: flex;
  justify-content: space-between;
  color: #7d7d7d;
}

.footer-logo {
  display: flex;
  align-items: center;
}

.footer-logo img, .footer-branding img {
  height: 40px;
  padding-right: 10px;
}

.footer-company-info, .footer-meta, .footer-branding {
  display: flex;
  align-items: center;
}

.footer-company {
  display: flex;
  align-items: center;
  color: #41403b;
}

.footer-meta {
  text-align: center;
}

.footer-address, .footer-meta {
  font-size: 11px;
}

.page-info {
  width: 300px;
  float: right;
  text-align: right;
  margin-top: 15px;
}

.title {
  padding: 15px 0px 0px 0px;
  page-break-inside: avoid;
  display: flex;
  padding-right: 5px;
}

.title hr {
  margin: 6px 0px 12px;
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ddd;
  padding: 0;
}

.title h1 {
  color: #41403b;
  font-size: 3em;
  font-weight: 300;
}

.title h2 {
  font-weight: 400;
  color: #7d7d7d;
  font-size: 14px;
}

.title-label {
  flex: 4 1;
}

.title-image  {
  flex: 1 1;
  text-align: right;
}

.title-image img {
  width: 100px;
  border-radius: 5px;
  border: 10px solid #fff;
  box-shadow: 0 0 3px #ccc;
}

.meta-wrapper {
  display: flex;
  align-items: flex-start;
}

.meta-map {
  margin-top: 20px;
}

.meta-map img {
  width: auto;
  height: 400px;
}

.meta-map img.ls-nometa {
  width: 100%;
  height: auto;
}

.meta-map img.letter-ls { height: 440px; }
.meta-map img.legal-ls { height: 440px; }
.meta-map img.tabloid-ls { height: 440px; }
.meta-map img.ledger-pt { height: 440px; }
.meta-map img.a4-ls { height: 440px; }

.meta-map .field {
  border: none;
  padding-top: 0;
}

.meta-fields-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 20px;
}

.meta-fields {
  flex: 1;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f4f4f4;
}

.meta-fields:last-of-type {
  border-bottom: none;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  color: #7d7d7d;
}

.header-title, .header-record {
  align-items: center;
  font-style: italic;
}
```
```javascript SCRIPT
Leave Blank
```

Here is an example of what the form's PDF will resemble.

<Image alt="Simple App Schema" align="center" border={true} src="https://files.readme.io/98046c5-App_Builder_-_Fulcrum_Team_Fulcrum_2024-03-06_at_12.51.28_PM.jpg">
  Simple App Schema
</Image>

# Print the Form Schema (Detailed)

Using this code in your BODY, STYLES, and SCRIPT tabs to allow you to print your Fulcrum app and share it with others as a PDF. You do not need to make it active. Keep it inactive and download or print from the advanced report builder page.

```javascript BODY
<div class="header">
  <img id="form-image" src="https://learn.fulcrumapp.com/img/branding/fulcrum-icon.png" />
  <div>
    <h2 id="form-name"></h2>
    <div id="form-description"></div>
  </div>
</div>
<div id="elements"></div>

<script>
const form = <%- TOJSON(API(`/forms/${QUERYVALUE(`SELECT form_id FROM forms WHERE name = '${form.name}'`)}`).form) %>;
const choiceLists = <%- TOJSON(API(`/choice_lists`).choice_lists) %>;

document.getElementById('form-name').innerHTML = form.name;
document.getElementById('form-description').innerHTML = form.description;
document.getElementById('form-image').src = form.image ? form.image : "https://learn.fulcrumapp.com/img/branding/fulcrum-icon.png";

const images = {
  'AddressField': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAwCAYAAABNPhkJAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGsSURBVHgB7ZqNTcMwEIVfuwBhg7ABI4QNYIJmA2CChg0YISPAAjQTlE7QZAOYgOJTE8U2wXGanzpXf9KTKvli+SWW72obaCYQWgtthA4z1lZohRZCoRznH+yQ2pe+GskdGujQpgPdbKwFJU1BErfaC8rhDjTuZ/z1o/ApNT7BDur4S3ouglskqMf2oTfKbyOAPan0XAy3uEY9tp+lIfAbPFB8LHFheMPc8Ya5Q4bXqJdtmbbKhXLvCu08Qs3TY4tybWAynOA0qNMHi7h7dMvpfYlgqJv7TGnKb6lF3Dumx/iFu3IjtMCxgnmziH8t4/tosLXmIhetlw7xmVCBGVMtWtXUkWmaWneYOb7w4I43zJ25GKaS0TabZKWsO26qq9tI4e4WD2UXqy0elnjD3PGGueMNc8cbluiyD3UFd1F86IYz6bft6WGI47FpRQG3kHdWd3pjArW8JNOmLx1BPWLN4Q407gRSWYmGbWUKyjHdHvKU2uMfQoamjXc8KmKo03WO2kC7trHAOBwwHtT3yenU52HueMPc8Ya5M5bhHcajgIPodzCH0hbqH5XO/AJixL+jwks/lwAAAABJRU5ErkJggg==',
  'AudioField': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAwCAYAAABNPhkJAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAONSURBVHgB3VqNdRoxDP7SCZIJ6k5QMkHJAm02gE5QOkE8QWACQifIex2gdALoBHEnCEyQFpW7oBOWf8CUg+89vVzOss6fLcuyDbDB5UruVjJdyZ8zkdlKevDArMS1rLEl5ani+ArX4saWJE1ejL4osHXBiYM4fMU2N8zZiwHODxYbfj+AZg+cw8hKXGHD7wVoEt4XdaR3lT36O0SZjnyHtTe+VN9IxQUORPgSzenBZY79SV8Lm/eJ9Q5G+BHhKGmxP2QQGifUOQjhO2FnhPW6Z9k7hzL4jDzSxQl/wTZZjlIexMFJx+Z0UcIdUZ9GUc7VXPsG607rRfS4exORrqJXjLBBM0NzEOlbhRz71Dge+O4juiN4MimP3t6EybATdTuKbq79nMB0JdphPTpFCMuIbAO6u9jPmaM3TPcZ26OcRVgmEj4ZIYxdp4wkfavoEaEp9M5PJhxKJGqZIw7NfhfrwHQZIMLn6HNANzTKyYSHCJN18AcpCZ/9WzSDjVHqXiA+R2u9BfwRO5kw/9CoMsIlNVX02TfC/gy7jR4YKe4NQ1GWRFh7nwvNjkH66DnW4L6ixzvmSdRvBWHZyNActYgvU3IbWNtqFWEeYakx2gGENnrSFveEDnv/SvgNjgtqxPfqmRr2QdH7xZ4NdCzZ81ufwrEJEziZ94rOUvxvEvSufAptIMyxxIHRBsI8B9cIy2D2G3F4dY5NmObtx+qZ5vM3RS+lUwgGCThmlJb5slFs8B3Uo6LT+mWJTiEd0hIPvnT1FD2+dM1E/ezUsovdoaWWC6WBEteIewGRmsCfnCQTtqKMdkZTJkOkwWe/iyZZo9SVJyDjgJ5jpD6JsiTCKdvDO8Sh2acdUx/hTcgAzdTTKHo8FshMLPsAwCJ8ANBDGCH7IUhX1tJOeQAw9pQnE9YwYXVoLnYCurvYJ7K8k0PnWrFIX+wQj7u7g+5uufaJrAxomtv/t0M8ghEf0+6PcuzLIBUiS7r8VCa0iypCmECuzEfjwaOTa5+C2RTxi3mLsCvXKH7V0kc4cu9rP+WbNqBbnDCwvWbXEZXfOzmUQV98K5YPHIQwYSJsLZA+CqkYCJsPCXVO9kL8BnkjW+NghAkyUXEo96sgWoKo4yjjGmTUCxIu0bC2obFtpAOAn6wwp+dOBT32/O/8zGI7wp7LD9Msmu7cqwsc/MHmnKSRiZkzJ61e2PUR3wOfkkwhVom/Ihfs/hhYW7gAAAAASUVORK5CYII=',
  'BarcodeField': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAwCAYAAABNPhkJAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAE3SURBVHgB7ZrRkcIgEIZ/U4HXQa6yWMJdBeEs7LwKTivQThJhNAaQJfjk5Ge/mVWy2Qx8Qp5cYGZro7dxsDFm4mKjxfv5xG0tubX+2+hSD7cFD/th8H4Mytd7RrRJr8iuaYdjaXeKscPz7m2xfpzDNxIn8+glvsCHwez3C4S/AMPOxnxg9hs298HEBnw4p+E+HhtUhgoL9Lgd/V7IS7FUPyRqTCYvzZOqT1L6Dks1I8rmyNW7XOPVDgt5ZNbYCPPrO1wNKsyOCrOjwuyoMDsqzI4Ks6PC7KgwOyrMjgqzo8LsqDA7KizwE31DuMbC/VT93huPXo2Ul9ijAP1DnJ3qhRmbWgInJ/znXTO2LXXe+OQ+DML2ASfN0phmELZFdNONC+poPXzQorLm0okdwlbEte/wAVHv6BUabdIycYFZ9gAAAABJRU5ErkJggg==',
  'CalculatedField': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAwCAYAAABNPhkJAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHASURBVHgB7ZqNbcIwEIVfUAegnSAjtJN0hDACnYBM0J8ROkIXIExQmIB0gsIEpL7KIbYTR4kSCfvsT3rI2Ce4F/xzQQEalkIboUKoYqJvoQwdpEKlY8nOqaP0eKV0ONk5TdMsxsoYyOsBzyEPL2h7w17pWIMfORp/W0C/Ahx+WZN7NP4ugG7YZCN0gttrUxXl+mp4SIYafrth4lOV2wwnhtFEadPV8nWKU+4Psk2eLrJd9RlW+89CB7jNI5ofiHJfyLZmuH7pmtJqfwG3IVOUo7ZWlbFr/wKBEQ1zJxrmTnCGgzuHg6u0+qb0B/zls2/QVmkR7/Dvbik3PAy+eeDC4CnNkmiYO3cjYumIymT7S+jHg5hO+nbpGjrU1d36JPumxvx2xDzNFFMz+D8tlT3aR0AxU8zWSG6OGKvhocdS1fNhU2NsZeCUGPP7Rx9Lu46+g+MxVoJaw2MqrVToWbapVj17EEMMvlviQtilZSw8LMTCA7HwiIXHrWOsxMLDQopYeHhB7xpegh+aJzK8U96vwY9Maf9vbDn0jYtMc3kwLYdedGT1QIn2Qc5NR/VqpMxNtx4urVmhu2zzVQWMZ0f/ABPkN/0oz3m6AAAAAElFTkSuQmCC',
  'ChoiceField': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAwCAYAAABNPhkJAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALuSURBVHgB7VrtcdNAEH1m+I+pANEBUIFDBUADMjTARwMRFZChgBA3QKjAdgUhFUSuIIQG4tyL5HjvrI+VJXt057yZNyPp7jT7dKe9vb0D1hgaHhvODJeB8MIwRgEiw7RnxnbJq1zjA9IeG9ulaI5ijJ2CZFXgOajhKza14a948AXhIcFa33SQX6zw3PAG/Qd7711JGe3/I+6p6Tq/XrqCB+I6MhxhP3CNrAJtpPd9VVJOPd8MT0T9W1FmjXGJFPt1Kgn0SCrew96UH2Mgym6rBP8DtjZ+G/5AMyQo9sSRU88SXDek6cSeYfe4NJyguf84MjxFZuvM8EPBO9RD2hdEhp8rytU9HAqsHn6CA8NT597XYa3GwfXwwQ/p0J3WYw/7higng41LbSMfA48RNlNRDCvjgrrqWLqveI/yeJyCjp36jSKtIXab/bhBs/j5peEUmwsECep5azjP79WxNBfY+1gxxdDjo/KdU9FGPaRT6I1uw2voQMPPt3inJbhqWupjIu+/sl6p7VWCv2M/+Kmsxx5aKOuWTlF1TmuEagfRFgusnYsGdFpXNXWoh//6JL/3PgHg5ppdXjj1vZ+HCaaeUmyKZV7M/X+DyXhQ2MjwBTJnxjRv0ZxuDemDS/H4vHgYIQuOmFVlD3PLaKJp6Ns/zB7jv1rksGrz0oBfgl2xM2RbKjICe9gWFW1UTouNYpTv4TTBHMrhVgMm3ldxMgOjRJS9zsuGTpl6Hj5DtzHzOdqBhp9gc3EgkWDdy7Kdakgvd8A2oOFn+XtOS+ocSWGinWrxMEe3UKdgFIhqnpeuses2036hm1h6gSy+XaAdmO34jczmN7A/Ije+GVZGyOz+lD/3Opam8SkyW5mcSJDNx2PxnOIip4230xLBFdNKnEsKcs+pBLF4iJA5MNnbMxQf0agUHMJxJRf8ty0vPReFIR5bisX1vZNLYPcyRYdyMC2BPZzjVUGZEwiJVmooClx00SrqHmPYRxF95wzO2dE7axwdBt0udGkAAAAASUVORK5CYII=',
  'ClassificationField': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAwCAYAAABNPhkJAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALJSURBVHgB7VqLddMwFL1wGKBMULEBbBBggTJBwgQUFohYgN8ASVighQWaTNAyQcwEpBMk6NV2LcmyrUqyrej0nnMTW7IV3ej56T1ZQIUTwbngWvCQCK8FpzCACWaRdTYkt4XGe2QRdzakaLJizLQKXlYcOUjDR9S14UYqOEd64Kj0XQHqP5DCyOp4jkrfHlAFHzNeIZ9haBRfSuVPkKDgF1Ad71aqS04wCZLFEv9p9feCn1k0yDAMbguaQCO4QO5jfgl+LspJzBfU+/gDLWga4YngDsPOlReoO04StYJqlvOi7tzQxsJwv5VJZwGF2HKP+tRIHb40XPsVLcEFHAQfRiJHHeSBu6yNnltmuDdqwU2d7hJNQqYN9ymCyxO5UhZc4j2GATmk25Z6Ek3zrG625MR4wz2kaV8cH8qPrhGOCfpIX3Vc72TSsYEJLmGX6ByNYIYwiF4wdXAJO3O1bS8qwbpJcul3r+GPB4eWhBn8QJ73j+BfrTwTPEXuZYnvUEVR1MHv6AE2IxyCN1r7TKunyEn2vhxhMFrgkRk6wxuuvUA4OJn0Cv4wmScvvudSGf0xn9AjbEa4b3B0h5auiHZamqASS0s0S8Ez+CP6eZiS/dJ5beGPqATPBL+hGllaYcyk313AH07Z0gb+WAn+lM4p4NgVxyTyLfLlmjOp7A3qc/dD4ZQtheBOa/8E6mjKc3BI5zXaPHxp6AxDfSmpLZl3gZNJv4YfytDSBHJSlCSw4rwtmXdBlAsAJHqNPLwswRAGj+nh2IKjTA8n8MfGUEYO6xSJpodrrX2m1Y+eHvbxmkUHb7hulPSQ1qI/IBx+G8p48T2XyjKMlB4OCY7wEVYJa5MeGhP082rWOtJKBUqk9VSrTHFTi6KJBG+k8xS3LU2l47t4nkN9jkl0KhvTOAxZmJ6XpkpluYglLrq2ubTEDOpWxGPnGtor1f8EOtDbKYmWRgAAAABJRU5ErkJggg==',
  'DateTimeField': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAxCAYAAACGYsqsAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMFSURBVHgB7ZrtdZswFIZf9/R/vUHxBj5doCQLNBuEZAJvUNoFnC4QM0F/dADjCWpngeAJak8QVzeIE3ERAgnhutjPOfeED0nWy726QiLAmTHSXBsLm2IYbKVpIZGpsMPAbCks4GJvhO1OtMM+7EVqfA3pQNgaeSgXbITt2UMJoWcLQ9gcsY2mPpNDP9FBgrcnkUHjfkmEahSkKD+oJiLoQ86mjVjTxs+ashPkmopyc/IwebdIUlfCVqgnQP7UPgh7aih7Km2QpqU8zkjwQbk5wvAgTS/y+PAOZ8ZF8NC5CB4679n5AgOHT0tD5/ymJR7SdxgeFMWP6snlTWvInP0Y9skY5WXfHm/rVX7Phi06oq4rfREgX3aqbc+U+w9w37mw3W8bsfreBddtF31RyqRwF2wbGb0KnqO+s6FSbg03wb9hT0mwrzEcIH8tDQ1lNsrxD2GfYYY8eaOcH2S9znT1MG2hZDB7Zgc7yCs8Wp7hhveQ3mk6lrBra9gxQXXsBnCjJNjHPKyGWSrsGvnmmsoe7aEOLtm1BB6mo4KuHqaxRuEXK9dS1u4D2jNDNWICuNP7tETwMT1rWY/vI1MHb9GNowg2zcGmjiXwk6h4u70KDmCeg+u4g79EpdK74BBVwU1vR9QpPgwe4YejvFpywU3E8JuoVHp501LhL/ebhvKUqL4q59Sxb7Cbhkwf8SubGr49nLA2U0PZ4mOea6KawG4h8tyHhz+y8ydD2Qhlz1CnrtEOEkuLCZvV06r4EZ8e5h6La8oFcE9UuiTXZK9Z34eHr9j51FCGfnglj2OUExMJ+I52RLBLavS795B5oYuHp7B7yqmsF6L69G/RjhHsxi21HakNdBEcwk7wQtbL4J6obARXxHYNaUoYmUX5jdKBrfxL9e9hR9CiTBHGie6Gq4f/BW0SVsWzKkMTbBRLqDsWrnvFx8QkuFEsoSaAOU7/+1Kd4FZiqXKI8utfIuwX7LZlbOkyfKjP9I9oY9aeNkHVsYDd9HJK1sqzOmJZ+X8S+wflvetG/gK+E5Rsw696EgAAAABJRU5ErkJggg==',
  'HyperlinkField': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAwCAYAAABNPhkJAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMFSURBVHgB7VqLddMwFL3hMACdoM4EDRuYLkBhAQcWaJmgngC6QZMFCF2gMQtAWYCEBUonSKpby7Ukf6UmPonie849lW3VT1fvWX5PMZDjjeCl4Fxw7Ql/CUYoQSC42LHBbpJ/pcZnLHZ4sJsUzSjG2LgQZxf2HNTwBUVt+K2cuIB/iJHruwX0GfDBsyaOkOtbDWQjwwD+gZpWsr1+hQNDL9h39IJ9Ry/Yd7yGHZiYRIIjGMm4gT+CPwQTuCEUPBM8RnUy9CBt/BRcwgJqplWHc8H/sEvYZ6ifGBND2JenC9SnxAOl71MC0kbwpeUgzAEFaCd24WhjJcfYKLhNajkWvFaOl4JXSMO2DAxBhmOknLsTfItq0K5Zs04Eb5CGbhlOkHo2+x/q+Ig0zM17r5Q+jR5WZ50h2rbAGBn3jmr6foLurRDtQDET6DVvWZ/WHg6RPlPEUvAdigsE+3C2j1DEe6TCCXr5BuXgZASKnWlFvwTFhZB2s+KeWk6NPlYejpVr18Y1GpjD/dl25XfoUaZ6mcLMBUzzsM1r6Z9xzAkIZZvee8B2QZGMlg+yfSrPU8hStgdoeORs38MZQqQLE8FtlCt0A9r6Ku2TCSzhmmmF8i8925VYSFt3sj2CA1wFbzt8m9AYulVwFazOcpcbf+fIX3cJHOD6DCeSoeA3pK+VrhYtwjlPbxKsijg2rnG15Ep9BsfnyRF8FX5WjhnegWzT87UTb5N48EZDFG8YojozaptQtElQWLgwnU2M8xzTrbTz4sQjM1SVfNQhhFtqeY/2EcMsa4YNppbEGC8vHvg/Q1SDdvlLnyp0AvvigRM3Lbm3lYeJGO6p4ALbLw/XcoxlcKqHiQuHAc1bis1A0TNLG/ew2ACw/aklQPpscpGp23ph3u386kCeup7U9FkiXeCmqF+ZtZC2FbyP6H9bOij0gn1HL9h3HLxgp12EHYemiYIT5bjL3YuuECntp52aGHpuStG+fJgWQy8couyCbVGwj9Rq5cBz0YWPSzOMoX+KuO+cw/h29BHnsrboC0JnrQAAAABJRU5ErkJggg==',
  'Label': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAwCAYAAABNPhkJAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMKSURBVHgB5ZqPddowEMa/dgI6Qd0N6AZuFkg7Qdgg3QBvECYIvC7QThB3AzpBnS4A6QJJfA8pfD7kf1jyA/G9p8TI6KyfT5JPZ4C9JmWZlyUvy0tkpTBsb0pM5al3fGjJ3hngwkDHrq38mUHdBeyGdyz6jD3bs1SsqeI74pLAilct3z1Q9W5snmXYvzDTloFjUS0sEB9wIywQF3ArLBAPcCdYIA7gzrBAeOCv2IWrUu7gX71ggfDAC7K/hF/1hn2P8PpIx//gTwL7gH3sUJTlqiyPbQ1Dezgn+zP4UW/PskIDc8dSDNcgWCA8MNtPMEyDYXWHfGvq0b4XWBzZIc6OcCdk57WkjqR0rqD2qWr7gObOe4MF+gPP1cVdxW4zZ1SXm7q7mjabGgivsEB34AmqK650Qrx5ix0Yd+ratMmo7hd2N4vb5ur69+qa3mGB7sDcubXjwmwnNXUrVIe0bWufnZJi4sBkQ/aCwOqO1mmuOq4TBYmyY89rD7rafqHzz8bWJ1STit5ggXbgBO2PlrTGTtGh7QdUgWVl/4ZAsF1Cy4yOV3CHbuy1P3ScdGj71GLPu9o8zF5Ka76T4XA1TuCe11o6qyiw4vUg8xdoBp7APTe1OPO5MHUpqit6nfTwtQqyaLUN6SkdP8E9/KaO74nqhjlLVulr+vybjuUmXpE9WcjaApRW+dge6lz22vznm/C/pm1SlhtzLF784bDlHbppSKdoHtK3OIyYUnOOn68Lh23x7gru4aw1Wmip5zCnaG6wf7bywpaY8zmqgYq+WRkOn79NGm3z4Aoe7CK1xeFqbLV2tPuJXUipY/EM3TTK9lBv8XjllQQdj4I1tdtS3arGhni27/usURIAAm09LRdbqIsszHk7V+1GQwrvnKzXxdtLVBe2PjrpFE8oHQ19rsCio6DPGVh0con4MXRSr1rG0kW9TLO6qNelVhf1Qtyq808eLuJHLTn6x7TnIg0tW8vKrkWKhIIxeZqzohvZkwqcK88cowrJeEg2Qe7CI+KXzqhUdjQxFZnHmQC+AjQErtzT/3CoAAAAAElFTkSuQmCC',
  'MultiChoice': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAwCAYAAABNPhkJAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJ/SURBVHgB7VrtUQIxEH04/hc7ODqwBKlAxgagA9EGPBtQbAC1AcYKOG0ArIAbG1ArALMjJ5uQhOQ4GBJ4M2/mjuTCvtt87OYCLFAXvBXMBGeRcCTYhgaJYL5jxlbJyVzjP/IdNrZK0dSL0VEK0qIgcJCGayxrw5j90EV8SLHQN6zNLwqcCv5g90HeaxnKyP5Xdk+avubXM1VwjV0ngufYDlQjbSAbafY9M5STnhvBHqs/ZWVSH+fIsd1JJYU7Uks75E3+MmqsbGoT/A2UNr4MH+CHFPqZOFHqSYJXdWmaxE6weXwIvsB//mgK9vFnayZ4qWnDuUuHgkTwylLu7OFYIHn4CHuGY+U+1G7tjL3z8N536dgnrYOHQ0UieCH4CYeYPPTAo4FFGExdt62UO8fSIYBSvxyyhr5SJzjBlPtS6Kjz3DNk+9fyMKVY6turmjnMeW1hLLdhhMX2U6ppr29ow0nwpsVyESY0DPWb0KeG9XUEbysfnsIMMjZzaIOS/sTShpPgnqfhZbkq8Scv57C/sJblea/0kBqyjbF1QYm/y14WiR5C78U72LeHgt0A0Hl64PBc0OswF23yuIqoAo8CNDt3oB9+0QnmXtdNYFEJVgMTojW0DCE9tIWW95DHMYl6xwqYPEzjIUM1a+0Y5ZY31YPce13N/wwMbTh16RzViOWifaELLZ8Mv+u+OngJnm2AvtCNUR13MrTsoRxcQkvbd22v0LIDt8V9FSgReUR5HELLOUcOz0UTWpomKRVRBB6JR93D10OOGI4rqZA0keA3dh/jsaU2u6YNh6XdPxIdy8G0FPKE1S4KbAt7LJzwt5FELtq4hHUgH0UMnRmUs6O/VyOIqzsfwvoAAAAASUVORK5CYII=',
  'Numeric': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAwCAYAAABNPhkJAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMVSURBVHgB7VqBddMwEP3hMUCYALGBRzATFCZwOkHDBDEMQMsCTZigZYE4LJB0giYskIQFUnxYJvJZkmVHQKrkv3evtvXP0pfO0kkNsEc/t1FuWW5Pgdg8twQaiNyWR9ZYn/YoNf7B8ogb61M0RTEGrCAtC545SMMH1LVhoTwYIjyk2OubAtUeCGFkOV5hr2/XkxcleggPpGknr59e4MRwFhw6zoJDx8kJfonDUG44Ink/ye2rhR+jSOYj6bvNbZXbfYMfca+kX1nXStpH+dcZauLRBgL1HPzCwI3RnK/PwRJ8CerQjcVvJzkm9Bi3k+DE0IjYwHVN8KesoWNHv52h7vI9Bwm+tlQsGJfu1Y5ZoghNIe2SlasNT9m772QZhXekKZ/Cs2CB+uHApsF/wsQKDec96juaN5pnOiFqe9bQo5PgCPVv8AZFr5f3C+YjGD8xvFsn7gbVfawJKRejQUWw6yy9xX506JpGZYaqyK3Gh7ab1Fk/YJ6FdTu0e+n/OrcvBr8e832AI1xDOkUxokJ5pob0GN1wCbfJh4MEq1F3a+F1+oY5+mj+zppAjVEPIB4d/WiPO2Z+wlKHF8ER871AewxZYxIL9x2KbztDNbJodhYWP2+CYzSvwTbwDru2cPmM3CaqvAkewr4G20Bi1VGaN/B56KtmC+fS14vgtKMvhS2f7FzP0ogXo7q+l2FtgjfB6hq8dPS5YvV1ndlJhLpWk5C+hetFcKb4ZQ78EQ6f1VWoGRoJiQw8b4LbrME8/04t3FiWJ7Djnwt2EUBhdse4tsN+dSJcwx6mEzAhFu7BgvmSMtBwBKoz68bAU/GWvfezgTdgvFvLOzvl0hy851fsXqD4roXyrDyZiOEOGvGfuX1DkVtTvZSAjBQOdeQntIDLCGfQr4H/29ayA2zoFNKLv9TgQ4zW3gjN6BTSD2ix/fIMgerW9DuK7eMMHXD+Z1roOAsOHWfBoePkBYf4o5aKJhI8U+6HCA+Jcv07eUpR376F8sO0FNU8OikLlji+XNm3Vc68ReCijSebAxznzqirZWC/Hf0FBsBNjRV4DWUAAAAASUVORK5CYII=',
  'PhotoField': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAwCAYAAABNPhkJAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANZSURBVHgB3ZqPddowEMY/OkGYIEoXKBuUTlA6Ac4EpRPgCZpMUOgCTSco6QI0XQAzQekESXUgPU6yaSTrBA6/9y7PYMu+jzud/jiAHBfaptp+aXsSsqW2sbl3p1DaKsgJ9W1lntEJFPKK5aI7Eekp9k5ttE0g4xjd49rc096/RCI9pEPRVea40PbVO6/M9yHMta297z5o+8ae9RonhqddEzHpvmpo32PnHyGIrbILhDvYdbNVvobCcQrPqaxW5asOOyspeltMC+9EiQ4O9C0gDZ9Q1+bMjCY4P0rs9f0A3F/gHCLr08de37bKc8Ep0I811HaLXdbwCQMdL7TNtI0ggx1VKvOMynz2g1Yb1lIF2wdvEF5ArHMK7aCo2a64gVt0l3BFiwr+iDihTZVzjHhK055mYFbclbY7sOJkEBN8g7oAEk8pTWmrmDMD890czUPgZ4TTM/f4g3qG9I0PK+/6ZMEz1FM0JlIF6sK/BLa1ApYHzlGqPzZc31qwH1lKozbVXWGfgjGR5hH2n0tpLRrhAg0DeSKl51DIXMC2oaywoimdZxDswwpuGt5Bhh7cSDdFzsev0nwYFKvSU7h9VkEOW2xiMufCXFcxn0oIjsM8umPIc424KIfSSvAIbnRzQI5tmGNDyOAIfhXYiE8H75EPuz1ETr5HBkIFX7Lj78gDReAn+/w2sF2JXUZMA68PSmleUAbIxxXcfvwcIftdrfpwaGFLpbaUe4ZowaEpzcm5Zv6LzIQK5o7kFDw48EwxQgWv2fEb5EOx4wdkIFQwr57vkAd/KPqNTIQUpCHcNW8O7CrIFqCQcThblaZ+y4emMeThU8tVYJtsgokSbpQlixeNv3yuXga2yyrYj3Ku5WHMy++sgomJd/0U6ZSeQ7HdpcT/syJ5i+fWa0PRUYinj/oWzw3kEdnEm3vtKsRv4vnbuzPkQWyb1o+0FU6O03LSzpqo7yvzHbVp2sfOEVmL6EZ8gbRXrbQiyv0CT1QwoeDuLYXYBsd7LesIth/4yRRGxi6xS2kriBYCa+ymqLSB8IAjrIwMpMkOWU/2j7Vj/OLHxllj0+Lhnp3M3Z9OwZgdb1dgJdwoS/1j2amx+9a1SQ2dSKm0L8WcBYk6c9EH5+cFZP/999S2gDf8/QMiFobSGuK5IgAAAABJRU5ErkJggg==',
  'RecordLinkField': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAwCAYAAABNPhkJAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMPSURBVHgB7ZrtcRMxEIZfZ/hPUkFEBZgODgpgAg3ENACBAvDRAExoACoA0gC+DhIacJwKHBpw0CLJrMWdvk7n5C5+ZnZ8H8pK72lvtboJsD32pU2lzaTdtLSl9nOEO4qQdon2Qm1bQT3EO0cXYluL5iG37HCApe4rlREyiBbodhaMnaA9I2SY6W2IJWszs4YRWob3BHlDzob7zoFLcJDoc+QNOZttC/aKzh1yLv85CBHsFJ17QF37J8Ghq0it6D4KniE8Uf4num+CiVeIWx02RPdRcOwsG9FFVwPidOX/QNpXxIn+aTKeYYT8dO3/SNshVMVYh7m+HIJgH9TnSh/f7OGece8EPwhoQ9XXOKDdQlsOxgir+iok4MqiU8RlwWmkf5tHiNu5zdGcqAy8FF25ktZE2hdpp9J+wA9lyjf694xdD01adG+u27+Tdg03tCx9hHpAzzx+g5JWoTulHdQF3Cx0O2qf+mFNQC0tn6EesE/wd922gH+W1/jeYdNpaZ1z6F17CFXu+QYZAvmg0KboOmto81zaSyT0F5K0CBJVoj4pCeT/ckhhfY5/D5pDIXqIREIFc+ysLfS1Qv+a4zqarhM0qyPtj9od1LSv0JIUwaX+5eH0C2pwp/q8YPc+sOMCbkxbwXwaTBhfoQWpM1wi35obQqsw5uwqrUDMErRNHufoM/UdFuycQvxEX6el5Aqb2XXGjp+iGUpS36DyQAVVxPD336zNrXZcKYIX2Hx/BVS1U+lzfmzTdJ2gLE3L0YW2S2TIyjYxgpvCmGb4N/JCs/gE9eswkRzeoYJLuMs3U3rm+q5Ns/vWcd+Et+kvWPyex6mQ9gn+WnWs29EAKqSxgHr/38O/XlM/L6S91n8XNduu7VuJuO1hGenf5la3hwaBsN0IhXXdkw7dHnKKgDbX8O/iTJ/r7eHuI97Q2QkeOjvBQ8cWnKtSaqJr/94+SXDFzrv4Hw++Vk6wfY7Z8d+xlNisXkh0zpkoO/bfxL7VN63Fx+ZGTDnXV5uDPWgxcNGNNfcEm/+31Xcz37bXM/sH40SQuGYfj44AAAAASUVORK5CYII=',
  'Repeatable': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAwCAYAAABNPhkJAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAG1SURBVHgB7ZqNcYIwGIbf9jqAnaCM4AhuAnaBdgOYoCPYdhHpBu0EOoKdQE0OciYcQr78eEnMc/epQIA8JCSECNyOBYuaRcviZBmH/jglAqVgsYe96Fh8IEB8yYrYICAqqJlr0FVvUx4QuPQvLpl6hz3XhIORljNkU7KCKeEgpOXMuGBOeFL6CXbwEluyWCEs1v33Kxzyhq4/pLSmLtApYefVuwZN1LUw5UJvhjtTKdD1q4J/Ft/99xi15fmG8GNsQbuNPmFRvb9wuXq8y5lreV2XMGcNeu0yfiKTq9NSI70PYV7KLWjCRxg2rlQBH8KcZ6i1TSe2JveUnHGd/anpqazQPb6+oGtfxhDrD/JKk+GbDr5KWBe5GzuKlQXMRjQ6BClsIhutcAU1Uw2mu5rohanDt+iF5QzpDN+iFhYL8sY5fKd3DT+naKxOj7gzsnDqZOHUycKpk4VTJwunThZOnSycOlk4dbJw6ty9MPVPJ77Tu0A5Jxf+kZZ13kv7Tu+aUvr9xz8aqO+OeaamSsJ3elcsBufmr2pLsWEPs7mlmGInX40icekdrswdV1DnmmKPFoPJwTOUvvxzmNMLagAAAABJRU5ErkJggg==',
  'Section': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAwCAYAAABNPhkJAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAENSURBVHgB7ZrdDYIwFIUPToAbMIMLwQg6gUwmTiBOIJuAvbFAaXiEW3K8X3JICQ/Nx0+5SS8wk7vcXRqXYce0LiUSU7h02Fc0TufnTYK2bCidQ5kKaWTH1FCmRVrhBxTJ/KQpkflPUEJtoqNgwuwcQXhcR/bICytFzvAH+cAXOUdYpbXoXC4yCO8EE1LB3bBS5LAKj9SIihx24TNmvz7+hjPwIU69Hw/2H2bHhNkxYXZMmB0TZseE2TFhdkyYHRNmx4TZMWF2TJgdE2YnFlbvmVJg4STCz+D8Cj7KYPyWQ43lDqJIMzxpcagR7BzCy8uFDsdsVdi67WGiIJeeejxiKqRvRdwyDX6v9fSJfgFmc7CzQCgivQAAAABJRU5ErkJggg==',
  'SignatureField': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAwCAYAAABNPhkJAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOASURBVHgB3ZrxddMwEIe/MgHdQJ2AdgNvQJnA3oAwQTQB7QbpBA0TYFigeSxQMwFlAiD3khD5JFl2bDVNf+/pH0uW7rNOupNt2OvtuszXpV6Xv6+kPKxLSUBmXZoXZuyU5XHL+F/NCzZ2SmjxYipVsdpVnLiE4RNtNisVK/ynIdcMr0OWPddXiLvA07rMOH2ds2f6Ixee6Pb9OaetMxRwTXrBl5yuPOBL0sDiBYbTlAcsqki7ds3xJcbfsLdpQXoigsDQL/k4ZrgSwxeQTioC9wWBIQ19zF3b0p1UmMh9ncDQDb3gOLL4CYROKn6x2Y+0ksCigpezjmfKhhun7or23iNApbq/F7Co5vjAH9T4D4E2F7Q9UqDcme4NXHBc4NDsxfYQF1q3awG/Ia6fgWs/eB4JwD3tqCCGfyZj5ieDHWOX1i7a4LusC32u6mXzMk79KJcuyKuY8fIQ9KlOZvtMXRega9Vnb2C9Oz6RV2JYTdx4eRhLZZOe+Vmk317AuvMF+aRTRndXNqrdLeGQaTv6TgKH1u978sniGy8hSbxKZ1HaE7pgd+2TwBW+6+SSJW781XZsF1ovtZTn9QKuB3Z6qKoe4+x2bZlti+/yKfXKpbU7G6bXFb7xsdOYDlVSHul3eksC36mOvzC9DO0sKnXE08Cp9q6SwPpJFkwrwzDjx8CKOoEr8m5Whu6sSCuUiFwyTJ3AenZLppOsN50VXSYMXar2FcMVBb4m7+zqRKai20idiFgOUxS4Jl8oGmq8ZRpYURDYkC8UzRkHe8M4BYHv1CArppGGvU20r1T7e8YrCNyogaY495aqz2Wi/ZBEZIg84ALfnYdu/VoG/8V+09HvBcMSkSHygK0ybIpzr5vgC6gbjkrVdmxikVLyY9oU69ftU46V4ppuWJpv22nYVCJyiDxg/eqkZpz0Wdo4de7hfc6wRORQecB6/Y4FdhOYkLfYwJiHZlF9lARuGKc70mFILyNLPnnADT50weFaRfrZ/Qeml5Alrzzg0EuxQ93a4O/2BZsNK/T9eWwW1UcesAkYsksUhgb+ijZwE+l797rmOeT91CKaRQwTg0v6gy8j/bie85Hn/bDusrXegVm6jV1ujS2Ih4+Q28q1W/J/tdCSh2ppz26pGxle18+lbnmkQwWb8JL60eWUYI2AnZFWsS3vtjflyIZy6du6fGezpH7LhX9QYasj7G9yogAAAABJRU5ErkJggg==',
  'TextField': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAwCAYAAABNPhkJAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMiSURBVHgB7VqBddowEP30dYBkA2WCZoO6GyQT4A2STlB1gZYJCl2goQvEmSC0C9R0gYYuAPElUjifJRtkwETw37uHke5O962zThYAS5wU8qmQrJBFJHJfSB8OqELyPQt2k/LHcHxBvsfBbpI0ZTFS0aFtxysHcfiIKjdMWMM14oPGkt8tUL4DMcysxCmW/OY9c2HRQ3wgTnNzvXiDA8ORcOw4OMJvsRvQ6s9LnkaH4GVpW0jYGA/YLXps7PmuUprX9yk6xK4In7Prv+gQxxneEt6x6yk6RBcznKNDtC1LSSHv8fyMWlKzQn4XMi7kl2lTzMY+w6R/xWynhXxGfQZIG5ixBlgjc0LKkkLzUVDGgpRvZBRw7rChTX7iGI9Ky1fUv9yfe2LtCf9rE+7juZbyujo0wkmMjX4idBWzz4UvG7wMeCh0Hhy299gC4QvUn47ciD5pwwNNmZ2Gf5Z1w5i0gyOyCm4EE1Yo39HUoZOhenpyjWoKXgi7U+Z7znyfiWBDTmSCCY9QnT0JfkMS0zYQYwzhDmoi/PfEmLcIQxBhxXRy+NOH+7KLyI1oV56geHZoR6B9hCFoL81T6Q7uEiBXSVuS+PM2gr98WL2F0UlE/09sAKsS5julsUeHE5552r/DD643dXyfYUNYJaVdz6ZEjmoNlv59p6IfmM4/06bR/vklBKV00/FtivKz+d98yjSfeQLiz+dY+AD8a0YQVplhrpOKPoXqrmlg+hLWNvH45rM7x5LcpWj33fSmyQhapX3pSoPZcsLT3i5yKcqruwzuTPj+xvpOhc8vqOLS6PyAH0GEtdAjkkMWEM0oLz+Jxy43uqn55IRefuyqGZfGvDKSNdi2InyC6p7Xysjo8ABcNXjksbcBK8e4NMt5jZ1d0OrSutXWkg9ON4DXZ76FtAGMjE1mvqcOHxr1AVPfAFXi5LOPZrR+W6IAFNpBIcyHHbtpoeIoET7+mBY7joRjx5Fw7Dh4wuvUt9eCEicifMe+hxyS7Tv4buzpFEajvNsi0rH8MU0D1XMx6mjaoMcgpQN+FTlp39vY09vMZA8DDpUM4m3sETGD70kmB4QLAAAAAElFTkSuQmCC',
  'TimeField': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAwCAYAAABNPhkJAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMhSURBVHgB7Vr/ddMwEP7M43/CBsoElA3MAjQsQNwJCCyAmQDKALyUAUhZIDYLULoA9gTQCdrqKqmSf8WSYzexmu+9e1akO0efdT6dZAEaEy4fuSRcbjyR31zmqAHjku1ZZ/uUv5LjPbI97myfpMmLEZUaYtUwchCH96hyw4VRsYB/iKH5rYHiE/BhZMt4Ds3vOpAFhQD+gThdy/LNEzwyHAi34DPEK5BZ6iVwx8SwXxv15JpLtE8/8aabP4UdGJcVl6Oe9Jow5fJjC/tW2BAOIUhMetJrwisIsk32NHpLLmlNG4NIi0nnAi0w3aGM0Ggj91yh3qWb9JpcmkkbhTeG/Qo6N1jDDjF0NlVGYNz7LlpvIgzZ6ViWl2h+h+v06giHqCY6gdRdGGVbwgF0avytof2esI1L09O/6lHPfD9fc/kiO6PsXXOBEMJj6B5f25RtorQNCRe9c4j3MOfyoYO9CXo4c1nOufxpM7CN0n0ihwhQfYAC3DHE6H6yMRh74jGDjuq/bAzGTJjc+a0spxCe04oxE2bQEf/M1mgXhBnEPEsyQ3eoYEXBbq8JRxBTE8kc3WBG53MXw10QTo3yJbohhJ57vzvY7WRaSiF2ISi65nBHee5N4QAbwhH0FucLeaXOxrJMad1Zgx6r0SNcoZpomPbqOq2xV3Mv4Sc6wCaX3rT+TBz16hBY2Ku8+gR6IcDQDudc+tKy3VZvm3bqPHlPCpFG5nDEYRPPdxwI+46HIMwgppzQqJvU1CnMZNtgX0HapqVtsUR1WmKy7h+KxKZwm3Js4LyntS0y6E25UNYxVPeRzX3n0RKO5H1pofAfYv+KwKA3A9Uoq9FNMGLC1Hm1w0lkiTSRY/LPF7Iuhhhd0j3BgISHXDwwCBemnJmITKCDlVrSUdspl3dcnkGQHTSQDnlztbiPITbY6Gs8ETwu6Z3Kaw6HhXxXDDnCNGo5NCHCkaw3IzO59Et026Z1xiGX9h2PnrCPh1oKnIhwavz28djS3CjffXuKUUw+iLQvB9NiFLOsuWrIgNazE2OXwsdy5jnpyuFShQjFo4hjlwSls6O3HehiUHtPng0AAAAASUVORK5CYII=',
  'YesNoField': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAwCAYAAABNPhkJAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIPSURBVHgB7ZqNVcIwFIUvTqAb1E10A52A6AQ4AVnBDXQCnYDiAuAE1AnUCcBEKDSlAfLb15R7zuUUmpZ8TfPymhTY6VJ4LJwLrxLxTHiIBmXCBbHK+vRiw7hVQbiyPqHlXQxW28HLHR2XZHjCPhvmlR9GSE8cO74JoF6BFFq2rivs+JaDzUapAdKTZFputlcX6JnOwJYKmbRokwdbVU9uowxxxvG95OFEDSrn+O/LrsAxYPeSBwN5BWaIB6skDwbyCjwHsIrsCcykALuOwzYXyVXyP02CLflxeCr8IPwq/IsAcrmlQ/fP24YyS5jJax8O3TdlZetxwgmYyi1dCD8iktpu4W/oE4p7JHhL657Br9Gc1HQamGvOK59hC80xnQXOoa/gy4HjyAHLqHqDdb8cacoU0PdbjsMXihRwEwirlfmBWZAiDfyuKcdgH6RIA88PlGWwC1Lk+/AYZjoWpMgDm0JznA5LFvhU6DuYwZIGPgadwW56iHzi0QQt56VsYDsB3AT9ZnCsV+CYUzxT4S+s+63LGpb8T+spnvLDtoVz2LeUrWcwk9cJgA/Elaz0Mxzl0sIuwcfGC5jL+8pDhp4ttZRiCDMxn8PtNQyvUboLOi+I90p14BRfalGYJPC08j3F15aGle1P+cGhRkUJncqLaRzqkDQsdxQIP462bSVpyRKH1iYtDO2s6odyjlrS8gfYdlx6/GPaUAAAAABJRU5ErkJggg==',
  'VideoField': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAwCAYAAABNPhkJAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIHSURBVHgB7ZrhUcJAEIWfjgVgB5QiHWAFUIJWQCpArcCxAccKpAPoAKwArQC81ewQjltI7nJk74Y3836QWzL7seSS7B2wU894Yjwz3ir13HiEFtQ3XgHYJuJlmbO3UoKtVrsHD42tExW+J4osyukRh7kei58Yf5ee8sCicoIH6FeBXb6fQswA7n8tfXfvgMbK2rrFLt+NNUb5P0G+DNawDqSgK7iBXVUlwHs7PnVgqarv5djBD5QyMNlV1aEQnwWwq6pSfDbAdlWl+CyAXVWV4jf8oTqoXZQjz86U+3WT+BuE6a40TRxvSES+f+khDmfLEeJLug/XjvcFXsA9U8YG7wx4Bfn2EBNcLXAscPXAbYMnA9wWeHLAoeDJArOpP9UEPHlg9hT1lA3wGvUUBHzqOfScOkt7SRPwC86ky6RVU6HAdM36tIWTA6ameAH/azYZ4FBQSABN42MDtwXKUgvcNihLXQMgFiirM2C7xRMblBUEHNq17ON/ufXL+MP4B/EV1LUMBe5CQcCaHi19RDCvaLj9wfca7kqupZZjj6dZL6a5qp39cqld7ayAeUH8GXK1swNmDeCu9hhHgHPY1OKqNvuvjTSrHCigX/QOzfnOhRhp2xLtBdnb97QtT6h1Y1qB/eqOTsRTtXljWlEdcP0a2r1EgPqJQc/R8OlK0hjya58GzxD4RvYLG3N9SWnE1noAAAAASUVORK5CYII='
};

document.getElementById('elements').appendChild(parseElements(form.elements))

function formatDataName(input){
  if (input.length > 25) {
    return input.substring(0, 25) + '...';
  }
  return input;
}

function parseElements(elements) { // takes an elements array and turns it into a <ol>
  let ul = document.createElement('ul');
  for (let i=0; i<elements.length; i++) {
    ul.appendChild(parseElement(elements[i]));
  }
  return ul;
}

function getImage(element) {
  if (element.type == 'TextField' && element.numeric == true) {
    return images['Numeric'];
  } else if (element.type == 'ChoiceField' && element.multiple) {
    return images['MultiChoice'];
  } else {
    return images[element.type];
  }
}

function getType(element) {
  if (element.type == 'TextField' && element.numeric == true) {
    return `NumericField (${element.format})`;
  } else if (element.type == 'ChoiceField') {
    let type = element.multiple ? 'MultiChoiceField' : 'ChoiceField';
    if (element.choices) {
      type += ' (inline)'
    } else if (element.choice_list_id) {
      type += ' (pre-defined)'
    }
    return type;
  } else {
    return element.type;
  }
}

function getChoiceTable(element) {
  if (element.choices && element.choices.length > 0) {
    let table = `<h5>Labels & Values</h5><table>
      <tr>
        <th>Label</th>
        <th>Value</th>
      </tr>
    `;
    element.choices.forEach(choice => {
      table += `<tr>
        <td>${choice.label}</td>
        <td>${choice.value}</td>
      </tr>`;
    });
    table += '</table>';
    return table;
  }
}

function getRemoteChoiceTable(id) {
  let table = `<h5>Labels & Values</h5><table
    <tr>
      <th>Label</th>
      <th>Value</th>
    </tr>
  `;
  choiceLists.forEach(list => {
    if (list.id == id) {
      list.choices.forEach(choice => {
        table += `<tr>
          <td>${choice.label}</td>
          <td>${choice.value}</td>
        </tr>`;
      });
    }
  });
  table += '</table>';
  return table;
}

function getYesNoTable(element) {
  let table = `<h5>Labels & Values</h5><table
    <tr>
      <th>Label</th>
      <th>Value</th>
    </tr>
    <tr>
      <td>${element.positive.label}</td>
      <td>${element.positive.value}</td>
    </tr>
    <tr>
      <td>${element.negative.label}</td>
      <td>${element.negative.value}</td>
    </tr>
  `;
  if (element.neutral_enabled) {
    table += ` <tr>
      <td>${element.neutral.label}</td>
      <td>${element.neutral.value}</td>
    </tr>`;
  }
  table += '</table>';
  return table;
}

function getVizConditionsTable(element) {
  const conditions = element.visible_conditions;
  let table = `<h5>Visibility Conditions (${element.visible_conditions_type}, ${element.visible_conditions_behavior} data)</h5><table>
    <tr>
      <th>Field</th>
      <th>Operator</th>
      <th>Value</th>
    </tr>
  `;
  conditions.forEach(condition => {
    table += `<tr>
      <td>${getObjects(form, 'key', condition.field_key)[0].label}</td>
      <td>${condition.operator}</td>
      <td>${condition.value}</td>
    </tr>`;
  });
  table += '</table>';
  return table;
}

function getRequiredConditionsTable(element) {
  const conditions = element.required_conditions;
  let table = `<h5>Required Conditions (${element.required_conditions_type})</h5><table>
    <tr>
      <th>Field</th>
      <th>Operator</th>
      <th>Value</th>
    </tr>
  `;
  conditions.forEach(condition => {
    table += `<tr>
      <td>${getObjects(form, 'key', condition.field_key)[0].label}</td>
      <td>${condition.operator}</td>
      <td>${condition.value}</td>
    </tr>`;
  });
  table += '</table>';
  return table;
}

function getObjects(obj, key, val) {
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == 'object') {
      objects = objects.concat(getObjects(obj[i], key, val));
    } else
      //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
      if (i == key && obj[i] == val || i == key && val == '') { //
        objects.push(obj);
      } else if (obj[i] == val && key == '') {
      //only add if the object is not already in the array
      if (objects.lastIndexOf(obj) == -1) {
        objects.push(obj);
      }
    }
  }
  return objects;
}

function parseElement(element) { // takes an element object and turns it into a <li>
  let li = document.createElement('li');

  if (element.type == 'Section' || element.type == 'Repeatable') {
    li.innerHTML = `
      <span class='icon' style='background-image: url(${getImage(element)})'></span>
      <h3>${element.label}</h3>
      <div class='field-description'>${element.description ? element.description : ''}</div>
      <table>
        <tr>
          ${element.type == 'Repeatable' ? '<th>Data Name</th>' : ''}
          ${element.display ? '<th>Display</th>' : ''}
          ${element.type == 'Repeatable' ? '<th>Required</th>' : ''}
          ${element.type == 'Repeatable' ? '<th>Location Required</th>' : ''}
          ${element.required_conditions ? '<th>Req Rules</th>' : ''}
          <th>Hidden</th>
          ${element.min_length ? '<th>Min Count</th>' : ''}
          ${element.max_length ? '<th>Max Count</th>' : ''}
        </tr>
        <tr>
          ${element.type == 'Repeatable' ? '<td>' + element.data_name + '</td>' : ''}
          ${element.display ? '<td>' + element.display + '</td>' : ''}
          ${element.type == 'Repeatable' ? '<td>' + element.required + '</td>' : ''}
          ${element.type == 'Repeatable' ? '<td>' + element.geometry_required + '</td>' : ''}
          ${element.required_conditions ? '<td>' + element.required_conditions + '</td>' : ''}
          <td>${element.hidden}</td>
          ${element.min_length ? '<td>' + element.min_length + '</td>' : ''}
          ${element.max_length ? '<td>' + element.max_length + '</td>' : ''}
        </tr>
      </table>
    `;
  } else {
    li.innerHTML = `
      <span class='icon' style='background-image: url(${getImage(element)})'></span>
      <h4>${element.label}</h4>
      <div class='field-description'>${element.description ? element.description : ''}</div>
      <table>
        <tr>
          <th>Data Name</th>
          <th>Required</th>
          <th>Type</th>
          <th>Read-Only</th>
          <th>Hidden</th>
          ${element.default_value ? '<th>Default</th>' : ''}
          ${element.default_previous_value ? '<th>Previous Value</th>' : ''}
          ${element.min_length ? '<th>Min Length</th>' : ''}
          ${element.max_length ? '<th>Max Length</th>' : ''}
        </tr>
        <tr>
          <td>${formatDataName(element.data_name)}</td>
          <td>${element.required}</td>
          <td>${getType(element)}</td>
          <td>${element.disabled}</td>
          <td>${element.hidden}</td>
          ${element.default_value ? '<td>' + element.default_value + '</td>' : ''}
          ${element.default_previous_value ? '<td>' + element.default_previous_value + '</td>' : ''}
          ${element.min_length ? '<td>' + element.min_length + '</td>' : ''}
          ${element.max_length ? '<td>' + element.max_length + '</td>' : ''}
        </tr>
      </table>
      ${element.visible_conditions ? getVizConditionsTable(element) : ''}
      ${(element.required_conditions && element.required_conditions.length > 0) ? getRequiredConditionsTable(element) : ''}
      ${element.choices ? getChoiceTable(element) : ''}
      ${element.choice_list_id ? getRemoteChoiceTable(element.choice_list_id) : ''}
      ${element.type == 'YesNoField' ? getYesNoTable(element) : ''}
    `;
  }

  if (element.elements) {
    li.appendChild(parseElements(element.elements));
  }
  return li;
}
</script>
```
```Text HEADER
Leave Blank
```
```Text FOOTER
Leave Blank
```
```css STYLES
h1, h2, h3, h4, h5, h6 {
  margin: 0;
  padding: 0;
}

h5 {
  margin: 5px 0px;
}

.header {
  display: flex;
  align-items: center;
}

#form-image {
  height: 50px;
  padding-right: 10px;
}

ul {
  padding-inline-start: 20px;
  list-style-type: none;
}

li {
  border: 1px solid #d8d8d8;
  margin: 6px 0px;
  padding: 6px;
  background: #f7f7f7;
  /* page-break-inside: avoid; */
}

#elements {
  margin-top: 20px;
}

#elements ul:first-child {
  padding-inline-start: 0px;
}

#form-description {
  padding-top: 2px;
}

.field-description {
  font-size: 11px;
  font-style: italic;
  margin-top: 5px;
}

.bold {
  font-weight: bold;
}

.icon {
  width: 16px;
  height: 16px;
  display: block;
  float: left;
  background-repeat: no-repeat;
  background-size: contain;
  margin-right: 5px;
  opacity: 0.5;
}

table {
  margin-top: 5px;
  width: 100%;
}

table, th, td {
  border: 1px solid #d8d8d8;
  border-collapse: collapse;
  font-size: 10px;
  text-align: left;
}

th, td {
  padding: 4px;
}
```
```javascript SCRIPT
DATA.config.advanced = true;

const REPORT_CONFIG = {
  'hidden_fields': [],
  'field.empty_value': '',
  'header.enabled': true,
  'header.form.name': true,
  'header.record.id': true,
  'footer.enabled': true,
  'footer.timestamp': true,
  'footer.organization_image': true,
  'footer.organization_info': true,
  'footer.page_number': true,
  'cover_page.enabled': true,
  'cover_page.form.name': true,
  'cover_page.form.description': true,
  'cover_page.form.image': true,
  'cover_page.title': true,
  'cover_page.timestamp': true,
  'cover_page.image.enabled': true,
  'cover_page.image.caption': true,
  'cover_page.map.enabled': true,
  'cover_page.map.repeatables': true,
  'cover_page.map.type': 'roadmap',
  'cover_page.map.size': '360x400',
  'cover_page.metadata.enabled': true,
  'cover_page.metadata.created': true,
  'cover_page.metadata.updated': true,
  'cover_page.metadata.status': true,
  'cover_page.metadata.location': true,
  'cover_page.metadata.project': true,
  'cover_page.metadata.assigned': true
};

if (DATA.config.advanced) {
  DATA.config = { ...DATA.config, ...REPORT_CONFIG };
}

const SETTING = (setting, defaultValue) => {
  return DATA.config[setting] != null ? DATA.config[setting] : defaultValue;
};

const { landscape, size } = DATA.config;

const IMAGE_SIZE = () => {
  const data = landscape ? '-ls' : '';
  const default_class = landscape ? 'photo-landscape' : '';

  switch (size) {
    case 'Legal':
      return `photo-legal${data}`;
    case 'Tabloid':
      return `photo-tabloid${data}`;
    case 'Ledger':
      return `photo-ledger${data}`;
    case 'A4':
      return `photo-a4${data}`;
    case 'A3':
      return `photo-a3${data}`;
    default:
      return default_class;
  }
};

const MAP_OPTIONS = (mapSize) => {
  const options = {
    maptype: SETTING('cover_page.map.type'),
    size: mapSize
  };

  return options;
};

const SET_MAP_CLASS = () => {
  if (!SETTING('cover_page.metadata.enabled')) {
    return 'ls-nometa';
  }

  switch (size) {
    case 'Legal':
      return landscape ? 'legal-ls' : '';
    case 'Tabloid':
      return landscape ? 'tabloid-ls' : '';
    case 'A4':
      return landscape ? 'a4-ls' : '';
    case 'Letter':
      return landscape ? 'letter-ls' : '';
    case 'Ledger':
      return landscape ? '' : 'ledger-pt';
    default:
      return '';
  }
};

const SET_MAP_OPTIONS = () => {
  const ledger_options = landscape ? MAP_OPTIONS('400x400') : MAP_OPTIONS('600x400');

  if (!SETTING('cover_page.metadata.enabled')) {
    return MAP_OPTIONS('800x400');
  }

  if (size === 'Ledger') {
    return ledger_options;
  } else if (!landscape) {
    return MAP_OPTIONS('360x400');
  }

  switch (size) {
    case 'Letter':
    case 'A4':
      return MAP_OPTIONS('400x400');
    case 'Legal':
    case 'Tabloid':
      return MAP_OPTIONS('600x400');
    case 'A3':
      return MAP_OPTIONS('800x400');
    default:
      return MAP_OPTIONS('360x400');
  }
};

function initialize() {
  // validate parameters and initialize report data
}

function formatValue(element, value, { defaultFormatter }) {
  // special case logic here
  return defaultFormatter(element, value);
}
```

Here is an example of what the form's PDF will look like.

<Image alt="Detailed App Schema" align="center" width="600px" src="https://files.readme.io/f6eb3c6-image.png">
  Detailed App Schema
</Image>
