import Component from '@glimmer/component';
import { registerDestructor } from '@ember/destroyable';

// local helper and destructor referencing `this`
export default class Thing1 extends Component {
  constructor(...args) {
    super(...args);

    // for unit tests
    if (window.thingRefs) {
      window.thingRefs.thing1 = new WeakRef(this);
    }

    let containerElement = document.createElement('div');
    this.containerElement = containerElement;
    document.body.appendChild(this.containerElement);

    registerDestructor(this, () => this.containerElement.remove());
  }

  localHelper = () => '';
}
