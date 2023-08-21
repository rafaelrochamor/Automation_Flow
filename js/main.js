document.addEventListener('DOMContentLoaded', () => {
    const inicioFluxo = document.getElementById('inicio-fluxo');
    const fluxoTitle = document.querySelector('.title h1');
    const publishButton = document.querySelector('.publish-button');

    let offsetX, offsetY, dragging = false;

    
    const zoomInButton = document.querySelector('.zoom-in');
    const zoomOutButton = document.querySelector('.zoom-out');
    const flowCard = document.querySelector('.flow-card-start');
    
    let currentScale = 1; // Valor inicial da escala
    const maxZooms = 5; // Máximo de zooms permitidos
    
    zoomInButton.addEventListener('click', () => {
      if (currentScale < 1.5) { // Verifica se a escala não ultrapassa o limite
        currentScale += 0.1; // Incrementa o valor da escala
        flowCard.style.transform = `scale(${currentScale})`; // Aplica a nova escala
      }
    });
    
    zoomOutButton.addEventListener('click', () => {
      if (currentScale > 0.6) { // Verifica se a escala não ultrapassa o limite
        currentScale -= 0.1; // Decrementa o valor da escala
        flowCard.style.transform = `scale(${currentScale})`; // Aplica a nova escala
      }
    });
    
    

    inicioFluxo.addEventListener('mousedown', e => {
        if (e.button !== 0) return;
    
        if (!inicioFluxo.classList.contains('active')) {
            inicioFluxo.classList.add('active');
          
        }
    
        offsetX = e.clientX - inicioFluxo.getBoundingClientRect().left;
        offsetY = e.clientY - inicioFluxo.getBoundingClientRect().top;
        dragging = true;
    
        e.preventDefault();
    });
    

    document.addEventListener('mousemove', e => {
        if (!dragging) return;

        inicioFluxo.style.left = e.clientX - offsetX + 'px';
        inicioFluxo.style.top = e.clientY - offsetY + 'px';
    });

    document.addEventListener('mouseup', () => {
        dragging = false;
    });

    document.addEventListener('click', event => {
        if (!inicioFluxo.contains(event.target)) {
            inicioFluxo.classList.remove('active');
        }
    });

    publishButton.addEventListener('click', () => {
        const title = fluxoTitle.textContent;
        alert(`Publicando fluxo com título: ${title}`);
    });

    
    


});


