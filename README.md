# Sistema de Biblioteca AWTECH

Este é um projeto de **Sistema de Biblioteca** criado como parte do processo seletivo da **AWTECH**. A aplicação permite gerenciar livros e realizar operações como criar, listar, atualizar e excluir registros no banco de dados, através de credenciais de usuários autenticados.

---

## ⚙️ Configuração do Ambiente

### 1. Instalar Dependências

Certifique-se de ter o **Node.js** instalado na sua máquina. Após clonar o repositório, instale as dependências executando o comando:

```bash
npm install
```

---

### 2. Configurar o Banco de Dados

#### Script SQL

Rode o script MySQL localizado em:

```
src/models/database.sql
```

Esse script criará as tabelas necessárias e adicionará dois usuários e dois livros iniciais ao banco de dados.

#### Configuração do Banco

Atualize o arquivo de configuração do banco de dados:

```
src/config/db_config.js
```

Certifique-se de que as credenciais e informações do banco de dados estejam corretas.

---

## 🗂️ Funcionalidades

### Operações no Sistema

- **Criar Usuários**: Adicione novos usuários simples ao sistema.
- **Logar Usuário**: Obtenha o token JWT para acesso de rotas, através do login.
- **Atualizar cargo**: Caso seja administrador, é possível editar cargos de usuários para realizarem novas operaçoes no sistema.
  
- **Criar livros**: Adicione novos livros ao sistema.
- **Listar livros**: Obtenha uma lista de todos os livros cadastrados.
- **Atualizar livros**: Edite informações de livros existentes.
- **Excluir livros**: Remova livros do sistema.

### Usuários Iniciais

Após rodar o script MySQL, os seguintes usuários estarão disponíveis:

1. **Administrador**:
   - **Email**: `adm@awtech.com`
   - **Senha**: `SenhaForte123@`
   - **Permissões**: Pode realizar todas as operações no banco de dados.

2. **Usuário Comum**:
   - **Email**: `rafael@awtech.com`
   - **Senha**: `SenhaForte1`
   - **Permissões**: Acesso restrito, consegue apenas listar os livros.

---

## 🚀 Como Executar

1. Após configurar o banco de dados e instalar as dependências, inicie o servidor com o comando:

   ```bash
   node server.js
   ```

2. O servidor estará disponível em:

   ```
   http://localhost:8000
   ```

---

## 📚 Rotas da API

### **Rotas de Criação, login e promoção dos Usuários**

#### **1. Criar Usuário**

**Método**: `POST`  
**Endpoint**: `http://localhost:8000/create_user`  
**Descrição**: Cria o usuário com as credenciais informadas.

- **Requisição**:  
  ```json
  {
    "email": "augusto@awtech.com",
    "senha": "Salame123@"
  }
  ```
<br>

#### **2. Logar Usuário**

**Método**: `POST`  
**Endpoint**: `http://localhost:8000/login`  
**Descrição**: Retorna o jwt para ser usado como Bearer para o acesso de outras rotas.

- **Requisição**:  
  ```json
  {
    "email": "augusto@awtech.com",
    "senha": "Salame123@"
  }
  ```

- **Response**:  
  ```json
  {
  	"message": "Login bem-sucedido",
  	"jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYzM2NlAmNB58nmZVpe2nABEA"
  }
  ```
<br>

#### **3. Atualizar Cargo de Usuário**

**Método**: `PUT`  
**Endpoint**: `http://localhost:8000/update_role`  
**Descrição**: Atualiza o cargo de um usuário para o cargo informado.

- **Requisição**:  
  ```json
  {
  	"email": "rafael@awtech.com",
  	"cargo": "administrador"
  }
  ```

- **Autenticação**: ✅ (Requer Bearer Token)  
- **Restrições**: Somente usuários com o cargo de "administrador" podem atualizar cargos.
---

### **Rotas de Livros**

#### **1. Criar um Livro**

**Método**: `POST`  
**Endpoint**: `http://localhost:8000/books/create`  
**Descrição**: Cria um novo livro no sistema.

- **Requisição**:  
  ```json
  {
  	"nome": "Diario de um banana",
  	"autor": "Jeff Kinney",
  	"editora": "VR",
  	"ano": 2009
  }
  ```

- **Autenticação**: ✅ (Requer Bearer Token)
- **Restrições**: Somente usuários com o cargo de "administrador" podem atualizar cargos. 

<br>

#### **2. Listar Livros**

**Método**: `GET`  
**Endpoint**: `http://localhost:8000/books/list`  
**Descrição**: Lista todos os livros cadastrados, com suporte a paginação e filtro.

- **Requisição**:  
  ```json
  {
    "offset": 0,
    "limit": 10,
    "filter": "nome"
  }
  ```

- **Response**:  
  ```json
  [
  	{
  		"id": "e988e28e-49a5-44c9-ba97-00758744524e",
  		"nome": "O PEQUENO PRINCIPE",
  		"autor": "ANTOINE",
  		"editora": "FARD EDITORIAL",
  		"ano": 1943
  	},
  	{
  		"id": "080d8bb5-8ff1-404c-8f3e-d2d570b22ff6",
  		"nome": "LARANJA MECANICA",
  		"autor": "BURGESS",
  		"editora": "ALEPH",
  		"ano": 2005
  	}
  ]
  ```

- **Autenticação**: ❌ (Não requer Bearer Token)
- **Offset, limit e filter**: Opcionais, padrao 0, 10 e nome respectivamente  

<br>

#### **3. Atualizar Livro**

**Método**: `PUT`  
**Endpoint**: `http://localhost:8000/books/update`  
**Descrição**: Atualiza informações de um livro com base no ID. Somente os campos enviados serão alterados. O campo "id" é obrigatório, mas os de alterações como nome, autor, editora, ano, são opcionais, sendo necessário passar no mínimo um deles

- **Requisição**:  
  ```json
	{
		"id": "080d8bb5-8ff1-404c-8f3e-d2d570b22ff6",
		"nome": "morte da cabritinha",
		"autor": "augustinho"
	}
  ```

- **Autenticação**: ✅ (Requer Bearer Token)
- **Restrições**: Somente usuários com o cargo de "administrador" podem atualizar cargos.

<br>

#### **4. Excluir Livro**

**Método**: `DELETE`  
**Endpoint**: `http://localhost:8000/books/delete`  
**Descrição**: Remove um livro do sistema com base no ID.

- **Requisição**:  
  ```json
  {
  	"id": "56061a0b-df38-4a05-addc-9ed05ea71c24"
  }
  ```

- **Autenticação**: ✅ (Requer Bearer Token)
- **Restrições**: Somente usuários com o cargo de "administrador" podem atualizar cargos.


---


## 🛠 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **MySQL**
- **Sequelize**
- **Joi** (validação de dados)
- **JsonWebToken**


---

## 📋 Observações

- Certifique-se de que o banco de dados esteja rodando antes de iniciar o servidor.
- Utilize as credenciais de administrador para testar as funcionalidades completas do sistema.

---
