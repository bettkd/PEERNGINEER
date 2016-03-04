(function() {

	//focus
		$('.focus').focus();

	//multi select custom
		var $day = $(".day"),
			$times = $(".time");

		//listen for class change on all select-time elements
		var setName = function(day) {
			var time = $(day).next('.time-container').children('.time')
			var that = $(time).children('.select-time');
			if($(time).attr('class').indexOf('selected') > -1) {
				$(that).next('input').attr('name', $(that).attr('data-name'));
			} else {
				$(that).next('input').attr('name', null);
			}
		}

		//when click day select all times
		$.each($day, function(i, val) {
			$(this).on('click', function() {
				$(this).next('.time-container').children('.time').toggleClass('selected');
				setName($(this));
			});
		});

		//click specific time
		$.each($times, function(i, val) {
			$(this).on('click', function() {
				var that = this;
				$(that).toggleClass('selected');
				if($(that).attr('class').indexOf('selected') > -1) {
					$(that).children('input').attr('name', $(that).children('.select-time').attr('data-name'));
				} else {
					$(that).children('input').attr('name', null);
				}
			});
		});

		//materialize functions
		$('select').material_select();

		$('.collapsible').collapsible({
			accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
		});

		$('.modal-trigger').leanModal();

})();
