import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Mixin | -observer-admin', function(hooks) {
  setupTest(hooks);

  test('_areOptionsSame works', function(assert) {
    let service = this.owner.lookup('service:-observer-admin');

    // primitive
    assert.ok(service._areOptionsSame('a', 'a'));
    assert.ok(service._areOptionsSame(1, 1));
    assert.notOk(service._areOptionsSame('a', 'ab'));
    assert.notOk(service._areOptionsSame(1, 2));

    // complex
    assert.ok(service._areOptionsSame({}, {}));
    assert.notOk(service._areOptionsSame({ a: 'b' }, {}));
    assert.ok(service._areOptionsSame({ a: 'b' }, { a: 'b' }));
    assert.notOk(service._areOptionsSame({ a: { b: 'c' }}, { a: 'b' }));
    assert.ok(service._areOptionsSame({ a: { b: 'c' }}, { a: { b: 'c' } }));
    assert.notOk(service._areOptionsSame({ a: { b: { c: 'd' } }}, { a: { b: 'c' } }));
    assert.ok(service._areOptionsSame({ a: { b: { c: 'd' } }}, { a: { b: { c: 'd' } } }));
  });

  test('_determineMatchingElements works', function(assert) {
    let service = this.owner.lookup('service:-observer-admin');
    assert.ok(service._determineMatchingElements({ a: { b: 'c' }}, { key: { observerOptions: { a: { b: 'c' } }}}));
    assert.notOk(service._determineMatchingElements({ a: { b: 'd' }}, { key: { observerOptions: { a: { b: 'c' } }}}));
  });
});
