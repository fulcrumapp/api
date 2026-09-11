---
title: Inventory Scanner with Barcode Lookup
excerpt: A self-contained HTML App Extension that uses the device camera or keyboard input to scan barcodes, looks up the matching inventory item via the Fulcrum Records API, and lets users make rapid quantity adjustments — all without leaving the Fulcrum mobile or web interface.
---

This App Extension provides a purpose-built inventory management UI embedded directly inside a Fulcrum app. Users scan a barcode (via camera or physical scanner), the extension finds the matching record in Fulcrum, displays the item name and current quantity, and lets users increment or decrement the stock count with a single tap. Changes are saved back to the record via the Fulcrum REST API.

## Overview

The extension is a single HTML file added to a Fulcrum App Extension field. It uses:

- **[html5-qrcode](https://github.com/mebjas/html5-qrcode)** — camera-based QR/barcode scanning via the device camera
- **Tailwind CSS** — utility-first styling optimized for mobile
- **Fulcrum Records API** — `GET /api/v2/records.json` to look up by barcode, `PATCH /api/v2/records/{id}.json` to update quantity
- **Settings panel** — auth token, form ID, and field key mapping entered once per device and stored in `localStorage`

## Prerequisites

The Fulcrum app must have at minimum:
- A `BarcodeField` to hold the item's barcode (e.g. `part_number_barcode`)
- A `TextField` for item description (e.g. `item_description`)
- A numeric `TextField` for quantity on hand (e.g. `quantity_on_hand`)
- A numeric `TextField` for minimum quantity threshold (e.g. `quantity_to_maintain`)

## App Extension HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0,
                 user-scalable=no, viewport-fit=cover">
  <title>Inventory Scanner</title>

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- html5-qrcode: camera + file-based barcode scanning -->
  <script src="https://unpkg.com/html5-qrcode" type="text/javascript"></script>

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap"
        rel="stylesheet">

  <style>
    body { font-family: 'Inter', sans-serif; }

    /* Full-height on mobile without address bar offset */
    .h-dvh { height: 100vh; height: 100dvh; }

    /* Hide scrollbar for a cleaner mobile look */
    ::-webkit-scrollbar { width: 0; background: transparent; }

    /* Slide-up animation for item detail panel */
    .slide-up { animation: slideUp 0.3s ease-out forwards; }
    @keyframes slideUp {
      from { transform: translateY(100%); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }

    /* Force the scanner library to respect container width */
    #reader video,
    #reader canvas,
    #reader img {
      max-width: 100% !important;
      height: auto !important;
      border-radius: 0.5rem;
    }
    #reader { width: 100% !important; border: none !important; }
  </style>
</head>
<body class="bg-gray-100 text-gray-800 h-dvh flex flex-col overflow-hidden">

  <!-- ── Header ── -->
  <header class="bg-blue-600 text-white p-4 shadow-md z-10
                 flex justify-between items-center shrink-0 w-full">
    <div>
      <h1 class="font-bold text-lg leading-tight">Inventory Tool</h1>
      <p id="header-subtitle" class="text-xs text-blue-200">Direct Connection</p>
    </div>
    <button onclick="toggleSettings(true)"
            class="text-xs bg-blue-700 px-4 py-2 rounded-lg
                   hover:bg-blue-800 transition font-medium whitespace-nowrap">
      Settings
    </button>
  </header>

  <!-- ── Main Content ── -->
  <div class="flex-1 w-full relative overflow-hidden">
    <div class="absolute inset-0 overflow-y-auto overflow-x-hidden">
      <main class="w-full max-w-lg mx-auto p-4 min-h-full flex flex-col">

        <!-- Step 1 & 2: Scan Interface -->
        <div id="scan-panel" class="hidden flex-1 flex-col items-center justify-center py-6 w-full">

          <div class="text-center mb-8">
            <!-- Barcode icon -->
            <div class="bg-blue-600 p-4 rounded-full inline-block mb-4">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <!-- barcode path data -->
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-800">Scan Item</h2>
            <p class="text-gray-500">Use camera or type barcode</p>
          </div>

          <!-- Manual / keyboard input (works with physical barcode scanners) -->
          <div class="w-full mb-4 relative">
            <input type="text"
                   id="barcode-input"
                   placeholder="Scan or type barcode..."
                   class="w-full p-4 pl-12 border-2 border-gray-200
                          rounded-xl text-lg focus:border-blue-500
                          focus:ring-0 outline-none transition shadow-sm"
                   onkeydown="handleManualEntry(event)">
          </div>

          <!-- Camera scanning buttons -->
          <div class="grid grid-cols-1 gap-3 w-full">
            <button onclick="startCamera()"
                    class="flex items-center justify-center gap-2
                           bg-gray-800 text-white font-semibold py-4
                           rounded-xl hover:bg-gray-700 active:scale-95
                           transition w-full">
              Open Live Camera
            </button>
          </div>

          <!-- html5-qrcode renders into this hidden div -->
          <div id="reader-hidden" class="hidden">
            <div id="reader" class="w-full"></div>
          </div>
        </div>

        <!-- Step 3: Item Detail Panel (shown after successful scan) -->
        <div id="item-panel" class="hidden slide-up">
          <div class="bg-white rounded-2xl shadow-lg p-6 mb-4">
            <h2 id="item-name"   class="text-xl font-bold text-gray-900 mb-1"></h2>
            <p  id="item-barcode" class="text-sm text-gray-400 font-mono mb-4"></p>

            <!-- Quantity adjustment -->
            <div class="flex items-center justify-between
                        bg-gray-50 rounded-xl p-4 mb-4">
              <button onclick="adjustQuantity(-1)"
                      class="w-12 h-12 rounded-full bg-red-100 text-red-600
                             text-2xl font-bold flex items-center justify-center
                             hover:bg-red-200 active:scale-95 transition">
                −
              </button>
              <div class="text-center">
                <p id="quantity-display"
                   class="text-4xl font-bold text-gray-900"></p>
                <p class="text-xs text-gray-400 mt-1">Current Quantity</p>
              </div>
              <button onclick="adjustQuantity(1)"
                      class="w-12 h-12 rounded-full bg-green-100 text-green-600
                             text-2xl font-bold flex items-center justify-center
                             hover:bg-green-200 active:scale-95 transition">
                +
              </button>
            </div>

            <!-- Save / cancel -->
            <button onclick="saveQuantity()"
                    class="w-full bg-blue-600 text-white font-semibold
                           py-4 rounded-xl hover:bg-blue-700
                           active:scale-95 transition mb-2">
              Save Changes
            </button>
            <button onclick="resetToScan()"
                    class="w-full bg-gray-100 text-gray-600 font-semibold
                           py-3 rounded-xl hover:bg-gray-200 transition">
              Scan Another
            </button>
          </div>
        </div>

      </main>
    </div>
  </div>

  <!-- ── Settings Panel ── -->
  <div id="settings-overlay"
       class="hidden fixed inset-0 bg-black bg-opacity-50 z-50">
    <div class="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6
                max-h-[85vh] overflow-y-auto">
      <h2 class="text-lg font-bold mb-4">Settings</h2>

      <label class="block mb-3">
        <span class="text-sm font-medium text-gray-700">API Token</span>
        <input type="password" id="setting-token"
               class="mt-1 w-full p-3 border border-gray-200 rounded-lg
                      focus:border-blue-500 focus:ring-0 outline-none">
      </label>
      <label class="block mb-3">
        <span class="text-sm font-medium text-gray-700">Form ID</span>
        <input type="text" id="setting-form-id" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
               class="mt-1 w-full p-3 border border-gray-200 rounded-lg
                      focus:border-blue-500 focus:ring-0 outline-none font-mono text-sm">
      </label>
      <label class="block mb-3">
        <span class="text-sm font-medium text-gray-700">Barcode Field Key</span>
        <input type="text" id="setting-barcode-key" placeholder="e.g. abc1"
               class="mt-1 w-full p-3 border border-gray-200 rounded-lg
                      focus:border-blue-500 focus:ring-0 outline-none font-mono text-sm">
      </label>
      <label class="block mb-3">
        <span class="text-sm font-medium text-gray-700">Item Name Field Key</span>
        <input type="text" id="setting-name-key" placeholder="e.g. abc2"
               class="mt-1 w-full p-3 border border-gray-200 rounded-lg
                      focus:border-blue-500 focus:ring-0 outline-none font-mono text-sm">
      </label>
      <label class="block mb-4">
        <span class="text-sm font-medium text-gray-700">Quantity Field Key</span>
        <input type="text" id="setting-qty-key" placeholder="e.g. abc3"
               class="mt-1 w-full p-3 border border-gray-200 rounded-lg
                      focus:border-blue-500 focus:ring-0 outline-none font-mono text-sm">
      </label>

      <button onclick="saveSettings()"
              class="w-full bg-blue-600 text-white font-semibold py-4
                     rounded-xl hover:bg-blue-700 transition mb-2">
        Save Settings
      </button>
      <button onclick="toggleSettings(false)"
              class="w-full bg-gray-100 text-gray-600 font-semibold py-3
                     rounded-xl hover:bg-gray-200 transition">
        Cancel
      </button>
    </div>
  </div>

<script>
// ── Configuration (loaded from localStorage) ──────────────────────────────
const CONFIG_KEY = 'inventory_scanner_config';

function loadConfig() {
  try {
    return JSON.parse(localStorage.getItem(CONFIG_KEY)) || {};
  } catch { return {}; }
}

function saveSettings() {
  const config = {
    token:      document.getElementById('setting-token').value.trim(),
    formId:     document.getElementById('setting-form-id').value.trim(),
    barcodeKey: document.getElementById('setting-barcode-key').value.trim(),
    nameKey:    document.getElementById('setting-name-key').value.trim(),
    qtyKey:     document.getElementById('setting-qty-key').value.trim(),
  };
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  toggleSettings(false);
  init();
}

function toggleSettings(show) {
  const el = document.getElementById('settings-overlay');
  el.classList.toggle('hidden', !show);
  if (show) {
    const cfg = loadConfig();
    document.getElementById('setting-token').value      = cfg.token      || '';
    document.getElementById('setting-form-id').value    = cfg.formId     || '';
    document.getElementById('setting-barcode-key').value = cfg.barcodeKey || '';
    document.getElementById('setting-name-key').value   = cfg.nameKey    || '';
    document.getElementById('setting-qty-key').value    = cfg.qtyKey     || '';
  }
}

// ── State ──────────────────────────────────────────────────────────────────
let currentRecord  = null;
let currentQty     = 0;
let html5QrScanner = null;

// ── Initialization ─────────────────────────────────────────────────────────
function init() {
  const cfg = loadConfig();
  if (!cfg.token || !cfg.formId) {
    document.getElementById('header-subtitle').textContent = 'Not configured — tap Settings';
    toggleSettings(true);
    return;
  }
  document.getElementById('header-subtitle').textContent = 'Ready to scan';
  document.getElementById('scan-panel').classList.remove('hidden');
  document.getElementById('scan-panel').classList.add('flex');
}

// ── Barcode Handling ───────────────────────────────────────────────────────
function handleManualEntry(event) {
  if (event.key === 'Enter') {
    const barcode = document.getElementById('barcode-input').value.trim();
    if (barcode) lookupBarcode(barcode);
  }
}

function startCamera() {
  const readerDiv = document.getElementById('reader-hidden');
  readerDiv.classList.remove('hidden');

  html5QrScanner = new Html5QrcodeScanner('reader', {
    fps: 10,
    qrbox: { width: 250, height: 150 },
    rememberLastUsedCamera: true,
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
  });

  html5QrScanner.render(
    (decodedText) => {
      html5QrScanner.clear();
      readerDiv.classList.add('hidden');
      lookupBarcode(decodedText);
    },
    (error) => { /* scan attempt failed — normal during scanning */ }
  );
}

// ── Fulcrum Records API ────────────────────────────────────────────────────
async function lookupBarcode(barcode) {
  const cfg = loadConfig();
  document.getElementById('header-subtitle').textContent = 'Looking up…';

  const response = await fetch(
    `https://api.fulcrumapp.com/api/v2/records.json?form_id=${cfg.formId}&q=${encodeURIComponent(barcode)}`,
    { headers: { 'X-ApiToken': cfg.token } }
  );

  const data = await response.json();
  const record = data.records?.find(
    r => r.form_values?.[cfg.barcodeKey] === barcode
  );

  if (!record) {
    alert(`No record found for barcode: ${barcode}`);
    document.getElementById('header-subtitle').textContent = 'Ready to scan';
    return;
  }

  currentRecord = record;
  currentQty    = parseFloat(record.form_values?.[cfg.qtyKey] ?? 0);

  document.getElementById('item-name').textContent    = record.form_values?.[cfg.nameKey] || 'Unknown Item';
  document.getElementById('item-barcode').textContent = barcode;
  document.getElementById('quantity-display').textContent = currentQty;

  document.getElementById('scan-panel').classList.add('hidden');
  document.getElementById('scan-panel').classList.remove('flex');
  document.getElementById('item-panel').classList.remove('hidden');
  document.getElementById('header-subtitle').textContent = 'Item found';
}

function adjustQuantity(delta) {
  currentQty = Math.max(0, currentQty + delta);
  document.getElementById('quantity-display').textContent = currentQty;
}

async function saveQuantity() {
  const cfg = loadConfig();
  const updatedValues = {
    ...currentRecord.form_values,
    [cfg.qtyKey]: String(currentQty),
  };

  const response = await fetch(
    `https://api.fulcrumapp.com/api/v2/records/${currentRecord.id}.json`,
    {
      method: 'PATCH',
      headers: {
        'X-ApiToken': cfg.token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        record: {
          form_id:     cfg.formId,
          form_values: updatedValues,
        },
      }),
    }
  );

  if (response.ok) {
    document.getElementById('header-subtitle').textContent = 'Saved ✓';
    setTimeout(resetToScan, 800);
  } else {
    alert('Save failed — check your API token and try again.');
  }
}

function resetToScan() {
  currentRecord = null;
  currentQty    = 0;
  document.getElementById('barcode-input').value       = '';
  document.getElementById('item-panel').classList.add('hidden');
  document.getElementById('scan-panel').classList.remove('hidden');
  document.getElementById('scan-panel').classList.add('flex');
  document.getElementById('header-subtitle').textContent = 'Ready to scan';
}

// ── Bootstrap ──────────────────────────────────────────────────────────────
init();
</script>
</body>
</html>
```

## Setup

1. Create a Fulcrum app with the fields described in Prerequisites.
2. Add an **App Extension** field to the app.
3. Paste the HTML above as the extension source.
4. Open the extension on mobile or web, tap **Settings**, and enter:
   - Your Fulcrum API token
   - The app's Form ID (from the URL or `GET /api/v2/forms.json`)
   - The field keys for barcode, item name, and quantity (find these in the App Designer or via the field's `key` property in the API)
5. Settings are saved in `localStorage` and persist across sessions.

## Notes

- **Physical barcode scanners** work automatically via the text input field — most keyboard-mode scanners send an Enter key after the barcode, which triggers the lookup.
- **Camera scanning** uses the device's rear camera via the html5-qrcode library and supports 1D barcodes (Code 128, EAN, UPC, etc.) as well as QR codes.
- **CORS:** The Fulcrum API allows cross-origin requests from App Extensions. If hosting this HTML outside of Fulcrum, ensure your hosting environment has HTTPS.
- The Settings panel stores the API token in `localStorage`. For shared devices, consider clearing settings when the session ends or using a shorter-lived token.
