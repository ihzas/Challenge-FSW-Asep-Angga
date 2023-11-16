const db = require('../db');

class Mobil {
    static getAllMobil() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM mobil', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static getMobilById(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM mobil WHERE id = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    }

    static createMobil(mobil) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO mobil SET ?', [mobil], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.insertId);
                }
            });
        });
    }

    static updateMobil(id, mobil) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE mobil SET ? WHERE id = ?', [mobil, id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.affectedRows > 0);
                }
            });
        });
    }

    static deleteMobil(id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM mobil WHERE id = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.affectedRows > 0);
                }
            });
        });
    }
}

module.exports = Mobil;
