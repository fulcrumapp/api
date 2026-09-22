---
title: Add a Text Caption to a Photo
excerpt: An App Extension that lets field users upload a photo, type a caption, and render the captioned image on an HTML5 canvas — useful for annotating site photos, adding measurement labels, or branding field images before submission.
---

This App Extension uses the browser's HTML5 Canvas API to composite a text caption over a user-selected photo entirely in the browser, with no server round-trip. The result can be screenshotted or extended to upload the annotated image back to Fulcrum.

## App Extension Code

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Photo Caption Tool</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 16px;
      max-width: 800px;
      margin: 0 auto;
    }
    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 12px;
      align-items: center;
    }
    input[type="file"]  { flex: 1 1 180px; }
    input[type="text"]  { flex: 2 1 240px; padding: 6px; font-size: 14px; }
    input[type="range"] { flex: 1 1 120px; }
    button {
      padding: 8px 16px;
      background: #0066cc;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    button:hover { background: #0055aa; }
    canvas {
      max-width: 100%;
      border: 1px solid #ccc;
      display: block;
    }
    label { font-size: 13px; color: #555; }
  </style>
</head>
<body>

  <div class="controls">
    <input type="file" id="upload" accept="image/*" />
    <input type="text"  id="captionInput" placeholder="Enter caption text" />
    <div>
      <label>Font size: <span id="sizeLabel">30</span>px</label>
      <input type="range" id="fontSize" min="10" max="80" value="30"
             oninput="document.getElementById('sizeLabel').textContent = this.value" />
    </div>
    <button id="addCaptionButton">Add Caption</button>
  </div>

  <canvas id="captionCanvas"></canvas>

  <script>
    const canvas  = document.getElementById('captionCanvas');
    const ctx     = canvas.getContext('2d');
    const upload  = document.getElementById('upload');
    const input   = document.getElementById('captionInput');
    const button  = document.getElementById('addCaptionButton');
    const sizeEl  = document.getElementById('fontSize');

    let img = new Image();

    // Load photo to canvas when a file is selected
    upload.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => { img.src = e.target.result; };
      reader.readAsDataURL(file);
    });

    // Draw image to canvas once loaded
    img.onload = () => {
      canvas.width  = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };

    // Composite the caption over the image on button click
    button.addEventListener('click', () => {
      const text     = input.value.trim();
      const fontSize = parseInt(sizeEl.value, 10);

      if (!text || !img.src) return;

      // Redraw the original image (clears any previous caption attempt)
      ctx.drawImage(img, 0, 0);

      // Position caption centered near the bottom of the image
      const x = canvas.width / 2;
      const y = canvas.height - fontSize * 1.5;

      ctx.font        = `bold ${fontSize}px Arial`;
      ctx.textAlign   = 'center';
      ctx.strokeStyle = 'black';
      ctx.lineWidth   = fontSize / 8;
      ctx.fillStyle   = 'white';

      // Draw stroke first for a legible outline, then fill
      ctx.strokeText(text, x, y);
      ctx.fillText(text, x, y);
    });
  </script>
</body>
</html>
```

## How It Works

`FileReader.readAsDataURL()` reads the selected image file into a base64 data URL, which is then assigned to an `Image` object's `src`. Once the image fires its `onload` event, the canvas is resized to match the image dimensions and `drawImage()` renders it.

When the user clicks "Add Caption", the canvas is redrawn (to reset any previous caption), and the caption text is drawn at the horizontal center, positioned near the bottom of the image. The text is rendered twice: first with a thick black stroke for contrast, then with a white fill for legibility.

## Customization

**Caption position:** Change the `y` calculation to place the caption at the top (`y = fontSize * 1.5`) or at a fixed pixel offset from any edge.

**Font and color:** Swap `ctx.font` and `ctx.fillStyle` for different typefaces, weights, or colors. Use `ctx.fillStyle = 'rgba(0,0,0,0.5)'` to draw a semi-transparent background bar behind the text.

**Download the captioned image:** Add a download button that calls `canvas.toDataURL('image/jpeg')` and triggers a link click:

```javascript
document.getElementById('downloadBtn').addEventListener('click', () => {
  const link    = document.createElement('a');
  link.download = 'captioned-photo.jpg';
  link.href     = canvas.toDataURL('image/jpeg', 0.92);
  link.click();
});
```

**Multiple captions / drag and drop:** Track caption objects in an array and redraw them all on each render pass to support repositionable annotations.
