const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

	router.get('/authors', (req, res, next) => {
    let courses = server.db.getState().courses;
    let authorIds = [];
    let authors = [];
    
    courses.forEach((value) => {
      let courseAuthors = value.authors;
      courseAuthors.forEach(author => {
        if (authorIds.indexOf(author.id) === -1) {
          authorIds.push(author.id);
          authors.push(author);
        }
      });
    });

    res.json(authors);
	});

	return router;
};
