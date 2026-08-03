# PRD — Site Institucional PrintGráfik

**Versão:** 1.0  
**Status:** Pronto para desenvolvimento  
**Tipo de produto:** Site institucional responsivo  
**Tecnologia prevista:** HTML5, CSS3 e JavaScript puro  
**Idioma:** Português do Brasil  

---

## 1. Visão do produto

Desenvolver um site institucional moderno para a PrintGráfik, apresentando a empresa, seus produtos, sua estrutura industrial e seus diferenciais.

O site deve transmitir confiança, experiência, capacidade produtiva e proximidade no atendimento. O principal objetivo comercial é facilitar o contato de empresas interessadas por WhatsApp ou por um formulário simples.

O produto não será um sistema de orçamento automático. Valores, condições e detalhes de produção serão tratados pela equipe comercial após o contato.

---

## 2. Objetivos

### Objetivos principais

- Apresentar a PrintGráfik de forma profissional.
- Mostrar as principais categorias de embalagens produzidas.
- Demonstrar estrutura, experiência e capacidade industrial.
- Facilitar contatos comerciais pelo WhatsApp.
- Disponibilizar um formulário simples para solicitação de contato ou orçamento.
- Funcionar corretamente em computadores, tablets e celulares.

### Indicadores de sucesso

- O visitante entende o que a empresa produz nos primeiros segundos.
- O botão de WhatsApp está acessível nas principais áreas do site.
- Todas as páginas possuem navegação clara.
- O site carrega rapidamente em dispositivos móveis.
- O formulário pode ser preenchido e enviado sem erros.
- O site mantém consistência visual em todas as páginas.

---

## 3. Escopo do projeto

### Páginas previstas

1. Início
2. A Empresa
3. Produtos
4. Estrutura
5. Contato
6. Política de Privacidade

### Fora do escopo

- Loja virtual.
- Pagamento online.
- Área de cliente.
- Login ou cadastro.
- Banco de dados próprio.
- Calculadora automática de orçamento.
- Upload de arte pelo site na primeira versão.
- Chatbot ou atendimento por inteligência artificial.
- Painel administrativo.
- Integração com ERP.
- Blog na primeira versão.
- Animações pesadas ou efeitos que prejudiquem o carregamento.

---

## 4. Público-alvo

O site é voltado principalmente para empresas e indústrias que precisam de embalagens em papel cartão.

### Perfis principais

- Responsáveis por compras.
- Proprietários de empresas.
- Gestores comerciais.
- Profissionais de marketing e produto.
- Indústrias que procuram um fornecedor regional.
- Empresas que precisam desenvolver ou produzir uma nova embalagem.

### Região de atuação destacada

- Capivari.
- Piracicaba.
- Campinas.
- Interior do estado de São Paulo.

A comunicação não deve dar a entender que a empresa atende exclusivamente essas cidades.

---

## 5. Posicionamento e linguagem

### Percepção desejada

- Empresa experiente.
- Estrutura industrial confiável.
- Atendimento próximo e humano.
- Produção flexível.
- Qualidade de impressão e acabamento.
- Soluções personalizadas para empresas.

### Tom de voz

- Comercial, mas sem exageros.
- Profissional e direto.
- Claro e acessível.
- Confiante, sem promessas absolutas.
- Sem linguagem genérica ou slogans vazios.
- Sem uso excessivo de termos técnicos.

---

## 6. Direção visual

O projeto deve seguir o Design System da PrintGráfik já criado.

### Princípios

- Fundos predominantemente brancos e cinza-claro.
- Uso generoso de espaço em branco.
- Verde e amarelo como cores principais da marca.
- Azul, magenta, ciano e roxo como cores de apoio.
- Cores de apoio concentradas em ícones, linhas, bordas, setas e destaques.
- Cards com cantos arredondados.
- Sombras discretas.
- Fotografias reais da empresa, máquinas e produtos.
- Poucos elementos decorativos no fundo.
- Sem excesso de fumaças coloridas ou efeitos abstratos.

### Paleta principal

| Token | Cor |
|---|---|
| Verde principal | `#078447` |
| Amarelo da marca | `#FFD400` |
| Azul gráfico | `#1687FF` |
| Magenta gráfico | `#F02686` |
| Ciano | `#17BDE4` |
| Roxo | `#7F3FE5` |
| Texto escuro | `#0B1728` |
| Fundo claro | `#F8FAFC` |
| Branco | `#FFFFFF` |

### Tipografia

- Fonte principal: `Inter`.
- Fallbacks: `Arial`, `Helvetica`, `sans-serif`.
- Títulos com peso forte.
- Textos com boa legibilidade e largura controlada.
- Tamanho mínimo recomendado para textos: 16 px.

### Logo

Usar exclusivamente o logotipo oficial corrigido da PrintGráfik.

Não redesenhar, esticar, alterar cores ou aplicar efeitos adicionais no logo.

---

## 7. Arquitetura de navegação

### Menu principal

- Início
- Empresa
- Produtos
- Estrutura
- Contato
- Botão: Fale no WhatsApp

### Comportamento

- Cabeçalho visível e consistente em todas as páginas.
- Item da página atual destacado.
- Em telas menores, utilizar menu móvel.
- O menu móvel deve abrir e fechar por botão.
- O botão de WhatsApp deve permanecer visível no cabeçalho.
- Todos os links internos devem funcionar sem recarregamentos desnecessários ou âncoras quebradas.

---

## 8. Requisitos globais

### Cabeçalho

Deve conter:

- Logo oficial.
- Menu principal.
- Estado ativo da página atual.
- Botão de WhatsApp.
- Botão de abertura do menu em dispositivos móveis.

### Rodapé

Deve conter:

- Logo.
- Texto institucional curto.
- Links de navegação.
- Links para produtos.
- Telefone.
- WhatsApp.
- E-mail.
- Endereço.
- Links para redes sociais.
- Link para Política de Privacidade.
- Direitos autorais.

### Botões de contato

Os botões de WhatsApp devem utilizar um link configurável em um único local do código.

Mensagem inicial sugerida:

> Olá! Acessei o site da PrintGráfik e gostaria de informações sobre embalagens para minha empresa.

### Componentes reutilizáveis

- Cabeçalho.
- Menu móvel.
- Botões.
- Cards de produtos.
- Cards de diferenciais.
- Indicadores numéricos.
- Blocos de missão, visão e valores.
- Galeria.
- Chamada para contato.
- Campos de formulário.
- Rodapé.

---

## 9. Página Início

### Objetivo

Apresentar rapidamente a empresa, seus principais produtos, diferenciais e formas de contato.

### Estrutura

#### 9.1 Hero

Conteúdo:

- Logo no cabeçalho.
- Título principal: “Embalagens em papel cartão para empresas”.
- Texto de apoio.
- Botão “Conheça os produtos”.
- Botão “Falar com a equipe”.
- Imagem de uma máquina imprimindo materiais coloridos.
- Fumaças coloridas pequenas e discretas, sem dominar a composição.

Critérios:

- O título deve ser o elemento textual de maior destaque.
- A imagem deve ocupar a área direita no desktop.
- No celular, texto e imagem devem ser empilhados.
- O conteúdo principal deve aparecer sem depender de animações.

#### 9.2 Produtos em destaque

Exibir quatro cards:

1. Caixas Display.
2. Cartelas Blister.
3. Embalagens Personalizadas.
4. Embalagens em Branco.

Cada card deve possuir:

- Imagem ou representação do produto.
- Título.
- Descrição curta.
- Cor de destaque própria.
- Link para a página Produtos ou para a seção correspondente.

#### 9.3 Sobre a PrintGráfik

Conteúdo:

- Resumo da história da empresa.
- Fundação em março de 2000.
- Especialização em embalagens de papel cartão.
- Materiais Duplex, Triplex e Microondulado.
- Foto real da fachada.
- Botão “Conheça nossa história”.

#### 9.4 Indicadores

Exibir:

- 26 anos de história.
- 2.000 m² de área fabril.
- Mais de 10 serviços.
- Mais de 500 clientes satisfeitos.

Observação:

Os números devem ficar centralizados em um único arquivo ou objeto de configuração para facilitar alterações futuras.

#### 9.5 Diferenciais

Exibir quatro cards:

- Atendimento humano.
- Produção flexível.
- Processo ágil.
- Soluções sob medida.

A estrutura visual deve seguir o mockup aprovado:

- Cards brancos.
- Ícones coloridos.
- Títulos curtos.
- Descrições objetivas.

#### 9.6 Missão, visão e valores

Três cards lado a lado no desktop:

- Nossa Missão.
- Nossa Visão.
- Nossos Valores.

Valores:

- União.
- Humildade.
- Resiliência.
- Transparência.
- Sustentabilidade.
- Pessoas.

#### 9.7 Estrutura que gera qualidade

Galeria com fotografias de:

- Área de produção.
- Máquinas.
- Operadores.
- Impressão.
- Acabamentos.
- Embalagens finalizadas.

No desktop, exibir uma faixa horizontal de imagens.  
No celular, transformar em grade ou carrossel simples e acessível.

#### 9.8 Chamada final

Conteúdo:

- Título: “Vamos criar a embalagem ideal para o seu produto?”
- Texto curto.
- Botão de WhatsApp.
- Telefone.
- E-mail.
- Fundo colorido inspirado em tintas gráficas, limitado a essa faixa.

---

## 10. Página A Empresa

### Objetivo

Apresentar a história, a forma de trabalho e os princípios da PrintGráfik.

### Conteúdo

- Título da página.
- Introdução institucional.
- Fundação em março de 2000 por Ricardo de Jesus Bachiega.
- Evolução da empresa.
- Especialização em embalagens em papel cartão.
- Materiais utilizados.
- Atendimento a empresas de diferentes segmentos.
- Fotografias da empresa.
- Números institucionais.
- Missão.
- Visão.
- Valores.
- Chamada para contato.

### Critérios

- Evitar textos excessivamente longos.
- Dividir o conteúdo em blocos de fácil leitura.
- Utilizar fotos reais.
- Não usar imagens genéricas quando houver material da empresa.

---

## 11. Página Produtos

### Objetivo

Apresentar as principais soluções produzidas pela empresa.

### Categorias

#### Caixas Display

Apresentar:

- Descrição.
- Aplicações.
- Benefícios.
- Fotografias.
- Botão de contato.

#### Cartelas Blister

Apresentar:

- Descrição.
- Aplicações.
- Benefícios.
- Fotografias.
- Botão de contato.

#### Embalagens Personalizadas

Apresentar:

- Desenvolvimento conforme produto e identidade da marca.
- Possibilidade de envio de arte pronta.
- Possibilidade de apoio no desenvolvimento da arte.
- Fotografias.
- Botão de contato.

#### Embalagens em Branco

Apresentar:

- Descrição.
- Possíveis utilizações.
- Fotografias.
- Botão de contato.

#### Outros produtos

Quando houver conteúdo confirmado, poderão ser incluídos:

- Solapas.
- Materiais promocionais.
- Materiais comerciais.

### Critérios

- Cada categoria deve possuir uma âncora própria.
- Cards da Home devem direcionar para a categoria correta.
- Cada seção deve possuir um botão de WhatsApp com mensagem relacionada ao produto.
- Não informar especificações técnicas não confirmadas.
- Não informar preço.

---

## 12. Página Estrutura

### Objetivo

Demonstrar capacidade produtiva, organização e confiança.

### Conteúdo

- Apresentação da estrutura.
- Área fabril.
- Fotografias das instalações.
- Fotografias de máquinas.
- Etapas gerais do processo.
- Equipe em atividade.
- Controle de qualidade.
- Produtos finalizados.
- Chamada para contato.

### Processo de atendimento e produção

Apresentar de forma simples:

1. Cliente entra em contato.
2. Informa as necessidades do projeto.
3. Envia arte pronta ou solicita desenvolvimento.
4. Amostra física pode ser avaliada quando aplicável.
5. A empresa prepara o orçamento.
6. Cliente aprova.
7. Produção é iniciada.
8. Pedido é entregue conforme combinado.

### Observação comercial

Mencionar que, conforme a necessidade e as condições definidas comercialmente, a produção ou a entrega pode ser organizada em etapas.

Não apresentar isso como garantia para todos os pedidos.

---

## 13. Página Contato

### Objetivo

Facilitar o primeiro contato comercial.

### Informações

- WhatsApp comercial.
- Telefone.
- E-mail.
- Endereço.
- Horário de atendimento.
- Instagram.
- Mapa da localização.
- Nome ou setor responsável pelo atendimento, quando definido.

### Formulário

Campos:

- Nome.
- Empresa.
- Telefone ou WhatsApp.
- E-mail.
- Produto de interesse.
- Quantidade estimada.
- Mensagem.
- Consentimento para uso dos dados.
- Botão de envio.

### Regras

- O formulário não calcula preços.
- O formulário não confirma prazo ou produção.
- Campos obrigatórios devem ser claramente identificados.
- Mensagens de erro devem explicar o problema.
- Após o envio, mostrar confirmação.
- Evitar coletar dados desnecessários.
- Implementar proteção antispam simples.
- A forma de envio deve ser definida antes da publicação:
  - serviço externo de formulários;
  - endpoint próprio;
  - envio pelo servidor;
  - ou redirecionamento estruturado para WhatsApp.

---

## 14. Política de Privacidade

A página deve explicar:

- Quais dados são coletados.
- Por que são coletados.
- Como os dados são utilizados.
- Como o visitante pode solicitar exclusão ou correção.
- Quais serviços externos podem receber dados.
- Canal de contato para assuntos de privacidade.

O texto jurídico final deve ser validado pela empresa ou por profissional responsável.

---

## 15. Requisitos técnicos

### Stack

- HTML5 semântico.
- CSS3.
- JavaScript puro.
- Sem React.
- Sem Vue.
- Sem Bootstrap.
- Sem dependências pesadas.
- Sem build obrigatório para executar o site.

### Estrutura recomendada

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
│   ├── icons/
│   ├── products/
│   ├── factory/
│   └── gallery/
├── AGENTS.md
└── README.md
```

### Regras de código

- Usar nomes de classes previsíveis.
- Manter prefixo `pg-` nos componentes do design system.
- Reutilizar componentes.
- Evitar estilos inline, exceto em casos documentados.
- Centralizar cores, espaçamentos e tipografia em tokens CSS.
- Não duplicar cabeçalho e rodapé manualmente sem um processo claro de manutenção.
- Comentar apenas decisões relevantes.
- Não adicionar bibliotecas sem necessidade.
- Não inserir conteúdo fictício sem identificação.

### JavaScript necessário

- Abrir e fechar menu móvel.
- Atualizar atributos de acessibilidade do menu.
- Fechar menu ao selecionar um link.
- Validação básica do formulário.
- Mensagens de sucesso e erro.
- Opcional: galeria ou carrossel leve.
- Nenhuma funcionalidade essencial deve depender de animação.

---

## 16. Responsividade

### Desktop

- Container máximo aproximado: 1.180 px.
- Hero em duas colunas.
- Cards de produtos em quatro colunas.
- Diferenciais em quatro colunas.
- Missão, visão e valores em três colunas.
- Rodapé em múltiplas colunas.

### Tablet

- Hero pode permanecer em duas colunas quando houver espaço.
- Cards em duas colunas.
- Redução de espaçamentos.
- Menu pode ser transformado em menu móvel.

### Celular

- Fluxo em uma coluna.
- Imagens com largura total.
- Botões com área de toque adequada.
- Textos sem cortes.
- Cards empilhados.
- Menu móvel.
- Formulário em uma coluna.
- Rodapé empilhado.

### Breakpoints de referência

```css
@media (max-width: 1024px) {
  /* tablet */
}

@media (max-width: 760px) {
  /* celular */
}

@media (max-width: 480px) {
  /* celular compacto */
}
```

---

## 17. Acessibilidade

### Requisitos mínimos

- HTML semântico.
- Apenas um `h1` por página.
- Hierarquia correta de títulos.
- Textos alternativos nas imagens.
- Contraste adequado.
- Foco visível em links, botões e campos.
- Navegação por teclado.
- Menu móvel operável por teclado.
- Botões com rótulos claros.
- Formulários com `label`.
- Erros associados aos campos.
- Respeitar `prefers-reduced-motion`.
- Não comunicar informações apenas por cor.
- Links externos identificáveis quando necessário.

---

## 18. Desempenho

### Requisitos

- Converter imagens para WebP ou AVIF quando possível.
- Manter versões JPG ou PNG somente quando necessário.
- Definir largura e altura das imagens.
- Usar carregamento tardio abaixo da primeira dobra.
- Evitar vídeos automáticos.
- Evitar bibliotecas de ícones completas.
- Utilizar SVGs leves ou ícones próprios.
- Não carregar fontes com múltiplos pesos desnecessários.
- Minimizar CSS e JavaScript para publicação.
- Evitar sombras e filtros excessivos.
- Hero deve manter boa qualidade sem arquivo exageradamente pesado.

### Metas de referência

- Página utilizável em conexão móvel comum.
- Sem mudanças bruscas de layout durante o carregamento.
- Interações sem travamentos perceptíveis.
- Imagens principais corretamente dimensionadas.

---

## 19. Conteúdo e materiais necessários

A empresa deve fornecer ou confirmar:

- Logo oficial em formato vetorial ou PNG transparente.
- Fotografias da fachada.
- Fotografias das instalações.
- Fotografias das máquinas.
- Fotografias dos produtos.
- Fotografias de embalagens finalizadas.
- História institucional final.
- Ano e mês de fundação.
- Nome correto do fundador.
- Lista final de produtos.
- Materiais utilizados.
- Diferenciais confirmados.
- WhatsApp.
- Horários.
- Facebook, LinkedIn e outras redes ainda não confirmadas.
- Nome dos responsáveis comerciais.
- Texto final da política de privacidade.
- Número correto de clientes atendidos.
- Área fabril correta.
- Quantidade de serviços.

### Dados atualmente considerados

- Fundação: março de 2000.
- Área fabril: 2.000 m².
- Serviços: mais de 10.
- Clientes satisfeitos: mais de 500.
- Telefone: (19) 9.9144-0661.
- E-mail: printgrafik@printgrafik.com.br.
- Endereço: Rodovia Antonio Forti, nº 2400 — Bairro Morro Amarelo — Capivari/SP.
- Instagram: @printgrafik_industriagrafica.

Todos os números devem ser confirmados antes da publicação.

---

## 20. Critérios de aceite

### Geral

- Todas as páginas previstas estão criadas.
- Não existem links internos quebrados.
- Cabeçalho e rodapé são consistentes.
- Logo oficial está correto.
- Layout corresponde ao Design System.
- Site funciona nos navegadores modernos.
- Site funciona em celular, tablet e desktop.
- Não há rolagem horizontal indevida.
- Não há textos fictícios ou imagens temporárias na versão final.

### Home

- Hero corresponde ao mockup aprovado.
- Imagem da impressão colorida é utilizada.
- Fumaças são discretas.
- Quatro produtos são apresentados.
- Indicadores exibem os números confirmados.
- Diferenciais correspondem ao bloco aprovado.
- Missão, visão e valores correspondem ao bloco aprovado.
- Galeria possui imagens reais.
- CTA final corresponde ao bloco aprovado.

### Contato

- WhatsApp abre com mensagem pronta.
- Telefone pode ser acionado em dispositivos compatíveis.
- E-mail pode ser acionado.
- Formulário valida os campos.
- Envio exibe retorno claro.
- Consentimento de dados está presente.

### Acessibilidade e qualidade

- Imagens possuem texto alternativo.
- Campos possuem rótulos.
- Foco de teclado está visível.
- Menu móvel pode ser usado por teclado.
- Não existem erros críticos no console.
- HTML não possui problemas estruturais graves.

---

## 21. Etapas de desenvolvimento

### Etapa 1 — Preparação

- Criar estrutura de arquivos.
- Inserir Design System.
- Organizar logo e imagens.
- Configurar componentes globais.
- Criar cabeçalho, menu móvel e rodapé.

### Etapa 2 — Home

- Construir hero.
- Criar cards de produtos.
- Criar seção Sobre.
- Criar indicadores.
- Criar diferenciais.
- Criar missão, visão e valores.
- Criar galeria.
- Criar CTA final.

### Etapa 3 — Páginas internas

- A Empresa.
- Produtos.
- Estrutura.
- Contato.
- Política de Privacidade.

### Etapa 4 — Responsividade

- Tablet.
- Celular.
- Celular compacto.
- Ajustes de tipografia, espaçamento e imagens.

### Etapa 5 — Formulário e interações

- Menu móvel.
- Links do WhatsApp.
- Validação.
- Envio do formulário.
- Mensagens de retorno.
- Proteção antispam.

### Etapa 6 — Revisão

- Conteúdo.
- Imagens.
- Navegação.
- Responsividade.
- Acessibilidade.
- Desempenho.
- Teste em navegadores.

### Etapa 7 — Publicação

- Compactar arquivos.
- Enviar ao servidor.
- Validar caminhos.
- Validar HTTPS.
- Testar formulário.
- Testar WhatsApp.
- Fazer revisão final em produção.

---

## 22. Definição de pronto

O projeto será considerado pronto quando:

- Todas as páginas estiverem publicadas.
- O layout seguir o mockup e o Design System aprovados.
- O conteúdo final estiver revisado.
- As imagens reais estiverem aplicadas.
- O formulário estiver funcionando.
- O WhatsApp estiver funcionando.
- O site estiver responsivo.
- Os principais testes de acessibilidade estiverem concluídos.
- Não houver erros críticos no console.
- O cliente tiver aprovado a versão final.

---

## 23. Instrução inicial para o Codex

```text
Leia integralmente o PRD e o Design System da PrintGráfik antes de alterar qualquer arquivo.

Implemente o site institucional usando HTML5, CSS3 e JavaScript puro, sem frameworks.

Respeite:
- a estrutura de páginas definida no PRD;
- os componentes com prefixo pg-;
- os tokens de cor, tipografia, espaçamento, raio e sombra;
- os requisitos de responsividade e acessibilidade;
- o escopo e os itens explicitamente fora do escopo.

Não implemente todas as páginas de uma vez.

Comece pela estrutura global:
1. organização dos arquivos;
2. cabeçalho;
3. menu móvel;
4. rodapé;
5. tokens e componentes compartilhados.

Em seguida, implemente a Home por seções, validando cada etapa antes de continuar.

Não invente dados, contatos, números ou imagens. Quando faltar informação, use marcadores claramente identificados e registre a pendência no README.
```
