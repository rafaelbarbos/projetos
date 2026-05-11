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
3. Configure o PostgreSQL local.
4. Rode:
   ```bash
   mvn test
   mvn spring-boot:run
   ```

## Observacao
A validacao automatica ainda depende de Maven estar disponivel na maquina.