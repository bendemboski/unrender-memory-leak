import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked show = false;

  toggle = () => {
    this.show = !this.show;
  };
}
