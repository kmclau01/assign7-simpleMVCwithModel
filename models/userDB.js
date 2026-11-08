
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'assignDBuser',
    password: 'assignDBpass',
    database: 'assignDB'
});

connection.connect(function (err) {
    if (err) {
        console.error(err);
        return;
    }

    console.log('Connected to MySQL');
});

function getUsers(callback) {

    connection.query(
        'SELECT * FROM users',
        function (err, results) {

            if (err) {
                console.error(err);
                callback([]);
                return;
            }

            callback(results);
        }
    );
}

function addUser(user, callback) {

    const sql =
        'INSERT INTO users (fname, lname, username, passwd) VALUES (?, ?, ?, ?)';

    connection.query(
        sql,
        [user.fname, user.lname, user.username, user.passwd],
        function (err, results) {

            if (err) {
                console.error(err);
                callback(null);
                return;
            }

            user.userID = results.insertId;
            callback(user);
        }
    );
}

function deleteUser(userID, callback) {

    const sql = 'DELETE FROM users WHERE userID = ?';

    connection.query(
        sql,
        [userID],
        function (err, results) {

            if (err) {
                console.error(err);
                callback(false);
                return;
            }

            callback(true);
        }
    );
}


module.exports = { getUsers, addUser, deleteUser };



