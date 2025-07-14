document.addEventListener('DOMContentLoaded', () => {
  const statusContentElement = document.getElementById('status-content');
  const url = 'https://rodovias.grupoccr.com.br/viasul/';
  const keywords = ["guaíba", "ponte", "içamento", "atualização"];

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

      // Equivalente à lógica do Beautiful Soup no Python
      const tagsToSearch = ['p', 'div', 'span'];
      for (const tag of tagsToSearch) {
        const elements = doc.querySelectorAll(tag);
        for (const element of elements) {
          const textContent = (element.textContent || '').trim().toLowerCase();
          if (keywords.some(keyword => textContent.includes(keyword))) {
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