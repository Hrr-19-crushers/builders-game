exports.consoleUtilities = {
  separators: {
    bar: () => {
      console.log('---------------------------------------');
    },
    equals: () => {
      console.log(`=======================================`);
    },
    stars: () => {
      console.log(`***************************************`);
    }
  },
  notifications: {
    start: () => {
      this.separators.stars();
      console.log(`Welcome to Builder Game!`);
      this.separators.stars();
    }
  }
};