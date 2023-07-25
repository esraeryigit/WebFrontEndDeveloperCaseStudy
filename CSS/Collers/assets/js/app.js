$(window).scroll(function () {
	var scroll = $(window).scrollTop();

	if (scroll >= 150) {
		$(".site_header").addClass("scroll_down");
	} else {
		$(".site_header").removeClass("scroll_down");
	}
});


$('.site_header .toggle, .mobile_menu .close_btn').click(function () {
	$('.mobile_menu').toggleClass('opened');
	$('.nav_menu').toggleClass('opened');
	$('.site_header .toggle').toggleClass('opened')
});

$('.mobile_menu .menu .dropdown .nav_link').click(function (e) {
	$(this).next().toggleClass('opened');
	return false;
});
$('.mobile_menu .menu .back_btn').click(function (e) {
	$(this).parent().removeClass('opened');
});

// end


// end
if ($(window).width() < 991) {
	$(document).click(function (event) {
		if (!$(event.target).closest(".site_header .toggle, .mobile_menu .inner").length) {
			$("body").find(".mobile_menu .inner").parent().removeClass("opened");
			$('.site_header .toggle').removeClass('opened');
		}
	});
}

if ($(window).width() < 991) {
	$('.site_footer .menu .title').click(function () {
		$(this).parent().find('ul').slideToggle()
		$(this).toggleClass('opened');
		return false;
	});
}


var product_slider = new Swiper(".spices_slider .slider", {
	breakpoints: {
		0: {
			spaceBetween: 10,
			slidesPerView: 1.7,
		},
		576: {
			slidesPerView: 2,
		},
		991: {
			slidesPerView: 4,
		},
		1200: {
			slidesPerView: 6,
			spaceBetween: 30,
		},
	},
	// navigation: {
	// 	nextEl: ".spices_slider .next_arrow ",
	// 	prevEl: ".spices_slider .prev_arrow",
	// },
	// pagination: {
	// 	el: ".hero .swiper-pagination",
	// },
	// autoplay: {
	// 	delay: 2000,
	// 	disableOnInteraction: false,
	// },
});



var reviews_slider = new Swiper(".reviews_slider .slider", {
	loop: true,
	centeredSlides: true,

	breakpoints: {
		0: {
			spaceBetween: 10,
			slidesPerView: 1,
		},
		768: {
			spaceBetween: 10,
			slidesPerView: 2,
		},
		1200: {
			slidesPerView: 3,
			spaceBetween: 24,
		},
	},
	navigation: {
		nextEl: ".reviews_slider .next_arrow ",
		prevEl: ".reviews_slider .prev_arrow",
	},
});


$(document).ready(function () {

	var $wrapper = $('.tab-wrapper'),
		$allTabs = $wrapper.find('.tab-content > div'),
		$tabMenu = $wrapper.find('.tab-menu li')

	$allTabs.not(':first-of-type').hide();

	$tabMenu.each(function (i) {
		$(this).attr('data-tab', 'tab' + i);
	});

	$allTabs.each(function (i) {
		$(this).attr('data-tab', 'tab' + i);
	});

	$tabMenu.on('click', function () {

		var dataTab = $(this).data('tab'),
			$getWrapper = $(this).closest($wrapper);

		$getWrapper.find($tabMenu).removeClass('active');
		$(this).addClass('active');

		$getWrapper.find($allTabs).hide();
		$getWrapper.find($allTabs).filter('[data-tab=' + dataTab + ']').show();
	});

});//
