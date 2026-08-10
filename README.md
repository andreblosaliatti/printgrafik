# Site institucional da PrintGráfik

Primeira etapa do novo site institucional da PrintGráfik, construída como site estático com HTML5, CSS3 e JavaScript puro.

## Implementado

- Home responsiva completa.
- Página A Empresa completa e alinhada ao mockup `docs/empresa-mock.png`, com história, soluções, atendimento, princípios, localização, chamada comercial e movimentos leves durante a rolagem.
- Localização da empresa com dados oficiais e mapa incorporado do Google Maps.
- Página Produtos completa e alinhada ao mockup `docs/mock-produtos.png`, com cinco categorias, materiais, processo do pedido, orientações comerciais, chamada final e movimentos leves durante a rolagem.
- Hero da página Produtos com vídeo real do processo de produção, controles nativos, autoplay mudo e thumbnail local.
- Página Estrutura completa e alinhada ao mockup `docs/mock-estrutura.png`, com hero panorâmico, acompanhamento próximo, seis etapas produtivas, equipamentos, qualidade, galeria de fotos, quatro vídeos e chamada comercial.
- Página Contato com hero dedicado aos canais de atendimento, três telefones identificados por setor, nova fotografia da equipe, formulário de orçamento e demais canais confirmados.
- Cabeçalho compartilhado e menu móvel acessível.
- Hero com a imagem final da máquina de impressão.
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
- `assets/estrutura/`: quinze fotografias reais e oito vídeos da fábrica, dos equipamentos, da equipe e das áreas produtivas.
- Os arquivos fornecidos originalmente permanecem preservados em `assets/images/`.

Na página Estrutura, as novas mídias foram distribuídas assim:

- `panoramica-parque-grafico.jpg`: hero panorâmico.
- `impressora-offset-man-roland.jpg`, `equipamento-corte-vinco.jpg`, `area-corte-vinco-acabamento.jpg` e `visao-geral-area-producao.jpg`: cards de equipamentos e processos.
- `controle-qualidade-impressao.jpg`: bloco de controle de qualidade.
- `desenvolvimento-tecnico-embalagem.jpg`, `unidades-impressao-offset-cores.jpg`, `setor-corte-vinco.jpg` e `fachada-lateral-por-do-sol.jpg`: galeria fotográfica.
- Quatro vídeos MP4 selecionados: galeria “Bastidores da produção”, todos com controles nativos, `playsinline`, `preload="metadata"`, poster local e sem autoplay.

Os arquivos foram mantidos no formato e na qualidade fornecidos. As fotos ocupam aproximadamente 260 KB a 560 KB; os vídeos selecionados totalizam cerca de 16 MB, mas não são baixados integralmente antes da interação porque usam apenas pré-carregamento de metadados.

## Placeholders

As fotografias finais abaixo ainda não foram fornecidas e usam SVGs locais claramente identificados:

- Caixas Display.
- Cartelas Blister.
- Embalagens Personalizadas.
- Embalagens em Branco.
- Solapas e materiais gráficos para embalagens.
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

- Diretor: `(19) 99144-0661`.
- Vendas: `(19) 99425-3333`.
- Empresa: `(19) 99246-4807`.
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
- Ativação do formulário FormSubmit pelo link que será enviado para `printgrafik@printgrafik.com.br` na primeira submissão real.
- Texto jurídico final da Política de Privacidade.

## Formulário de contato

O formulário de `contato.html` solicita somente os dados necessários para a análise inicial:

- Nome, telefone ou WhatsApp, e-mail, produto de interesse, mensagem e consentimento são obrigatórios.
- Empresa, quantidade estimada e medidas aproximadas são opcionais.
- Não há coleta de CPF, CNPJ, documentos, arquivos ou dados sensíveis.
- Os dados não são armazenados no navegador nem registrados no console.
- Um campo honeypot oculto oferece uma barreira antispam simples.

O envio é realizado diretamente por AJAX para o endpoint do [FormSubmit](https://formsubmit.co/documentation), configurado em `js/main.js`, e não abre o aplicativo de e-mail do visitante. A interface apresenta estado de envio, sucesso somente após uma resposta positiva do serviço e uma mensagem de erro quando a requisição falha. Os testes automatizados simulam essa resposta e não enviam mensagens reais.

No primeiro envio real, o FormSubmit encaminhará uma mensagem de ativação para `printgrafik@printgrafik.com.br`. É necessário abrir esse e-mail e confirmar o formulário; segundo a documentação do serviço, submissões anteriores à ativação ficam retidas e são encaminhadas após a confirmação. O FormSubmit também informa que mantém submissões no arquivo do serviço por até 30 dias, ponto que deve constar na validação jurídica final da Política de Privacidade.

Enquanto o WhatsApp não for confirmado, os contatos inteligentes das demais páginas direcionam para a página Contato. Nela, os três telefones confirmados ficam disponíveis diretamente no hero. WhatsApp e horário permanecem ocultos nos demais canais; Facebook e LinkedIn aparecem no rodapé como ícones desativados, sem links inventados.

## Vídeo do hero de Produtos

O hero da página Produtos utiliza o novo registro `assets/estrutura/WhatsApp Video 2026-08-07 at 10.45.40.mp4`, com a fotografia `assets/estrutura/impressora-offset-man-roland.jpg` como poster. O vídeo possui controles nativos, autoplay mudo, `playsinline`, `preload="metadata"` e fallback textual. O autoplay permanece mudo para ser aceito pelos navegadores e não interromper o visitante com áudio inesperado.

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
- Responsividade, fotografias reais, vídeos, navegação ativa, carregamento tardio e movimentos da página Estrutura.
- Presença das seis etapas produtivas, seis itens de acompanhamento, oito critérios de qualidade e CTAs com fallback da página Estrutura.
- Ausência de repetição do resumo numérico institucional em Empresa e, em Estrutura, presença apenas da área fabril.
- Presença de cinco fotografias reais e nenhum placeholder de estrutura na galeria da Home.
- Presença de quatro vídeos na página Estrutura, com poster local, controles, pré-carregamento de metadados e sem autoplay.
- Presença e carregamento do vídeo real, thumbnail, controles e autoplay mudo no hero de Produtos.
- Responsividade, nova fotografia do hero, três telefones setoriais, navegação ativa, labels, campos obrigatórios, validação acessível, foco no primeiro erro e canais confirmados da página Contato.
- Ausência de WhatsApp e horário não confirmados na página Contato, além do envio AJAX simulado nos testes, com estados de progresso, sucesso e erro sem abrir aplicativo externo.
- Erros no console do navegador.

Capturas visuais temporárias são geradas fora do repositório durante o teste.
