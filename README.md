My Shoes Store
My Shoes Store é uma aplicação web de e-commerce para a venda de calçados. O sistema permite que usuários naveguem por produtos, adicionem itens ao carrinho, façam compras e acompanhem pedidos. Administradores têm acesso a um painel para gerenciar produtos, pedidos e usuários.

Índice
Funcionalidades
Requisitos
Instalação e Configuração
Tecnologias Utilizadas
Estrutura de Pastas
Scripts Disponíveis
Uso
Contribuição
Licença
Funcionalidades
Usuário Comum
Cadastro e login com autenticação JWT.
Navegação por produtos com filtros de categoria e preço.
Carrinho de compras com opções de adicionar e remover itens.
Checkout para finalização de pedidos.
Histórico de pedidos e acompanhamento de status.
Administrador
Gerenciamento de produtos (criação, edição e exclusão).
Gerenciamento de pedidos (atualização de status).
Painel administrativo para análise e controle.
Requisitos
Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

Node.js (v16 ou superior)
npm ou yarn
Git
SQLite (para acessar o banco de dados diretamente, se necessário)
Instalação e Configuração
1. Clone o repositório
bash
Copy code
git clone https://github.com/seu-usuario/my-shoes-store.git
cd my-shoes-store
2. Configure o backend
Instale as dependências:

bash
Copy code
cd backend
npm install
Crie um arquivo .env baseado no .env.example:

bash
Copy code
cp .env.example .env
Atualize as variáveis no arquivo .env:

plaintext
Copy code
JWT_SECRET=seu_segredo_jwt
DB_STORAGE=./database.sqlite
Sincronize o banco de dados:

bash
Copy code
node scripts/syncDatabase.js
(Opcional) Adicione dados iniciais:

bash
Copy code
node scripts/seedDatabase.js
Inicie o servidor:

bash
Copy code
npm start
3. Configure o frontend
Instale as dependências:

bash
Copy code
cd frontend
npm install
Inicie o servidor de desenvolvimento:

bash
Copy code
npm run dev
Acesse a aplicação em http://localhost:5173.

Tecnologias Utilizadas
Frontend
React.js
Vite
React Router
TailwindCSS (ou outra biblioteca de estilo escolhida)
Backend
Node.js
Express.js
Sequelize (ORM)
SQLite (banco de dados)
JWT (para autenticação)
bcrypt (para criptografia de senhas)
Estrutura de Pastas
plaintext
Copy code
my-shoes-store/
├── backend/
│   ├── config/             # Configuração do banco de dados
│   ├── models/             # Modelos do Sequelize
│   ├── routes/             # Rotas da API
│   ├── middleware/         # Middlewares
│   ├── scripts/            # Scripts de sincronização e seed
│   ├── server.js           # Arquivo principal do backend
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── context/        # Contextos globais (ex: autenticação, carrinho)
│   │   ├── pages/          # Páginas principais da aplicação
│   │   ├── styles/         # Arquivos de estilo
│   │   ├── App.jsx         # Arquivo principal do React
│   │   ├── main.jsx        # Ponto de entrada do React
Scripts Disponíveis
Backend
npm start: Inicia o servidor na porta definida no .env.
node scripts/syncDatabase.js: Sincroniza o banco de dados.
node scripts/seedDatabase.js: Insere dados iniciais no banco de dados.
Frontend
npm run dev: Inicia o servidor de desenvolvimento do Vite.
npm run build: Gera os arquivos para produção.
npm run preview: Previsualiza o build de produção.
Uso
Registre-se como um usuário ou utilize o usuário administrador criado pelo script seedDatabase.js.
Navegue pelos produtos e use o carrinho para adicionar itens.
Finalize uma compra através do checkout.
Para acessar o painel de administrador, faça login com um usuário com a função admin.
Contribuição
Contribuições são bem-vindas! Siga as etapas abaixo:

Faça um fork do projeto.
Crie uma branch para suas alterações: git checkout -b minha-feature.
Envie suas alterações: git commit -m 'Minha nova feature'.
Faça um push para a branch: git push origin minha-feature.
Abra um Pull Request.

