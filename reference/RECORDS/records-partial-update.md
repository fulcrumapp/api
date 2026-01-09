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
Use this endpoint to partially update a record. Any top-level property (e.g. latitude) may be updated. In addition, any top-level field of `form_values` may also be updated. Only top-level properties and top-level fields of `form_values` may be partially updated. Propertues for fields in `form_values` that are objects must be updated in their entirety.

**Warning: Do not use this endpoint to update repeatable child records.** If nested fields are provided in the request, they are not merged with existing data. Instead, the entire parent field is replaced. This includes trying to update individual child records of a repeatable field. If you update an individual child record, other child records associated with that repeatable will be deleted.

If a property is set to a value then it will be set to that value.
If a property is set to null then it will be erased.
If a property is not sent in the request then its current value will be preserved.

**Warning:** Partial updates do not acquire locks and do not provide transactional guarantees. Concurrent updates to the same record (even on different fields) can result in race conditions and an unpredictable final state.

See the examples below for valid and invalid usages of this endpoint.

# Examples

## Full Record Update

```json
{
    "record": {
        "status": "new",
        "project_id": "08a17780-89be-4aae-9787-45d19589a6ac",
        "assigned_to_id": null,
        "form_values": {
            "62c0": [
                {
                    "form_values": {
                        "afb0": "some nested text for first repeatable",
                        "75f0": "some more nested for first repeatable"
                    }
                },
                {
                    "form_values": {
                        "afb0": "some nested text for second repeatable",
                        "75f0": "some more nested for second repeatable"
                    }
                },
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

```json
{
    "record": {
        "status": "used",
        "project_id": null
    }
}
```

```json
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

```json
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

```json
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

This specific example will overwrite the entire `62c0` field, including the second repeatable record. In some cases this may be the desired behavior.