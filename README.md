# Focus CLI 

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?logo=github-actions)](https://github.com/felipe0762/focus-cli)
[![NPM Version](https://img.shields.io/npm/v/focus-cli-felipe0762.svg)](https://www.npmjs.com/package/focus-cli-felipe0762)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Versão**: 1.1.0  
**Autor**: Felipe (@felipe0762)  
**Repositório Público**: [https://github.com/felipe0762/focus-cli](https://github.com/felipe0762/focus-cli)  
**Link de Deploy (NPM)**: [https://www.npmjs.com/package/focus-cli-felipe0762](https://www.npmjs.com/package/focus-cli-felipe0762)

Focus CLI é um assistente de hiperfoco em linha de comando (CLI) desenvolvido em Node.js. Ele funciona como um cronômetro estilo Pomodoro que, durante o seu tempo de foco, bloqueia ativamente sites que causam distração (como redes sociais) e gera um relatório semanal de horas líquidas de concentração.

Ideal para estudantes e profissionais, especialmente para pessoas com TDAH, que precisam blindar o ambiente digital.

## 📸 Exemplo de Uso

![Veja como a interface é limpa e com foco total no terminal](https://github.com/felipe0762/Focus-CLI/blob/main/Imagens%20teste/Teste%20funcional%20da%20Aplicação.png)

## 🚀 Recursos Principais
- ⏱️ **Cronômetro Pomodoro**: Acompanhe o tempo de foco diretamente do seu terminal.
- 🚫 **Bloqueio Ativo**: Altera seu arquivo `hosts` do Windows para impedir momentaneamente o acesso a sites como Facebook, Twitter, Instagram e YouTube durante a sua sessão.
- 💡 **Integração com API Externa**: Ao iniciar o timer, o programa consome uma API pública (Advice Slip) para exibir uma frase motivacional e ajudar no seu foco.
- 📊 **Relatórios**: Registra e calcula automaticamente quantas "horas líquidas" você conseguiu se concentrar na semana.

---

## 🌍 Como Instalar (Deploy)

Como a aplicação está publicada no NPM, você não precisa mais baixar os arquivos manualmente. Você pode instalar o Focus CLI globalmente no seu computador rodando apenas um comando:

```bash
npm install -g focus-cli-felipe0762
(Nota: Certifique-se de executar o seu terminal como Administrador no Windows, pois a aplicação precisa de permissões para alterar o arquivo hosts na hora de bloquear os sites).

🛠️ Como Usar
Se você instalou globalmente via NPM, pode usar o programa de qualquer pasta do seu computador apenas digitando focus-cli.

(Se estiver rodando o código localmente baixado do GitHub, substitua focus-cli por node focus.js e lembre-se de navegar até a pasta do projeto primeiro).

Iniciar uma Sessão de Foco (Caminho Feliz)
Bash
focus-cli start 25
Conecta-se à internet para buscar uma frase motivacional, inicia uma sessão de 25 minutos bloqueando os sites e mostrando uma contagem regressiva.

Comportamento Inválido
Se você acidentalmente executar sem parâmetros ou tempo negativo:

Bash
focus-cli start abc
# Retornará erro: "[!] Please specify valid minutes."
Cenário Limite (Edge Case)
Se você precisar parar o timer na metade de forma abrupta por uma emergência:
Você aperta Ctrl + C. O programa detectará, registrará seus minutos concluídos apenas se houver minutos inteiros superados, e desbloqueará a sua rede perfeitamente antes de sair.

Ver Relatório Semanal
Bash
focus-cli report
Gerenciar Lista de Distrações
Bash
focus-cli list
focus-cli block netflix.com
focus-cli unblock facebook.com
🧪 Testes Automatizados e CI/CD
O projeto conta com Testes de Integração (validando a comunicação com a API externa) e testes de integridade, garantindo a qualidade do código. O repositório possui Integração Contínua (CI) via GitHub Actions.

Para rodar os testes localmente:

Bash
npm install
npm test
Consulte nossos arquivos CONTRIBUTING.md e CHANGELOG.md para saber mais.