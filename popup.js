document.addEventListener('DOMContentLoaded', () => {
  const statusContentElement = document.getElementById('status-content');
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
      const horarios = [...contentText.matchAll(horarioRegex)].map(m => m[0]);

      // Remover duplicados
      const horariosUnicos = [...new Set(horarios)];

      if (horariosUnicos.length > 0) {
        let mensagem = '';
        const agora = new Date();

        horariosUnicos.forEach((hora, index) => {
          const [h, m] = hora.split('h').map(Number);
          const horarioData = new Date();
          horarioData.setHours(h, m, 0, 0);

          if (horarioData < agora) {
            // Já passou
            mensagem += `<div style="opacity: 0.5; text-decoration: line-through;">${index === 0 ? 'Içamento programado para' : 'Outro içamento previsto'}: ${hora} (Concluído)</div>`;
          } else {
            // Futuro
            mensagem += `<div>${index === 0 ? 'Içamento programado para' : 'Outro içamento previsto'}: ${hora}</div>`;
          }
        });

        statusContentElement.innerHTML = mensagem;
      } else {
        statusContentElement.textContent = "Nenhum horário de içamento encontrado.";
      }
    })
    .catch(error => {
      statusContentElement.textContent = `Erro ao carregar o status: ${error.message}`;
      console.error('Erro na extensão:', error);
    });
});
