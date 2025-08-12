# 🌉 Status Ponte do Guaíba - Extensão para Chrome

Esta extensão para Chrome oferece atualizações rápidas sobre o status de içamento da **Ponte do Guaíba**, com base nas informações fornecidas pela CCR ViaSul. Obtenha os horários diretamente no seu navegador!

---

## ✨ Recursos

* **Status em Tempo Real**: Busca e exibe os horários de içamento da Ponte do Guaíba.
* **Animação da Ponte**: Uma animação CSS exibe a ponte se abrindo e fechando quando há içamentos previstos para o dia.
* **Status Inteligente**: Classifica e exibe os horários como "Próximo içamento", "Içamento previsto" ou "Içamento concluído".
* **Interface Moderna**: Design limpo e agradável para uma melhor experiência de usuário.
* **Marca d'água "Feito por RMS"**: Um toque pessoal e sutil no popup da extensão.

---

## 🚀 Instalação

Siga estes passos para carregar a extensão no seu Chrome:

1.  **Baixe os arquivos:**
    * `manifest.json`
    * `popup.html`
    * `popup.js`
    * `style.css`
    * *(Opcional)* `img/icon16.png`, `img/icon48.png`, `img/icon128.png` (para os ícones da extensão)
    Coloque todos os arquivos e a pasta `img` dentro de um único diretório (ex: `status-ponte-guaiba-extensao`).

2.  **Abra a página de Extensões do Chrome:**
    * Digite `chrome://extensions` na barra de endereço do Chrome e pressione Enter.

3.  **Habilite o Modo Desenvolvedor:**
    * Ative a opção **"Modo de desenvolvedor"**, geralmente localizada no canto superior direito da página.

4.  **Carregue a extensão descompactada:**
    * Clique no botão **"Carregar sem compactação"**.
    * Navegue até a pasta onde você salvou os arquivos da extensão e a selecione.

5.  **Fixe a extensão (Opcional):**
    * Para acesso fácil, clique no ícone de quebra-cabeça (Extensões) na barra de ferramentas do Chrome e, em seguida, clique no ícone de pino ao lado de "Status Ponte do Guaiba".

---

## 💡 Como Usar

Basta clicar no ícone da extensão **Status Ponte do Guaiba** na barra de ferramentas do seu Chrome. Um pequeno popup aparecerá, mostrando as informações mais recentes sobre os horários de içamento da ponte, diretamente do site da CCR ViaSul.

---

## ⚙️ Como Funciona

A extensão opera da seguinte forma:

1.  Faz uma requisição assíncrona (`fetch`) para o site da CCR ViaSul (`https://rodovias.grupoccr.com.br/viasul/`).
2.  Analisa o conteúdo HTML retornado usando o `DOMParser` do JavaScript.
3.  Busca por horários no formato `(XXhXX)` e os organiza em ordem cronológica.
4.  Verifica o horário atual para determinar se um içamento já foi concluído, é o próximo ou está previsto.
5.  Ativa uma animação visual da ponte caso existam içamentos futuros no dia.
6.  Exibe os horários formatados diretamente no popup da extensão.

**Permissões de Host (`host_permissions`):** A permissão no `manifest.json` é crucial para que a extensão possa acessar o conteúdo do site da CCR ViaSul, contornando as políticas de segurança de Cross-Origin Resource Sharing (CORS).

---

## 🛠️ Tecnologias Utilizadas

* **HTML**: Estrutura e interface do popup.
* **CSS**: Estilização, design moderno e animações da ponte.
* **JavaScript**: Lógica para busca de dados, parsing do HTML e atualizações dinâmicas do conteúdo.