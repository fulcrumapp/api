---
title: AWS Interactions
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
# Description

Creating attachments and MBTiles through the API requires a PUT request to an AWS S3 URL. There are two ways to get this URL:

* If you would like to create attachments, you can send a POST request to the [Create Attachments](https://docs.fulcrumapp.com/reference/create-attachment) endpoint: `https://api.fulcrumapp.com/api/v2/attachments`
* If you would like to create MBTiles layers, you can send a GET request to the Files endpoint: `https://api.fulcrumapp.com/api/v2/file/upload_url.json`

While these endpoints are different, they will return similar objects.

The POST request to the attachments endpoint will yield this stringified JSON in the `text` parameter:

```json
{
  url: 'https://fulcrumapp.s3.us-east-1.amazonaws.com/attachments/...',
  id: '{NEW_ID}'
}
```

The GET request to the files endpoint will return a similar object within the text `parameter`, but with a `key` value instead of an `id` value:

```json
{
	file: {
  	 url: 'https://fulcrumapp.s3.amazonaws.com/files/...',
     key: '{FILE_ID}
  }
}
```

Once you have these JSONs parsed, you need to make a PUT request to the `url` returned in your previous request. This request should contain the file you are looking to upload. 

In the example of uploading attachments over Postman, here is what the PUT request would look like:

<Image title="Screen Shot 2022-11-10 at 7.19.07 PM.png" alt={792} align="center" src="https://files.readme.io/6cdbd0b-Screen_Shot_2022-11-10_at_7.19.07_PM.png">
  The same `form-data` body selection would be used for MBTiles as well
</Image>

The final step in this process is finalizing the file you are looking to upload. 

In the case of MBTiles, we need to POST to the [Create Layer endpoint](https://docs.fulcrumapp.com/reference/layers-create). The `key` value in the following object should be the same `key` value returned from the GET `file/upload_url.json` request

```json
{
    "layer": {
        "key": "{KEY FROM GET REQUEST}",
        "name": "Test Upload",
        "type": "mbtiles"
    }
}
```

When it comes to attachments, you'll need to throw in the `id` returned from the POST request to the [Finalize Attachment endpoint](https://docs.fulcrumapp.com/reference/finalize-attachment), as well as the owner(s) of the attachment

```json
{
  "id": "{ID FROM POST REQUEST}",
   "owners": [
      {
        "type": "record" OR "type": "form",
        "id": "{RECORD OR FORM ID}"
      }
   ]
}
```

For attachments, you will then have to edit your records or forms so that their attachment(s) fields reference the `id` of the attachment.

At this point you will have successfully uploaded your files to Fulcrum!

# Code example

Here is a full example of uploading an attachment to a record in Python:

```python
import requests
import json
import os
def create_and_process_attachment():

    API_TOKEN = json.load(open("./.config.json"))["API_TOKEN"]
    record_id = "440a3e7a-c54f-484a-bb40-9e41e3885d45"
    filename = "Certificate.pdf"

    # You need at least one owner in this array
    owners = [
        {"type": "record", "id": record_id}
    ]

    # Name your attachment and give it the owners array
    attachment_body = {
        "name": filename,
        "owners": owners,
        "metadata": {"filename": filename},
        "file_size": 0,
    }

    attachments_url = "https://attachments.fulcrumapp.com/"

    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "x-apitoken": API_TOKEN,
    }

    # You should note that this is just the first step in creating an attachment.
    # We are not directly uploading the attachment in this first request. Instead we are requesting a link where we can perform the actual upload.
    permission_response = requests.post(
        attachments_url, headers=headers, json=attachment_body
    )
    resJSON = json.loads(permission_response.text)
    print(permission_response.text)

    aws_headers = {"x-amz-meta-filename": filename}
    # Open the file and send it to AWS
    with open(
        os.path.join(
            os.path.dirname(__file__), "../../data-files/", filename
        ),
        "rb",
    ) as data:
        aws_res = requests.put(resJSON["url"], data=data, headers=aws_headers)

        print(aws_res)

        # This is where we use the Finalize Attachment endpoint to confirm the owners of the attachment and that the attachment was uploaded
        finalize_url = attachments_url + "finalize"
        resID = resJSON["id"]
        finalize_ob = {"id": resID, "owners": owners}
        finalize_res = requests.post(finalize_url, headers=headers, json=finalize_ob)
        print(finalize_res)

        # Add the attachment to the record
        records_url = f"https://api.fulcrumapp.com/api/v2/records/{record_id}.json"
        record_get_response = requests.get(records_url, headers=headers)
        print(f"record_get_response: {record_get_response.status_code}")
        
        record = json.loads(record_get_response.text)
        record = record['record']
        current_attachments = record['form_values']['6ca0']
        current_attachments.append({
            "name": filename,
            "attachment_id": resID
        })
        print(record['form_values']['6ca0'])

        record_body = {
            "record": record
        }
        record_put_response = requests.put(records_url, json=record_body, headers=headers)
        print(f"record_put_response: {record_put_response.status_code}")
create_and_process_attachment()
```
