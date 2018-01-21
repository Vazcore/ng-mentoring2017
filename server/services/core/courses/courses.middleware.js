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
			keyword = query.keyword,
			queryStr = query.query,
			courses = server.db.getState().courses;
		console.log(sort);
		console.log(queryStr);

		courses = courses.filter(course => {
			let searchQuery = true;
			let courseDateTime = new Date(course.date).getTime();
			if (keyword) {
				keyword = keyword.toLowerCase();
				searchQuery = course.title.toLowerCase().indexOf(keyword) !== -1;
			}
			return courseDateTime >= (currentTime - twoWeeksShiftTime) && searchQuery;
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
