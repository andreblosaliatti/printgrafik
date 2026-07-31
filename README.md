# Site institucional da PrintGráfik

Primeira etapa do novo site institucional da PrintGráfik, construída como site estático com HTML5, CSS3 e JavaScript puro.

## Implementado

- Home responsiva completa.
- Cabeçalho compartilhado e menu móvel acessível.
- Hero com a imagem final da máquina de impressão.
- Cards de produtos em destaque.
- Seção institucional com a fotografia real da fachada.
- Indicadores, diferenciais, missão, visão e valores.
- Galeria temporária da estrutura.
- Chamada final para contato.
- Rodapé com navegação, produtos, contatos configuráveis e redes sociais desativadas enquanto não confirmadas.
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
│   ├── home.css
│   └── responsive.css
├── js/
│   └── main.js
├── assets/
│   ├── empresa/
│   ├── hero/
│   ├── images/
│   ├── logo/
│   └── placeholders/
├── docs/
└── tests/
    └── site-check.mjs
```

## Imagens finais

- `assets/logo/logo-printgrafik.png`: cópia preservada do logo oficial.
- `assets/logo/logo-printgrafik-600.png`: versão reduzida e otimizada para uso no site, sem alteração de proporção ou cores.
- `assets/hero/hero-impressao-printgrafik.jpg`: imagem final do hero.
- `assets/empresa/fachada-printgrafik.jpg`: fotografia real da fachada usada na Home.
- Os arquivos fornecidos originalmente permanecem preservados em `assets/images/`.

## Placeholders

As fotografias finais abaixo ainda não foram fornecidas e usam SVGs locais claramente identificados:

- Caixinhas Display.
- Cartelas Blister.
- Embalagens Personalizadas.
- Embalagens em Branco.
- Área de produção.
- Máquina de impressão.
- Operador trabalhando.
- Processo de impressão.
- Embalagens finalizadas.

Os arquivos estão em `assets/placeholders/` e podem ser substituídos sem alterar a estrutura das páginas.

## Dados centralizados

Os dados institucionais e de contato estão centralizados no objeto `PG_SITE_CONFIG`, no início de `js/main.js`.

Dados institucionais atuais:

- Fundação: março de 2000.
- 26 anos de história.
- 2.000 m² de área fabril.
- Mais de 10 serviços.
- Mais de 500 clientes satisfeitos.

## Pendências

Itens marcados com `TODO` no objeto de configuração e que precisam de confirmação:

- Telefone.
- WhatsApp.
- E-mail.
- Endereço.
- Horário de atendimento.
- URLs oficiais de Facebook, Instagram e LinkedIn.

Enquanto estiverem ausentes, os contatos não são exibidos e os botões levam para a página interna de contato. As redes sociais permanecem visualmente desativadas.

Também permanecem pendentes:

- Fotografias reais de produtos, máquinas, operadores, produção e embalagens finalizadas.
- Desenvolvimento completo das páginas Empresa, Produtos, Estrutura e Contato.
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
- Um único `h1` em cada página.
- Ausência de rolagem horizontal em 1440, 1280, 1024, 768, 480, 375 e 320 px.
- Carregamento das imagens requisitadas.
- Funcionamento do menu móvel, `aria-expanded`, tecla `Escape` e retorno de foco.
- Erros no console do navegador.

Capturas visuais temporárias são geradas fora do repositório durante o teste.
