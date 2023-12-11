$(document).ready(function() {
    function animateCar() {
        $("#car").css("left", "-100px"); // Start off-screen
        $("#car").animate({
            left: $(window).width()
        }, 5000, function() {
            animateCar(); // Repeat the animation
        });
    }

    animateCar(); // Start the animation
});
