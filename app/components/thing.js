import Component from '@glimmer/component';

export default class Thing extends Component {
  constructor(...args) {
    super(...args);

    window.localHelperRef = new WeakRef(this.localHelper);
  }

  val = true;
  localHelper = () => this.val;
}
