/*
smooth scroll function for scrolling from
top of Home Page down to How it Works section
*/

function smoothScroll(target, duration) {
    var target = document.querySelector(target); //finds the target (How it Works section) on the page
    var targetPosition = target.getBoundingClientRect().top; //gets target's position
    var startPosition = window.pageYOffset; //gets starting position when button is pressed
    var distance = targetPosition - startPosition; //calculates distance between start and target
    var startTime = null;

    //function to scroll from starting position to the target
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    //easing function to animate the scrolling
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    requestAnimationFrame(animation);
}

//calls the function when the How it Works button is pressed
var HIWbutton = document.querySelector('.HIW-button');
HIWbutton.addEventListener('click', function () {
    smoothScroll('.HIW-title', 1000);
});

