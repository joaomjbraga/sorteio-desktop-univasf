# Sorteio UNIVASF
<img src=".github/preview.png" width="700">

Aplicativo desktop para sorteio de números (UNIVASF).

![Versão](https://img.shields.io/badge/version-1.0.0-blue)
![Electron](https://img.shields.io/badge/Electron-30.0.1-47848F?style=flat-square&logo=electron)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?style=flat-square&logo=vite)

## 📋 Descrição

Desenvolvida inicialmente para atender a uma demanda acadêmica da turma de História da UNIVASF, com o objetivo de organizar e automatizar o sorteio de participantes para debates em sala, garantindo imparcialidade e agilidade no processo.

### ✨ Funcionalidades

- **Sorteio de Números**: Configure a quantidade de números a sortear (mínimo 2, máximo 10.000)
- **Configuração via Popup**: Interface intuitiva com modal para definir a quantidade
- **Animação de Slot Machine**: Efeito visual de roleta durante o sorteio
- **Efeitos Sonoros**: Música de fundo durante o sorteio e som de seleção
- **Apresentação Sequencial**: Números são apresentados um a um, com navegação por botão
- **Grid Visual**: Painel lateral exibe todos os números sorteados, marcando os já apresentados
- **Tela Final**: Tela de conclusão ao apresentar todos os números
- **Reinício**: Botão para limpar e iniciar um novo sorteio
- **Funciona Offline**: Todos os recursos são locais, não requer conexão com a internet

## 🖥️ Tecnologias

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| Electron | 30.0.1 | Framework desktop |
| React | 18.2 | Biblioteca UI |
| TypeScript | 5.2 | Linguagem tipada |
| Vite | 5.1 | Bundler |
| Lucide React | 1.7 | Ícones |
| electron-builder | 24.13 | Empacotamento |

## 📁 Estrutura do Projeto

```
sorteio/
├── electron/                 # Processo principal do Electron
│   ├── main.ts             # Entry point do Electron
│   └── preload.cjs         # Script de preload (IPC bridge)
├── public/                  # Arquivos estáticos
│   ├── icone.ico           # Ícone do aplicativo
│   ├── icone.png           # Ícone Linux
│   └── logo.png            # Logo UNIVASF
├── src/
│   ├── assets/
│   │   ├── fonts/          # Fontes locais (Outfit)
│   │   ├── logo.png        # Logo UNIVASF
│   │   ├── song.mp3        # Música do sorteio
│   │   └── select.mp3      # Som de seleção
│   ├── hooks/
│   │   └── useSorteio.ts   # Lógica principal do sorteio
│   ├── App.tsx             # Componente principal (inclui TitleBar e RangeModal)
│   ├── App.css             # Estilos do App
│   ├── index.css           # Estilos globais
│   └── main.tsx            # Entry point React
├── dist/                   # Build de produção (renderer)
├── dist-electron/          # Build de produção (electron)
├── release/                # Executáveis gerados
├── electron-builder.json5  # Configuração do electron-builder
├── index.html              # HTML entry
├── package.json            # Dependências e scripts
├── tsconfig.json           # Configuração TypeScript
├── vite.config.ts          # Configuração Vite
└── README.md               # Este arquivo
```

## 📖 Como Usar

1. **Configurar Quantidade**: Clique no botão "Configurar quantidade de números" e defina quantos números deseja sortear
2. **Sortear**: Clique no botão "Sortear" para iniciar o sorteio
3. **Animação**: Os números passarão rapidamente na tela durante a animação
4. **Navegação**: Após o sorteio, clique no botão ">" para avançar entre os números sorteados
5. **Grid**: No painel à direita, acompanhe todos os números sorteados (os já apresentados ficam riscados)
6. **Reiniciar**: Clique em "Reiniciar" para limpar e fazer um novo sorteio

## 📝 Estados do Sorteio

| Estado | Descrição |
|--------|-----------|
| `max` | Quantidade máxima de números para sortear |
| `drawnNumbers` | Array de objetos `{number, order}` com números sorteados |
| `currentNumber` | Número sendo exibido na slot machine |
| `isSpinning` | Se está em animação |
| `isFinished` | Se todos os números foram sorteados |

## 📄 Licença

Este projeto é de código aberto e licença MIT.

## 👨‍💻 Autor

João M J Braga
- Email: joomdeveloper.app@gmail.com
