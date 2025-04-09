---
title: OpenAPI and Postman Collection
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
The Fulcrum REST API's OpenAPI JSON can be found at this link: [https://github.com/fulcrumapp/api/blob/v2/reference/rest-api.json](https://github.com/fulcrumapp/api/blob/v2/reference/rest-api.json)

You can use this URL to import all REST API endpoints into HTTP request apps like [Postman](https://www.postman.com/). First open Postman and click the Import button

<Image align="center" src="https://files.readme.io/9a0500e-image.png" />

Paste the URL into the resulting window and then import the API as a Postman Collection

![](https://files.readme.io/a0f7999-image.png)

Once imported, click on the top level REST API collection, click Authorization, and replace `{{apiKey}}`  with your own API token

![](https://files.readme.io/c88eed4-image.png)

You are now ready to start sending requests!

![](https://files.readme.io/ef1d438-image.png)