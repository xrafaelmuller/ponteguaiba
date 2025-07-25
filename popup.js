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
        let mensagem = `Içamento programado para: ${horariosUnicos[0]}`;
        if (horariosUnicos.length > 1) {
          for (let i = 1; i < horariosUnicos.length; i++) {
            mensagem += `<br>Outro içamento previsto: ${horariosUnicos[i]}`;
          }
        }
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
