---
title: Upload a Layer
excerpt: >-
  This endpoint allows for you to upload a layer file. This step is completed
  prior to using the Create Layer endpoint to create the layer.
api:
  file: rest-api.json
  operationId: get_v2fileupload_url.json
deprecated: false
hidden: false
metadata:
  robots: index
---
Perform a GET request to [https://api.fulcrumapp.com/api/v2/file/upload\_url.json](https://api.fulcrumapp.com/api/v2/file/upload_url.json).  This request must be authenticated with an API token using the X-ApiToken header.

![](https://files.readme.io/ecc7a414d6a8d1f573d208608eadb910dc022ba582ca34ebd7ff3f65fb759814-image.png)

<br />

This will return a json response with a url and a key inside of a file object (see below).

```json
{
	"file": {
		"key": "files/1cb7b0db-29af-42f6-88ae-7eadc5365821-bf83679b-f200-49c8-a2af-4aafa1f947c7",
		"url": "https://fulcrumapp.s3.amazonaws.com/files/1cb7b-2...",
		"method": "PUT"
	}
}
```

<br />

2. Perform a PUT request to the url received from in the previous step. You will attach the file to the body of the upload in this step.

<br />

![](https://files.readme.io/d5684820bfc5d152ad526400bca0aed1bdbb3811bf40aa526fc2ff5676df47a6-image.png)

<br />

3. Once the previous step is done you will need to perform a POST request to [https://api.fulcrumapp.com/api/v2/layers.json](https://api.fulcrumapp.com/api/v2/layers.json).  This request must be authenticated with an API token and will also require a body in the below format. The key attribute will need to be the key returned from the request in step 1.

```json
{  
    "layer": {
        "key": "files/1c0db-29af-42f6-88ae-7eadc521-3c6ee271-8107-489b-b65b-53ed77f8e",
        "name": "Test Upload",
        "type": "mbtiles"
    }
}
```