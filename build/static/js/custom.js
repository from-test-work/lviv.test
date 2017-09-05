'use strict';

var DEVISE__SCREEN;
$(window).load(function () {
	DEVISE__SCREEN = window.innerWidth;
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || DEVISE__SCREEN <= 767) {
		$('body').addClass('ios');
	} else {
		$('body').addClass('web');
	};
	$('body').removeClass('loaded');
});
/* viewport width */
function viewport() {
	var e = window,
	    a = 'inner';
	if (!('innerWidth' in window)) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width: e[a + 'Width'], height: e[a + 'Height'] };
};
/* viewport width */
$(function () {
	/* placeholder*/
	$('input, textarea').each(function () {
		var placeholder = $(this).attr('placeholder');
		$(this).focus(function () {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function () {
			$(this).attr('placeholder', placeholder);
		});
	});
	/* placeholder*/

	$('.button-nav').click(function () {
		$(this).toggleClass('active'), $('.main-nav-list').slideToggle();
		return false;
	});

	/* components */
	if ($('.sl').length) {
		$('.sl').slick({
			dots: true,
			autoplay: true,
			autoplaySpeed: 3000,
			arrows: true,
			infinite: true,
			speed: 500,
			fade: true,
			cssEase: 'linear'
		});
	};

	/* components */
});

var handler = function handler() {

	var height_footer = $('footer').height();
	var height_header = $('header').height();
	//$('.content').css({'padding-bottom':height_footer+40, 'padding-top':height_header+40});


	var viewport_wid = viewport().width;
	var viewport_height = viewport().height;

	slickMobileMaxHeight(viewport_wid, viewport_height);
	if (viewport_wid <= 767) {
		$('body').addClass('ios');
		$('body').removeClass('web');
	} else {
		$('body').addClass('web');
		$('body').removeClass('ios');
	}
};

$(window).bind('load', handler);
$(window).bind('resize', handler);

document.addEventListener("DOMContentLoaded", function () {
	mmenu();
	mobileMenu('m-toggler');
	mobileSearch('m-search');
	slickMobileMaxHeight(viewport().width, viewport().height);

	window.onload = function () {};
});

/*
  Slidemenu
*/
var mmenu = function mmenu() {
	var $body = document.body;
	var $menu_trigger = $body.getElementsByClassName('menu-trigger')[0];
	if (typeof $menu_trigger !== 'undefined') {
		$menu_trigger.addEventListener('click', function () {
			$body.className = $body.className.indexOf("menu-active") == -1 ? $body.className += " menu-active" : $body.className = $body.className.replace(" menu-active", "");
			// $body.className = ( $body.className == 'menu-active' ) ? '' : 'menu-active';
		});
	}
};

/*
 * @function    mobile menu toogle
 * @Components
 */
var mobileMenu = function mobileMenu(id) {
	var menuToggle = document.getElementById(id);
	menuToggle.addEventListener('click', function (evt) {
		evt.preventDefault;
		if (!this.classList.contains(this.id + '--opened')) {
			this.classList.add(this.id + '--opened');
		} else {
			this.classList.remove('m-toggler--opened');
			removeActivity(slideMenu__ul);
			removeActivity(slideMenu__li);
		}
	});
};

var mobileSearch = function mobileSearch(id) {
	var searchToggle = document.getElementById(id);
	searchToggle.addEventListener('click', function (evt) {
		evt.preventDefault;
		var searchForm = document.getElementById('form-search');
		!searchForm.classList.contains(searchForm.id + '--open') ? searchForm.classList.add(searchForm.id + '--open') : searchForm.classList.remove('form-search--open');
	});
};

if (document.getElementById('slide-menu')) {
	var slideMenu = document.getElementById('slide-menu');
	var slideMenu__ul = slideMenu.querySelectorAll('ul');
	var slideMenu__li = slideMenu.querySelectorAll('li.has-submenu');

	var removeActivity = function removeActivity(selector) {
		for (var i = 0; i < selector.length; i++) {
			selector[i].classList.remove('is-open');
		}
	};

	var slideMenuFn = function slideMenuFn(e) {
		e.preventDefault();
		var $target = e.target;
		var $li = $target.parentNode;
		var $subl = $li.querySelector('ul');
		var $hasNext = $target.nextElementSibling;
		var $allUl = $li.querySelectorAll('ul');
		var v = $subl.closest('li.has-submenu');

		var isOpen = function isOpen() {
			$subl.className = $subl.className.indexOf("is-open") == -1 ? $subl.className += " is-open" : $subl.className = $subl.className.replace(" is-open", "");
		};
		if ($hasNext) {
			if (v.classList.contains('is-open')) {
				if ($li.classList.contains('has-submenu')) {
					v.classList.remove('is-open');
					for (var i = 0; i < $allUl.length; i++) {
						$allUl[i].classList.remove('is-open');
					}
				} else {
					isOpen();
				}
			} else {
				v.classList.add('is-open');
				isOpen();
			}
		} else {
			return 0;
		}
	};

	slideMenu.addEventListener('click', slideMenuFn);
}

var slickMobileMaxHeight = function slickMobileMaxHeight(deviceWidth, deviceHeight) {
	var slickSlide = document.querySelectorAll('.sl__slide');
	var slickImg = void 0;
	var headerHeight = document.querySelector('header').clientHeight;
	console.log('\n\t\tdeviceHeight = ' + deviceHeight + '\n\t\theaderHeight = ' + headerHeight + '\n\t\tmin = ' + (deviceHeight - headerHeight) + '\n\t');

	for (var i = 0; i < slickSlide.length; i++) {
		slickSlide[i].setAttribute('style', 'max-height: ' + (deviceHeight - headerHeight) + 'px !important');
		slickImg = slickSlide[i].querySelectorAll('.sl__img');
		console.log(slickImg[0].dataset.attr);

		var hiddenFn = function hiddenFn(attr, i, value) {
			slickImg[i].getAttribute(attr) == value ? slickImg[i].setAttribute('hidden', 'true') : slickImg[i].setAttribute('hidden', 'false');
		};

		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || deviceWidth <= 767) {
			hiddenFn('data-attr', 0, 'web');
			hiddenFn('data-attr', 1, 'web');
		} else {
			hiddenFn('data-attr', 0, 'ios');
			hiddenFn('data-attr', 1, 'ios');
		}
	}
};
//# sourceMappingURL=custom.js.map
