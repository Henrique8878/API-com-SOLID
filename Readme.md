# App

GymPass Style ap.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível de autenticar;
- [] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser possível o usuário obter o seu histórico de check-ins;
- [] Deve ser possipvel obter o número de checkins realizados pelo usuário logado;
- [] Deve ser possível o usuário buscar academias próximas;
- [] Deve ser possível o usuário buscar academias pelo nome;
- [] Deve ser possível o usuário realizar check-in em uma academia;
- [] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

##  RNs (Regras de negócio)

- [] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [] O usuário não pode fazer 2 check-ins no memso dia;
- [] O usuário não pode fazer check-in se não estiver perto (100m) de uma academia;
- [] O check-in só pode ser validado 20 minutos após ser criado; 
- [] O check-in só pode ser validado por administradores;
- [] A academia só pode ser cadastrada por administradores;

## RNfs (Requisitos não funcionais)

- [] A senha do usuário precisa estar criptografada;
- [] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [] O usuário deve ser identificado por um JWT (JSON Web Token);