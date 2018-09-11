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
                        res.render('index.ejs', {
                            hasWritten: result[0].count,
                            pickle: pickles[0],
                            date: moment(pickles[0].date).utc().format('dddd MMMM Do YYYY')
                        });
                    });
                } else { // Otherwise show write
                    res.render('index.ejs', {
                        hasWritten: result[0].count
                    });
                } 
            }
        }) 
    },
    getRandomPickle: (req, res) => {
        // Look up JQuery's ajax stuff
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
};