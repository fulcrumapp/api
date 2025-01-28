---
title: STORAGE
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
Returns a storage object for setting and getting local storage items.

# Parameters

No parameters

# Examples

```js
storage = STORAGE();
KEY = 'item_key';
storage.setItem(KEY, 'hello world');

// Sets an item in local storage, must be a string
```

```js
item = storage.getItem(KEY);

// Gets an item from storage if it exists, otherwise returns null
```

```js
geom = { type: 'Point', coordinates: [-100, 40] };
storage.setItem('geometry', JSON.stringify(geom));

anotherGeom = JSON.parse(storage.getItem('geometry'));

// Use JSON.stringify and JSON.parse to serialize and deserialize objects in local storage
```

```js
storage.removeItem(KEY);

// Removes an item from storage
```

```js
storage.clear();

// Removes all items from storage
```
