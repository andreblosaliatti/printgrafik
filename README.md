# Site institucional da PrintGráfik

Primeira etapa do novo site institucional da PrintGráfik, construída como site estático com HTML5, CSS3 e JavaScript puro.

## Implementado

- Home responsiva completa.
- Página A Empresa completa e alinhada ao mockup `docs/empresa-mock.png`, com texto institucional aprovado no hero, história, soluções, fotografias de montagem de embalagem e atendimento, princípios, localização, chamada comercial e movimentos leves durante a rolagem.
- Localização da empresa com dados oficiais e mapa incorporado do Google Maps.
- Página Produtos completa e alinhada ao mockup `docs/mock-produtos.png`, com seis categorias — incluindo Cintas —, materiais, processo do pedido, orientações comerciais, chamada final e movimentos leves durante a rolagem.
- Na página Produtos, Cintas ocupa a quarta posição e Embalagens em Branco encerra a lista de categorias.
- Os cards das categorias de Produtos mantêm a mesma altura dentro de cada linha no desktop, sem fazer uma linha aumentar a outra, e os botões ficam alinhados na base. Os conteúdos de Embalagens em Branco e Solapas foram equilibrados para evitar espaços excessivos. No celular, cada card conserva sua altura natural.
- As áreas das fotos na página Produtos usam o mesmo fundo branco dos cards. Na Home, os PNGs transparentes aparecem sobre um verde acinzentado muito discreto para destacar os recortes sem pesar no layout.
- Hero da página Produtos com vídeo real do processo de produção, controles nativos, autoplay mudo e thumbnail local.
- Página Estrutura completa e alinhada ao mockup `docs/mock-estrutura.png`, com a fotografia panorâmica atual do parque gráfico no hero, acompanhamento próximo, seis etapas produtivas, equipamentos, qualidade, galeria de fotos, quatro vídeos e chamada comercial.
- Página Contato com hero dedicado aos canais de atendimento, fotografia da secretária, três telefones identificados por setor, formulário de orçamento e demais canais confirmados.
- Banners finais das cinco páginas principais atualizados com a imagem real `assets/images/banner-arco-iris.png`, em formato mais alto e ocupando toda a largura útil da página, sem faixas brancas laterais, película, sombra, máscara, recorte da arte ou rolagem horizontal. Em celulares, a imagem permanece inteira no topo e o conteúdo segue abaixo para não deformá-la.
- Cabeçalho compartilhado e menu móvel acessível.
- Botões de contato padronizados com o texto “Fale com nossa equipe”.
- Botões de WhatsApp direcionados ao telefone do Diretor, `(19) 99144-0661`, com mensagem inicial contextual.
- O botão de contato do banner final da Home utiliza texto preto sobre fundo branco.
- Hero com a imagem final da máquina de impressão.
- Textos institucionais da Home revisados conforme conteúdo aprovado, com “Indústria Gráfica” identificado abaixo do logo no cabeçalho de todas as páginas e um pequeno respiro entre logo e identificação.
- No desktop, a imagem do hero da Home se estende do conteúdo central até a borda direita da tela; em telas menores, permanece contida e empilhada.
- A faixa verde dos indicadores da Home ocupa toda a largura da tela, enquanto os quatro números permanecem alinhados ao container central.
- Cards de produtos em destaque.
- Seção institucional com a fotografia real da fachada.
- Indicadores, diferenciais, missão, visão e valores.
- Galeria da Home atualizada com cinco fotografias reais da estrutura, incluindo um profissional no controle de qualidade, sem placeholder.
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
- `assets/produtos/producao.mp4`: vídeo anterior preservado como alternativa para a página Produtos.
- `assets/produtos/hero-produtos.jpg`: thumbnail anterior preservado como alternativa local.
- `assets/produtos/video-caixa-placeholder.svg`: placeholder anterior preservado como alternativa local.
- `assets/estrutura/`: dezenove fotografias reais e oito vídeos da fábrica, dos equipamentos, da equipe e das áreas produtivas.
- `assets/estrutura/parque-grafico.jpeg`: fotografia panorâmica atual usada no hero da página Estrutura.
- `assets/estrutura/montagem-caixa.jpeg`: fotografia usada no bloco de produtos da página Empresa.
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
- Quatro vídeos MP4 selecionados: galeria “Bastidores da produção”, todos com controles nativos, `playsinline`, `preload="metadata"`, poster local e sem autoplay. O primeiro card é identificado como “Coladeira funcionando”; o card “Equipamentos de impressão Roland 305 L” utiliza o mesmo registro `WhatsApp Video 2026-08-07 at 09.52.14.mp4` do hero de Produtos.

Os arquivos foram mantidos no formato e na qualidade fornecidos. As fotos ocupam aproximadamente 260 KB a 560 KB; os vídeos selecionados totalizam cerca de 16 MB, mas não são baixados integralmente antes da interação porque usam apenas pré-carregamento de metadados.

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

Os contatos inteligentes das páginas abrem o WhatsApp do Diretor no número `(19) 99144-0661`. Na página Contato, os três telefones confirmados continuam disponíveis diretamente no hero e o WhatsApp também aparece entre os demais canais. O horário permanece oculto; Facebook e LinkedIn aparecem no rodapé como ícones desativados, sem links inventados.

## Vídeo do hero de Produtos

O hero da página Produtos utiliza o registro `assets/estrutura/WhatsApp Video 2026-08-07 at 09.52.14.mp4`, com a fotografia `assets/estrutura/impressora-offset-man-roland.jpg` como poster. O vídeo possui controles nativos, autoplay mudo, `playsinline`, `preload="metadata"` e fallback textual. O autoplay permanece mudo para ser aceito pelos navegadores e não interromper o visitante com áudio inesperado.

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

O teste verifica:

- Existência dos destinos de links e imagens locais.
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
- Presença de quatro vídeos na página Estrutura, com poster local, controles, pré-carregamento de metadados e sem autoplay.
- Presença e carregamento do vídeo real, thumbnail, controles e autoplay mudo no hero de Produtos.
- Responsividade, nova fotografia do hero, três telefones setoriais, navegação ativa, labels, campos obrigatórios, validação acessível, foco no primeiro erro e canais confirmados da página Contato.
- WhatsApp do Diretor configurado nos botões e na página Contato, além do envio AJAX simulado nos testes, com estados de progresso, sucesso e erro sem abrir aplicativo externo.
- Erros no console do navegador.

Capturas visuais temporárias são geradas fora do repositório durante o teste.
