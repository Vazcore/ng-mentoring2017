const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

	router.get('/courses', (req, res, next) => {
		let url_parts = url.parse(req.originalUrl, true),
			currentTime = (new Date()).getTime(),
			twoWeeksShiftTime = 14 * 24 * 60 * 60 * 1000,
			query = url_parts.query,
			from = query.start,
			to = +query.start + +query.count,
			sort = query.sort,
			queryStr = query.query,
			courses = server.db.getState().courses;
		console.log(sort);
		console.log(queryStr);

		courses = courses.filter(course => {
			let courseDateTime = new Date(course.date).getTime();
			return courseDateTime >= (currentTime - twoWeeksShiftTime);
		})
		.sort(sortByDate);

		if (courses.length < to) {
			to = courses.length;
		}
		courses = courses.slice(from, to);
		
		res.json(courses);
	});
	
	return router;
};

function sortByDate(a, b) {
	return new Date(a.date) < new Date(b.date) ? 1 : -1;
}
