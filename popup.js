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

      const tagsToSearch = ['p', 'div', 'span', 'section', 'article'];
      const matchedTexts = new Set(); // evita duplicados

      for (const tag of tagsToSearch) {
        const elements = doc.querySelectorAll(tag);
        for (const element of elements) {
          const text = (element.textContent || '').trim();
          const textLower = text.toLowerCase();

          if (keywords.some(k => textLower.includes(k)) || /\d{2}h\d{2}/.test(textLower)) {
            if (text.length > 3) matchedTexts.add(text);
          }
        }
      }

      if (matchedTexts.size > 0) {
        statusContentElement.innerHTML = [...matchedTexts]
          .map(t => `<p>${t}</p>`)
          .join('');
      } else {
        statusContentElement.textContent = "Informação sobre o içamento da Ponte do Guaíba não encontrada ou não contextualizada.";
      }
    })
    .catch(error => {
      statusContentElement.textContent = `Erro ao carregar o status: ${error.message}`;
      console.error('Erro na extensão:', error);
    });
});
