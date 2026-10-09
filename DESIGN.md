# DESIGN.md — Natália Menezes Reis

Especificação de design e conteúdo para site profissional. Data: 09/10/2026.
Status: proposta pronta para implementação; não representa um site já construído.

## 1. Objetivo e fontes

Apresentar Natália, explicar seu atendimento e facilitar o primeiro contato pelo WhatsApp. A experiência deve transmitir acolhimento, respeito à singularidade e clareza, sem pressão comercial.

Fontes primárias: briefing textual enviado pelo cliente e PDF de seis páginas `Texto do seu parágrafo.pdf`. O texto define dados profissionais e conteúdo; o PDF define a referência visual e detalha o primeiro contato. O link curto do Canva não pôde ser acessado; nenhuma informação foi presumida a partir dele.

Referências de estrutura consultadas em 09/10/2026:

| Referência | Estrutura aproveitada | Adaptação para Natália |
| --- | --- | --- |
| https://luanaduarte.psc.br/ | Navegação por seções, apresentação, temas, processo e FAQ | Usar a organização, com o conteúdo e a compreensão de psicoterapia da Natália |
| https://isabelabraga.com.br/ | Retrato, apresentação pessoal e temas de atuação | Valorizar a profissional sem importar formação, abordagem ou depoimentos |
| https://janieledias.com.br/ | Identificação profissional, CTA de WhatsApp e percurso informativo | Deixar modalidade, público e contato fáceis de encontrar |

Os três sites foram usados como referências de arquitetura da informação. A identidade visual vem do PDF de Natália, não de uma reprodução dos sites. Não copiar fotografias, textos, código ou credenciais de terceiros.

## 2. Direção visual

Conceito: **um espaço de escuta, no seu tempo**. Página clara, calorosa e editorial, com bastante respiro, títulos fortes e curvas delicadas. Preservar creme, vinho e rosa do material fornecido. Não transformar em estética hospitalar, nem em página de vendas com urgência, descontos ou promessas.

### Paleta

Valores identificados nos elementos vetoriais e textos do PDF; as aplicações abaixo são decisões propostas para a web.

| Token | Cor | Aplicação |
| --- | --- | --- |
| `--color-background` | `#F3EDE3` | Fundo principal creme |
| `--color-primary` | `#6B1B2C` | Títulos, links e botões principais |
| `--color-text` | `#5C4B44` | Parágrafos e informações secundárias |
| `--color-accent` | `#FDBFD3` | Curvas, moldura do retrato, detalhes |
| `--color-accent-alt` | `#FCBFD3` | Variação rosa também encontrada no PDF |
| `--color-surface` | `#FFFFFF` | Superfícies pontuais e texto sobre botão vinho |

Rosa não deve ser usado como texto pequeno sobre creme. Verificar contraste de todas as combinações finais: pelo menos 4,5:1 para texto comum e 3:1 para texto grande e elementos de interface relevantes. Hover do botão: manter vinho e adicionar sublinhado ou borda; foco: contorno vinho com afastamento sobre fundo claro, branco sobre fundo vinho.

### Tipografia

Fontes identificadas nos recursos do PDF: Aileron Regular/Bold e Poppins Regular/Bold.

- Títulos: Aileron Bold; fallback `Arial, sans-serif`.
- Parágrafos e navegação: Poppins Regular; fallback `Arial, sans-serif`.
- Botões: Poppins Bold, sem transformar frases inteiras em maiúsculas.
- Disponibilizar fontes web licenciadas; não extrair as fontes incorporadas do PDF para redistribuição.
- H1: `clamp(2.25rem, 5vw, 4.5rem)`, entrelinha 1,06, tracking -0,025em.
- H2: `clamp(1.8rem, 3.2vw, 3rem)`, entrelinha 1,15.
- H3: 20–24px; corpo: 16–18px com entrelinha 1,65; texto auxiliar: mínimo 14px.
- Alinhar textos longos à esquerda. Não reproduzir a justificação e as quebras rígidas do carrossel.

### Elementos gráficos e fotografia

O PDF apresenta linhas rosas paralelas em formas orgânicas, retrato da profissional com contorno rosa e assinatura gráfica. Usar curvas como decoração periférica, sem cruzar texto ou botões. Limitar a presença a abertura, uma transição e fechamento.

Usar somente retrato real da Natália. Preferir o arquivo original de boa resolução; a imagem do PDF pode servir de referência e ser extraída se a qualidade permitir. Não criar outra pessoa ou alterar suas feições. Proporção sugerida 4:5, recorte com topo arredondado e borda rosa; manter rosto inteiro em todos os tamanhos.

A assinatura existente não deve ser redesenhada como se fosse a marca oficial. Enquanto o arquivo original não estiver disponível, usar assinatura tipográfica: “Natália Menezes” e abaixo “Psicóloga Clínica · CRP 03/35648”. Não ampliar o PDF inteiro como imagem de página.

## 3. Layout e navegação

Página única, idioma pt-BR. Container máximo de 1160px; margens de 24px no celular e 40px no desktop. Seções com 80–104px de respiro vertical no desktop e 48–64px no celular. Texto corrido limitado a aproximadamente 65 caracteres por linha.

Cabeçalho compacto com nome, CRP, links “Sobre mim”, “Psicoterapia”, “Como funciona”, “Dúvidas” e CTA “Vamos conversar?”. No celular, menu acessível expansível. Se o cabeçalho for fixo, compensar âncoras com `scroll-margin-top`.

| Ordem | ID | Conteúdo e composição |
| --- | --- | --- |
| 1 | `inicio` | Hero em duas colunas: texto e CTA à esquerda, retrato à direita |
| 2 | `sobre` | Apresentação pessoal, com texto confortável e identificação profissional |
| 3 | `para-quem` | Público e seis temas, em grade de 3/2/1 colunas |
| 4 | `psicoterapia` | Compreensão do processo em bloco editorial, sem mosaico de cartões |
| 5 | `como-funciona` | Quatro etapas numeradas, seguindo o PDF |
| 6 | `duvidas` | Cinco perguntas em acordeão acessível |
| 7 | `contato` | Convite final, CTA, WhatsApp, Instagram e e-mail |
| 8 | rodapé | Nome completo, profissão, CRP, modalidade e copyright |

No celular, manter a ordem de leitura texto → CTA → retrato. O hero não precisa caber inteiro em uma tela; não reduzir fontes para isso. Não usar carrossel, vídeo automático ou rolagem horizontal. Não adicionar botão flutuante por padrão: os CTAs das seções já resolvem o contato.

## 4. Conteúdo de implementação

Os textos profissionais abaixo vêm do briefing, com títulos e microtextos novos sinalizados como proposta. Ajustes editoriais devem preservar o sentido. Não inferir abordagem clínica a partir da linguagem usada.

### Abertura — redação proposta

Identificador: “Natália Menezes Reis · Psicóloga Clínica · CRP 03/35648”.

H1: **Um espaço para compreender sua história, no seu tempo.**

Apoio: “Psicoterapia individual online para adultos, com atenção especial às mulheres e pessoas LGBTQIAPN+. Uma escuta que respeita sua história e a singularidade de cada processo.”

Informação breve: “Atendimento particular · Online · Mediante agendamento”.

CTA: **Vamos conversar?**
Link secundário: “Conheça meu trabalho”, apontando para `#sobre`.

### Sobre mim — conteúdo fornecido

Título: “Oi, eu sou Natália!”

Sou psicóloga clínica e acredito que cada pessoa tem uma história que merece ser compreendida para além do que aparece à primeira vista.

Minha escolha pela clínica vem do interesse em compreender como cada pessoa se constitui a partir da sua história, das suas experiências e das relações que estabelece ao longo da vida.

Acredito que a psicoterapia pode possibilitar novas formas de compreender a si mesmo, reconhecer aquilo que causa sofrimento e construir maneiras diferentes de lidar com as próprias questões.

Por isso, considero importante que o trabalho terapêutico respeite a singularidade de cada pessoa, sem respostas prontas ou expectativas sobre como ela deveria ser ou viver.

### Para quem — conteúdo fornecido

Atendo adultos que desejam olhar com mais atenção para si, compreender suas experiências e encontrar outras formas de lidar com as questões que atravessam suas vidas.

Meu trabalho tem um olhar especial para mulheres e pessoas LGBTQIAPN+, considerando as particularidades de suas histórias e experiências, sem deixar de reconhecer a singularidade de cada pessoa.

Temas em seis blocos simples, sem links ou aparência de diagnóstico:

- Ansiedade e preocupações.
- Autoconhecimento.
- Relacionamentos.
- Questões profissionais.
- Autoestima.
- Sofrimento emocional.

Complemento editorial proposto: “Esses são exemplos de questões que podem aparecer em psicoterapia. O atendimento não se limita a esses temas.”

Frase fornecida para fechamento: “Você não precisa chegar com tudo organizado ou saber exatamente por onde começar. O processo pode ser construído a partir do que faz sentido para você.”

### Como entendo a psicoterapia — conteúdo fornecido

A psicoterapia é um processo de escuta e construção conjunta, no qual podemos olhar para experiências, compreender melhor o que está sendo vivido e explorar outras formas de se relacionar com as próprias questões.

Acredito que o vínculo terapêutico é parte importante desse processo, pois contribui para que o trabalho aconteça com confiança, respeito e abertura para compreender aspectos da história de cada pessoa.

Meu papel é oferecer uma escuta profissional e conduzir esse trabalho de maneira atenta às questões trazidas, respeitando a singularidade e o tempo de cada processo.

### Como funciona — síntese editorial do PDF

Introdução: “Os atendimentos são individuais e realizados online, mediante agendamento.”

1. **Tudo começa pelo WhatsApp.** Você pode entrar em contato para conhecer o atendimento, tirar dúvidas e entender se esse espaço faz sentido para você neste momento.
2. **Conversamos sobre o funcionamento.** Antes de marcar, esclarecemos horários disponíveis, valor da sessão, frequência dos encontros, forma de pagamento e suas dúvidas sobre o processo.
3. **Agendamos a primeira sessão.** No primeiro encontro, conversamos sobre o que te trouxe até aqui e o que está atravessando sua vida neste momento.
4. **Construímos o processo aos poucos.** A partir dos encontros, construímos um espaço de escuta, cuidado e elaboração, respeitando seu tempo e sua experiência.

CTA após as etapas: “Vamos conversar?”. A conversa inicial não deve ser anunciada como sessão gratuita, consulta automática ou atendimento imediato.

### Perguntas frequentes — conteúdo fornecido

**Para quem são os atendimentos?**
Os atendimentos são destinados a adultos, com atenção especial às mulheres e pessoas LGBTQIAPN+.

**Preciso saber exatamente o que quero trabalhar antes de começar?**
Não. Você não precisa chegar com todas as respostas ou saber explicar perfeitamente o que está sentindo. Podemos começar a partir do que está sendo possível para você naquele momento.

**Como são realizados os atendimentos?**
As sessões são individuais e realizadas online, mediante agendamento.

**Como faço para agendar?**
Entre em contato pelo WhatsApp profissional para esclarecer dúvidas e receber as informações necessárias para iniciar o acompanhamento.

**Você atende por convênios?**
Os atendimentos são particulares.

### Contato e rodapé

Título proposto: “Vamos conversar?”
Texto proposto: “Você pode me chamar para esclarecer suas dúvidas e receber as orientações para iniciar o acompanhamento.”

- WhatsApp: **(75) 99706-4120** — `https://wa.me/5575997064120`.
- Instagram: **@psi.natmenezes** — `https://www.instagram.com/psi.natmenezes/`.
- E-mail: **Natreis.psi@gmail.com** — `mailto:Natreis.psi@gmail.com`.
- Rodapé: “Natália Menezes Reis · Psicóloga Clínica · CRP 03/35648”.
- Complemento: “Psicoterapia individual online · Atendimento particular”.

Substituir “Meu contato está na bio”, presente no PDF, pelos links diretos acima. O site não é um post de Instagram.

## 5. Componentes e comportamento

- CTA principal: fundo vinho, texto branco, altura mínima 48px, raio 12px e rótulo sempre “Vamos conversar?”. Usar link real para WhatsApp, não botão que simula ação.
- Links de texto: vinho, sublinhados no corpo; estados de foco visíveis.
- Temas: pouca elevação, borda discreta e espaço interno de 24px; ícones opcionais monocromáticos e decorativos.
- FAQ: `details/summary` ou componente com comportamento equivalente por teclado. Respostas presentes no HTML.
- Animação opcional: entrada curta de 150–250ms, sem parallax; desabilitar com `prefers-reduced-motion`. Conteúdo continua visível sem JavaScript.
- Retrato com dimensões reservadas e descrição “Natália Menezes Reis, psicóloga clínica”. Ornamentos com `aria-hidden="true"`.

## 6. Limites e pendências

Não adicionar depoimentos, número de pacientes, registro “verificado”, anos de experiência, endereço, graduação, especializações, atendimento presencial, atendimento a menores, reembolso ou resultados garantidos. Nada disso foi fornecido.

Abordagem teórica, duração, preço, frequência, horários e plataforma das sessões não foram especificados. O site pode funcionar sem publicar esses dados, orientando o contato pelo WhatsApp.

Pendências para refinamento: retrato original em alta resolução e assinatura/logo original. Sem retrato utilizável, usar hero tipográfico; sem logo, usar nome e identificação profissional. Domínio definitivo será necessário apenas para canonical, sitemap e metadados absolutos na publicação.

## 7. Critérios de aceitação visual

- Creme, vinho e rosa preservados; leitura confortável e contraste verificado.
- Nome, CRP, modalidade e CTA facilmente localizáveis.
- Testar larguras de 360, 390, 768, 1024 e 1440px, além de zoom de 200%.
- Sem sobreposição, texto cortado, rosto cortado ou rolagem horizontal.
- Navegação por teclado funcional; menu e FAQ operáveis e foco visível.
- Textos reais, sem lorem ipsum ou pendências visíveis ao visitante.
- Estrutura compatível com AGENTS.md e links de contato conferidos.
