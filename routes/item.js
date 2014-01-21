var mongodb = require('mongodb'),
	monk = require('monk'),
	db = monk('localhost:27017/crud'),
	COLLECTION_NAME = 'items';

function showError (res, msg, json) {
	res.status(404);
	if (json) {
		res.json({ error: msg });
	} else {
		res.render('error', {
			error: msg
		});
	}
}

exports.index = function (req, res) {
	var collection = db.get(COLLECTION_NAME);

	collection.find({}, function (err, docs) {
		if (!err) {
			res.render('./items/index', {
				items: docs
			});

		} else {
			showError(res, 'unable to find items');
		}
	});
};

exports.view = function (req, res) {
	var collection = db.get(COLLECTION_NAME);

	collection.findOne({ _id: req.params.id }, function (err, doc) {
		if (!err) {
			res.render('./items/view', {
				item: doc
			});
		} else {
			showError(res, 'unable to find item');
		}
	});
};

exports.update = function (req, res) {
	
	var collection = db.get(COLLECTION_NAME);

	collection.update(
		{ _id: req.params.id },
		{ name: req.body.name },
		function (err, docs) {
			if (!err) {

				// How can we get the updated record?
				// We can do it the stupid way!
				collection.findOne({ _id: req.params.id }, function (err, doc) {
					if (!err) {
						res.json(doc);
					} else {
						showError(res, 'unable to find updated doc', true);
					}
				});
			} else {
				showError(res, 'unable to update', true);
			}
		}
	);
};

exports['delete'] = function (req, res) {
	var collection = db.get(COLLECTION_NAME);

	collection.remove(
		{ _id: req.params.id },
		{ single: true },
		function (err, docs) {
			if (!err) {
				res.json({
					success: true
				});
			} else {
				showError(res, 'unable to remove item', true);
			}
		}
	);
};

exports['new'] = function (req, res) {
	res.render('./items/new');
};

exports.create = function (req, res) {
	var collection = db.get(COLLECTION_NAME);

	collection.insert({ name: req.body.name }, function (err, doc) {
		if (!err) {
			res.json(doc);
		} else {
			showError(res, 'could not create item', true);
		}
	});
};