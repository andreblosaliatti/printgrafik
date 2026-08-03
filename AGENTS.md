# AGENTS.md — PrintGráfik

## 1. Objetivo deste arquivo

Este arquivo define as regras obrigatórias para qualquer agente ou ferramenta de desenvolvimento que altere o projeto do site institucional da PrintGráfik.

Antes de modificar qualquer arquivo, leia integralmente:

1. `AGENTS.md`
2. `PRD-PrintGrafik.md`
3. `printgrafik-design-system-completo.html`
4. `README.md`
5. Os arquivos existentes do projeto

Se houver conflito entre instruções:

1. `AGENTS.md` tem prioridade para regras de desenvolvimento.
2. `PRD-PrintGrafik.md` tem prioridade para escopo e requisitos.
3. O Design System tem prioridade para aparência e componentes.
4. O código existente deve ser preservado quando estiver correto e alinhado às regras acima.

---

## 2. Contexto do projeto

O projeto é o novo site institucional da PrintGráfik, uma indústria gráfica especializada em embalagens em papel cartão.

Principais produtos:

- Caixas display
- Cartelas blister
- Embalagens personalizadas
- Embalagens em branco
- Solapas e materiais promocionais, quando confirmados

Público principal:

- Empresas
- Indústrias
- Compradores
- Gestores comerciais
- Profissionais de marketing e produto

Objetivo principal do site:

- Apresentar a empresa
- Apresentar produtos
- Mostrar estrutura e capacidade produtiva
- Gerar contatos comerciais
- Direcionar visitantes para o WhatsApp
- Disponibilizar formulário de contato simples

O site não terá orçamento automático, loja virtual, área do cliente, login, pagamento online ou chatbot.

---

## 3. Stack obrigatória

Utilizar:

- HTML5 semântico
- CSS3
- JavaScript puro
- CSS Grid
- Flexbox
- Variáveis CSS
- Componentes reutilizáveis
- Layout responsivo

Não utilizar sem autorização explícita:

- React
- Vue
- Angular
- Next.js
- Bootstrap
- Tailwind
- jQuery
- bibliotecas pesadas
- frameworks de UI
- dependências externas desnecessárias
- sistema de build obrigatório

O projeto deve funcionar abrindo os arquivos HTML diretamente ou por um servidor local simples.

---

## 4. Estrutura de arquivos

Estrutura esperada:

```text
printgrafik-site/
├── index.html
├── empresa.html
├── produtos.html
├── estrutura.html
├── contato.html
├── politica-de-privacidade.html
├── css/
│   ├── tokens.css
│   ├── components.css
│   ├── pages.css
│   └── responsive.css
├── js/
│   └── main.js
├── assets/
│   ├── logo/
│   ├── hero/
│   ├── empresa/
│   ├── produtos/
│   ├── estrutura/
│   ├── icons/
│   └── placeholders/
├── AGENTS.md
├── PRD-PrintGrafik.md
└── README.md
```

Não reorganize toda a estrutura sem necessidade.

Não apague arquivos úteis.

Não altere nomes de arquivos finais de imagem sem atualizar todos os caminhos correspondentes.

---

## 5. Arquivos de referência obrigatórios

O projeto deve respeitar:

- `PRD-PrintGrafik.md`
- `printgrafik-design-system-completo.html`

Imagens finais já disponíveis:

- Logo oficial da PrintGráfik
- Imagem final do hero com a máquina de impressão e fumaças coloridas
- Foto final da fachada da empresa

Use os arquivos reais quando disponíveis.

Para imagens ainda ausentes, use placeholders locais claramente identificados.

Nunca utilize imagens externas aleatórias apenas para preencher o layout.

---

## 6. Regras de design

O visual deve ser:

- Moderno
- Minimalista
- Elegante
- Profissional
- Industrial
- Limpo
- Responsivo

Direção visual:

- Fundos brancos e cinza-claro
- Verde e amarelo como cores principais
- Azul, ciano, magenta e roxo como cores de apoio
- Cores de apoio aplicadas em ícones, linhas, setas, bordas e detalhes
- Poucos elementos decorativos
- Sem excesso de fumaças ou manchas coloridas
- Cards com cantos arredondados
- Sombras discretas
- Boa quantidade de espaço em branco
- Tipografia clara e legível

Use o Design System como fonte principal para:

- Cores
- Tipografia
- Espaçamentos
- Sombras
- Raios
- Botões
- Cards
- Formulários
- Componentes

---

## 7. Convenções CSS

Use prefixo `pg-` em classes de componentes.

Exemplos:

```css
.pg-header {}
.pg-nav {}
.pg-button {}
.pg-card {}
.pg-product-card {}
.pg-stat {}
.pg-section {}
.pg-footer {}
```

Regras:

- Centralize cores e espaçamentos em variáveis CSS.
- Evite valores repetidos.
- Evite estilos inline.
- Não use `!important` sem justificativa.
- Não crie classes genéricas demais como `.box`, `.item` ou `.title`.
- Prefira nomes claros e previsíveis.
- Preserve consistência entre páginas.
- Evite seletores excessivamente específicos.
- Não duplique regras que podem ser reutilizadas.

---

## 8. Convenções HTML

Use HTML semântico:

- `header`
- `nav`
- `main`
- `section`
- `article`
- `footer`

Regras:

- Um único `h1` por página.
- Hierarquia correta de títulos.
- Todos os links devem ter destino válido.
- Use botão para ações e link para navegação.
- Imagens devem ter `alt`.
- Imagens devem ter `width` e `height`.
- Use `loading="lazy"` abaixo da primeira dobra.
- Não use lazy loading no logo ou na imagem principal do hero.
- Use `fetchpriority="high"` apenas quando necessário no hero.

---

## 9. Convenções JavaScript

O JavaScript deve ser simples e necessário.

Permitido:

- Menu móvel
- Validação básica de formulário
- Mensagens de sucesso e erro
- Galeria simples
- Controle de acessibilidade
- Atualização centralizada de contatos

Não permitido sem necessidade:

- Frameworks
- Manipulação excessiva do DOM
- Animações pesadas
- Código duplicado
- Bibliotecas externas
- Funcionalidades invisíveis ou sem uso

Centralize em um único local:

- Número do WhatsApp
- Mensagem do WhatsApp
- Telefone
- E-mail
- Indicadores numéricos da empresa

Não espalhe os mesmos dados em vários arquivos.

---

## 10. Regras para imagens

Logo:

- Use o logo oficial.
- Não redesenhe.
- Não distorça.
- Não altere as cores.
- Use `object-fit: contain`.

Fotografias:

- Use `object-fit: cover`.
- Preserve proporções.
- Evite cortes ruins.
- Não aplique filtros fortes.
- Use WebP ou AVIF quando possível.
- Mantenha versão original quando necessário.

Hero:

- Use a imagem final da máquina imprimindo materiais coloridos.
- Preserve a área clara para o texto.
- Não adicione novas fumaças por CSS.
- Não sobrecarregue o hero com elementos decorativos.

Fachada:

- Use a foto final da fachada.
- Preserve a legibilidade da marca.
- Não recorte a fachada de maneira agressiva.

Placeholders:

- Devem ser locais.
- Devem ter proporção definida.
- Devem estar claramente identificados.
- Devem ser fáceis de substituir sem alterar a estrutura HTML.

---

## 11. Responsividade

Testar obrigatoriamente:

- 1440 px
- 1280 px
- 1024 px
- 768 px
- 480 px
- 375 px
- 320 px

Garantir:

- Sem rolagem horizontal indevida
- Sem títulos cortados
- Sem sobreposição de elementos
- Botões com área de toque adequada
- Menu móvel funcional
- Cards reorganizados corretamente
- Imagens sem deformação
- Formulários utilizáveis
- Rodapé legível

---

## 12. Acessibilidade

Requisitos mínimos:

- Navegação por teclado
- Foco visível
- Contraste adequado
- `aria-expanded` no menu móvel
- `aria-controls` no botão do menu
- Labels em todos os campos
- Mensagens de erro associadas aos campos
- Alt descritivo nas imagens
- Suporte a `prefers-reduced-motion`
- Não comunicar informação apenas por cor

Não remova atributos de acessibilidade já existentes.

---

## 13. Conteúdo e dados

Não invente:

- Telefones
- E-mails
- Endereços
- Links de redes sociais
- Quantidades
- Clientes
- Certificações
- Equipamentos
- Segmentos atendidos
- Prazos
- Condições comerciais

Quando faltar informação:

1. Use um marcador `TODO`.
2. Registre a pendência no `README.md`.
3. Não esconda a ausência com informação fictícia.

Dados atuais considerados, ainda sujeitos a confirmação:

- Fundação: março de 2000
- Área fabril: 2.000 m²
- Serviços: mais de 10
- Clientes atendidos: mais de 500

---

## 14. Escopo da primeira etapa

Na primeira etapa, implementar somente:

1. Estrutura global do projeto
2. Tokens CSS
3. Componentes compartilhados
4. Cabeçalho
5. Menu móvel
6. Rodapé
7. Home completa
8. Responsividade da Home
9. Acessibilidade básica
10. Placeholders locais para imagens ausentes

Não avançar automaticamente para as páginas internas.

As páginas internas podem receber apenas uma estrutura mínima temporária para evitar links quebrados.

---

## 15. Ordem de implementação da Home

Seguir esta ordem:

1. Cabeçalho
2. Hero
3. Produtos em destaque
4. Sobre a PrintGráfik
5. Indicadores
6. Diferenciais
7. Missão, visão e valores
8. Estrutura que gera qualidade
9. Chamada final
10. Rodapé
11. Responsividade
12. Revisão de acessibilidade
13. Revisão de caminhos e links

Não desenvolver todas as seções de uma vez sem revisão intermediária.

---

## 16. Verificações antes de concluir

Antes de considerar uma tarefa finalizada:

- Revise o HTML.
- Revise o CSS.
- Revise o JavaScript.
- Verifique o console do navegador.
- Verifique caminhos de arquivos.
- Verifique links.
- Verifique menu móvel.
- Verifique responsividade.
- Verifique acessibilidade básica.
- Verifique se nenhum dado foi inventado.
- Verifique se as imagens finais estão sendo usadas.
- Verifique se os placeholders estão identificados.
- Atualize o `README.md`.

---

## 17. Formato das respostas do agente

Antes de alterar arquivos:

1. Informe rapidamente o que será feito.
2. Liste os arquivos que pretende alterar.
3. Aponte riscos ou dependências.

Depois de alterar:

1. Resuma o que foi implementado.
2. Liste os arquivos alterados.
3. Informe testes realizados.
4. Informe pendências.
5. Não diga que algo está pronto se não foi testado.

---

## 18. Proibições

Não:

- Apague conteúdo sem explicar.
- Reescreva todo o projeto sem necessidade.
- Troque a stack.
- Adicione dependências não solicitadas.
- Use conteúdo genérico não aprovado.
- Use imagens externas aleatórias.
- Crie orçamento automático.
- Crie chatbot.
- Crie área de cliente.
- Crie login.
- Crie painel administrativo.
- Crie animações exageradas.
- Altere a identidade visual.
- Ignore o PRD.
- Ignore o Design System.
- Continue para páginas internas sem autorização.

---

## 19. Definição de qualidade

O código deve ser:

- Legível
- Organizado
- Reutilizável
- Responsivo
- Acessível
- Simples de manter
- Coerente com o Design System
- Coerente com o PRD
- Sem dependências desnecessárias
- Sem informações fictícias

A prioridade é entregar uma implementação sólida e fiel ao projeto, não gerar o maior volume possível de código.
