<div align="center">
 <img 
      alt="Project programing languages count" 
      src="backend/assets/logo.jpeg"
      width="200px"
    >  
  <!-- project name -->
  <h1 align="center">Teste Técnico Gazin Tech_</h1>
  
  <!-- project badges -->
  <p align="center">   
    <img 
      alt="Last commit on GitHub" 
      src="https://img.shields.io/github/last-commit/Alxdelira/teste-gazintech?color=6A57D5"
    >   
    <img 
      alt="Made by Alexandre Nogueira" 
      src="https://img.shields.io/badge/made%20by-Alexandre%20Nogueira-%20?color=6A57D5"
    >
    <img 
      alt="Project top programing language" 
      src="https://img.shields.io/github/languages/top/Alxdelira/teste-gazintech?color=6A57D5"
    >
    <img 
      alt="GitHub license" 
      src="https://img.shields.io/github/license/Alxdelira/teste-gazintech?color=6A57D5"
    >
  </p> 

  <!-- project description and menu -->
  <p align="center">
      🛠️ Em Construção...
    <br />
    <a 
      href="">
      <strong>Ir para o uso agora »</strong>
    </a>
    <br />
    <br />
    <a 
      href="https://github.com/Alxdelira/teste-gazintech/issues">
      Report Bug
    </a>
    ·
    <a 
      href="https://github.com/Alxdelira/teste-gazintech/issues/new">
      Request Feature
    </a>
  </p>
</div>

<!-- ## Preview

<div align="center">
  <a href="#">
      <img src="./assets/modelo.png" width="200" alt="preview" />
  </a>
</div> -->

## 🔥 Checklist 📝
### 🚀 Nível 1
- [x] Listar niveis
- [x] Cadastrar um nível	
- [x] Editar um nível	
- [x] Remover um nível	
- [x] Listar desenvolvedores	
- [x] Cadastrar um desenvolvedor	
- [x] Editar um desenvolvedor	
- [x] Remover um desenvolvedor
  
### 🚀 Nível 2

- [x] Impedir remoção de nível com desenvolvedores associados               
- [x] Adicionar busca via query para a listagem de n íveis                  
- [x] Adicionar busca via query para a listagem de desenvolvedores          
- [x] Tratamento de Exceções / Retornos erros concisos                      
- [x] Paginação na listagem de níveis                                       
- [x] Paginação na listagem de desenvolvedores                              
- [ ] Mensagens de sucesso e/ou erros (Ex. Toast Notification)              
- [ ] Confirmação para exclusão de itens                                    
- [ ] Ordenação das tabelas clicando no nome da coluna                      
- [ ] Validações de campos                                                  
- [ ] Na página de níveis adicionar uma coluna com a qtde de devs associados

### 🚀 Nível 3
- [x] Tipagem de dados                      
- [x] Organização e estrutura de pastas     
- [ ] Reaproveitamento de código            
- [ ] Clean Code                            
- [ ] Arquitetura: Clean, Onion, Hexagonal  
- [ ] Testes unitários / Feature            
- [x] Documentação código/endpoint (swagger)

### 🚀 Nível 4
- [x] Disponibilização do backend via Docker                                 
- [ ] Disponibilização do frontend via Docker                                
- [ ] Disponibilização dos containers (backend + frontend) via Docker Compose
- [ ] Publicação do projeto online                                           






## Technologies

Este projeto foi desenvolvido com as seguintes tecnologias:

- `cors`: [npm cors](https://www.npmjs.com/package/cors)
- `dotenv`: [dotenv on GitHub](https://github.com/motdotla/dotenv)
- `express`: [Express.js on GitHub](https://github.com/expressjs/express)
- `prisma`: [Prisma on Docs](https://www.prisma.io/docs)
- `Javascript`: [JavaScript on Docs](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- `Swagger`: [swagger-UI on  GitHub](https://github.com/swagger-api/swagger-ui)



## Rodando o Projeto

Você precisará do [Node.js](https://nodejs.org) e [Docker](https://www.docker.com/get-started/) instalado no seu computador para rodar este app.

```bash
$ git clone https://github.com/Alxdelira/teste-gazintech.git
$ cd teste-gazin-tech
$ docker compose -f docker-compose.yml up -d

docker compose -f docker-compose.yml up --build --force-recreate

$ cd backend
$ cp .env.example .env
$ npm install

$ npx prisma migrate dev --name init
```


## Usage

🔧 Run the script

```bash
$ npm run dev
```
Rodando a API no modo de desenvolvimento.<br/>
## Teste

🔧 Run the script

```bash
$ npm run test
```

## Autor

| [<img width="150px"  src="https://avatars.githubusercontent.com/u/102405026?v=4"><br><sub>Alexandre Nogueira</sub>](https://github.com/Alxdelira) |
| :-----------------------------------------------------------------------------------------------------------------------------------------------: |
<a target="_blank" href="https://www.linkedin.com/in/alxdelira/"><img src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white"/></a>

<br />
<br />
<br />
<br />
<br />
<br />
<p align="center">
  <a href="https://portfolioalxdelira.vercel.app/" target="_blank">
    <img align="center" src="backend/assets//footer.jpeg" alt="banner"/>
  </a>
</p>