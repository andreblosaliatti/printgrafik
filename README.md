# Site institucional da PrintGráfik

Primeira etapa do novo site institucional da PrintGráfik, construída como site estático com HTML5, CSS3 e JavaScript puro.

## Implementado

- Home responsiva completa.
- Página A Empresa completa e alinhada ao mockup `docs/empresa-mock.png`, com história, soluções, atendimento, princípios, localização, chamada comercial e movimentos leves durante a rolagem.
- Localização da empresa com dados oficiais e mapa incorporado do Google Maps.
- Página Produtos completa e alinhada ao mockup `docs/mock-produtos.png`, com cinco categorias, materiais, processo do pedido, orientações comerciais, chamada final e movimentos leves durante a rolagem.
- Hero da página Produtos com vídeo real do processo de produção, controles nativos, autoplay mudo e thumbnail local.
- Página Estrutura completa e alinhada ao mockup `docs/mock-estrutura.png`, com hero, acompanhamento próximo, seis etapas produtivas, equipamentos, qualidade, galeria e chamada comercial.
- Página Contato completa e alinhada à versão enxuta de `docs/mock-contato.png`, com hero, formulário de orçamento, canais confirmados e bloco final informativo.
- Cabeçalho compartilhado e menu móvel acessível.
- Hero com a imagem final da máquina de impressão.
- Cards de produtos em destaque.
- Seção institucional com a fotografia real da fachada.
- Indicadores, diferenciais, missão, visão e valores.
- Galeria da Home atualizada com quatro fotografias reais da estrutura e apenas um placeholder pendente para operador.
- Chamada final para contato.
- Rodapé com navegação, produtos, contatos configuráveis, Instagram ativo e redes ainda não confirmadas desativadas.
- Telefone, e-mail, endereço e Instagram oficiais exibidos nos pontos de contato do site.
- Página de Política de Privacidade mantida como estrutura temporária até a validação do texto jurídico.
- Suporte a navegação por teclado, foco visível e `prefers-reduced-motion`.
- Teste automatizado local de links, imagens, console, menu móvel e responsividade.

## Estrutura

```text
site-printgrafik/
├── index.html
├── empresa.html
├── produtos.html
├── estrutura.html
├── contato.html
├── politica-de-privacidade.html
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
- `assets/empresa/fachada-printgrafik.jpg`: fotografia real da fachada usada na Home e na página A Empresa.
- `assets/empresa/fachada-printgrafik-estrutura.jpg`: versão 1280 × 720 e 16:9 otimizada para o hero da página Estrutura; o original foi preservado.
- `assets/produtos/hero-produtos.jpg`: imagem estática preservada como alternativa para a página Produtos.
- `assets/produtos/producao.mp4`: vídeo real exibido no hero da página Produtos.
- `assets/produtos/hero-produtos.jpg`: thumbnail exibido antes do início da reprodução do vídeo.
- `assets/produtos/video-caixa-placeholder.svg`: placeholder anterior preservado como alternativa local.
- `assets/estrutura/`: doze fotografias reais da fábrica, dos equipamentos e das áreas produtivas.
- Os arquivos fornecidos originalmente permanecem preservados em `assets/images/`.

Na página Estrutura são usadas a fachada otimizada e oito fotografias reais:

- `assets/estrutura/impressora-offset-man-roland.jpeg`: card Impressão offset.
- `assets/estrutura/corte-vinco-frontal.jpeg`: card Corte.
- `assets/estrutura/corte-vinco-acabamento.jpeg`: card Corte, vinco e acabamento.
- `assets/estrutura/area-interna-producao.jpeg`: card Área interna de produção.
- `assets/estrutura/linha-impressao-offset.jpeg`: galeria, Linha de impressão.
- `assets/estrutura/parque-grafico.jpeg`: galeria, Parque gráfico.
- `assets/estrutura/impressora-offset-detalhe.jpeg`: galeria, Equipamentos de produção.
- `assets/estrutura/galpao-producao.jpeg`: galeria, Galpão de produção.

As vistas `estrutura-interna-fabrica.jpeg`, `impressora-offset-lateral.jpeg`, `impressora-offset-man-roland-frontal.jpeg` e `impressora-offset-visao-ampla.jpeg` permanecem como alternativas ou são usadas na Home. A última mostra a área externa apesar do nome e, por isso, não foi descrita como equipamento na página Estrutura. O arquivo `guilhotina-polar.jpeg` citado como alternativa no briefing não foi fornecido; o card Corte usa `corte-vinco-frontal.jpeg`.

Os JPEGs de `assets/estrutura/` foram mantidos nos arquivos originais porque já possuem tamanho reduzido, entre aproximadamente 100 KB e 140 KB; uma conversão adicional não produziria ganho material para esta etapa.

## Placeholders

As fotografias finais abaixo ainda não foram fornecidas e usam SVGs locais claramente identificados:

- Caixas Display.
- Cartelas Blister.
- Embalagens Personalizadas.
- Embalagens em Branco.
- Solapas e materiais gráficos para embalagens.
- Operador trabalhando.
- Atendimento pessoal da equipe.

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

- Telefone: `(19) 9.9144-0661`.
- E-mail: `printgrafik@printgrafik.com.br`.
- Endereço: Rodovia Antonio Forti, nº 2400 — Bairro Morro Amarelo — Capivari/SP.
- Instagram: `@printgrafik_industriagrafica`.

## Pendências

Itens marcados com `TODO` no objeto de configuração e que precisam de confirmação:

- WhatsApp.
- Horário de atendimento.
- URLs oficiais de Facebook e LinkedIn.

Enquanto WhatsApp estiver ausente, os botões correspondentes levam para a página interna de contato. Facebook e LinkedIn permanecem visualmente desativados.

Também permanecem pendentes:

- Fotografias reais dos produtos e de um operador trabalhando.
- Configuração de um endpoint ou serviço aprovado para envio direto do formulário de contato.
- Texto jurídico final da Política de Privacidade.

## Formulário de contato

O formulário de `contato.html` solicita somente os dados necessários para a análise inicial:

- Nome, telefone ou WhatsApp, e-mail, produto de interesse, mensagem e consentimento são obrigatórios.
- Empresa, quantidade estimada e medidas aproximadas são opcionais.
- Não há coleta de CPF, CNPJ, documentos, arquivos ou dados sensíveis.
- Os dados não são armazenados no navegador nem registrados no console.
- Um campo honeypot oculto oferece uma barreira antispam simples.

Como ainda não existe endpoint ou serviço externo aprovado, o envio atual valida os campos e prepara uma mensagem por `mailto:` para o e-mail confirmado `printgrafik@printgrafik.com.br`. O visitante precisa revisar e concluir o envio em seu aplicativo de e-mail; o site não apresenta confirmação de entrega.

Para habilitar envio direto antes da publicação, configure um endpoint ou serviço aprovado em `js/main.js`, substitua a etapa de preparação do `mailto:` por uma requisição segura e só apresente sucesso após uma resposta positiva real. Não inclua tokens ou segredos no frontend.

Enquanto o WhatsApp não for confirmado, a chamada correspondente na página Contato direciona ao formulário e apresenta o rótulo “Solicitar orçamento pelo formulário”. WhatsApp e horário permanecem ocultos nos canais de contato; Facebook e LinkedIn aparecem no rodapé como ícones desativados, sem links inventados.

## Vídeo do hero de Produtos

O hero da página Produtos utiliza `assets/produtos/producao.mp4`. O vídeo possui controles nativos, autoplay mudo, `playsinline`, `preload="metadata"` e fallback textual. O arquivo `assets/produtos/hero-produtos.jpg` funciona como thumbnail antes do início da reprodução. O autoplay permanece mudo para ser aceito pelos navegadores e não interromper o visitante com áudio inesperado.

## Executar localmente

O site pode ser aberto diretamente pelo arquivo `index.html`. Para reproduzir um ambiente HTTP local, na raiz do projeto execute:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Testes

Com Node.js 22 ou superior e Microsoft Edge instalado no caminho padrão do Windows:

```bash
node tests/site-check.mjs
```

O teste verifica:

- Existência dos destinos de links e imagens locais.
- Existência das âncoras da página Produtos.
- Ausência de IDs duplicados em cada documento HTML.
- Um único `h1` em cada página.
- Ausência de rolagem horizontal em 1440, 1280, 1024, 768, 480, 375 e 320 px.
- Carregamento das imagens requisitadas.
- Funcionamento do menu móvel, `aria-expanded`, tecla `Escape` e retorno de foco.
- Responsividade, imagens, navegação ativa e fallback de contato da página A Empresa.
- Responsividade, cinco categorias, imagens, navegação ativa, fallback de contato, CTA sem botões e movimentos da página Produtos.
- Responsividade, fotografias reais, navegação ativa, carregamento tardio e movimentos da página Estrutura.
- Presença das seis etapas produtivas, seis itens de acompanhamento, oito critérios de qualidade e CTAs com fallback da página Estrutura.
- Ausência de repetição do resumo numérico institucional em Empresa e, em Estrutura, presença apenas da área fabril.
- Presença de quatro fotografias reais e somente um placeholder de estrutura na galeria da Home.
- Presença e carregamento do vídeo real, thumbnail, controles e autoplay mudo no hero de Produtos.
- Responsividade, fachada, navegação ativa, labels, campos obrigatórios, validação acessível, foco no primeiro erro, canais confirmados e fallbacks da página Contato.
- Ausência de WhatsApp e horário não confirmados na página Contato, além do método `mailto:` claramente identificado sem sucesso fictício.
- Erros no console do navegador.

Capturas visuais temporárias são geradas fora do repositório durante o teste.
