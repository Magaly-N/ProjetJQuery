$(function () {

    // Declare variables
    var $mainMenuItems = $('#main-menu ul').children('li'), // Select all 'li' elements that are children of '#main-menu ul'
        totalMainMenuItems = $mainMenuItems.length, // Get the number of main menu items
        openedIndex = 2, // Variable to keep track of the opened index, initialized to 2 (item at index 2 is initially open)

        // Initialize the menu
        init = function () {
            // Bind click events to menu items
            bindEvents();
            // If the openedIndex is valid, animate the item to open it
            if (validIndex(openedIndex))
                animateItem($mainMenuItems.eq(openedIndex), true, 700);
        },

        // Bind click events to menu items
        bindEvents = function () {
            // Add click event handler to children with class '.img' within main menu items
            $mainMenuItems.children('.img').click(function () {
                var newIndex = $(this).parent().index(), // Get the index of the clicked item
                    $item = $mainMenuItems.eq(newIndex); // Get the clicked item based on the index

                // Check if the clicked item is already open
                if (openedIndex === newIndex) {
                    // If it's open, animate to close the item
                    animateItem($item, false, 250);
                    openedIndex = -1; // Reset the openedIndex since no item will be open
                } else {
                    // If the clicked item is different from the opened one
                    if (validIndex(newIndex)) { // Validate the new index
                        // Animate to close the currently opened item
                        animateItem($mainMenuItems.eq(openedIndex), false, 250);
                        openedIndex = newIndex; // Update the openedIndex to the new one
                        // Animate to open the clicked item
                        animateItem($item, true, 250);
                    }
                }
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
        itemParam = toOpen ? { width: "420px" } : { width: "140px" };
        colorImageParam = toOpen ? { left: "0px" } : { left: "140px" };
        // Animate the '.color' element
        $colorImage.animate(colorImageParam, speed);
        // Animate the item itself
        $item.animate(itemParam, speed);
    };

    // Call the init function to set up the menu
    init();

});
