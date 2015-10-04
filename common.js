/**
 * Created by martynuk on 04.10.15.
 */

$("input:not([type=checkbox])").each(function() {
	var input = $(this), id = this.id;
	input.attr('name', id);
});

$(document).ready(function(){
	var props = {};

	$.ajax({
		url: 'https://randomuser.me/api/',
		dataType: 'json',
		success: function(data){
			console.log(data);
			var user = data.results[0].user,
				list = $('.form-control');

			deepSearch(user);

			for (var i = 0, len = list.length; i < len; i += 1) {
				prop = props[ $(list[i]).attr('id') ];
				if ( prop ) $(list[i]).val(prop);
			}

		}
	});

	function deepSearch(node) {
		for (var elem in node) {
			if ( isObjectEmpty(node[elem]) ) {
				props[elem] = node[elem];
			} else {
				deepSearch(node[elem]);
			}
		}
	}

	function isObjectEmpty(obj) {
		if (typeof obj !== 'object') return true;
		for (var key in obj) {
			return false;
		}
		return true;
	}
});


$('form[name="registration"]').submit(function(e){
	var $form = $(this);
	e.preventDefault();
	$.ajax({
		type: "POST",
		url: $form.attr("action"),
		data: $form.serialize(),
		success: function() {
			$form[0].reset();
		},
		error: function(jqXHR, textStatus, error) {
			console.log(error);
		}
	});
});