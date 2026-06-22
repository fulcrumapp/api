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

The `INFERENCE` function performs on-device machine learning or generative AI inference using a specified model. It supports computer vision tasks (such as image classification, object detection, or image recognition) via **LiteRT** and generative text tasks (such as summarization, assistant chats, or text classification) via **LiteRT-LM**.

**THIS FUNCTION WORKS ON MOBILE DEVICES, BUT NOT IN THE WEB RECORD EDITOR**

> ⚠️ **Device Resource & Battery Usage Warning**
> On-device model inference is highly resource-intensive and will consume substantial battery and memory. When writing Data Events using the `INFERENCE` expression, please be mindful of these hardware requirements, which scale directly with the size of the loaded model.
> 
> Due to the significant computational overhead of **Generative LLMs (LiteRT-LM)**, we strongly suggest recommending or restricting these features to modern, high-end mobile devices (such as the iPhone 17 Pro and equivalent high-end Android devices to run gemma-4-e2b) to ensure a smooth and responsive user experience.

## Execution Modes

The execution mode is determined automatically by the structure of the `options` and `options.config` arguments:

1. **Modern Vision ML (LiteRT)**: Used for on-device computer vision tasks. Triggered when `options.config` is provided and contains a `size` parameter.
2. **Modern Generative LLM (LiteRT-LM)**: Used for on-device generative text tasks. Triggered when `options.config` is provided and contains `prompt` or `systemPrompt`.
3. **Legacy Vision ML (ONNX - Deprecated)**: Used when `options.config` is omitted. **Support for ONNX is deprecated. Please upgrade to the modern LiteRT configurations.**

---

## Model Resolution & Reference Types

The `options.model` parameter accepts a string representing the model filename uploaded to the reference files:

1. **Form Reference File (Highest Priority)**: If you bundle custom models as form reference files (e.g. `mobilenet.tflite` or `gemma.gguf`), pass the exact filename (including extension) as the model string.
<!-- Uncomment the following line when the model catalog is ready to launch. -->
<!-- 2. **Model Catalog**: Searches the central model catalog by display name or catalog ID (e.g. `'gemma-4b-e2b'`). Models should be downloaded first. -->

**Auto-Detection of Model Type**:
* Files ending in `.tflite` default to **Vision ML** (LiteRT).
* Files ending in `.gguf`, `.litertlm`, or `.task` default to **Generative LLM**.

---

## Parameters

### Common Parameters
* `options` object (required) - An object containing the parameters for the function.
  * `model` string (required) - The exact model filename uploaded to the form's reference files to be loaded.
  * `form_id` string (optional) - The identifier of the form (defaults to current form).
  * `form_name` string (optional) - The name of the form.

---

### Mode 1: Vision ML (LiteRT)
*Used for running image classification, object detection, and other computer vision models.*

* `options` object:
  * `photo_id` string (required) - The identifier of the photo to be processed.
  * `config` object (required) - Configuration for the LiteRT runtime:
    * `size` number (required) - The input image will be resized to a square before passing it to the model. `size` is the size of a side. It must be greater than 0 and it should match what the model expects.
    * `format` string (optional) - The format of the input image data. Either `'chw'` (channels, height, width) or `'hwc'` (height, width, channels).
    * `inputType` string (optional) - The data type of the input model. Either `'int8'` or `'float'`.
    * `mean` array (optional) - An array of exactly 3 numbers for normalizing the input data (e.g. `[0.485, 0.456, 0.406]`).
    * `std` array (optional) - An array of exactly 3 numbers for normalization standard deviations (e.g. `[0.229, 0.224, 0.225]`).

---

### Mode 2: Modern Generative LLM
*Used for running on-device generative AI large language models.*

* `options` object:
  * `photo_id` string (optional) - Omit for text-only LLM tasks. Provide the identifier of the photo to include for multimodal LLMs.
  * `config` object (required) - Configuration for the LiteRT-LM runtime:
    * `prompt` string (optional*) - The input instruction prompt.
    * `systemPrompt` string (optional*) - System instructions to guide the model's behavior, tone, or role.
    * `temperature` number (optional) - Controls randomness in generation. Must be non-negative.
    * `topK` number (optional) - Restricts sampling to the top K most likely tokens. Must be a positive integer.
    * `topP` number (optional) - Restricts sampling to cumulative probability P. Must be non-negative.
    * `maxTokens` number (optional) - Maximum number of tokens to generate. Must be a positive integer.
    * `contextSize` number (optional) - Context window size. Must be a positive integer.
    * `stopTokens` array (optional) - Array of non-empty strings representing tokens that halt generation.
  
  *\*Note: At least one of `prompt` or `systemPrompt` must be provided.*

---

### Mode 3: Legacy Vision ML (ONNX - Deprecated)
*Deprecated. Use Modern Vision ML (LiteRT) config-based schemas instead.*

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
    * **For Vision ML / Legacy ML**: A `result.outputs` object where output arrays are automatically flattened.
    * **For Generative LLM**: A `result.outputs` object containing `result.outputs.text` (the generated text response) and a `result.modelType` of `'LLM'`.

---

## Examples

### Example 1: Vision ML
```javascript
// Perform on-device image classification when a photo is added
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

### Example 2: Modern Generative LLM
```javascript
// Use an on-device LLM to summarize notes when a record is saved
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
* **Image Recognition / Classification**: Verify image contents, detect equipment, or perform safety audits offline without any internet connection.
* **On-Device LLMs**: Perform smart form calculations, generate field summaries, suggest translations, or parse unstructured user text instantly in the field.

**Note:** This feature is only available with Elite and Enterprise plans. Check out [our plans page](https://www.fulcrumapp.com/pricing/) for more information.