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

## Description

The `INFERENCE` function performs on-device machine learning inference using a specified model. It supports computer vision tasks (such as object detection) directly on the mobile device.

**THIS FUNCTION WORKS ON MOBILE DEVICES, BUT NOT IN THE WEB RECORD EDITOR**

> ⚠️ **Device Resource & Battery Usage Warning**
> On-device model inference is highly resource-intensive and will consume substantial battery and memory. Requirements scale directly with the size of the loaded model.

## Execution Modes

The execution mode determines how the system runs the model. It supports two modes:

1. **Vision ML**: Used for on-device computer vision tasks (such as object detection).
2. **Legacy Vision ML (ONNX - Deprecated)**: Fallback execution when `options.config` is omitted. **Support for ONNX is deprecated. Please upgrade to modern configurations.**

> ⚠️ **Model Type Auto-Detection**
>
> The model type is determined **strictly by the file extension** of the model file passed to `options.model`.
>
> Auto-detection is **not** determined or overridden by the parameters passed inside `options.config`. However, **the parameters in `options.config` must match the auto-detected model type** (e.g., providing a `size` parameter for a Vision ML model).


---

## Model Resolution & Supported File Extensions

The `options.model` parameter accepts a string representing the model filename uploaded to the reference files.

### Supported File Extensions & Model Types

The system detects the correct machine learning engine to use based on the file extension of the model:

| File Extension | Detected Model Type | Typical Use Cases |
| :--- | :--- | :--- |
| **`.tflite`** | **Vision ML** | Object detection |

### Model Loading

If you bundle custom models as form reference files (e.g., `mobilenet.tflite`), pass the exact filename (including extension) as the `options.model` string.

---

## Parameters

### Common Parameters
* `options` object (required) - An object containing the parameters for the function.
  * `model` string (required) - The exact model filename uploaded to the form's reference files to be loaded.
  * `form_id` string (optional) - The identifier of the form (defaults to current form).
  * `form_name` string (optional) - The name of the form.

---

### Mode 1: Vision ML (for `.tflite` models)
*Used for running object detection and other computer vision models.*

* `options` object:
  * `photo_id` string (required) - The identifier of the photo to be processed.
  * `config` object (required) - Configuration for the computer vision engine:
    * `size` number (required) - The input image will be resized to a square before passing it to the model. `size` is the size of a side. It must be greater than 0 and it should match what the model expects.
    * `format` string (optional) - The format of the input image data. Either `'chw'` (channels, height, width) or `'hwc'` (height, width, channels).
    * `inputType` string (optional) - The data type of the input model. Either `'int8'` or `'float'`.
    * `mean` array (optional) - An array of exactly 3 numbers for normalizing the input data (e.g. `[0.485, 0.456, 0.406]`).
    * `std` array (optional) - An array of exactly 3 numbers for normalization standard deviations (e.g. `[0.229, 0.224, 0.225]`).

---

### Mode 2: Legacy Vision ML (ONNX - Deprecated)
*Deprecated. Use Modern Vision ML config-based schemas instead.*

* `options` object:
  * `photo_id` string (required)
  * `size` number (required)
  * `format` string (optional) - Either `'hwc'` or `'chw'`.
  * `type` string (optional) - Either `'uint8'` or `'float'`.
  * `mean` array (optional)
  * `std` array (optional)

---

### Callback Signature
* `callback` function (required) - Executed after the inference is completed. Receives two arguments:
  * `error` object - Contains error information if inference fails, otherwise `null`.
  * `result` object - Contains the outputs:
    * A `result.outputs` object where output arrays are automatically flattened.

---

## Examples

### Example 1: Vision ML
```javascript
// Perform on-device object detection when a photo is added
ON('add-photo', 'photos', (event) => {
  INFERENCE({
    model: 'fulcrum-pylon.tflite', // Model reference file uploaded to the form
    photo_id: event.value.id,
    config: {
      size: 224,
      format: 'chw',
      inputType: 'float',
      mean: [0.485, 0.456, 0.406],
      std: [0.229, 0.224, 0.225]
    }
  }, (error, result) => {
    if (error) {
      ALERT('Inference failed: ' + error.message);
      return;
    }

    const outputs = result.outputs;
    const scores = Object.values(outputs)[0].value;
    
    // Process output scores...
    SETVALUE('class_result', 'Successfully analyzed image!');
  });
});
```

## Usage

The `INFERENCE` function is typically used in applications requiring offline, local, or low-latency intelligence on-device:
* **Object Detection**: Verify image contents, detect equipment, or perform safety audits offline without any internet connection.

**Note:** This feature is only available with Elite and Enterprise plans. Check out [our plans page](https://www.fulcrumapp.com/pricing/) for more information.
