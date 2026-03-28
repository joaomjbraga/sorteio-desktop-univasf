# Sorteio UNIVASF

Aplicativo desktop para sorteio de números, desenvolvido para a Universidade Federal do Vale do São Francisco (UNIVASF).

![Versão](https://img.shields.io/badge/version-0.0.1-blue)
![Electron](https://img.shields.io/badge/Electron-30.0.1-47848F?style=flat-square&logo=electron)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?style=flat-square&logo=vite)

## 📋 Descrição

O Sorteio UNIVASF é uma aplicação desktop que permite realizar sorteios de números de forma automática e visual. Ideal para eventos, rifas e atividades educacionais.

### ✨ Funcionalidades

- **Sorteio de Números**: Define um intervalo mínimo e máximo para os números a serem sorteados
- **Animação Visual**: Efeito de "slot machine" durante o sorteio com números passando rapidamente
- **Efeitos Sonoros**:
  - Música ambiente durante o sorteio
  - Som de seleção ao marcar números como concluídos
- **Marcação de Números**: Clique nos números sorteados para marcá-los como concluídos
- **Lista Ordenada**: Exibe os números na ordem em que foram sorteados (1°, 2°, 3°...)
- **Barra de Progresso**: Mostra o progresso do sorteio
- **Interface Responsiva**: Adapta-se a diferentes tamanhos de janela
- **Funciona Offline**: Todos os recursos são locais, não requer conexão com a internet

## 🎨 Design

- **Tema**: Claro com cores institucionais (dourado #f4ae02)
- **Tipografia**: Fonte Outfit (Google Fonts bundled para offline)
- **Layout**: Duas colunas - controles à esquerda, lista de números à direita
- **Estilo**: Interface moderna e limpa com efeitos suaves

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
│   └── preload.ts          # Script de preload (IPC bridge)
├── public/                  # Arquivos estáticos
│   ├── icone.ico          # Ícone do aplicativo
│   ├── logo.png           # Logo UNIVASF
│   ├── song.mp3           # Música do sorteio
│   └── select.mp3         # Som de seleção
├── src/
│   ├── assets/
│   │   └── fonts/         # Fontes locais (Outfit)
│   ├── components/         # Componentes React
│   │   ├── Button.tsx     # Botão reutilizável
│   │   ├── DrawnNumbers.tsx # Lista de números sorteados
│   │   ├── Logo.tsx       # Logo UNIVASF
│   │   ├── RangeInput.tsx  # Inputs de range min/max
│   │   ├── SlotMachine.tsx # Display do número atual
│   │   ├── StatusBar.tsx  # Barra de progresso
│   │   └── TitleBar.tsx   # Barra de título customizada
│   ├── hooks/              # Custom hooks
│   │   └── useSorteio.ts  # Lógica principal do sorteio
│   ├── App.tsx             # Componente principal
│   ├── App.css             # Estilos do App
│   ├── index.css           # Estilos globais e variáveis CSS
│   └── main.tsx           # Entry point React
├── dist/                   # Build de produção (renderer)
├── dist-electron/           # Build de produção (electron)
├── release/                 # Executáveis gerados
├── electron-builder.json5  # Configuração do electron-builder
├── index.html              # HTML entry
├── package.json            # Dependências e scripts
├── tsconfig.json           # Configuração TypeScript
├── vite.config.ts          # Configuração Vite
└── README.md              # Este arquivo
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Desenvolvimento

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O aplicativo será aberto automaticamente em `http://localhost:5173/`

### Build de Produção

```bash
# Gerar executável
npm run build
```

Os arquivos gerados estarão em:
- Windows: `release/0.0.1/win-unpacked/Sorteio UNIVASF.exe`
- Linux: `release/0.0.1/Sorteio UNIVASF-Linux-0.0.1.AppImage`
- macOS: `release/0.0.1/mac/Sorteio UNIVASF.app`

### Lint

```bash
npm run lint
```

## 📖 Como Usar

1. **Definir Intervalo**: No campo "De" insira o número mínimo e em "Até" o número máximo
2. **Sortear**: Clique no botão "Sortear" para iniciar o sorteio
3. **Animação**: Os números passarão rapidamente na tela durante aproximadamente 5 segundos
4. **Resultado**: Ao final, todos os números aparecem na lista à direita na ordem sorteada
5. **Marcar**: Clique em qualquer número da lista para marcá-lo como concluído
6. **Reiniciar**: Clique em "Reiniciar" para limpar e fazer um novo sorteio

## ⚙️ Configurações

### Variáveis CSS (src/index.css)

```css
--primary: #f4ae02;        /* Cor principal (dourado) */
--primary-dark: #c99200;    /* Dourado escuro */
--primary-light: rgba(244, 174, 2, 0.15); /* Transparente */
--text: #1e1e2e;           /* Cor do texto */
--text-secondary: #6b7280;  /* Texto secundário */
--bg: #fafafa;             /* Background */
--bg-card: #ffffff;         /* Background de cards */
```

### Configurações da Janela (electron/main.ts)

```typescript
width: 600,           // Largura inicial
height: 750,          // Altura inicial
minWidth: 500,        // Largura mínima
minHeight: 600,       // Altura mínima
resizable: true,      // Permite redimensionar
frame: false,         // Sem borda nativa (barra customizada)
```

## 🔧 API do Hook useSorteio

```typescript
const {
  state,              // Estado atual do sorteio
  remainingNumbers,    // Números ainda não sorteados
  concludedNumbers,    // Números marcados como concluídos
  setMin,             // Definir número mínimo
  setMax,            // Definir número máximo
  startDraw,          // Iniciar sorteio
  resetDraw,          // Reiniciar sorteio
  toggleConcluded,     // Marcar/desmarcar número
  totalNumbers,        // Total de números no intervalo
  canDraw,            // Se pode sortear
} = useSorteio();
```

## 📝 Estados do Sorteio

| Estado | Descrição |
|--------|-----------|
| `min` | Número mínimo do intervalo |
| `max` | Número máximo do intervalo |
| `drawnNumbers` | Array de objetos `{number, order}` com números sorteados |
| `currentNumber` | Número sendo exibido na slot machine |
| `isSpinning` | Se está em animação |
| `isFinished` | Se todos os números foram sorteados |
| `concludedNumbers` | Array de números marcados como concluídos |

## 🎵 Arquivos de Áudio

| Arquivo | Uso | Formato |
|---------|-----|---------|
| `song.mp3` | Música de fundo durante sorteio | MP3, loop |
| `select.mp3` | Som ao marcar número | MP3, uma vez |

## 🐛 Solução de Problemas

### App não abre
- Verifique se o Node.js está instalado (versão 18+)
- Execute `npm install` novamente

### Ícone não aparece
- O ícone precisa estar no formato `.ico` para Windows
- Verifique se `public/icone.ico` existe

### Áudio não funciona
- Certifique-se de que os arquivos `.mp3` estão na pasta `public`
- Verifique se o dispositivo de áudio está funcionando

### Build falha
- Limpe a pasta `node_modules` e `package-lock.json`
- Execute `npm install` novamente
- Execute `npm run build`

## 📄 Licença

Este projeto é de uso interno da UNIVASF.

## 👨‍💻 Autor

João M J Braga
- Email: joomdeveloper.app@gmail.com

