document.addEventListener('DOMContentLoaded', () => {
    const inicioFluxo = document.getElementById('inicio-fluxo');
    const fluxoTitle = document.querySelector('.title h1');
    const publishButton = document.querySelector('.publish-button');

    

    
    
    

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
    
    /*Add a borda azul do card do Início*/
   document.addEventListener("mousedown", function(event) {
    var clickedCard = event.target.closest(".flow-card-start");
    var allCards = document.querySelectorAll(".flow-card-start");

    allCards.forEach(function(card) {
        card.classList.remove("active");
    });

    if (clickedCard) {
        clickedCard.classList.add("active");
    }
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



  /* Função para selecionar e arrastar na tela*/  
    let isDragging = false;
    let initialX, initialY;

    function toggleSelected(button) {
      button.classList.toggle("selected");
    }

    document.addEventListener("dragstart", function (event) {
      if (event.target.classList.contains("sidebar-button")) {
        isDragging = true;
        initialX = event.clientX;
        initialY = event.clientY;
      }
    });

    document.addEventListener("dragend", function (event) {
      isDragging = false;
    });

    document.addEventListener("dragover", function (event) {
      event.preventDefault();
      if (isDragging) {
        const deltaX = event.clientX - initialX;
        const deltaY = event.clientY - initialY;
        initialX = event.clientX;
        initialY = event.clientY;
        const button = document.querySelector(".sidebar-button.selected");
        if (button) {
          const rect = button.getBoundingClientRect();
          button.style.top = rect.top + deltaY + "px";
          button.style.left = rect.left + deltaX + "px";
        }
      }
    });

    
    /* Adiciona o Card de Envio de Texto na tela com 2 cliques*/
    let clickCount = 0;

    document.querySelector(".sidebar-button").addEventListener("click", function () {
      clickCount++;
      if (clickCount === 2) {
        const newCard = createNewCard();
        document.body.appendChild(newCard); // Adicione o novo card ao body
        clickCount = 0; // Reset do contador
      }
    });
    
    function createNewCard() {
      const newCard = document.createElement("div");
      newCard.className = "flow-card-sendtext";
      newCard.innerHTML = `
        <div class="card-group">
        <i class="fa-regular fa-circle-play"></i> 
        <div style="display: flex; flex-direction:column">
        <span class="card-title"> Enviar Mensagem</span>
        <span class="card-subtitle"> Texto</span>
        </div>
        <i class="fa-regular fa-circle-question question-icon"></i>
        
        <textarea id="textarea" name="textarea" rows="8" cols="50" style="margin-top: 5px; margin-left: 9px; margin-right: 9px; border: 1px solid #ccc;"></textarea>
        
        <!-- Ícone de lixeira oculto por padrão -->
        <i class="fa-solid fa-trash-alt delete-icon" style="display: none;"></i>     
      `;

      return newCard;
    }
  

   /* Move o Card de Envio de texto pela Tela */    
   function activateElement(element) {
       activeElement = element;
       offsetX = event.clientX - activeElement.getBoundingClientRect().left;
       offsetY = event.clientY - activeElement.getBoundingClientRect().top;
       activeElement.style.zIndex = 1; // Trazer o elemento para frente
       activeElement.style.cursor = "grabbing"; // Mudar o cursor para "grabbing"
   }
   
   document.addEventListener("mousedown", function(event) {
       if (event.target.closest(".flow-card-sendtext")) {
           activateElement(event.target.closest(".flow-card-sendtext"));
       }
   });
   
   document.addEventListener("mousemove", function(event) {
       if (activeElement) {
           var x = event.clientX - offsetX;
           var y = event.clientY - offsetY;
           activeElement.style.left = x + "px";
           activeElement.style.top = y + "px";
       }
   });
   
   document.addEventListener("mouseup", function() {
       if (activeElement) {
           activeElement.style.zIndex = -1; // Retornar ao z-index original
           activeElement.style.cursor = "grab"; // Restaurar o cursor padrão
           activeElement = null;
       }
   });
   

/*Add a borda azul do card de Envio de texto*/
document.addEventListener("mousedown", function(event) {
  var clickedCard = event.target.closest(".flow-card-sendtext");
  var allCards = document.querySelectorAll(".flow-card-sendtext");

  allCards.forEach(function(card) {
    card.classList.remove("active");
    const deleteIcon = card.querySelector(".delete-icon");
    if (deleteIcon) {
      deleteIcon.style.display = "none";
    }
  });
  
/*Após add a borda Azul adiciona a lixeira no topo do Card*/
  if (clickedCard) {
    clickedCard.classList.add("active");
    const deleteIcon = clickedCard.querySelector(".delete-icon");
    if (deleteIcon) {
      deleteIcon.style.display = "block";
    }
  }
});


/*Remove o Card Envio de Texto ao clicar na Lixeira*/
document.addEventListener("click", function(event) {
  var deleteIcon = event.target.closest(".delete-icon");
  if (deleteIcon) {
      var card = deleteIcon.closest(".flow-card-sendtext");
      if (card) {
          card.remove(); // Remove o card quando o ícone de lixeira for clicado
      }
  }
});


let offsetX, offsetY, dragging = false;
    
    /*Aplica o Zoom nos Cards*/
    const zoomInButton = document.querySelector('.zoom-in');
    const zoomOutButton = document.querySelector('.zoom-out');
    /*const flowCardStart = document.querySelector('.flow-card-start');*/
    const flowCardSendText = document.querySelector('.flow-card-sendtext');
    
    let currentScale = 1; // Valor inicial da escala
    const maxZooms = 5; // Máximo de zooms permitidos
    
    zoomInButton.addEventListener('click', () => {
      if (currentScale < 1.5) { // Verifica se a escala não ultrapassa o limite
        currentScale += 0.1; // Incrementa o valor da escala
        applyZoom(currentScale); // Aplica o zoom aos cards
      }
    });
    
    zoomOutButton.addEventListener('click', () => {
      if (currentScale > 0.6) { // Verifica se a escala não ultrapassa o limite
        currentScale -= 0.1; // Decrementa o valor da escala
        applyZoom(currentScale); // Aplica o zoom aos cards
      }
    });
    
    function applyZoom(scale) {
     /* flowCardStart.style.transform = `scale(${scale})`; // Aplica a nova escala ao card de início*/
      flowCardSendText.style.transform = `scale(${scale})`; // Aplica a nova escala ao card de envio de texto
    }


});


