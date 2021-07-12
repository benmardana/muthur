import { Route } from 'utils';

class Commands {
  static #_instance: Commands;
  #commands: Route[] = [];

  constructor() {
    if (Commands.#_instance) {
      return Commands.#_instance;
    }
    Commands.#_instance = this;
  }

  add(route: Route) {
    this.#commands = [...this.#commands, route];
    return this;
  }

  getCommands() {
    return this.#commands;
  }

  forEach(fn: (route: Route) => void) {
    this.#commands.forEach(fn);
    return this;
  }
}

export default new Commands();
