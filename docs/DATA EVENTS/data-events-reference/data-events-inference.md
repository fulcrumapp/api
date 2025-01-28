---
title: INFERENCE
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
***

**Description**  
The `INFERENCE` function performs inference on a given input, typically an image, using a specified machine learning model. It processes the input data and returns the results in a format suitable for further analysis or display within your application. This is useful for integrating AI-driven features, such as object detection, classification, or image recognition, into your application components.

**THIS FUNCTION WORKS ON MOBILE DEVICES, BUT NOT IN THE WEB RECORD EDITOR**

**Parameters**

- `options` object (required) - An object containing the parameters for the function.
  - `photo_id` string (required) - The identifier of the photo to be processed.
  - `model` object (required) - The machine learning model to be used for inference.
  - `size` number (optional) - The size to which the input should be resized before inference. Default is 640.
  - `format` string (optional) - The format of the input data. Can be either 'chw' (channels, height, width) or 'hwc' (height, width, channels). Choose the format based on how the model was exported. Default is 'chw'.
  - `type` string (optional) - The data type of the input. Default is 'float'.
  - `mean` array (optional) - The mean values for normalizing the input data. Default is `[0.485, 0.456, 0.406]`.
  - `std` array (optional) - The standard deviation values for normalizing the input data. Default is `[0.229, 0.224, 0.225]`.

- `callback` function (required) - A function to be executed after the inference is completed. It receives two parameters:
  - `error` object - Contains information if an error occurs during inference.
  - `result` object - Contains the outputs of the inference.

**Examples**

```javascript
// Example of performing inference on a photo using a pre-trained model and handling the results
ON('add-photo', 'photos', (event) => {
  INFERENCE({
    photo_id: event.value.id,
    model: preTrainedModel,
    size: 640,
    format: 'chw',
    type: 'float',
    mean: [0.485, 0.456, 0.406],
    std: [0.229, 0.224, 0.225]
  }, (error, { outputs }) => {
    if (error) {
      ALERT(error.message);
      return;
    }

    const results = Object.values(outputs)[0].value.map((score, index) => {
      return {
        index,
        score,
        label: LABELS[index]
      };
    });

    const sorted = results.sort((a, b) => b.score - a.score);

    const topK = top != null ? sorted.slice(0, top) : sorted;

    SETVALUE('my_detections', JSON.stringify(topK));
  });
});
```

**Usage**

The `INFERENCE` function is typically used when you need to perform AI-driven tasks such as image classification, object detection, or any other form of model inference. By providing a photo ID and the relevant model, you can process images directly within your application and obtain results for further action, like displaying detected objects or classifying images.

This function is particularly useful in applications that require dynamic analysis or AI-based decision-making, enabling seamless integration of advanced machine learning models into your workflows.

**Note**: This feature is available only for enterprise subscriptions.