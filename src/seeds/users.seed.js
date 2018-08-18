//db.users.remove({});

let userSeed = {
  email: 'kamil@rybczynski.me',
  firstName: 'Kamil',
  lastName: 'Rybczyński',
  password: 'demo'
};

db.user.save(userSeed);