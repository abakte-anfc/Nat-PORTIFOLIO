# AGENTS.md — Site de Natália Menezes Reis

## Missão

Implementar uma landing page profissional em português do Brasil para Natália Menezes Reis. O site apresenta a profissional, explica a psicoterapia individual online e encaminha interessados ao WhatsApp. Seguir `DESIGN.md` para identidade visual, ordem das seções e conteúdo integral.

Este arquivo orienta agentes de desenvolvimento. Não é um relatório de implementação concluída. O escopo atual é um site institucional estático; não inclui prontuário, plataforma de terapia, agenda automática, checkout, login ou administração.

## Fontes e prioridades

1. Instruções mais recentes da responsável e do cliente.
2. Dados profissionais explicitamente fornecidos no briefing.
3. PDF `Texto do seu parágrafo.pdf`: identidade e narrativa do primeiro contato.
4. `DESIGN.md`: adaptação desses materiais à web.
5. Sites de referência: apenas arquitetura da informação.

O Canva não foi acessado. Não presumir conteúdo adicional. O PDF tem seis páginas e foi lido integralmente; não é necessário que esteja no repositório público. Manter materiais de origem fora de `public/`, a menos que sua divulgação seja solicitada.

Se houver divergência factual, preservar o dado explícito do briefing e sinalizar a divergência. Não deduzir abordagem teórica, formação ou experiência a partir do estilo de escrita. Os sites de referência usam abordagens diferentes que não devem ser atribuídas à Natália.

## Dados canônicos

| Campo | Valor |
| --- | --- |
| Nome completo | Natália Menezes Reis |
| Nome de apresentação | Natália Menezes |
| Profissão | Psicóloga Clínica |
| CRP informado | 03/35648 |
| Modalidade | Psicoterapia individual online |
| Público | Adultos, com atenção especial às mulheres e pessoas LGBTQIAPN+ |
| Forma de atendimento | Particular, mediante agendamento |
| WhatsApp exibido | (75) 99706-4120 |
| WhatsApp normalizado | 5575997064120 |
| Instagram | @psi.natmenezes |
| E-mail | Natreis.psi@gmail.com |
| CTA principal | Vamos conversar? |

Não anunciar “registro ativo/verificado”: o CRP foi fornecido, mas seu status não foi consultado. Atenção especial a mulheres e pessoas LGBTQIAPN+ não significa atendimento exclusivo a esses grupos.

## Arquitetura proposta

Se houver repositório existente, examinar suas instruções, framework, comandos e padrões antes de alterar arquivos; preservar a stack quando ela atender ao escopo.

Para projeto novo, proposta padrão: Astro com TypeScript e CSS nativo, renderização estática e dependências mínimas. Justificativa: conteúdo predominantemente estático, HTML entregue pronto, boa velocidade e pouca necessidade de JavaScript. Esta é uma decisão de projeto, não uma stack identificada nos sites de referência. Não fixar versões por memória: na implementação, consultar documentação oficial e registrar as versões compatíveis em lockfile.

Organização sugerida:

```text
src/
  components/
    Header.astro
    Hero.astro
    About.astro
    Audience.astro
    Therapy.astro
    Process.astro
    FAQ.astro
    Contact.astro
    Footer.astro
  data/
    professional.ts
    content.ts
  layouts/
    BaseLayout.astro
  pages/
    index.astro
  styles/
    tokens.css
    global.css
public/
  images/
  fonts/
DESIGN.md
AGENTS.md
README.md
```

Centralizar dados e links em `professional.ts`; textos, seis temas, quatro etapas e cinco FAQs em `content.ts`. Componentes devem consumir esses dados, evitando números de contato divergentes. Não criar API, banco, CMS ou estado global para conteúdo fixo.

## Contrato da página

Ordem: cabeçalho → `#inicio` → `#sobre` → `#para-quem` → `#psicoterapia` → `#como-funciona` → `#duvidas` → `#contato` → rodapé.

- Um único H1, conforme proposta do DESIGN.md; H2 nas seções e H3 apenas nos subtópicos.
- Usar HTML semântico, `lang="pt-BR"`, landmarks e link “Pular para o conteúdo”.
- Menu desktop por âncoras. Menu mobile com botão, `aria-expanded`, `aria-controls`, fechamento após seleção e por Escape; devolver foco ao botão quando apropriado.
- Temas são exemplos de questões, nunca diagnóstico, lista exaustiva ou especializações declaradas.
- Processo tem quatro etapas: contato, esclarecimentos, primeira sessão e construção do acompanhamento.
- FAQ preferencialmente com `details/summary`; manter respostas acessíveis no HTML sem depender de requisição.
- Sem formulário de sintomas, chatbot clínico, teste psicológico, depoimentos ou integrações sociais embutidas.

## Links e ações

Usar `https://wa.me/5575997064120` como destino de todos os CTAs principais. A mensagem preenchida é opcional e, se usada, deve ser neutra:

```ts
const message = 'Olá, Natália! Gostaria de saber mais sobre o atendimento online.';
const whatsappUrl = `https://wa.me/5575997064120?text=${encodeURIComponent(message)}`;
```

Não enviar a mensagem automaticamente. O link apenas abre o canal; o visitante decide enviá-la. Não inserir sintomas, identificadores ou dados pessoais no texto/URL.

Instagram: `https://www.instagram.com/psi.natmenezes/`.
E-mail: `mailto:Natreis.psi@gmail.com`.

Preferir links comuns, sem pop-ups programáticos. Se abrir nova aba, usar `rel="noopener noreferrer"` e informar o comportamento de forma acessível. Não mostrar “agendado com sucesso” após clique: não há integração de agendamento. Na seção de contato, manter telefone e e-mail legíveis como alternativas aos botões.

## Regras visuais

Tokens: fundo `#F3EDE3`, vinho `#6B1B2C`, texto `#5C4B44`, rosa `#FDBFD3`, branco `#FFFFFF`. Aileron Bold nos títulos e Poppins no corpo, com fallbacks seguros. Aileron e Poppins foram identificadas no PDF; obter arquivos web licenciados antes de incorporá-las.

Seguir medidas e comportamentos de `DESIGN.md`. Usar CSS Grid/Flexbox, tamanhos fluidos e breakpoints orientados ao conteúdo. Curvas rosas decorativas podem ser SVGs leves com `aria-hidden`, preservando o estilo sem fingir que são a logo original. Não usar o PDF inteiro como fundo ou construir a página com imagens de texto.

Fotografia real, sem geração ou substituição da pessoa. Não puxar imagem de uma profissional dos sites de referência. Usar retrato original ou extração adequada do PDF; se a qualidade não permitir, aplicar a alternativa tipográfica prevista em DESIGN.md e registrar a pendência no README.

## Conteúdo e limites

Preservar todos os fatos, perguntas e respostas do DESIGN.md. Redação em primeira pessoa na voz de Natália, tom acolhedor e sem exageros. Não adicionar TCC, psicanálise ou qualquer abordagem não informada.

Não inventar: preço, duração, periodicidade, plataforma de chamada, graduação, títulos, especializações, tempo de atuação, pacientes atendidos, avaliações, convênios, reembolso, endereço, região de cobertura ou atendimento presencial. Não inserir contagem regressiva, escassez de agenda, garantias de resultado ou “primeira sessão grátis”.

Os assuntos valor, frequência, disponibilidade e pagamento aparecem apenas como questões a esclarecer no primeiro contato. Não publicar campos vazios, “a definir” ou placeholders para essas informações.

## Privacidade e dependências externas

A versão inicial não coleta dados em formulário e não instala analytics, pixels, chat ou cookies de marketing. Não criar banner de consentimento sem uma funcionalidade real que o justifique. Não declarar ausência total de logs: a hospedagem pode manter registros técnicos.

Não embutir feed de Instagram, mapas ou vídeos. Contatos externos são links simples. Não armazenar mensagens de pacientes, números de visitantes ou informações clínicas em código, logs ou parâmetros de rastreamento.

Se o escopo futuramente incluir coleta de dados, avaliar a necessidade, destino e retenção antes de implementar e preparar informação de privacidade correspondente. Não inventar uma política afirmando comportamentos desconhecidos da hospedagem.

## SEO e carregamento

- Title proposto: `Natália Menezes Reis | Psicóloga Clínica Online`.
- Description proposta: `Psicoterapia individual online para adultos, com atenção especial às mulheres e pessoas LGBTQIAPN+. Conheça o trabalho de Natália Menezes Reis, CRP 03/35648.`
- Open Graph com nome, descrição e imagem aprovada. Não inventar domínio nem usar foto de terceiro.
- Configurar canonical, sitemap e robots para o domínio real ao publicar; previews devem evitar indexação.
- Dados estruturados opcionais de pessoa somente com fatos fornecidos. Não usar `aggregateRating`, endereço ou credenciais não confirmadas.
- Retrato em WebP/AVIF, com dimensões e `srcset`; não aplicar lazy loading à imagem principal acima da dobra. Demais imagens podem carregar sob demanda.
- Fontes locais quando disponíveis e licenciadas, com `font-display: swap`.
- HTML essencial disponível sem JavaScript. JavaScript restrito ao menu e a interações que o necessitem.
- Metas de medição, não resultados já obtidos: LCP ≤ 2,5s, CLS ≤ 0,1 e INP ≤ 200ms em condições representativas; documentar limitações da medição local.

## Sequência de trabalho

1. Conferir estrutura existente e instruções aplicáveis; ler DESIGN.md por inteiro.
2. Preparar dados canônicos, textos e tokens.
3. Montar layout semântico e as oito partes da página.
4. Aplicar identidade e recursos reais disponíveis; registrar faltas sem expor placeholders públicos.
5. Implementar navegação, FAQ e links de contato.
6. Revisar responsividade, teclado, contraste, conteúdo, metadados e desempenho.
7. Entregar README com comandos reais, decisões e pendências; apresentar preview para revisão.

Publicação pública e configuração de domínio não fazem parte da criação destes documentos. Quando a tarefa de implementação incluir publicação explicitamente, seguir a autorização recebida; caso contrário, entregar preview revisável e não publicar por conta própria.

## Verificação antes da entrega

Rodar os comandos de build e verificação de tipos realmente configurados no projeto. Não afirmar sucesso de comandos que não executou. Corrigir erros de compilação e links internos inexistentes.

- Conferir nome, CRP, telefone, Instagram e e-mail com a tabela canônica.
- Conferir seis temas, quatro etapas e cinco FAQs; nenhuma abordagem ou informação clínica inventada.
- Testar âncoras, menu e FAQ com teclado; confirmar foco visível e comportamento de Escape.
- Conferir destinos dos CTAs sem enviar mensagem nem marcar consulta.
- Inspecionar 360, 390, 768, 1024 e 1440px e zoom de 200%.
- Verificar contraste, ausência de cortes, estabilidade de layout e preferência de movimento reduzido.
- Confirmar que o conteúdo principal continua disponível sem JavaScript.
- Executar auditoria automatizada de acessibilidade se disponível e complementar com revisão manual.
- Conferir domínio real antes de ativar canonical/sitemap e indexação.

Não criar testes extensos para texto estático. Priorizar verificação dos riscos concretos: contato errado, conteúdo inventado, interação inacessível e quebra de layout. Ao concluir, informar o que foi implementado, verificado e o que depende de materiais ou configuração externa.

## Referências

- Briefing de Natália Menezes Reis fornecido no chat em 09/10/2026.
- PDF `Texto do seu parágrafo.pdf`, seis páginas.
- https://luanaduarte.psc.br/ — organização de conteúdo e processo.
- https://isabelabraga.com.br/ — apresentação profissional e temas.
- https://janieledias.com.br/ — identificação e contato.
- `DESIGN.md` — conteúdo e sistema visual específicos deste projeto.

As referências são inspiração estrutural, não dependências a serem copiadas nem evidência de qualificações da Natália.
