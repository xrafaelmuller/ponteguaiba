document.addEventListener('DOMContentLoaded', () => {
  const statusContent = document.getElementById('status-content');
  const leftDeck = document.querySelector('.bridge-deck.left');
  const rightDeck = document.querySelector('.bridge-deck.right');

  const url = 'https://rodovias.grupoccr.com.br/viasul/';
  const horarioRegex = /\b\d{2}h\d{2}\b/g;

  function toggleBridgeAnimation(active) {
    [leftDeck, rightDeck].forEach(deck =>
      deck.classList.toggle('lifting', active)
    );
  }

  function formatHorarios(matches) {
    return [...new Set(matches)]
      .map(hora => {
        const [h, m] = hora.split('h').map(Number);
        const date = new Date();
        date.setHours(h, m, 0, 0);
        return { texto: hora, data: date };
      })
      .sort((a, b) => a.data - b.data);
  }

  function gerarHtmlHorarios(horarios) {
    const agora = new Date();
    const proximo = horarios.find(h => h.data > agora);

    return horarios.map(h => {
      let label = h.data < agora ? 'Içamento concluído' :
                  h === proximo ? 'Próximo içamento' :
                  'Içamento previsto';
      const concluidoClass = h.data < agora ? ' concluido' : '';
      return `<div class="status-item${concluidoClass}">${label}: <strong>${h.texto}</strong></div>`;
    }).join('');
  }

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
      return res.text();
    })
    .then(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const matches = doc.body.textContent.toLowerCase().match(horarioRegex);

      if (!matches) {
        statusContent.innerHTML = '<div class="status-item">Nenhum horário de içamento encontrado.</div>';
        toggleBridgeAnimation(false);
        return;
      }

      const horarios = formatHorarios(matches);
      toggleBridgeAnimation(horarios.some(h => h.data > new Date()));
      
const horariosAntigos = JSON.parse(localStorage.getItem('horariosSalvos') || '[]');
const novosHorarios = horarios.map(h => h.texto);
const houveMudanca = JSON.stringify(horariosAntigos) !== JSON.stringify(novosHorarios);

if (houveMudanca) {
    const aviso = document.createElement('div');
    aviso.className = 'status-item atualizado';
    aviso.innerHTML = '<strong>Horários atualizados!</strong>';
    statusContent.prepend(aviso);
    localStorage.setItem('horariosSalvos', JSON.stringify(novosHorarios));
}

statusContent.innerHTML = gerarHtmlHorarios(horarios);
    })
    .catch(err => {
      statusContent.innerHTML = `<div class="status-item">Erro ao carregar o status: <strong>${err.message}</strong></div>`;
      console.error('Erro na extensão:', err);
    });
});
