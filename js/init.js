// Handle main navigation menu toggling on small screens
function navToggleHandler(e) {
	e.preventDefault();
	document.body.classList.toggle('js-nav-open');
}

window.addMainNavigationHandlers = function() {
	const navToggle = document.querySelectorAll('.js-nav-toggle');
	if (navToggle) {
		for (let i = 0; i < navToggle.length; i++) {
			navToggle[i].addEventListener('click', navToggleHandler, false);
		}
	}
};

/*
 Interactive Deck Code
*/
window.removeMainNavigationHandlers = function() {
	document.body.classList.remove('js-nav-open');
	const navToggle = document.querySelectorAll('.js-nav-toggle');
	if (navToggle) {
		for (let i = 0; i < navToggle.length; i++) {
			navToggle[i].removeEventListener('click', navToggleHandler, false);
		}
	}
};

var carousel,
		cells,
		cellWidth,
		cellHeight,
		radius,
		theta;
var cellCount = 7;
var selectedIndex = 0;
var isHorizontal = true;
var scope = 'Stages';
var rotateFn = 'rotateY';
var startX, startY;
var deltaX, deltaY;

var initVars = function() {
	carousel = document.querySelector('.carousel');
	cells = carousel.querySelectorAll('.carousel__cell');
	console.log(carousel.offsetHeight);
	cellWidth = carousel.offsetWidth;
	cellHeight = carousel.offsetHeight;

	window.changeCarousel();
};
window.addInteractiveDeckHandlers = function() {
	//alert("Interactive deck");
    console.log("Interactive deck");

	
	initVars();

	var prevButton = document.querySelector('.previous-button');
	prevButton.addEventListener( 'click', function() {
		selectedIndex--;
		rotateCarousel();
	});

	var nextButton = document.querySelector('.next-button');
	nextButton.addEventListener( 'click', function() {
		selectedIndex++;
		rotateCarousel();
	});

	var flipButton = document.querySelector('.flip-button');
		flipButton.addEventListener( 'click', function() {
		flipCarousel();
	});

	var spinButton = document.querySelector('.spin-button');
	spinButton.addEventListener( 'click', function() {
		selectedIndex += Math.floor(Math.random()*cellCount)+1;
		rotateCarousel();
		if(Math.random() >= 0.5)
		  flipCarousel();
	});
};


window.changeCarousel = function () {
    theta = 360 / cellCount;
    var cellSize = isHorizontal ? cellWidth : cellHeight;
    radius = Math.round( ( cellSize / 2) / Math.tan( Math.PI / cellCount ) );
    for ( var i=0; i < cells.length; i++ ) {
      var cell = cells[i];
      if ( i < cellCount ) {
        // visible cell
        cell.style.opacity = 1;
        var cellAngle = theta * i;
        cell.style.transform = rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
        cell.style.webkitTransform = rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
      } else {
        // hidden cell
        cell.style.opacity = 0;
        cell.style.transform = 'none';
        cell.style.webkitTransform = 'none';
      }
    }

    rotateCarousel();
};

window.rotateCarousel = function() {
    var angle = theta * selectedIndex * -1;
    carousel.style.transform = 'translateZ(' + -radius + 'px) ' + 
      rotateFn + '(' + angle + 'deg)';
    carousel.style.webkitTransform = 'translateZ(' + -radius + 'px) ' + 
      rotateFn + '(' + angle + 'deg)';
 };

window.flipCarousel = function() {
    var cards = document.querySelectorAll('.oracle__card');
    for ( var i=0; i < cards.length; i++ ) {
      cards[i].classList.toggle('is-flipped');
    }
    var cardFront = document.querySelectorAll('.card__face--front');
    for ( var i=0; i < cardFront.length; i++ ) {
    //  cardFront[i].style.setAttribute ("display", "none");
    // cardFront[i].style.setProperty ("display", "none", null);
    }
    scope = (scope == 'Stages') ? 'States' : 'Stages';
    var scopeText = document.querySelector('.scope-text');
    scopeText.innerHTML = scope;

};