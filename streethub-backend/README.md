# StreetHub Backend MVP

Backend inicial em Spring Boot para o StreetHub.

## Stack
- Java 21
- Spring Boot 3
- PostgreSQL
- Flyway
- Spring Security
- Spring Validation

## Estrutura inicial
- auth
- users
- posts
- comments
- follows
- suppliers
- settings
- common

## Como rodar
1. Instale Java 21.
2. Instale Maven ou adicione o Maven Wrapper.
3. Suba o PostgreSQL persistente com Docker Compose.
4. Rode:
   ```bash
   docker compose up -d
   mvn test
   mvn spring-boot:run
   ```

## Banco persistente
- O banco agora usa PostgreSQL fora da JVM, com volume nomeado no Docker.
- As credenciais podem ser alteradas por variáveis de ambiente.
- O Flyway cria e evolui o schema automaticamente ao iniciar a aplicação.

## Observacao
A validacao automatica ainda depende de Maven estar disponivel na maquina.