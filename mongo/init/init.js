var newUsers = [
  {
        user: 'server',
        pwd: 'fogrexserver',
        roles: [
            {
                role: 'readWrite',
                db: 'sns'
            }
        ]
    }
];

var currentUsers = db.getUsers();
if (currentUsers.length === newUsers.length) {
    quit();
}
db.dropAllUsers();

for (var i = 0, length = newUsers.length; i < length; ++i) {
    db.createUser(newUsers[i]);
}