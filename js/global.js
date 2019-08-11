$(document).ready(function() {

	/**
	 * Add 'active' class to the current menu item using location href and collapse all items from collapse-menu if item is a part of it.
	 */

	$('a.list-lead').each(function() {
		var $this = $(this);
		var loc = location.href;

		if(this.href == loc) {
			$this.addClass('active'); // Add active class to current item.
			if($this.parents('.collapse-menu').length) {
				var menu = $this.parents('.collapse-menu');
				var subMenu = menu.find('.sub-menu');
				if(subMenu !== typeof 'undefined' && subMenu !== false) {
					subMenu.removeClass('d-none'); // Make sure subMenu exists before using 
				}
			}
		}
	});

	$('.list-group-item a').each(function() {
		$(this).on('click', function() {
			var url = this.href;
			if(url.indexOf('#') > 0) {
				var id = url.slice(url.indexOf('#') + 1);
				var div = $('#' + id);

				if(div.length == 1) {
					$(document.documentElement, document.body).animate({
						'scrollTop': div.offset().top
					}, 1500);
				}
			}
		});
	});

	/**
	 * Hide/display example forms.
	 */

	$('.toggle-content').hide();

	$('.toggle-button').on('click', function() {
		var div = $(this).closest('.example-block');
		var content = div.find('.toggle-content');
		var arrow = div.find('.expand-arrow');
		content.slideToggle();
		var text = $(this).text();
		$(this).text(
			text == 'Show example' ? 'Hide' : 'Show example'
		);
		arrow.toggleClass('fa-chevron-down fa-chevron-up');

	});

});