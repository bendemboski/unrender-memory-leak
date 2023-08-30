import Component from '@glimmer/component';
import { registerDestructor } from '@ember/destroyable';

// local helper
export default class Thing2 extends Component {
  constructor(...args) {
    super(...args);

    // for unit tests
    if (window.thingRefs) {
      window.thingRefs.thing2 = new WeakRef(this);
    }

    let containerElement = document.createElement('div');
    this.containerElement = containerElement;
    document.body.appendChild(this.containerElement);

    registerDestructor(this, () => containerElement.remove());
  }

  localHelper = () => '';
}
