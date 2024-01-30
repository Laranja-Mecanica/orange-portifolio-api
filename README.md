# Documentação da API

Bem-vindo à documentação da API. Aqui estão detalhes sobre as rotas disponíveis, seus métodos e requisitos de autenticação, quando aplicável.

## Rotas de Usuários

### 1. Registro de Usuário

Registra um novo usuário.

- **Método:** POST
- **Endpoint:** `/register`
- **Requisitos:** Sem autenticação

**Corpo da Solicitação:**
```json
{
  "name": "John",
  "lastName": "Doe",
  "email": "johndoe@example.com",
  "password": "123456"
}
```
### 2. Autenticação de Usuário

Autentica um usuário existente.

- **Método:** `POST`
- **Endpoint:** `/session`
- **Requisitos:** Sem autenticação

**Corpo da Solicitação:**
```json
{
  "email": "johndoe@example.com",
  "password": "123456"
}
```

### 3. Busca de Perfil de Usuário

Busca o perfil de um usuário pelo ID.

- **Método:** `GET`
- **Endpoint:** `/users/:id`
- **Requisitos:** Sem autenticação

Essa rota permite a busca do perfil de um usuário específico através do método `GET` no endpoint `/users/:id`. Não é necessário autenticação para acessar essa rota.

O parâmetro `:id` na URL deve ser substituído pelo ID do usuário desejado.

Se precisar de mais informações ou esclarecimentos, sinta-se à vontade para entrar em contato.

### 4. Lista de Portfólios de um Usuário

Lista os portfólios de um usuário pelo ID.

- **Método:** `GET`
- **Endpoint:** `/users/:id/portfolios`
- **Requisitos:** Sem autenticação

Essa rota permite a listagem dos portfólios de um usuário específico através do método `GET` no endpoint `/users/:id/portfolios`. Não é necessário autenticação para acessar essa rota.

O parâmetro `:id` na URL deve ser substituído pelo ID do usuário desejado.

Se precisar de mais informações ou esclarecimentos, sinta-se à vontade para entrar em contato.

## Rotas de Portfólios

### 1. Busca de Portfólio por ID

Busca um portfólio pelo ID.

- **Método:** `GET`
- **Endpoint:** `/portfolios/:id`
- **Requisitos:** Sem autenticação

### 2. Criação de Portfólio

Cria um novo portfólio.

- **Método:** `POST`
- **Endpoint:** `/portfolios`
- **Requisitos:** Autenticado

**Corpo da Solicitação:**
```json
{
  "title": "My last project",
  "description": "This project was developed in Orange Juice Hackthon.",
  "link": "https://example.com"
}

```
### 3. Edição de Portfólio

Edita um portfólio existente pelo ID.

- **Método:** `PUT`
- **Endpoint:** `/portfolios/:id`
- **Requisitos:** Autenticado

**Corpo da Solicitação:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "link": "updatedlink.com"
}
```
Esta rota permite a edição de um portfólio existente através do método PUT no endpoint /portfolios/:id. A autenticação é necessária para acessar esta rota. O parâmetro :id na URL deve ser substituído pelo ID do portfólio que deseja editar.

Observação: Certifique-se de fornecer as informações atualizadas no corpo da solicitação.

### 4. Exclusão de Portfólio

Exclui um portfólio pelo ID.

- **Método:** `DELETE`
- **Endpoint:** `/portfolios/:id`
- **Requisitos:** Autenticado

Esta rota permite a exclusão de um portfólio específico através do método `DELETE` no endpoint `/portfolios/:id`. A autenticação é necessária para acessar esta rota. O parâmetro `:id` na URL deve ser substituído pelo ID do portfólio que deseja excluir.

**Observação:** Esta ação é irreversível.

Se precisar de mais informações ou esclarecimentos, sinta-se à vontade para entrar em contato.


