---
title: Sketch Large File
excerpt: ''
api:
  file: rest-api.json
  operationId: sketches-large-file
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
# API Library Examples

```python Python
from fulcrum import Fulcrum
fulcrum = Fulcrum('{token}')

sketch = fulcrum.sketches.media('{id}', 'large')

with open('{id}.jpeg', 'wb') as f:
  f.write(sketch)
```

```javascript JavaScript
import { FulcrumClient, FulcrumRegion } from '@fulcrumapp/fulcrum-js';
import * as fs from 'node:fs/promises';
const client = new FulcrumClient({
  apiKey: '{token}',
  // Use the region configured for your Fulcrum account.
  region: FulcrumRegion.US
});

client.client.sketchesLargeFile({ sketchId: '{id}' }, { responseType: 'arraybuffer' })
  .then(response => fs.writeFile('{id}.jpeg', Buffer.from(response.data)))
  .then(() => console.log('File downloaded!'))
  .catch(error => console.error(error.message));
```

```ruby Ruby
require 'fulcrum'

client = Fulcrum::Client.new('{token}')

client.sketches.large('{id}') do |input|
  File.open('{id}.jpeg', 'wb') do |output|
    output.write(input.read)
  end
end
```