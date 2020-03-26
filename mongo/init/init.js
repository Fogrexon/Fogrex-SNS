const newUsers = [
  {
    user: 'server',
    pwd: 'fogrexserver',
    roles: [
      {
        role: 'readWrite',
        db: 'sns',
      },
    ],
  },
];

const currentUsers = db.getUsers();
if (currentUsers.length === newUsers.length) {
  quit();
}
db.dropAllUsers();

for (let i = 0, { length } = newUsers; i < length; ++i) {
  db.createUser(newUsers[i]);
}
