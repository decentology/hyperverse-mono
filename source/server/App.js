import fs from 'fs';

let app = null;

class App {
  static get main() {
    if (app === null) {
      app = new App();
    }

    return app;
  }

  constructor() {}
  async initialize() {}
}

export default App;