package com.streethub.auth.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.streethub.auth.dto.LoginRequest;
import com.streethub.auth.dto.RegisterRequest;
import com.streethub.users.repository.UserRepository;

/**
 * Testes de Integração para AuthController
 * 
 * EXPLICAÇÃO:
 * - @SpringBootTest: carrega o contexto completo do Spring (banco, segurança, controllers, etc)
 * - @AutoConfigureMockMvc: injeta o MockMvc para simular requisições HTTP sem iniciar servidor real
 * - @ActiveProfiles("test"): usa o arquivo application-test.yml (H2 em memória)
 * 
 * MockMvc permite testar:
 * ✓ Endpoints REST (POST, GET, etc)
 * ✓ Validação de inputs
 * ✓ Status HTTP (200, 400, 401, etc)
 * ✓ Response JSON
 * ✓ Segurança (autenticação, autorização)
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@DisplayName("AuthController - Testes de Integração")
class AuthControllerTest {

    // MockMvc simula requisições HTTP
    @Autowired
    private MockMvc mockMvc;

    // ObjectMapper converte objetos Java ↔ JSON
    @Autowired
    private ObjectMapper objectMapper;

    // Para limpar dados entre testes
    @Autowired
    private UserRepository userRepository;

    /**
     * ANTES DE CADA TESTE:
     * - Limpa todos os usuários do banco
     * - Garante que cada teste começa com estado limpo
     */
    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    // ============================================================
    // TESTES DE REGISTRO (REGISTER)
    // ============================================================

    @Test
    @DisplayName("Deve registrar novo usuário com dados válidos")
    void testRegistro_sucesso() throws Exception {
        // ARRANGE (preparar dados)
        RegisterRequest req = new RegisterRequest(
                "joao_silva",           // username
                "João Silva",           // displayName
                "joao@example.com",     // email
                "senha123",             // password
                "https://example.com/avatar.jpg", // avatar
                "Dev Java 🚀"           // bio
        );

        // ACT + ASSERT (executar e verificar em uma chamada)
        mockMvc.perform(
                post("/api/auth/register")  // POST para /api/auth/register
                        .contentType(MediaType.APPLICATION_JSON)  // Content-Type: application/json
                        .content(objectMapper.writeValueAsString(req)) // converter obj → JSON
        )
                // Verificações de resposta:
                .andExpect(status().isOk())  // ✓ HTTP 200
                .andExpect(jsonPath("$.username").value("joao_silva"))  // ✓ JSON contém username
                .andExpect(jsonPath("$.email").value("joao@example.com"))  // ✓ JSON contém email
                .andExpect(jsonPath("$.displayName").value("João Silva"))
                .andExpect(jsonPath("$.id").exists());  // ✓ Tem ID (foi salvo no banco)
    }

    @Test
    @DisplayName("Deve rejeitar registro com username duplicado")
    void testRegistro_usernameDuplicado() throws Exception {
        // ARRANGE: criar primeiro usuário
        RegisterRequest req1 = new RegisterRequest(
                "usuario_teste",
                "Usuário 1",
                "email1@example.com",
                "senha123",
                null,
                null
        );

        // Registra o primeiro
        mockMvc.perform(
                post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req1))
        ).andExpect(status().isOk());

        // ARRANGE: tentar registrar outro com mesmo username
        RegisterRequest req2 = new RegisterRequest(
                "usuario_teste",  // ← mesmo username!
                "Usuário 2",
                "email2@example.com",  // email diferente
                "senha456",
                null,
                null
        );

        // ACT + ASSERT
        mockMvc.perform(
                post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req2))
        )
                .andExpect(status().isConflict());  // ✓ 409 Conflict (duplicata)
    }

    @Test
    @DisplayName("Deve rejeitar registro com email duplicado")
    void testRegistro_emailDuplicado() throws Exception {
        // ARRANGE: criar primeiro usuário
        RegisterRequest req1 = new RegisterRequest(
                "usuario1",
                "Usuário 1",
                "mesmo@example.com",  // email
                "senha123",
                null,
                null
        );

        mockMvc.perform(
                post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req1))
        ).andExpect(status().isOk());

        // ARRANGE: tentar registrar com mesmo email
        RegisterRequest req2 = new RegisterRequest(
                "usuario2",  // username diferente
                "Usuário 2",
                "mesmo@example.com",  // ← mesmo email!
                "senha456",
                null,
                null
        );

        // ACT + ASSERT
        mockMvc.perform(
                post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req2))
        )
                .andExpect(status().isConflict());  // ✓ 409 Conflict (email duplicado)
    }

    @Test
    @DisplayName("Deve rejeitar registro com dados inválidos (validação Bean)")
    void testRegistro_validacaoBeanInvalida() throws Exception {
        // ARRANGE: registro SEM username (field obrigatório)
        String jsonInvalido = "{\"email\":\"test@example.com\",\"password\":\"123\"}";

        // ACT + ASSERT
        mockMvc.perform(
                post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonInvalido)
        )
                .andExpect(status().isBadRequest());  // ✓ @Valid rejeita
    }

    // ============================================================
    // TESTES DE LOGIN
    // ============================================================

    @Test
    @DisplayName("Deve fazer login com credenciais válidas e retornar JWT")
    void testLogin_sucesso() throws Exception {
        // ARRANGE: registrar usuário primeiro
        RegisterRequest registerReq = new RegisterRequest(
                "maria_silva",
                "Maria Silva",
                "maria@example.com",
                "senha123",
                null,
                null
        );

        mockMvc.perform(
                post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerReq))
        ).andExpect(status().isOk());

        // ARRANGE: preparar login request
        LoginRequest loginReq = new LoginRequest("maria_silva", "senha123");

        // ACT + ASSERT: fazer login
        MvcResult result = mockMvc.perform(
                post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginReq))
        )
                .andExpect(status().isOk())  // ✓ HTTP 200
                .andExpect(jsonPath("$.token").exists())  // ✓ Response tem token JWT
                .andReturn();

        // Extrair o token da resposta (para uso em próximos testes)
        String response = result.getResponse().getContentAsString();
        System.out.println("✓ Token recebido: " + response);
    }

    @Test
    @DisplayName("Deve rejeitar login com senha incorreta")
    void testLogin_senhaIncorreta() throws Exception {
        // ARRANGE: registrar usuário
        RegisterRequest registerReq = new RegisterRequest(
                "pedro_santos",
                "Pedro Santos",
                "pedro@example.com",
                "senhaCorreta123",  // senha correta
                null,
                null
        );

        mockMvc.perform(
                post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerReq))
        ).andExpect(status().isOk());

        // ARRANGE: tentar login com senha ERRADA
        LoginRequest loginReq = new LoginRequest("pedro_santos", "senhaErrada");

        // ACT + ASSERT
        mockMvc.perform(
                post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginReq))
        )
                .andExpect(status().isUnauthorized());  // ✓ 401 Unauthorized
    }

    @Test
    @DisplayName("Deve rejeitar login com usuário inexistente")
    void testLogin_usuarioInexistente() throws Exception {
        // ARRANGE: nenhum usuário registrado, tentar login
        LoginRequest loginReq = new LoginRequest("usuario_fantasma", "qualquersenha");

        // ACT + ASSERT
        mockMvc.perform(
                post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginReq))
        )
                .andExpect(status().isUnauthorized());  // ✓ 401
    }

    // ============================================================
    // TESTES DO ENDPOINT /ME (verificar usuário autenticado)
    // ============================================================

    @Test
    @DisplayName("Deve retornar 'anonymous' quando não autenticado")
    void testMe_naoAutenticado() throws Exception {
        // ACT + ASSERT
        mockMvc.perform(
                get("/api/auth/me")  // GET sem autenticação
        )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value("anonymous"));  // ✓ Retorna "anonymous"
    }

    @Test
    @DisplayName("Deve retornar username quando autenticado com JWT válido")
    void testMe_autenticadoComJWT() throws Exception {
        // ARRANGE: registrar e fazer login para pegar JWT
        RegisterRequest registerReq = new RegisterRequest(
                "ana_costa",
                "Ana Costa",
                "ana@example.com",
                "senha123",
                null,
                null
        );

        mockMvc.perform(
                post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerReq))
        ).andExpect(status().isOk());

        // Login para pegar token
        LoginRequest loginReq = new LoginRequest("ana_costa", "senha123");

        MvcResult loginResult = mockMvc.perform(
                post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginReq))
        )
                .andExpect(status().isOk())
                .andReturn();

        // Extrair token do JSON de resposta
        String loginResponse = loginResult.getResponse().getContentAsString();
        String token = objectMapper.readTree(loginResponse).get("token").asText();

        // ACT: fazer GET /me com JWT no header
        mockMvc.perform(
                get("/api/auth/me")
                        .header("Authorization", "Bearer " + token)
        )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value("ana_costa"));  // ✓ Retorna o username
    }
}
