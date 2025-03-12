let lastPosition = { x: 0, y: 0 };

function trackMouseMovement(event) {
    
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    if (lastPosition.x !== mouseX || lastPosition.y !== mouseY) {
  
        lastPosition.x = mouseX;
        lastPosition.y = mouseY;
        
      
        console.log(`Posición del ratón: X: ${mouseX}, Y: ${mouseY}`);
    }
}

document.addEventListener('mousemove', trackMouseMovement);

console.log('Rastreador de movimieno.');
console.log('Para ver las coordenadas en la consola.');