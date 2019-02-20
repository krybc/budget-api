const User = require('../models/user');

module.exports = new class UsersSeed {

  constructor() {

  }

  data() {
    return [
      new User({
        email: 'demo@example.com',
        firstName: 'Kamil',
        lastName: 'Rybczyński',
        password: 'demo'
      }),
    ];
  }

  async load() {
    const seeds = this.data();

    try {

      for (let i = 0; i < seeds.length; i++) {
        const result = await seeds[i].save();
      }

    } catch (e) {
      console.log(e.toString());
    }
  }
};
