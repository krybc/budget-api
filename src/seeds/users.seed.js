//db.users.remove({});

let userSeed = {
  email: 'demo@example.com',
  firstName: 'Kamil',
  lastName: 'Rybczyński',
  password: 'demo'
};

db.user.save(userSeed);
