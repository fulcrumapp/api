const assert = require('node:assert/strict');
const { test } = require('node:test');
const { components } = require('./rest-api.json');

// Rails Form::DisplayOptions::STYLES, enforced by Validators::Form.
const supportedStyles = ['text', 'number', 'date', 'currency'];

for (const name of ['CalculatedFieldDisplay', 'FormCalculatedDisplay']) {
  test(`${name} preserves the string data type and supported display styles`, () => {
    const { style } = components.schemas[name].properties;

    assert.equal(style.type, 'string');
    assert.deepEqual([...style.enum].sort(), [...supportedStyles].sort());
    assert.ok(!style.enum.includes('string'), '"string" is not a display style');
  });
}
