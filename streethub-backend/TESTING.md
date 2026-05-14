# 📚 Guia Completo: Testes em Spring Boot

## O que são Testes?

Testes verificam se seu código funciona corretamente. No backend, testamos:
- **Endpoints HTTP** (Controllers)
- **Lógica de negócio** (Services)
- **Acesso ao banco** (Repositories)
- **Validações de entrada**
- **Tratamento de erros**

---

## 3 Tipos de Testes

### 1️⃣ **Testes Unitários**
- Testam **UMA classe** isolada
- Sem dependências externas (mocks)
- Rápidos e diretos

```java
@Test
void testPassword_encryption() {
    PasswordEncoder encoder = new BCryptPasswordEncoder();
    String plain = "senha123";
    String encoded = encoder.encode(plain);
    assertTrue(encoder.matches(plain, encoded));
}
```

### 2️⃣ **Testes de Integração**
- Testam **múltiplas camadas** juntas
- Controller → Service → Repository
- Usam banco de dados real (ou H2 em testes)

```java
@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {
    // Testa controller + service + repository juntos
}
```

### 3️⃣ **Testes de Contexto**
- Carregam o **Spring Context completo**
- Verificam se a aplicação inicia sem erros
- São os mais lentos mas testam tudo

```java
@SpringBootTest
class StreethubApplicationTests {
    @Test
    void contextLoads() {}  // Só verifica se inicia
}
```

---

## Como Funciona Nosso AuthControllerTest

### Estrutura Básica (AAA Pattern)

```
@Test
void teste_descricao() {
    // 1. ARRANGE - Preparar dados
    RegisterRequest req = new RegisterRequest(...);
    
    // 2. ACT - Executar ação
    mockMvc.perform(post("/api/auth/register")...);
    
    // 3. ASSERT - Verificar resultado
    .andExpect(status().isOk())
}
```

### Anotações Usadas

```java
@SpringBootTest           // Carrega contexto Spring completo
@AutoConfigureMockMvc     // Injeta MockMvc (simula HTTP)
@ActiveProfiles("test")   // Usa application-test.yml (H2 em memória)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;        // Simula requisições HTTP
    
    @Autowired
    private ObjectMapper mapper;    // Converte Java ↔ JSON
    
    @Autowired
    private UserRepository repo;    // Acessa banco
    
    @BeforeEach
    void setUp() {
        repo.deleteAll();  // Limpa antes de cada teste
    }
}
```

---

## O que o MockMvc Faz

MockMvc simula requisições HTTP **SEM iniciar servidor web real**:

```java
mockMvc.perform(
    post("/api/auth/register")           // ← Simula POST /api/auth/register
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(req))  // Converte obj → JSON
)
.andExpect(status().isOk())              // ← Verifica HTTP 200
.andExpect(jsonPath("$.username").value("joao_silva"))  // ← Verifica JSON
.andReturn();
```

### Métodos HTTP Disponíveis

```java
post("/path")       // POST
get("/path")        // GET
put("/path")        // PUT
delete("/path")     // DELETE
patch("/path")      // PATCH
```

---

## Assertions (Verificações)

```java
// Status HTTP
.andExpect(status().isOk())              // 200
.andExpect(status().isCreated())         // 201
.andExpect(status().isBadRequest())      // 400
.andExpect(status().isUnauthorized())    // 401
.andExpect(status().isForbidden())       // 403
.andExpect(status().isConflict())        // 409
.andExpect(status().isInternalServerError())  // 500

// JSON Response
.andExpect(jsonPath("$.username").exists())           // Campo existe
.andExpect(jsonPath("$.username").value("joao"))      // Campo = valor
.andExpect(jsonPath("$.email").value(containsString("example.com")))

// Headers
.andExpect(header().exists("Content-Type"))
.andExpect(header().string("Content-Type", "application/json"))
```

---

## Exemplo Real: Teste de Registro

```java
@Test
@DisplayName("Deve registrar novo usuário com dados válidos")
void testRegistro_sucesso() throws Exception {
    // ARRANGE: preparar dados de entrada
    RegisterRequest req = new RegisterRequest(
            "joao_silva",           // username
            "João Silva",           // displayName
            "joao@example.com",     // email
            "senha123",             // password
            null,                   // avatar
            "Dev Java 🚀"           // bio
    );

    // ACT: fazer POST request
    // ASSERT: verificar resposta
    mockMvc.perform(
            post("/api/auth/register")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(req))
    )
            // Verificações:
            .andExpect(status().isOk())                              // ✓ HTTP 200
            .andExpect(jsonPath("$.username").value("joao_silva"))   // ✓ username correto
            .andExpect(jsonPath("$.email").value("joao@example.com")) // ✓ email correto
            .andExpect(jsonPath("$.id").exists());                   // ✓ teve ID (foi salvo)
}
```

---

## Exemplo Real: Teste de Erro (Duplicata)

```java
@Test
@DisplayName("Deve rejeitar registro com email duplicado")
void testRegistro_emailDuplicado() throws Exception {
    // ARRANGE: registrar primeiro usuário
    RegisterRequest req1 = new RegisterRequest(...);
    mockMvc.perform(
            post("/api/auth/register")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(req1))
    ).andExpect(status().isOk());

    // ARRANGE: tentar registrar OUTRO com mesmo email
    RegisterRequest req2 = new RegisterRequest(
            "outro_usuario",    // ← username DIFERENTE
            "Outro",
            "mesmo@example.com", // ← EMAIL IGUAL (duplicado!)
            "senha456",
            null,
            null
    );

    // ACT + ASSERT: deve rejeitar com 409 Conflict
    mockMvc.perform(
            post("/api/auth/register")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(req2))
    )
            .andExpect(status().isConflict());  // ✓ HTTP 409
}
```

---

## Exemplo Real: Teste com JWT

```java
@Test
@DisplayName("Deve retornar username quando autenticado com JWT válido")
void testMe_autenticadoComJWT() throws Exception {
    // 1. ARRANGE: registrar usuário
    RegisterRequest registerReq = new RegisterRequest(...);
    mockMvc.perform(
            post("/api/auth/register")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(registerReq))
    ).andExpect(status().isOk());

    // 2. ARRANGE: fazer login para pegar JWT
    LoginRequest loginReq = new LoginRequest("ana_costa", "senha123");
    MvcResult result = mockMvc.perform(
            post("/api/auth/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(loginReq))
    )
            .andExpect(status().isOk())
            .andReturn();

    // 3. ARRANGE: extrair token do JSON
    String response = result.getResponse().getContentAsString();
    String token = objectMapper.readTree(response).get("token").asText();

    // 4. ACT: usar token em próxima requisição
    // 5. ASSERT: verificar resposta
    mockMvc.perform(
            get("/api/auth/me")
                    .header("Authorization", "Bearer " + token)  // ← passa JWT no header
    )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").value("ana_costa"));  // ✓ retorna username
}
```

---

## Rodar Testes

```bash
# Todos os testes
mvn test

# Apenas um arquivo de teste
mvn test -Dtest=AuthControllerTest

# Apenas um teste específico
mvn test -Dtest=AuthControllerTest#testRegistro_sucesso

# Com mais detalhes
mvn test -e
mvn test -X
```

---

## Tabela de Status HTTP Esperados

| Cenário | Status | Código |
|---------|--------|--------|
| Sucesso | OK | 200 |
| Recurso criado | Created | 201 |
| Entrada inválida (validação) | Bad Request | 400 |
| Sem autenticação | Unauthorized | 401 |
| Sem autorização | Forbidden | 403 |
| Duplicata (username/email) | Conflict | 409 |
| Erro interno | Internal Server Error | 500 |

---

## 🎯 Resumo: Por Que Testamos?

✅ **Confiança** — sabemos que funciona  
✅ **Regredir** — detecta bugs em mudanças  
✅ **Documentação** — o teste mostra como usar  
✅ **Qualidade** — código melhor e mais limpo  
✅ **Manutenção** — fácil refatorar sem quebrar  

---

## 📊 Seus Testes Atuais

```
✓ testRegistro_sucesso
✓ testRegistro_usernameDuplicado
✓ testRegistro_emailDuplicado
✓ testRegistro_validacaoBeanInvalida
✓ testLogin_sucesso
✓ testLogin_senhaIncorreta
✓ testLogin_usuarioInexistente
✓ testMe_naoAutenticado
✓ testMe_autenticadoComJWT

Cobertura: Controllers + Service + Repositories + Segurança
```

---

## Próximos Passos

1. **Adicionar testes para Feed/Posts** (listar, criar, etc)
2. **Testes de Repositories** (queries customizadas)
3. **Teste de Performance** (requisições lentas)
4. **Coverage Report** (% de código testado)
