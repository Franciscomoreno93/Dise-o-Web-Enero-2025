document.addEventListener("DOMContentLoaded", () => {
    const box = document.getElementById("colorBox");

    function getRandomColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

    box.addEventListener("mouseenter", () => {
        box.style.backgroundColor = getRandomColor();
    });

    box.addEventListener("mouseleave", () => {
        box.style.backgroundColor = getRandomColor();
    });
});
