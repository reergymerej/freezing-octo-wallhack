$(function () {

	function showMessage (msg, type) {
		$('#msg')
			.removeClass('text-success text-danger')
			.html(msg)
			.addClass('text-' + (type === 'success' ? 'success' : 'danger'));
	}

	// Show which page we're on.
	$('.nav a[href="' + location.pathname + '"').closest('li').addClass('active');

	$('form').on('submit', function (e) {
		var name = $('#name', this).val(),
			success,
			type;

		e.preventDefault();

		if ($(this).attr('id') === 'new') {

			type = 'POST';
			success = function (resp) {
				window.location = '/items/' + resp._id;
			};

		} else {

			type = 'PUT';
			success = function (resp) {
				showMessage(JSON.stringify(resp), 'success');
			};
		}

		$.ajax({
			type: type,
			url: '',
			data: {
				name: name
			},
			success: success,
			error: function () {
				showMessage('bad', 'error');
			}
		});
	});

	$('a.delete').on('click', function (e) {
		e.preventDefault();

		$.ajax({
			type: 'DELETE',
			url: '/items/' + $(this).attr('id'),
			success: function (resp) {
				window.location.reload();
			},
			error: function (resp) {
				showMessage(JSON.stringify(resp), 'error');
			}
		});
	});
});