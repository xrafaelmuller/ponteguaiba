document.addEventListener('DOMContentLoaded', () => {
  const statusContentElement = document.getElementById('status-content');
  const url = 'https://rodovias.grupoccr.com.br/viasul/';
  const keywords = ["guaíba", "ponte", "içamento", "atualização", "horário previsto"];

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

      let foundInfo = "Informação sobre o içamento da Ponte do Guaíba não encontrada ou não contextualizada.";

      const tagsToSearch = ['p', 'div', 'span', 'section', 'article'];
      for (const tag of tagsToSearch) {
        const elements = doc.querySelectorAll(tag);
        for (const element of elements) {
          const text = (element.textContent || '').trim().toLowerCase();
          // Checa se há qualquer keyword ou padrão de horário
          if (keywords.some(k => text.includes(k)) || /\d{2}h\d{2}/.test(text)) {
            foundInfo = element.textContent.trim();
            break;
          }
        }
        if (foundInfo !== "Informação sobre o içamento da Ponte do Guaíba não encontrada ou não contextualizada.") {
          break;
        }
      }

      statusContentElement.textContent = foundInfo;
    })
    .catch(error => {
      statusContentElement.textContent = `Erro ao carregar o status: ${error.message}`;
      console.error('Erro na extensão:', error);
    });
});
