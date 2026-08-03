# Site institucional da PrintGráfik

Primeira etapa do novo site institucional da PrintGráfik, construída como site estático com HTML5, CSS3 e JavaScript puro.

## Implementado

- Home responsiva completa.
- Página A Empresa completa e alinhada ao mockup `docs/empresa-mock.png`, com história, soluções, estrutura, atendimento, princípios, chamada comercial e movimentos leves durante a rolagem.
- Localização da empresa com dados oficiais e mapa incorporado do Google Maps.
- Página Produtos completa e alinhada ao mockup `docs/mock-produtos.png`, com cinco categorias, materiais, processo do pedido, orientações comerciais, chamada final e movimentos leves durante a rolagem.
- Cabeçalho compartilhado e menu móvel acessível.
- Hero com a imagem final da máquina de impressão.
- Cards de produtos em destaque.
- Seção institucional com a fotografia real da fachada.
- Indicadores, diferenciais, missão, visão e valores.
- Galeria temporária da estrutura.
- Chamada final para contato.
- Rodapé com navegação, produtos, contatos configuráveis, Instagram ativo e redes ainda não confirmadas desativadas.
- Telefone, e-mail, endereço e Instagram oficiais exibidos nos pontos de contato do site.
- Páginas internas mínimas para evitar links quebrados.
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
│   ├── empresa.css
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
- `assets/produtos/hero-produtos.jpg`: imagem final do hero da página Produtos.
- Os arquivos fornecidos originalmente permanecem preservados em `assets/images/`.

## Placeholders

As fotografias finais abaixo ainda não foram fornecidas e usam SVGs locais claramente identificados:

- Caixas Display.
- Cartelas Blister.
- Embalagens Personalizadas.
- Embalagens em Branco.
- Solapas e materiais gráficos para embalagens.
- Área de produção.
- Máquina de impressão.
- Operador trabalhando.
- Atendimento pessoal da equipe.
- Processo de impressão.
- Embalagens finalizadas.

Os arquivos estão em `assets/placeholders/` e `assets/produtos/` e podem ser substituídos sem alterar a estrutura das páginas.

## Dados centralizados

Os dados institucionais e de contato estão centralizados no objeto `PG_SITE_CONFIG`, no início de `js/main.js`.

Dados institucionais atuais:

- Fundação: março de 2000.
- 26 anos de história.
- 2.000 m² de área fabril.
- Mais de 10 serviços.
- Mais de 500 clientes satisfeitos.

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

- Fotografias reais de produtos, máquinas, operadores, produção e embalagens finalizadas.
- Desenvolvimento completo das páginas Estrutura e Contato.
- Definição do envio do formulário de contato e proteção antispam.
- Texto jurídico final da Política de Privacidade.

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
- Erros no console do navegador.

Capturas visuais temporárias são geradas fora do repositório durante o teste.
