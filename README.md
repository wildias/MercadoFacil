# 🛒 Mercado Fácil

Sistema completo de gerenciamento de listas de compras, desenvolvido para facilitar o planejamento e organização de compras em supermercados. O projeto inclui funcionalidades como cadastro de produtos com imagens, criação e gestão de listas, e organização por seções de mercado.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Executar](#como-executar)
- [Deploy](#deploy)

## 🎯 Sobre o Projeto

O **Mercado Fácil** é uma aplicação web progressiva (PWA) que permite aos usuários criar e gerenciar listas de compras de forma intuitiva e organizada. O sistema oferece:

- **Autenticação JWT**: Login seguro com tokens JWT
- **Gestão de Produtos**: Cadastro de produtos com imagens (suporte a camera e galeria)
- **Listas de Compras**: Criação, edição e exclusão de listas
- **Organização por Seções**: Produtos organizados por seções do mercado (Açougue, Hortifruti, Mercearia, etc.)
- **PWA**: Instalável como aplicativo mobile
- **Interface Responsiva**: Funciona em desktop e dispositivos móveis

## ⚡ Funcionalidades

- ✅ Sistema de autenticação com JWT
- ✅ Cadastro de produtos com upload de imagens
- ✅ Captura de fotos via câmera do dispositivo
- ✅ Criação e gerenciamento de listas de compras
- ✅ Adição de produtos às listas com quantidade
- ✅ Organização de produtos por seções do mercado
- ✅ Marcação de produtos como comprados/não comprados
- ✅ Cálculo automático de valores e totais
- ✅ Exclusão de produtos e listas
- ✅ Sistema de modais para confirmações e avisos
- ✅ PWA com suporte offline
- ✅ Instalação como aplicativo nativo

## 🚀 Tecnologias Utilizadas

### Frontend

#### Core
- **React 19.2.0** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5.9.3** - Superset tipado do JavaScript
- **Vite 7.2.4** - Build tool e dev server ultra-rápido

#### Build & Dev Tools
- **@vitejs/plugin-react 5.1.1** - Plugin oficial do Vite para React
- **ESLint 9.39.1** - Linter para identificar problemas no código
- **typescript-eslint 8.46.4** - Parser ESLint para TypeScript

#### Deployment
- **gh-pages 6.3.0** - Deploy automatizado para GitHub Pages

#### PWA
- **Service Worker** - Cache e funcionalidade offline
- **Web App Manifest** - Configuração de instalação do PWA

#### Estilos
- **CSS3 Moderno** - Estilização com CSS modules
- **Design Responsivo** - Mobile-first approach

#### Funcionalidades Específicas
- **Context API** - Gerenciamento de estado global (AuthContext)
- **LocalStorage** - Persistência de autenticação
- **Fetch API** - Comunicação com backend REST
- **FileReader API** - Conversão de imagens para Base64
- **MediaDevices API** - Acesso à câmera do dispositivo

### Backend

#### Framework
- **.NET 8.0** - Framework moderno e multiplataforma
- **ASP.NET Core Web API** - Criação de APIs RESTful

#### Banco de Dados
- **MySQL** - Sistema de gerenciamento de banco de dados
- **Entity Framework Core 8.0.13** - ORM para .NET
- **Pomelo.EntityFrameworkCore.MySql 8.0.2** - Provider MySQL para EF Core

#### Autenticação & Segurança
- **JWT Bearer Authentication** - Microsoft.AspNetCore.Authentication.JwtBearer 8.0.13
- **BCrypt.Net-Next 4.0.3** - Hash de senhas com bcrypt

#### Documentação
- **Swagger/OpenAPI** - Swashbuckle.AspNetCore 7.2.0

#### Containerização
- **Docker** - Containerização da aplicação
- **Docker Compose** - Orquestração de containers

#### Deploy
- **Railway** - Hospedagem do backend

#### Design Patterns & Arquitetura
- **Repository Pattern** - Camada de acesso a dados
- **Dependency Injection** - Injeção de dependências nativa do .NET
- **RESTful API** - Arquitetura REST
- **Migrations** - Versionamento de banco de dados

## 📁 Estrutura do Projeto

### Frontend
```
mercadofacil.frontend/
├── public/
│   ├── manifest.json          # Manifesto PWA
│   └── sw.js                  # Service Worker
├── src/
│   ├── assets/
│   │   └── images/            # Logo e ícones
│   ├── components/
│   │   └── Modal.tsx          # Componente de modal reutilizável
│   ├── config/
│   │   └── api.ts             # Configuração da API
│   ├── context/
│   │   └── AuthContext.tsx    # Contexto de autenticação
│   ├── pages/
│   │   ├── Login.tsx          # Página de login
│   │   ├── Home.tsx           # Página principal
│   │   ├── CadastrarProduto.tsx  # Cadastro de produtos
│   │   ├── CriarLista.tsx     # Criação de listas
│   │   └── DetalheListaCompra.tsx  # Detalhes da lista
│   ├── services/
│   │   ├── authService.ts     # Serviço de autenticação
│   │   ├── produtoService.ts  # Serviço de produtos
│   │   └── listaCompraService.ts  # Serviço de listas
│   ├── styles/                # Arquivos CSS por página
│   ├── utils/
│   │   └── imageHelper.ts     # Utilitários de imagem
│   ├── App.tsx                # Componente principal
│   └── main.tsx               # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── eslint.config.js
```

### Backend
```
MercadoFacil.Api/
├── Controllers/               # Controllers da API
├── Data/                      # DbContext e configurações
├── Migrations/                # Migrations do EF Core
├── Model/                     # Entidades do domínio
├── Services/                  # Lógica de negócio
├── Util/                      # Utilitários e helpers
└── Properties/                # Configurações do projeto
```

## 🔧 Como Executar

### Pré-requisitos
- Node.js 18+ 
- .NET 8.0 SDK
- MySQL 8.0+

### Frontend

1. Clone o repositório
```bash
git clone [url-do-repositorio]
cd mercadofacil.frontend
```

2. Instale as dependências
```bash
npm install
```

3. Execute em modo de desenvolvimento
```bash
npm run dev
```

4. Build para produção
```bash
npm run build
```

### Backend

1. Configure a connection string no appsettings.json

2. Execute as migrations
```bash
dotnet ef database update
```

3. Execute a aplicação
```bash
dotnet run
```

## 🌐 Deploy

### Frontend
- **Plataforma**: GitHub Pages
- **Comando**: `npm run deploy`
- **Workflow**: Build automático com Vite + deploy via gh-pages

### Backend
- **Plataforma**: Railway
- **Container**: Docker
- **Database**: MySQL em cloud

## 👨‍💻 Desenvolvedor

Desenvolvido por **Wilgner Dias**

## 📝 Licença

Este projeto está sob a licença MIT.

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!
