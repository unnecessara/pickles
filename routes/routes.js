var moment = require("moment");

module.exports = {
    getHomePage: (req, res) => {
        // Check today's pickle (count all pickles with date newer than today)
        let hasWrittenQuery = "SELECT COUNT(*) AS count FROM `pickles` WHERE date >= CURDATE()";
        db.query(hasWrittenQuery, (err, result) => {
            if (err) {
                console.error(err);
            }else {
                // Show random read if today pickle exists
                if (result[0].count > 0) {
                    // Query database to get a random pickle
                    let query = "SELECT * FROM `pickles` ORDER BY RAND() LIMIT 1"; 
                    db.query(query, (err, pickles) => {
                        if (err) {
                            console.error(err);
                        }
                        // Show read
                        res.render('read.ejs', {
                            pickle: pickles[0],
                            date: moment(pickles[0].date).utc().format('dddd MMMM Do YYYY')
                        });
                    });
                } else { // Otherwise show write
                    res.render('write.ejs');
                } 
            }
        }) 
    },
    getRandomPickle: (req, res) => {
        // Query database to get a random pickle
        let query = "SELECT * FROM `pickles` ORDER BY RAND() LIMIT 1";
        db.query(query, (err, pickles) => {
            if (err) {
                console.error(err);
            }
            // Return json object with new pickle info
            res.json({
              pickle: pickles[0],
              date: moment(pickles[0].date)
                .utc()
                .format("dddd MMMM Do YYYY")
            });
        });
    },
    addPickle: (req, res) => {
        if (req.body.content === '') {
            // Deal with empty pickle
            return res.status(400).send('Empty pickle. No pickles were saved.');
        }
        let content = req.body.content;
        let alignment = req.body.option;
        let id = req.body.id;

        if (id) {
            // Update existing pickle
            const query = "UPDATE `pickles` SET content = '" + content + "', alignment = '" + alignment + "' WHERE id = '" + id + "'";

            db.query(query, (err, result) => {
              if (err) {
                return res.status(500).send(err);
              }
              res.redirect("/");
            });
        } else {
            // Otherwise create new one
            const query = "INSERT INTO `pickles` (content, alignment) VALUES ('" +
                content + "', '" + alignment + "')";

            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });
        }
    },
    editPicklePage: (req, res) => {
        let pickleId = req.params.id;
        let query = "SELECT * FROM `pickles` WHERE id = '" + pickleId + "' ";
        db.query(query, (err, pickles) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('write.ejs', {
                pickle: pickles[0],
                date: moment(pickles[0].date).utc().format('dddd MMMM Do YYYY')
            });
        });
    }
};