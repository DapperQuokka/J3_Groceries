var carouselTimerChange;
var carouselTimerPause;

function toggleSlide(direction, firstLoad) {
  if (firstLoad == false) {
    // Reset timer
    clearTimeout(carouselTimerChange);
    clearTimeout(carouselTimerPause);

    // Get elements
    var elements = document.getElementsByClassName("hideable");

    // Get visible element, set to not display
    var visibleID = -1;
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].style.display == "inline-block") {
        visibleID = i;
      }
    }
    elements[visibleID].style.display = "none";

    var makeVisible;
    if (!direction) {
      // If direction is false (back)
      if (visibleID == 0) {
        makeVisible = elements.length - 1;
      } else {
        makeVisible = visibleID - 1;
      }
    } else {
      // If direction is true (forwards)
      if (visibleID == elements.length - 1) {
        makeVisible = 0;
      } else {
        makeVisible = visibleID + 1;
      }
    }

    elements[makeVisible].style.display = "inline-block"; 
    makeVisible + 1;
  }

  carouselTimerFunction();
}

function carouselTimerFunction() {
  // Timer to switch slide
	carouselTimerChange = window.setTimeout(function() {
		toggleSlide(true, false);
		carouselTimerPauseFunction();
	}, 2500);
}

function carouselTimerPauseFunction() {
  // Timer to pause carousel on slide
	carouselTimerPause = window.setTimeout(function() {
		carouselTimerFunction();
	}, 2500);
}