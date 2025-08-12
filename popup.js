document.addEventListener('DOMContentLoaded', () => {
  const statusContentElement = document.getElementById('status-content');
  // NOVO: Seleciona os elementos da ponte para animar
  const leftDeck = document.querySelector('.bridge-deck.left');
  const rightDeck = document.querySelector('.bridge-deck.right');
  
  const url = 'https://rodovias.grupoccr.com.br/viasul/';
  const horarioRegex = /\b\d{2}h\d{2}\b/g;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const contentText = doc.body.textContent.toLowerCase();
      
      const horariosMatch = contentText.match(horarioRegex);
      if (!horariosMatch) {
        statusContentElement.innerHTML = '<div class="status-item">Nenhum horário de içamento encontrado.</div>';
        // NOVO: Garante que a ponte não esteja animando se não houver horários
        leftDeck.classList.remove('lifting');
        rightDeck.classList.remove('lifting');
        return;
      }

      const horariosOrdenados = [...new Set(horariosMatch)]
        .map(horaStr => {
          const [h, m] = horaStr.split('h').map(Number);
          const data = new Date();
          data.setHours(h, m, 0, 0);
          return { texto: horaStr, data: data };
        })
        .sort((a, b) => a.data - b.data);

      const agora = new Date();

      // NOVO: Lógica para controlar a animação
      // Verifica se existe pelo menos um içamento futuro na lista
      const hasUpcomingLift = horariosOrdenados.some(horario => horario.data > agora);

      if (hasUpcomingLift) {
        // Se houver, adiciona a classe que inicia a animação
        leftDeck.classList.add('lifting');
        rightDeck.classList.add('lifting');
      } else {
        // Se não houver (todos já passaram), remove a classe para parar a animação
        leftDeck.classList.remove('lifting');
        rightDeck.classList.remove('lifting');
      }
      
      const mensagensHtml = horariosOrdenados.map((horario, index) => {
        const isConcluido = horario.data < agora;
        const proximoIçamento = horariosOrdenados.find(h => h.data > agora);
        let label = 'Içamento';

        if(isConcluido) {
            label = 'Içamento concluído';
        } else if (horario === proximoIçamento) {
            label = 'Próximo içamento';
        } else {
            label = 'Içamento previsto';
        }
        
        if (isConcluido) {
          return `<div class="status-item concluido">${label}: <strong>${horario.texto}</strong></div>`;
        } else {
          return `<div class="status-item">${label}: <strong>${horario.texto}</strong></div>`;
        }
      });

      statusContentElement.innerHTML = mensagensHtml.join('');

    })
    .catch(error => {
      statusContentElement.innerHTML = `<div class="status-item">Erro ao carregar o status: <strong>${error.message}</strong></div>`;
      console.error('Erro na extensão:', error);
    });
});