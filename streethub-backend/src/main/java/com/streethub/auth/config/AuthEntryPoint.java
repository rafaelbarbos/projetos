package com.streethub.auth.config;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Handler de Erro de Autenticação
 * 
 * EXPLICAÇÃO:
 * - Implementa AuthenticationEntryPoint do Spring Security
 * - Quando a autenticação falha (credenciais incorretas, token inválido, etc)
 *   é chamado este método commence()
 * - Retorna HTTP 401 Unauthorized em JSON ao invés de HTML padrão
 */
@Component
public class AuthEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {

        // Prepara resposta de erro
        Map<String, Object> body = new HashMap<>();
        body.put("status", HttpServletResponse.SC_UNAUTHORIZED);  // 401
        body.put("message", "Unauthorized: " + authException.getMessage());
        body.put("path", request.getServletPath());

        // Escreve JSON na resposta
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(objectMapper.writeValueAsString(body));
    }
}
