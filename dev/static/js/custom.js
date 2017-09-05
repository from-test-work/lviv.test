var DEVISE__SCREEN;
$(window).load(function(){
	DEVISE__SCREEN = window.innerWidth;
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || ( DEVISE__SCREEN <= 767 ) )  {
		$('body').addClass('ios');
	} else{
		$('body').addClass('web');
	};
	$('body').removeClass('loaded'); 
});
/* viewport width */
function viewport(){
	var e = window, 
		a = 'inner';
	if ( !( 'innerWidth' in window ) )
	{
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
};
/* viewport width */
$(function(){
	/* placeholder*/	   
	$('input, textarea').each(function(){
 		var placeholder = $(this).attr('placeholder');
 		$(this).focus(function(){ $(this).attr('placeholder', '');});
 		$(this).focusout(function(){
 			$(this).attr('placeholder', placeholder);
 		});
 	});
	/* placeholder*/

	$('.button-nav').click(function(){
		$(this).toggleClass('active'), 
		$('.main-nav-list').slideToggle(); 
		return false;
	});
	
	/* components */
	if($('.sl').length) {
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

var handler = function(){
	
	var height_footer = $('footer').height();	
	var height_header = $('header').height();		
	//$('.content').css({'padding-bottom':height_footer+40, 'padding-top':height_header+40});
	
	
	var viewport_wid = viewport().width;
	var viewport_height = viewport().height;
	
	slickMobileMaxHeight(viewport_wid, viewport_height);
	if (viewport_wid <= 767){
		$('body').addClass('ios') 
		$('body').removeClass('web')
	} else {
		$('body').addClass('web');
		$('body').removeClass('ios')
	}
}

$(window).bind('load', handler);
$(window).bind('resize', handler);



document.addEventListener("DOMContentLoaded", () => {
	mmenu();
	mobileMenu('m-toggler');
	mobileSearch('m-search');
	slickMobileMaxHeight(viewport().width, viewport().height);
	
	window.onload = () => {
		
    }
});

/*
  Slidemenu
*/
const mmenu = () => {
    const $body = document.body;
    const $menu_trigger = $body.getElementsByClassName('menu-trigger')[0];
    if (typeof $menu_trigger !== 'undefined') {
        $menu_trigger.addEventListener('click', () => {			
			$body.className = ($body.className.indexOf("menu-active") == -1) 
				? $body.className += " menu-active" 
				: $body.className = $body.className.replace(" menu-active", "");
            // $body.className = ( $body.className == 'menu-active' ) ? '' : 'menu-active';
        });
    }
}

/*
 * @function    mobile menu toogle
 * @Components
 */
const mobileMenu = (id) => {
    let menuToggle = document.getElementById(id);
    menuToggle.addEventListener('click', function (evt) {
		evt.preventDefault;
		if(!this.classList.contains(`${this.id}--opened`)){
			this.classList.add(`${this.id}--opened`) 	
		} else {
			this.classList.remove('m-toggler--opened');
			removeActivity(slideMenu__ul);
			removeActivity(slideMenu__li);
		}
    });
}

const mobileSearch = (id) => {
    let searchToggle = document.getElementById(id);
    searchToggle.addEventListener('click', function (evt) {
		evt.preventDefault;
		let searchForm = document.getElementById('form-search');
		(!searchForm.classList.contains(`${searchForm.id}--open`))
			? searchForm.classList.add(`${searchForm.id}--open`) 	
			: searchForm.classList.remove('form-search--open');
    });
}

if (document.getElementById('slide-menu')){
	const slideMenu = document.getElementById('slide-menu'); 
	var slideMenu__ul = slideMenu.querySelectorAll('ul');
	var slideMenu__li = slideMenu.querySelectorAll('li.has-submenu');

	var removeActivity = (selector) => {
		for(var i = 0; i < selector.length; i++){
			selector[i].classList.remove('is-open');
		}
	}

	const slideMenuFn = (e) =>{
		e.preventDefault();
		let $target = e.target;
		let $li = $target.parentNode;
		let $subl = $li.querySelector('ul');
		let $hasNext = $target.nextElementSibling;
		let $allUl = $li.querySelectorAll('ul');
		let v = $subl.closest('li.has-submenu');

		const isOpen = () => {
			$subl.className = ($subl.className.indexOf("is-open") == -1) 
				? $subl.className += " is-open" 
				: $subl.className = $subl.className.replace(" is-open", "");
		}
		if( $hasNext ){
			if (v.classList.contains('is-open')){
				if ( $li.classList.contains('has-submenu') ) {
					v.classList.remove('is-open');
					for(var i = 0; i < $allUl.length; i++){
						$allUl[i].classList.remove('is-open');
					}
					
				} else {
					isOpen();
				}
			} else {
				v.classList.add('is-open')
				isOpen();
			}
		} else {
			return 0;	
		}
	}

	slideMenu.addEventListener('click', slideMenuFn);
}


var slickMobileMaxHeight = (deviceWidth, deviceHeight) =>{
	let slickSlide = document.querySelectorAll('.sl__slide');
	let slickImg;
	let headerHeight = document.querySelector('header').clientHeight;
	console.log(`
		deviceHeight = ${deviceHeight}
		headerHeight = ${headerHeight}
		min = ${deviceHeight - headerHeight}
	`)

	for(let i = 0; i < slickSlide.length; i++){
		slickSlide[i].setAttribute('style', 'max-height: ' + (deviceHeight - headerHeight) + 'px !important');
		slickImg = slickSlide[i].querySelectorAll('.sl__img')
		console.log(slickImg[0].dataset.attr);
		
		let hiddenFn = (attr, i, value) =>{
			(slickImg[i].getAttribute(attr) == value)
				? slickImg[i].setAttribute('hidden', 'true')
				: slickImg[i].setAttribute('hidden', 'false')
			
		}


		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || ( deviceWidth <= 767 ) )  {
			hiddenFn('data-attr', 0, 'web');	
			hiddenFn('data-attr', 1, 'web');					
		} else {
			hiddenFn('data-attr', 0, 'ios');
			hiddenFn('data-attr', 1, 'ios');				
		}
	}
}