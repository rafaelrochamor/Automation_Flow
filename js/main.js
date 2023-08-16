document.addEventListener('DOMContentLoaded', () => {
    const inicioFluxo = document.getElementById('inicio-fluxo');
    const fluxoTitle = document.querySelector('.title h1');
    const publishButton = document.querySelector('.publish-button');

    let offsetX, offsetY, dragging = false;

    
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


