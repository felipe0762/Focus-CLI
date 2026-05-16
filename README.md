# Focus CLI 

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?logo=github-actions)](https://github.com/felipe0762/focus-cli)
[![NPM Version](https://img.shields.io/npm/v/focus-cli-felipe0762.svg)](https://www.npmjs.com/package/felipe-focus-timer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Versão**: 1.1.0  
**Autor**: Felipe (@felipe0762)  
**Repositório Público**: [https://github.com/felipe0762/focus-cli](https://github.com/felipe0762/focus-cli)  
**Link de Deploy (NPM)**: [https://www.npmjs.com/package/focus-cli-felipe0762](https://www.npmjs.com/package/felipe-focus-timer)

Focus CLI é um assistente de hiperfoco em linha de comando (CLI) desenvolvido em Node.js. Ele funciona como um cronômetro estilo Pomodoro que, durante o seu tempo de foco, bloqueia ativamente sites que causam distração (como redes sociais) e gera um relatório semanal de horas líquidas de concentração.

Ideal para estudantes e profissionais, especialmente para pessoas com TDAH, que precisam blindar o ambiente digital.

## 📸 Exemplo de Uso

![Veja como a interface é limpa e com foco total no terminal](https://github.com/felipe0762/Focus-CLI/blob/main/Imagens%20teste/Teste%20funcional%20da%20Aplicação.png)

## 🚀 Recursos Principais
- ⏱️ **Cronômetro Pomodoro**: Acompanhe o tempo de foco diretamente do seu terminal.
- 🚫 **Bloqueio Ativo**: Altera seu arquivo `hosts` do Windows para impedir momentaneamente o acesso a sites como Facebook, Twitter, Instagram e YouTube durante a sua sessão.
- 📊 **Relatórios**: Registra e calcula automaticamente quantas "horas líquidas" você conseguiu se concentrar na semana.
- ⚡ **Zero Dependências**: O código foi construído 100% com recursos nativos do Node.js puro, resultando em um script muito leve.

---

## 🛠️ Como Usar
## 🌍 Como Instalar (Deploy)

Como a aplicação está publicada no NPM, você não precisa mais baixar os arquivos manualmente. Você pode instalar o Focus CLI globalmente no seu computador rodando apenas um comando:

```bash
npm install -g felipe-focus-timer
```
Se você instalou globalmente via NPM, pode usar o programa de qualquer pasta do seu computador apenas digitando focus-cli.

(Se estiver rodando o código localmente baixado do GitHub, substitua focus-cli por node focus.js e lembre-se de navegar até a pasta do projeto primeiro).

> **⚠️ IMPORTANTE**: Como o sistema modifica a nível de rede o arquivo `hosts` do Windows (`C:\Windows\System32\drivers\etc\hosts`), você deve rodar o terminal (Command Prompt ou PowerShell) **como Administrador**.

### 1. Selecionar a Pasta do Projeto
Antes de executar qualquer comando, você deve dizer ao terminal onde os arquivos do programa estão salvos usando o comando `cd` (Change Directory).

No seu terminal como Administrador, navegue até a pasta do aplicativo colando o caminho correto. Exemplo:
```bash
cd C:\Users\teste\Área de trabalho\focus_cli
```
*(Certifique-se de usar o caminho real onde você baixou/clonou este repositório)*.

### 2. Iniciar uma Sessão de Foco (Caminho Feliz - Happy Path)
```bash
node focus.js start 25
```
*Inicia uma sessão de 25 minutos bloqueando os sites e mostrando uma contagem regressiva. O fluxo normal e ideal é você completar a sessão.*

### Comportamento Inválido
Se você acidentalmente executar sem parâmetros ou tempo negativo:
```bash
node focus.js start abc
# Retornará erro: "Please specify valid minutes"
```

### Cenário Limite (Edge Case)
Se você precisar parar o timer na metade de forma abrupta por uma emergência:
Você aperta `Ctrl + C`. O programa detectará, registrará seus minutos concluídos apenas se houver minutos inteiros superados, e **desbloqueará** a sua rede perfeitamente antes de sair.

### Ver Relatório Semanal
```bash
node focus.js report
```

### Gerenciar Lista de Distrações
```bash
node focus.js list
node focus.js block netflix.com
node focus.js unblock facebook.com
```

### Testes Automatizados
O projeto conta com testes de integridade que validam o Caminho Feliz, Tratamento de Entradas Inválidas e Casos Limite. Execute com:
```bash
npm test
```

---

*Consulte nossos arquivos [`CONTRIBUTING.md`](CONTRIBUTING.md) e [`CHANGELOG.md`](CHANGELOG.md) para saber mais.*
