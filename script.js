// Palo section functionality

// Add event listeners for interactive elements in the Palo section
const paloSection = document.querySelector('#palo');

if (paloSection) {
    const interactiveElements = paloSection.querySelectorAll('.interactive');

    interactiveElements.forEach(element => {
        element.addEventListener('click', () => {
            // Add functionality here
            console.log(`Clicked on: ${element.id}`);
            // Implement any animations or reveal functions if needed
        });
    });

    // Ensure all animations and reveal functions work properly
    // Example animation function
    function animatePaloSection() {
        paloSection.classList.add('animate');
        // More animation logic as needed
    }
    animatePaloSection(); // Call the function to trigger animation
}