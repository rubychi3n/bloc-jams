    // #5  remove DOM selector 
    // var pointsArray = document.getElementsByClassName('point');
var animatePoints = function () {
    var revealPoint = function() {
    // #7
    // no need for vendor prefixes on transform property 
    // css () to replace for style property instances 
    // $(this) references a different .point element each time jQuery executes revealPoint ()
        $(this).css({
            opacity: 1,
            transform: 'scaleX(1) translateY(0)'
        });
    };
    // #6 
    // .each () iterates over each .point element and executes the revealPoint callback function
    $.each($('.point'), revealPoint);
};

// window is now a jQuery object 
// load is a jQuery method for onload

$(window).load(function() {
    // #1
    // height() instead of innnerHeight
    // remove pointsArray

    if ($(window).height() > 950) {
        animatePoints();
    }
    // #2 
    // no need for another separate variable to hold .sellingPoints
    // .offset() instead of getBoundingClientRect
    var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;

    // #3
    // jQuery obscures the appearance of events
    // scroll is still an event handler
    $(window).scroll(function(event) {

    // $4 
    // replace document.documentElement.scrollTop || document.body.scrollTop with scrollTop 
        if ($(window).scrollTop() >= scrollDistance) {
            animatePoints();
        }
    });
});




//  vanilla JS

// var pointsArray = document.getElementsByClassName('point');
// var animatePoints = function (points) {
//     var revealPoint = function (index) {
//         points[index].style.opacity = 1;
//         points[index].style.transform = "scaleX(1) translateY(0)";
//         points[index].style.msTransform = "scaleX(1) translateY(0)";
//         points[index].style.WebkitTransform = "scaleX(1) translateY(0)";
//     }

//     for (var i = 0; i < points.length; i++) {
//         revealPoint(i);
//     }

// };

//  if (window.innerHeight > 950) {
//     animatePoints(pointsArray);
// }
// var sellingPoints = document.getElementsByClassName('selling-points')[0];
// var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
// window.addEventListener('scroll', function (event) {
//     if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
//         animatePoints(pointsArray);

