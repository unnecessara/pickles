module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `pickles`"; // query database to get all the pickles

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Pickles",
                pickles: result
            });
        });
    },
};