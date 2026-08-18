# Site institucional da PrintGráfik

Primeira etapa do novo site institucional da PrintGráfik, construída como site estático com HTML5, CSS3 e JavaScript puro.

## Implementado

- Home responsiva completa.
- Página A Empresa completa e alinhada ao mockup `docs/empresa-mock.png`, com texto institucional aprovado no hero, história, soluções, fotografia de montagem com enquadramento ampliado acima da cabeça do funcionário, atendimento, princípios, localização, chamada comercial e movimentos leves durante a rolagem.
- Localização da empresa com dados oficiais e mapa incorporado do Google Maps.
- Página Produtos completa e alinhada ao mockup `docs/mock-produtos.png`, com seis categorias — incluindo Cintas —, materiais, processo do pedido, orientações comerciais, chamada final e movimentos leves durante a rolagem.
- Na página Produtos, Cintas ocupa a quarta posição e Embalagens em Branco encerra a lista de categorias.
- Os detalhes de Cintas usam roxo na Home e na página Produtos, enquanto os detalhes de Solapas usam ciano na página Produtos; as imagens verticais de Cartelas Blister e Cintas possuem respiro superior e inferior nos dois contextos.
- As fotografias exibidas em Caixas Display e Embalagens Personalizadas foram associadas às categorias corretas na Home e na página Produtos.
- Os cards das categorias de Produtos mantêm a mesma altura dentro de cada linha no desktop, sem fazer uma linha aumentar a outra, e os botões ficam alinhados na base. Os conteúdos de Embalagens em Branco e Solapas foram equilibrados para evitar espaços excessivos. No celular, cada card conserva sua altura natural.
- As áreas das fotos na página Produtos usam o mesmo fundo branco dos cards. Na Home, os PNGs transparentes aparecem sobre um verde acinzentado muito discreto para destacar os recortes sem pesar no layout.
- Hero da página Produtos com vídeo real do processo de produção, controles nativos, autoplay mudo e thumbnail local.
- Página Estrutura completa e alinhada ao mockup `docs/mock-estrutura.png`, com a fotografia panorâmica atual do parque gráfico no hero, acompanhamento próximo, seis etapas produtivas, equipamentos, qualidade, galeria de fotos, quatro vídeos, dois espaços reservados para novas mídias e chamada comercial.
- Página Contato com hero dedicado aos canais de atendimento, fotografia da secretária em sua proporção original, sem faixas laterais e com bordas arredondadas, três telefones identificados por setor e vinculados individualmente ao WhatsApp, formulário de orçamento e demais canais confirmados.
- Banners finais das cinco páginas principais atualizados com a imagem real `assets/images/banner-arco-iris.png`, em formato mais alto e ocupando toda a largura útil da página, sem faixas brancas laterais, película, sombra, máscara, recorte da arte ou rolagem horizontal. Em celulares, a imagem permanece inteira no topo e o conteúdo segue abaixo para não deformá-la.
- Cabeçalho compartilhado e menu móvel acessível.
- Botões de contato padronizados com o texto “Fale com nossa equipe”.
- Botões de WhatsApp direcionados ao telefone do Diretor, `(19) 99144-0661`, com mensagem inicial contextual.
- O botão de contato do banner final da Home utiliza texto preto sobre fundo branco.
- Hero com a imagem final da máquina de impressão.
- Texto do hero da Home atualizado para destacar caixas displays e cartuchos.
- Textos institucionais da Home revisados conforme conteúdo aprovado, com “Indústria Gráfica” identificado abaixo do logo no cabeçalho de todas as páginas e um pequeno respiro entre logo e identificação.
- No desktop, a imagem do hero da Home se estende do conteúdo central até a borda direita da tela; em telas menores, permanece contida e empilhada.
- A faixa verde dos indicadores da Home ocupa toda a largura da tela, enquanto os quatro números permanecem alinhados ao container central.
- Os círculos dos ícones dos indicadores usam roxo, azul, amarelo e magenta sólidos, com borda clara e sombra para maior destaque visual.
- Cards de produtos em destaque.
- Seção institucional com a fotografia real da fachada.
- Indicadores, diferenciais, missão, visão e valores.
- Galeria da Home atualizada com cinco fotografias reais da estrutura, incluindo um profissional no controle de qualidade e a vista do parque gráfico sem a lona no primeiro plano, sem placeholder.
- Chamada final para contato.
- Rodapé padronizado em todas as páginas, com navegação, as seis categorias de produtos, os três telefones setoriais configuráveis, Instagram ativo e redes ainda não confirmadas desativadas.
- Telefone, e-mail, endereço e Instagram oficiais exibidos nos pontos de contato do site.
- Página de Política de Privacidade mantida como estrutura temporária até a validação do texto jurídico.
- Suporte a navegação por teclado, foco visível e `prefers-reduced-motion`.
- Preparação técnica inicial de SEO com metadados únicos, canonicals do domínio oficial, Open Graph, Twitter Card, favicons, `robots.txt`, `sitemap.xml` e página 404.
- Teste automatizado local de links, imagens, console, menu móvel e responsividade.

## Estrutura

```text
site-printgrafik/
├── 404.html
├── index.html
├── empresa.html
├── produtos.html
├── estrutura.html
├── contato.html
├── politica-de-privacidade.html
├── robots.txt
├── sitemap.xml
├── favicon.ico
├── favicon-32x32.png
├── apple-touch-icon.png
├── css/
│   ├── tokens.css
│   ├── components.css
│   ├── contato.css
│   ├── empresa.css
│   ├── estrutura.css
│   ├── home.css
│   ├── produtos.css
│   └── responsive.css
├── js/
│   └── main.js
├── assets/
│   ├── empresa/
│   ├── hero/
│   ├── images/
│   ├── logo/
│   ├── produtos/
│   ├── estrutura/
│   └── placeholders/
├── docs/
└── tests/
    └── site-check.mjs
```

## Imagens finais

- `assets/logo/logo-printgrafik.png`: cópia preservada do logo oficial.
- `assets/logo/logo-printgrafik-600.png`: versão reduzida e otimizada para uso no site, sem alteração de proporção ou cores.
- `assets/hero/hero-impressao-printgrafik.jpg`: imagem final do hero.
- `assets/hero/hero-impressao-mobile.jpg`: versão vertical do hero usada em telas de até 820 px.
- `assets/empresa/fachada.jpeg`: fotografia real da fachada usada na Home e na página A Empresa.
- `assets/produtos/producao.mp4`: vídeo anterior preservado como alternativa para a página Produtos.
- `assets/produtos/hero-produtos.jpg`: thumbnail anterior preservado como alternativa local.
- `assets/produtos/video-caixa-placeholder.svg`: placeholder anterior preservado como alternativa local.
- `assets/estrutura/`: fotografias e vídeos reais da fábrica, dos equipamentos, da equipe e das áreas produtivas.
- `assets/estrutura/parque-grafico.jpeg`: fotografia panorâmica atual usada no hero da página Estrutura.
- `assets/estrutura/montagem-caixa.jpeg`: fotografia original preservada do funcionário montando a embalagem.
- `assets/estrutura/montagem-caixa-enquadramento-completo.png`: versão usada no bloco de produtos da página Empresa, com extensão superior para mostrar a cabeça inteira.
- `assets/estrutura/atendente.jpeg`: fotografia usada no bloco de atendimento da página Empresa.
- `assets/estrutura/secretaria.jpeg`: fotografia usada no hero da página Contato.
- Os arquivos fornecidos originalmente permanecem preservados em `assets/images/`.

Na página Estrutura, as novas mídias foram distribuídas assim:

- `parque-grafico.jpeg`: hero da página Estrutura, priorizando uma visão panorâmica atual do espaço e da equipe em atividade.
- `setor-corte-vinco.jpg`: item da galeria fotográfica.
- `impressora-offset-man-roland.jpg`: card da impressora offset Roland 300 e poster de vídeo.
- `equipamento-corte-vinco.jpg`, `area-corte-vinco-acabamento.jpg` e `visao-geral-area-producao.jpg`: cards de equipamentos e processos.
- `panoramica-parque-grafico.jpg`: poster do vídeo da coladeira.
- `controle-qualidade-impressao.jpg`: bloco de controle de qualidade.
- `desenvolvimento-tecnico-embalagem.jpg`, `unidades-impressao-offset-cores.jpg` e `fachada-lateral-por-do-sol.jpg`: galeria fotográfica.
- Quatro vídeos MP4 selecionados na galeria “Área fabril em produção”, todos com controles nativos, `playsinline`, `preload="metadata"`, poster local e sem autoplay, além de dois espaços reservados para novas mídias. O arquivo `acabamento-corte-e-vinco.mp4` aparece no terceiro card e o quarto vídeo é identificado como “Projeto em execução”.

Os arquivos foram mantidos no formato e na qualidade fornecidos. Os vídeos não são baixados integralmente antes da interação porque usam apenas pré-carregamento de metadados.

## Placeholders

Os PNGs transparentes finais de Caixas Display, Cartelas Blister, Embalagens Personalizadas, Embalagens em Branco, Solapas e Cintas estão em `assets/produtos/` e são usados na página Produtos. A Home destaca Caixas Display, Cartelas Blister, Embalagens Personalizadas e Cintas. As fotos usam enquadramento integral para evitar cortes.

As fotografias finais abaixo ainda não foram fornecidas e usam SVGs locais claramente identificados:

- Fotografias reais dos produtos em uso, quando houver novos registros aprovados.

Os arquivos estão em `assets/placeholders/` e `assets/produtos/` e podem ser substituídos sem alterar a estrutura das páginas.

## Dados centralizados

Os dados institucionais e de contato estão centralizados no objeto `PG_SITE_CONFIG`, no início de `js/main.js`.

Dados institucionais atuais:

- Fundação: março de 2000.
- 26 anos de história.
- 2.000 m² de área fabril.
- Mais de 10 serviços.
- Mais de 500 clientes satisfeitos.

### Distribuição editorial

- A Home concentra o resumo numérico institucional: tempo de atuação, área fabril, serviços e clientes.
- A página Empresa prioriza história, soluções, atendimento, princípios e localização, sem repetir o bloco de indicadores.
- A página Estrutura menciona somente a área fabril e se dedica aos espaços, equipamentos, fluxo produtivo e controle de qualidade.
- A explicação sobre organização flexível da produção e da entrega fica na página Produtos; na Home aparece apenas como diferencial resumido.
- Cabeçalho, rodapé e dados de contato permanecem compartilhados por serem elementos globais de navegação e conversão.
- Entre os banners finais, somente o da Home possui botão; os banners das páginas internas mantêm o texto centralizado e sem ações.

Dados de contato confirmados:

- Diretor: `(19) 99144-0661`.
- Vendas: `(19) 99425-3333`.
- Empresa: `(19) 99246-4807`.
- E-mail: `printgrafik@printgrafik.com.br`.
- Endereço: Rodovia Antonio Forti, nº 2400 — Bairro Morro Amarelo — Capivari/SP.
- Instagram: `@printgrafik_industriagrafica`.

## Pendências

Itens marcados com `TODO` no objeto de configuração e que precisam de confirmação:

- Horário de atendimento.
- URLs oficiais de Facebook e LinkedIn.

Os botões de contato abrem diretamente o WhatsApp do Diretor. Facebook e LinkedIn permanecem visualmente desativados.

Também permanecem pendentes:

- Fotografias reais adicionais dos produtos em uso.
- Ativação do formulário FormSubmit pelo link que será enviado para `printgrafik@printgrafik.com.br` na primeira submissão real.
- Texto jurídico final da Política de Privacidade.

## Formulário de contato

O formulário de `contato.html` solicita somente os dados necessários para a análise inicial:

- Nome, telefone ou WhatsApp, e-mail, produto de interesse, mensagem e consentimento são obrigatórios.
- Empresa, quantidade estimada e medidas aproximadas são opcionais.
- Não há coleta de CPF, CNPJ, documentos, arquivos ou dados sensíveis.
- Os dados não são armazenados no navegador nem registrados no console.
- Um campo honeypot oculto oferece uma barreira antispam simples.

O envio é realizado diretamente por AJAX para o endpoint do [FormSubmit](https://formsubmit.co/documentation), configurado em `js/main.js`, e não abre o aplicativo de e-mail do visitante. A interface apresenta estado de envio, sucesso somente após uma resposta positiva do serviço, aviso específico quando a ativação estiver pendente e uma mensagem de erro quando a requisição falha. Os testes automatizados simulam essas respostas e não enviam mensagens reais.

Os detalhes técnicos do serviço de envio ficam documentados apenas neste README e não são exibidos abaixo do formulário.

O primeiro envio técnico pelo site publicado foi realizado em 10/08/2026 e o FormSubmit confirmou o encaminhamento da mensagem de ativação para `printgrafik@printgrafik.com.br`. É necessário abrir esse e-mail e clicar em `Activate Form`; segundo a documentação do serviço, submissões anteriores à ativação ficam retidas e são encaminhadas após a confirmação. O FormSubmit também informa que mantém submissões no arquivo do serviço por até 30 dias, ponto que deve constar na validação jurídica final da Política de Privacidade.

Os contatos inteligentes das páginas abrem o WhatsApp do Diretor no número `(19) 99144-0661`. Na página Contato, cada um dos três telefones do hero abre o WhatsApp do próprio setor; o WhatsApp não é repetido em “Outros canais”. O horário permanece oculto; Facebook e LinkedIn aparecem no rodapé como ícones desativados, sem links inventados.

## Vídeo do hero de Produtos

O hero da página Produtos utiliza o registro `assets/estrutura/WhatsApp Video 2026-08-07 at 09.52.14.mp4`, com a fotografia `assets/estrutura/impressora-offset-man-roland.jpg` como poster. O vídeo possui controles nativos, autoplay mudo, `playsinline`, `preload="metadata"` e fallback textual. O autoplay permanece mudo para ser aceito pelos navegadores e não interromper o visitante com áudio inesperado.

## SEO técnico

O domínio oficial definido para a preparação de SEO é `https://www.printgrafik.com.br`. O GitHub Pages é ambiente temporário de homologação. As URLs canônicas apontam para o domínio oficial da PrintGráfik.

A homologação temporária está disponível em `https://andreblosaliatti.github.io/printgrafik/`, mas essa URL não é usada em canonical, Open Graph ou sitemap. Na verificação realizada durante esta etapa, o endereço com `www` do domínio oficial redirecionava para `https://printgrafik.com.br/`, sem `www`. A configuração de hospedagem e DNS deverá definir um único host definitivo antes da publicação; os arquivos do projeto seguem o host com `www` solicitado para esta etapa.

### Canonicals e sitemap

As páginas públicas usam uma única canonical absoluta:

- `https://www.printgrafik.com.br/`
- `https://www.printgrafik.com.br/empresa.html`
- `https://www.printgrafik.com.br/produtos.html`
- `https://www.printgrafik.com.br/estrutura.html`
- `https://www.printgrafik.com.br/contato.html`
- `https://www.printgrafik.com.br/politica-de-privacidade.html`

Essas mesmas seis URLs compõem `sitemap.xml`. A página `404.html` não possui canonical e não entra no sitemap. Não foram adicionados `lastmod`, `changefreq` ou `priority` sem dados confirmados.

O arquivo `robots.txt` permite o rastreamento das páginas e dos recursos públicos e informa `https://www.printgrafik.com.br/sitemap.xml`. Não há bloqueio global nem metatag `noindex` aplicada às páginas públicas.

### Compartilhamento e ícones

Todas as páginas públicas possuem title e meta description únicos, Open Graph básico e Twitter Card `summary_large_image`. A imagem real `assets/hero/hero-impressao-printgrafik.jpg` é reutilizada por URL absoluta em `og:image` e `twitter:image`. Uma arte social dedicada em proporção 1200 × 630 pode ser preparada futuramente, mas não é necessária para que os metadados atuais funcionem.

Os arquivos `favicon.ico`, `favicon-32x32.png` e `apple-touch-icon.png` foram derivados do logo oficial sem alterar os arquivos de origem. As seis páginas públicas e a página 404 referenciam os três ícones.

### Página 404

`404.html` é uma página estática, responsiva e independente de backend. Ela informa que o endereço não foi encontrado e oferece links para a Home e para Contato.

### Pendências para publicação

- Publicar o site no domínio oficial.
- Confirmar se o host definitivo será com ou sem `www` e configurar o redirecionamento correspondente.
- Confirmar HTTPS em todas as páginas e recursos.
- Validar o carregamento público de `robots.txt`, `sitemap.xml`, favicons e imagem social.
- Opcionalmente preparar uma imagem social dedicada em 1200 × 630.

O Google Search Console não foi configurado nesta etapa. Depois da publicação no domínio oficial:

1. Adicionar a propriedade do domínio no Google Search Console.
2. Verificar o domínio.
3. Enviar `https://www.printgrafik.com.br/sitemap.xml`.
4. Testar a Home com a inspeção de URL.
5. Solicitar a indexação da Home.
6. Acompanhar cobertura, páginas indexadas e eventuais erros.

### Checklist do dia da publicação

- [ ] Confirmar HTTPS.
- [ ] Confirmar o domínio e o host canônico definitivo.
- [ ] Abrir `/robots.txt`.
- [ ] Abrir `/sitemap.xml`.
- [ ] Testar as canonicals das seis páginas públicas.
- [ ] Abrir e revisar todas as páginas, inclusive `/404.html`.
- [ ] Verificar o Google Search Console.
- [ ] Enviar o sitemap.
- [ ] Solicitar a indexação da Home.
- [ ] Conferir a versão mobile.
- [ ] Conferir o console do navegador.
- [ ] Testar os links de WhatsApp e o formulário.

## Executar localmente

As páginas podem ser visualizadas abrindo `index.html` diretamente, mas o envio pelo FormSubmit exige HTTP ou HTTPS. Para testar o formulário localmente, na raiz do projeto execute:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Testes

Com Node.js 22 ou superior e Microsoft Edge instalado no caminho padrão do Windows:

```bash
node tests/site-check.mjs
```

Para validar somente a preparação técnica de SEO, sem executar a matriz visual completa:

```bash
node tests/site-check.mjs --seo-only
```

O teste verifica:

- Existência dos destinos de links e imagens locais.
- Existência e resposta HTTP de `robots.txt`, `sitemap.xml`, `404.html` e dos três favicons.
- XML balanceado, namespace e conjunto exato de URLs públicas do sitemap.
- `lang="pt-BR"`, charset UTF-8 e viewport em todas as páginas HTML.
- Titles e meta descriptions únicos e corretos nas seis páginas públicas.
- Uma única canonical correta por página, sem URLs do GitHub Pages ou localhost.
- Open Graph, Twitter Card e imagem social absoluta nas páginas públicas.
- Presença de `alt` em todas as imagens e sequência de headings sem saltos de nível.
- Existência das âncoras da página Produtos.
- Ausência de IDs duplicados em cada documento HTML.
- Um único `h1` em cada página.
- Ausência de rolagem horizontal em 1440, 1280, 1024, 768, 480, 375 e 320 px.
- Carregamento das imagens requisitadas.
- Funcionamento do menu móvel, `aria-expanded`, tecla `Escape` e retorno de foco.
- Responsividade, imagens, navegação ativa e fallback de contato da página A Empresa.
- Responsividade, seis categorias, imagens, navegação ativa, fallback de contato, CTA sem botões e movimentos da página Produtos.
- Responsividade, fotografias reais, vídeos, navegação ativa, carregamento tardio e movimentos da página Estrutura.
- Presença das seis etapas produtivas, seis itens de acompanhamento, oito critérios de qualidade e CTAs com fallback da página Estrutura.
- Ausência de repetição do resumo numérico institucional em Empresa e, em Estrutura, presença apenas da área fabril.
- Presença de cinco fotografias reais e nenhum placeholder de estrutura na galeria da Home.
- Presença de quatro vídeos e dois espaços reservados na página Estrutura, com poster local, controles, pré-carregamento de metadados e sem autoplay.
- Presença e carregamento do vídeo real, thumbnail, controles e autoplay mudo no hero de Produtos.
- Responsividade, fotografia integral no hero, três links setoriais de WhatsApp, navegação ativa, labels, campos obrigatórios, validação acessível, foco no primeiro erro e canais confirmados da página Contato.
- WhatsApp do Diretor configurado nos botões gerais e links individuais de WhatsApp configurados nos três telefones do hero de Contato, além do envio AJAX simulado nos testes, com estados de progresso, sucesso e erro sem abrir aplicativo externo.
- Erros no console do navegador.

Capturas visuais temporárias são geradas fora do repositório durante o teste.
