function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeButtonColor(event) {
    const button = event.target;
    const randomColor = getRandomColor();
    button.style.backgroundColor = randomColor;
    
    const r = parseInt(randomColor.substr(1, 2), 16);
    const g = parseInt(randomColor.substr(3, 2), 16);
    const b = parseInt(randomColor.substr(5, 2), 16);
    
    if (r * 0.299 + g * 0.587 + b * 0.114 < 128) {
        button.style.color = '#FFFFFF';
    } else {
        button.style.color = '#000000';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    const buttons = document.querySelectorAll('.color-button');
    
        buttons.forEach(button => {
        button.addEventListener('click', changeButtonColor);
    });
});