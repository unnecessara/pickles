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
                        res.render('index.ejs', {
                            hasWritten: result[0].count,
                            pickle: pickles[0]
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
    addPickle: (req, res) => {
        if (req.body.content === '') {
            // Deal with empty pickle
            return res.status(400).send('Empty pickle. No pickles were saved.');
        }
        let content = req.body.content;
        let alignment = req.body.option;

        let query = "INSERT INTO `pickles` (content, alignment) VALUES ('" +
        content + "', '" + alignment + "')";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};