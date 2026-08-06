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

The `INFERENCE` function performs on-device machine learning or generative AI inference using a specified model. It supports computer vision tasks (such as object detection) and generative text tasks (such as summarization, assistant chats, or text classification) directly on the mobile device.

**THIS FUNCTION WORKS ON MOBILE DEVICES, BUT NOT IN THE WEB RECORD EDITOR**

> ⚠️ **Device Resource & Battery Usage Warning**
> On-device model inference is highly resource-intensive and will consume substantial battery and memory. Requirements scale directly with the size of the loaded model.
> 
> **SLMs** are especially demanding; consider limiting them to modern flagship devices and/or documenting minimum device requirements (RAM/SoC) for your users.
>
> SLM support is currently **beta**. Contact [product@fulcrumapp.com](mailto:product@fulcrumapp.com) if you are interested in testing it.

## Execution Modes

The execution mode determines how the system runs the model. It supports two modes:

1. **Vision ML**: Used for on-device computer vision tasks (such as object detection).
2. **SLM**: Used for on-device generative text tasks (such as summarization, assistant chats, or text classification).

> ⚠️ **Model Type Auto-Detection**
>
> The model type is determined **strictly by the file extension** of the model file passed to `options.model`.
>
> Auto-detection is **not** determined or overridden by the parameters passed inside `options.config`. However, **the parameters in `options.config` must match the auto-detected model type** (e.g., providing a `size` parameter for a Vision ML model, or a `prompt` parameter for an SLM).


---

## Model Resolution & Supported File Extensions

The `options.model` parameter accepts a string representing the model filename uploaded to the reference files.

### Supported File Extensions & Model Types

The system detects the correct machine learning engine to use based on the file extension of the model:

| File Extension | Detected Model Type | Typical Use Cases |
| :--- | :--- | :--- |
| **`.tflite`** | **Vision ML** | Object detection |
| **`.litertlm`**, **`.task`** | **SLM** | Text generation, text summarization, assistant chats, text classification |

Public support is limited to LiteRT (`.tflite`) and LiteRT-LM (`.litertlm` and `.task`) model formats.

### Model Loading

If you bundle custom models as form reference files (e.g., `yolov5.tflite` or `gemma.litertlm`), pass the exact filename (including extension) as the `options.model` string. Form reference files are resolved for offline use after synchronization.

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
    * `inputType` string (optional) - The data type of the input layer. Either `'int8'` or `'float'`.
    * `mean` array (optional) - An array of exactly 3 numbers for normalizing the input data (e.g. `[0.485, 0.456, 0.406]`).
    * `std` array (optional) - An array of exactly 3 numbers for normalization standard deviations (e.g. `[0.229, 0.224, 0.225]`).
    * `labels` array (optional) - Inline class labels. When provided, these take precedence over a `labels.txt` reference file, including when set to an empty array (`[]`).

#### Class labels

Vision ML models can use a `labels.txt` file supplied as a form reference file. The file must be UTF-8 text with one class label per line. The parser supports CRLF, LF, and CR line endings, trims surrounding whitespace, and ignores blank lines. The order of the remaining labels maps to the model's class indexes.

The inline `config.labels` array takes precedence over `labels.txt`. If no inline labels are provided, the runtime uses `labels.txt` when it is available. A missing, unreadable, or empty file is non-fatal; inference continues without resolved labels. Resolved labels are returned in `result.labels`.

---

### Mode 2: SLM (for `.litertlm` and `.task` models)
*Used for running on-device generative text models.*

* `options` object:
  * `photo_id` string (optional) - Omit for text-only SLM tasks. Provide the identifier of the photo to include for multimodal SLMs.
  * `config` object (required) - Configuration for the generative text engine:
    * `prompt` string (optional*) - The input instruction prompt.
    * `systemPrompt` string (optional*) - System instructions to guide the model's behavior, tone, or role.
    * `temperature` number (optional) - Controls randomness in generation. Must be non-negative.
    * `topK` number (optional) - Restricts sampling to the top K most likely tokens. Must be a positive integer.
    * `topP` number (optional) - Restricts sampling to cumulative probability P. Must be between 0 and 1.
    * `maxTokens` number (optional) - Maximum number of tokens to generate. Must be a positive integer.
    * `contextSize` number (optional) - Context window size. Must be a positive integer.

  * **Note:** At least one of `prompt` or `systemPrompt` must be provided.

---

### Callback Signature
* `callback` function (required) - Executed after the inference is completed. Receives two arguments:
  * `error` object - Contains error information if inference fails, otherwise `null`.
  * `result` object - Contains the outputs:
    * **For Vision ML**: A `result.outputs.detections` array. Each entry is an object with:
      * `box` array - The bounding box coordinates `[x, y, width, height]`.
      * `score` number - The confidence score for the detection.
      * `class` number - The detected class index.
    * **For Vision ML with labels**: A `result.labels` array containing the resolved class labels. The label at an index corresponds to the detection's `class` value.
    * **For SLM**: The generated text is returned in the top-level `result.outputs.text` property.

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

    const detections = result.outputs.detections;
    const labels = result.labels || [];

    // Process detected objects...
    const firstLabel = detections.length > 0 ? labels[detections[0].class] : null;
    SETVALUE('class_result', firstLabel || `Detected ${detections.length} object(s)!`);
  });
});
```

### Example 2: Modern SLM
```javascript
// Use an on-device SLM to summarize notes when a record is saved
ON('save-record', () => {
  const notes = VALUE('notes');
  if (!notes) return;

  INFERENCE({
    model: 'gemma-4-e2b.litertlm',
    config: {
      systemPrompt: 'You are an assistant. Summarize the user text in one short sentence.',
      prompt: notes,
      temperature: 0.7,
      maxTokens: 100
    }
  }, (error, result) => {
    if (error) {
      ALERT('Summarization failed: ' + error.message);
      return;
    }

    // Access the generated response text
    SETVALUE('summary', result.outputs.text);
  });
});
```

## Usage

The `INFERENCE` function is typically used in applications requiring offline, local, or low-latency intelligence on-device:
* **Object Detection**: Verify image contents, detect equipment, or perform safety audits offline without any internet connection.
* **On-Device SLMs**: Perform smart form calculations, generate field summaries, suggest translations, or parse unstructured user text instantly in the field. This capability is beta; contact [product@fulcrumapp.com](mailto:product@fulcrumapp.com) if you are interested in testing it.

**Note:** This feature is only available with Elite and Enterprise plans. Check out [our plans page](https://www.fulcrumapp.com/pricing/) for more information.
