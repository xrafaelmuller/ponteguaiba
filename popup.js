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
    if (!matches || !matches.length) {
      return [];
    }

    return [...new Set(matches)] // remove duplicados
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

    if (!horarios.length) {
      toggleBridgeAnimation(false);
      return `
        <div class="status-item status-empty">
          <strong>Sem içamentos de ponte programados para hoje.</strong>
        </div>
      `;
    }

    const proximo = horarios.find(h => h.data > agora);
    toggleBridgeAnimation(!!proximo);

    return horarios.map(h => {
      let label;
      let extraClass = '';

      if (h.data < agora) {
        label = 'Içamento concluído';
      } else if (proximo && h.data.getTime() === proximo.data.getTime()) {
        label = 'Próximo içamento';
        extraClass = ' proximo';
      } else {
        label = 'Içamento programado';
      }

      const horaFormatada = h.data.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      });

      return `
        <div class="status-item${extraClass}">
          <div class="status-label">${label}</div>
          <div class="status-time">${horaFormatada}</div>
        </div>
      `;
    }).join('');
  }

  function carregarHorariosSalvos() {
    try {
      const dados = localStorage.getItem('horariosSalvos');
      if (!dados) return [];
      const arr = JSON.parse(dados);
      return arr.map(hora => {
        const [h, m] = hora.split('h').map(Number);
        const d = new Date();
        d.setHours(h, m, 0, 0);
        return { texto: hora, data: d };
      });
    } catch (e) {
      console.warn('Erro ao carregar horários salvos:', e);
      return [];
    }
  }

  function salvarHorariosSeMudaram(novosHorarios) {
    const antigos = carregarHorariosSalvos().map(h => h.texto);
    const novos = novosHorarios.map(h => h.texto);

    const iguais =
      antigos.length === novos.length &&
      antigos.every((h, i) => h === novos[i]);

    if (iguais || !novos.length) return;

    const aviso = document.createElement('div');
    aviso.className = 'status-item atualizado';
    aviso.innerHTML = '<strong>Horários atualizados!</strong>';
    statusContent.prepend(aviso);

    localStorage.setItem('horariosSalvos', JSON.stringify(novos));
  }

  // Mostra, se existir, os horários salvos localmente enquanto carrega
  const salvos = carregarHorariosSalvos();
  if (salvos.length) {
    statusContent.innerHTML = gerarHtmlHorarios(salvos);
  } else {
    statusContent.textContent = 'Carregando...';
  }

  // Faz o fetch da página da CCR
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Status HTTP ${res.status}`);
      }
      return res.text();
    })
    .then(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');

      // Tenta achar especificamente o bloco de "Içamento da ponte do Guaíba"
      let alvo = null;
      const possiveisBlocos = Array.from(
        doc.querySelectorAll('section, article, div')
      );

      for (const el of possiveisBlocos) {
        const texto = (el.textContent || '').toLowerCase();
        if (texto.includes('içamento da ponte do guaíba')) {
          alvo = el;
          break;
        }
      }

      const textoParaProcurar = (alvo || doc.body).textContent.toLowerCase();
      const matches = textoParaProcurar.match(horarioRegex);
      const horarios = formatHorarios(matches);

      statusContent.innerHTML = gerarHtmlHorarios(horarios);
      salvarHorariosSeMudaram(horarios);
    })
    .catch(err => {
      toggleBridgeAnimation(false);
      statusContent.innerHTML = `
        <div class="status-item">
          Erro ao carregar o status:
          <strong>${err.message}</strong>
        </div>
      `;
      console.error('Erro na extensão:', err);
    });
});
