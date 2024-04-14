// Function to display the title using a typewriter effect
export default function title_render() {
    const text = "Conway's Game of Life";
    let i = 0;
    const speed = 150; // Typing speed in milliseconds
    const typewriterText = document.getElementById('typewriter-text');

    function typeWriter() {
        if (i < text.length) {
            typewriterText.innerHTML += text.charAt(i++);
            setTimeout(typeWriter, speed);
        }
    }
    typeWriter();
};