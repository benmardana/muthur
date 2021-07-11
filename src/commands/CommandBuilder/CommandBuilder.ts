import { Route } from '../../utils';

export default class CommandBuilder {
  #commands: Route[];

  constructor() {
    this.#commands = [];
  }

  add(route: Route) {
    this.#commands = [...this.#commands, route];
    return this;
  }

  get() {
    return this.#commands;
  }

  forEach(fn: (route: Route) => void) {
    this.#commands.forEach(fn);
    return this;
  }
}
