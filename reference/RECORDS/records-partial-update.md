---
title: Partially Update Record
excerpt: ''
api:
  file: rest-api.json
  operationId: records-partial-update
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Use this endpoint to partially update a record. Any top-level property (e.g. latitude) may be updated. In addtion, this any top-level field of `form_values` may also be updated. However, nested fields are not taken into account.

If a property is set to a value then it will be set to that value.
If a property is set to null then it will be erased.
If a property is not sent in the request then its current value will be preserved.

**Note:** Partial updates do not hold a lock and are not transactional. So if two different requests update different fields on the same record at the same time the final result will be unpredictable.

# Examples

## Full Record Update
```
{
    "record": {
        "status": "new",
        "project_id": "08a17780-89be-4aae-9787-45d19589a6ac",
        "assigned_to_id": null,
        "form_values": {
            "62c0": [
                {
                    "form_values": {
                        "afb0": "some nested text",
                        "75f0": "some more nested text"
                    }
                }
            ],
            "efc0": "some text",
            "2e75": "some more text"
        },
        "latitude": 28.519168304434398,
        "longitude": -101.61554753780364,
        "geometry": {
            "type": "Point",
            "coordinates": [
                -101.61554753780364,
                28.519168304434398
            ]
        }
    }
}
```

## Partial Updates
```
{
    "record": {
        "status": "used",
        "project_id": null
    }
}
```

```
{
    "record": {
        "assigned_to_id": "77e38827-0df7-492a-8239-a2749ab33afe",
        "form_values": {
            "efc0": "some different text",
            "2e75": null
        }
    }
}
```

## Invalid Examples
```
{
    "record": {
        "geometry": {
            "coordinates": [
                -102.61554753780364,
                29.519168304434398
            ]
        }
    }
}
```
This specific example will respond with a type error.

```
{
    "record": {
        "form_values": {
            "62c0": [
                {
                    "form_values": {
                        "afb0": "some different nested text",
                        "75f0": null
                    }
                }
            ]
        }
    }
}
```
This specific example will overwrite the entire `62c0` field.