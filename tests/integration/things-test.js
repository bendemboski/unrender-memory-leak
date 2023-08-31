import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | things', function (hooks) {
  setupRenderingTest(hooks);

  test('things do not leak', async function (assert) {
    window.thingRefs = {};

    await render(hbs`
      {{#if this.show}}
        <Thing/>
      {{/if}}
    `);
    this.set('show', true);
    this.set('show', false);
    await settled();

    window.gc();

    assert.notOk(Boolean(window.localHelperRef.deref()));
  });
});
