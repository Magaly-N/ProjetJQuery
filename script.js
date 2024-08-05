$(function () {

    // Declare variables
    var $mainMenuItems = $('#main-menu ul').children('li'), // Select all 'li' elements that are children of '#main-menu ul'
        totalMainMenuItems = $mainMenuItems.length, // Get the number of main menu items
        openedIndex = 2, // Variable to keep track of the currently opened index, initialized to 2 (the item at index 2 is initially open)

        // Initialize the menu
        init = function () {
            // Bind click events to menu items
            bindEvents();
            // If the openedIndex is valid, animate the item to open it
            if (validIndex(openedIndex)) {
                animateItem($mainMenuItems.eq(openedIndex), true, 700);
            }
        },

        // Bind click events to menu items
        bindEvents = function () {
            // Add click event handler to children with class '.img' within main menu items
            $mainMenuItems.children('.img').click(function () {
                var newIndex = $(this).parent().index(); // Get the index of the clicked item
                checkAndAnimateItem(newIndex);
            });

            // Add hover effect to buttons
            $(".button").hover(
                function () {
                    $(this).addClass("hovered"); // Add 'hovered' class when the mouse enters the button
                },
                function () {
                    $(this).removeClass("hovered"); // Remove 'hovered' class when the mouse leaves the button
                }
            );

            // Add click event handler to buttons
            $(".button").click(function () {
                var newIndex = $(this).index(); // Get the index of the clicked button
                checkAndAnimateItem(newIndex);
            });
        };

    // Function to validate if the index is within the range of menu items
    validIndex = function (indexToCheck) {
        return (indexToCheck >= 0) && (indexToCheck < totalMainMenuItems); // Check if the index is within the valid range
    }

    // Function to animate menu items
    animateItem = function ($item, toOpen, speed) {
        var $colorImage = $item.find('.color'); // Find the '.color' element within the item
        // Set animation parameters based on whether the item is being opened or closed
        var itemParam = toOpen ? { width: "420px" } : { width: "140px" };
        var colorImageParam = toOpen ? { left: "0px" } : { left: "140px" };
        // Animate the '.color' element
        $colorImage.animate(colorImageParam, speed);
        // Animate the item itself
        $item.animate(itemParam, speed);
    },

        // Function to check the clicked item and animate it
        checkAndAnimateItem = function (indexToCheckAndAnimate) {
            // Check if the clicked item is already open
            if (openedIndex === indexToCheckAndAnimate) {
                // If it's already open, animate to close the item
                animateItem($mainMenuItems.eq(indexToCheckAndAnimate), false, 250);
                openedIndex = -1; // Reset the openedIndex since no item is open
            } else {
                // If the clicked item is different from the opened one
                if (validIndex(indexToCheckAndAnimate)) { // Validate the new index
                    // Animate to close the currently opened item
                    animateItem($mainMenuItems.eq(openedIndex), false, 250);
                    openedIndex = indexToCheckAndAnimate; // Update the openedIndex to the new one
                    // Animate to open the clicked item
                    animateItem($mainMenuItems.eq(openedIndex), true, 250);
                }
            }
        };

    // Call the init function to set up the menu
    init();

});
