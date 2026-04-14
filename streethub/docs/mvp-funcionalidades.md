# StreetHub - Documento de Funcionalidades e Evolucao do MVP

Status: rascunho inicial
Ultima atualizacao: 2026-04-14
Escopo: Produto, UX, negocio e engenharia

## 1. Objetivo do documento

Este documento define as funcionalidades esperadas do StreetHub para:

- alinhar produto, design e desenvolvimento;
- priorizar o que entra no MVP e o que fica para depois;
- evitar retrabalho e ambiguidades;
- servir como referencia para backlog, sprints e criterios de aceite.

## 2. Visao do produto

StreetHub e uma comunidade focada em streetwear importado, onde usuarios compartilham achados, avaliam fornecedores e calculam custos reais de importacao.

### Proposta de valor

- Reduzir incerteza na compra/importacao.
- Aumentar confianca com reputacao de fornecedores e usuarios.
- Ajudar na decisao com calculadora de custo total.

## 3. Personas

### 3.1 Importador iniciante

- Quer comprar primeira peca sem tomar prejuizo.
- Dores: nao entende imposto, frete e risco de taxa.
- Objetivo: simular custo final e encontrar fornecedores confiaveis.

### 3.2 Revendedor recorrente

- Compra com frequencia para revenda.
- Dores: perder tempo com fornecedores ruins e variacao de custo.
- Objetivo: filtrar rapidamente oportunidades e acompanhar comunidade.

### 3.3 Curador de conteudo

- Publica reviews e referencias de qualidade.
- Dores: baixa visibilidade e pouco retorno de conteudo.
- Objetivo: crescer reputacao e audiencia no perfil.

## 4. Escopo por fase

## 4.1 MVP (prioridade alta)

- Autenticacao basica (email/senha e social login).
- Feed com listagem de posts.
- Detalhe do post com comentarios.
- Acoes basicas: curtir e salvar.
- Perfil publico do usuario.
- Calculadora de importacao com breakdown de custos.
- Navegacao responsiva (sidebar desktop e bottom nav mobile).

## 4.2 Beta (prioridade media)

- Paginas de explorar e fornecedores.
- Busca e filtros avancados.
- Criacao de post com upload de imagem.
- Reputacao e historico de fornecedores.
- Notificacoes de interacao.

## 4.3 Producao (prioridade estrategica)

- Moderacao de conteudo e denuncias.
- Ranking confiavel de fornecedores.
- Mecanicas premium.
- Analytics de produto e funil completo.
- Performance e hardening de seguranca.

## 5. Modulos e funcionalidades esperadas

### 5.1 Autenticacao

Objetivo: permitir entrada segura e rapida.

Funcionalidades:

- Criar conta com username, email e senha.
- Login com email/senha.
- Login social (Google/Discord).
- Logout.
- Recuperacao de senha.

Regras:

- Email unico.
- Username unico.
- Senha com criterio minimo de seguranca.

### 5.2 Feed

Objetivo: descoberta de produtos e conteudo relevante.

Funcionalidades:

- Listar posts recentes.
- Filtrar por categoria e por "seguindo".
- Curtir, descurtir, salvar e remover de salvos.
- Ver indicadores de preco e fornecedor.

Regras:

- Ordenacao default por relevancia/recencia (definir regra final).
- Exibir estado visual diferente para item salvo/curtido.

### 5.3 Detalhe do post

Objetivo: aprofundar informacoes para tomada de decisao.

Funcionalidades:

- Mostrar imagem principal, titulo e categoria.
- Mostrar fornecedor e indicadores de confianca.
- Mostrar bloco de preco em yuan e BRL.
- Mostrar comentarios.
- Acao "Calcular" pre-preenchendo valor na calculadora.

Regras:

- Post invalido/inexistente deve retornar estado de erro amigavel.

### 5.4 Calculadora

Objetivo: estimar custo total de importacao.

Funcionalidades:

- Entrada de preco em yuan.
- Entrada de peso (kg).
- Selecao de metodo de envio.
- Opcao taxado/nao taxado.
- Exibicao de breakdown: produto, frete, taxa do agente, subtotal, imposto e total.

Regras de negocio (MVP):

- Conversao base: 1 yuan = R$ 0,75 (ate API real de cambio).
- Frete standard: R$ 80/kg.
- Frete express: R$ 150/kg.
- Taxa do agente: 5% do valor do produto em BRL.
- Imposto: 60% sobre subtotal quando taxado.

### 5.5 Perfil

Objetivo: consolidar identidade e historico do usuario.

Funcionalidades:

- Exibir avatar, bio e metricas.
- Exibir aba de posts publicados.
- Exibir aba de salvos (privada para o dono).
- Acao de seguir/deixar de seguir.

Regras:

- Conteudo privado nao deve aparecer para terceiros.

### 5.6 Fornecedores (Beta)

Objetivo: concentrar dados de confiabilidade de lojas.

Funcionalidades:

- Lista de fornecedores com rating e volume.
- Pagina de fornecedor com historico e feedback.
- Filtros por plataforma e reputacao.

Regras:

- Indicador de verificado deve ter criterio claro de concessao.

## 6. Casos de uso (usuario)

### CU-01 - Criar conta

- Ator: visitante.
- Pre-condicao: nao autenticado.
- Fluxo principal:
  - Abre pagina de autenticacao.
  - Seleciona cadastro.
  - Preenche username, email e senha.
  - Confirma envio.
  - Sistema cria conta e direciona para feed.
- Pos-condicao: usuario autenticado.

### CU-02 - Login

- Ator: usuario.
- Pre-condicao: conta existente.
- Fluxo principal:
  - Abre autenticacao.
  - Preenche email e senha.
  - Sistema valida credenciais.
  - Sistema direciona para feed.
- Fluxo alternativo:
  - Credencial invalida -> mostrar erro e manter no form.

### CU-03 - Explorar feed

- Ator: usuario autenticado.
- Pre-condicao: sessao valida.
- Fluxo principal:
  - Acessa feed.
  - Aplica filtro por categoria.
  - Abre um post de interesse.
- Pos-condicao: visualizacao de detalhe do post.

### CU-04 - Curtir e salvar post

- Ator: usuario autenticado.
- Fluxo principal:
  - No card ou detalhe, clica em curtir/salvar.
  - Sistema atualiza estado e contador.
- Pos-condicao: interacao registrada.

### CU-05 - Comentar post

- Ator: usuario autenticado.
- Fluxo principal:
  - Abre detalhe de post.
  - Digita comentario.
  - Envia comentario.
  - Sistema inclui comentario na lista.
- Pos-condicao: comentario associado ao post e autor.

### CU-06 - Calcular importacao

- Ator: usuario (autenticado ou nao, conforme regra futura).
- Fluxo principal:
  - Acessa calculadora.
  - Informa preco, peso e envio.
  - Define se foi taxado.
  - Sistema exibe total e breakdown.
- Pos-condicao: usuario visualiza custo estimado final.

### CU-07 - Ver perfil publico

- Ator: qualquer usuario.
- Fluxo principal:
  - Abre perfil por username.
  - Visualiza dados basicos e posts.
- Regra:
  - Aba salvos somente para dono do perfil.

## 7. User stories com criterios de aceite

### US-01 - Cadastro

Como visitante, quero criar minha conta para acessar o feed.

Criterios de aceite:

- Form valida campos obrigatorios.
- Username e email duplicados retornam mensagem clara.
- Conta criada redireciona para feed.

### US-02 - Login social

Como visitante, quero entrar com Google/Discord para reduzir friccao.

Criterios de aceite:

- Botao social inicia fluxo OAuth.
- Em sucesso, cria/atualiza usuario e inicia sessao.
- Em falha, exibe erro e opcao de tentar novamente.

### US-03 - Interacao em post

Como usuario autenticado, quero curtir/salvar para organizar meu interesse.

Criterios de aceite:

- Estado visual muda imediatamente (otimista).
- Falha de API reverte estado e informa erro.

### US-04 - Comentario

Como usuario autenticado, quero comentar para trocar experiencia.

Criterios de aceite:

- Campo nao aceita envio vazio.
- Comentario valido aparece na lista com autor e horario.

### US-05 - Calculo de custo

Como importador, quero ver o custo final para decidir compra.

Criterios de aceite:

- Resultado atualiza a cada alteracao relevante.
- Breakdown exibe valores formatados em BRL.
- Imposto so aparece quando taxado.

## 8. Requisitos nao funcionais

### 8.1 Performance

- TTI aceitavel em mobile mid-range.
- Lazy loading de imagens no feed.
- Pagina de feed com paginacao/infinite loading.

### 8.2 Seguranca

- Hash de senha robusto.
- Protecao contra brute force e rate limiting.
- Validacao server-side de toda entrada.

### 8.3 Qualidade

- TypeScript sem erros de tipo no build.
- Lint sem erros criticos.
- Cobertura minima inicial de testes nas regras da calculadora.

### 8.4 UX

- Interface responsiva em mobile/desktop.
- Estados de loading, vazio e erro em rotas criticas.
- Acessibilidade basica (labels, foco visivel, contraste).

## 9. Fora de escopo (agora)

- Marketplace com pagamento interno.
- Logistica ponta-a-ponta com rastreio real.
- Chat em tempo real entre usuarios.
- IA de recomendacao personalizada.

## 10. Metricas de sucesso

### Produto

- Ativacao: % de usuarios que chegam ao feed apos cadastro.
- Engajamento: curtidas/comentarios por usuario ativo.
- Retencao: D1, D7 e D30.

### Negocio

- Conversao para premium (quando lancar).
- Crescimento de base de fornecedores verificados.

### Qualidade tecnica

- Taxa de erro no frontend e API.
- Tempo medio de resposta API.

## 11. Roadmap de implementacao sugerido

### Sprint 1 (fundacao backend)

- Modelagem de dados (users, posts, comments, suppliers, interactions).
- API de autenticacao e sessao.
- Migrar leitura de feed de mock para API.

### Sprint 2 (interacoes reais)

- Persistencia de likes/saves/comments.
- Tratamento de erro/loading em feed e detalhe.
- Paginacao de posts.

### Sprint 3 (calculadora robusta)

- Endpoint de taxa de cambio.
- Historico de simulacoes por usuario.
- Testes unitarios das regras de calculo.

### Sprint 4 (expansao de produto)

- Paginas explore/suppliers/settings.
- Busca e filtros avancados.
- Primeira versao de reputacao de fornecedores.

## 12. Riscos e mitigacoes

- Dependencia de dados mock atrasar integracao: comecar API de leitura imediatamente.
- Escopo crescer sem controle: manter backlog classificado por MVP/Beta/Producao.
- Queda de qualidade com velocidade: criar definicao de pronto com testes e lint.

## 13. Definicao de pronto (DoD)

Uma funcionalidade e considerada pronta quando:

- atende os criterios de aceite;
- possui tratamento de loading e erro;
- nao quebra rotas existentes;
- passa lint e build;
- esta documentada no changelog/backlog.

## 14. Backlog inicial priorizado

- P0: Auth real + persistencia de feed.
- P0: Comentarios, likes e salvos com API.
- P0: Tratamento de erros/estados vazios.
- P1: Explore e Suppliers.
- P1: Busca e filtros avancados.
- P2: Premium e configuracoes avancadas.

## 15. Observacoes finais

Este documento deve ser revisado a cada ciclo de sprint. A prioridade sempre deve favorecer fluxo completo de uso real antes de novas features cosmeticas.
