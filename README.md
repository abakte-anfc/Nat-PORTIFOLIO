# Natália Menezes Reis — portfólio profissional

Site institucional estático em português do Brasil, baseado integralmente em AGENTS.md e DESIGN.md. Astro, TypeScript, React para componentes, Tailwind CSS e estilos editoriais. Dados em src/data/professional.ts; conteúdo em src/data/content.ts.

## Comandos

Requer Node.js 22.12+ (verificado com Node 24.19.0).

- npm ci — instalar versões do lockfile.
- npm run dev — desenvolvimento em http://127.0.0.1:4321.
- npm run check — conferir tipos e arquivos Astro.
- npm run build — gerar o site estático em dist/.
- npm run preview — visualizar o build local.

Documentação oficial consultada: https://docs.astro.build/en/install-and-setup/.

## Design e comportamento

Creme, vinho e rosa do briefing, layout editorial e hero com retrato real fornecido em image/perfil.jpeg, moldura rosa e curvas SVG decorativas nas outras seções. Animate.css: textos à esquerda entram com fadeInLeft; textos à direita com fadeInRight. Títulos, caixas e textos centralizados entram de baixo para cima com fadeInUp. A direção é calculada pela posição atual ao entrar no viewport, acompanhando o layout responsivo. Caixas são animadas como um conjunto, sem duplicar a animação nos textos internos. Entradas de 650ms, com atrasos em cascata de até 325ms, disparadas uma vez ao entrar na seção. Botões InteractiveHoverButton/InteractiveHoverLink com preenchimento expansivo, troca de texto e seta Lucide, também ativados por foco. CTAs são links renderizados no servidor e não exigem hidratação. MagicBento é uma ilha React client:visible com GSAP, brilho, partículas, tilt, magnetismo e ripple. Mantém os seis temas, h3 e paleta do projeto; textos não são truncados. Efeitos do Bento desativados em até 768px, dispositivos sem hover e movimento reduzido. Listeners, timers, partículas e tweens são limpos na desmontagem e na mudança da preferência. Sem parallax. prefers-reduced-motion desativa as animações; conteúdo nunca é escondido pelo script. FAQ nativo details/summary e HTML essencial disponível sem JavaScript. Menu mobile fecha após seleção e por Escape, devolvendo o foco ao botão neste último caso.

Todos os CTAs usam o WhatsApp canônico. Instagram e e-mail são links simples na mesma aba. Sem formulário, analytics, pixels ou integrações sociais.

## Verificação realizada

- Build Astro concluído; verificação de tipos com 0 erros, 0 avisos e 0 hints.
- HTML gerado: um H1, seis temas, quatro etapas, cinco FAQs, parágrafos integrais e âncoras existentes.
- Contatos comparados com os dados canônicos; nenhuma mensagem enviada.
- Preview respondeu HTTP 200.
- Script do menu executado em ambiente isolado: abertura, Escape com retorno do foco e fechamento após seleção passaram; isso não substitui o teste manual no navegador.
- Contraste calculado: vinho/creme 9,92:1; texto/creme 7,09:1; branco/vinho 11,55:1; vinho/rosa 7,46:1. Valores exatos constam na saída da verificação; revisar se as cores forem alteradas.

Limitação: a sessão não disponibilizou navegador controlável. A revisão visual em 360, 390, 768, 1024 e 1440px, zoom 200%, teste real de teclado e auditoria automatizada de acessibilidade permanecem pendentes. Não foram medidos LCP, CLS ou INP; os objetivos do briefing não são resultados certificados.

## Materiais e publicação

Retrato recebido e integrado. Pendentes: assinatura/logo original, fontes Aileron/Poppins com licença e domínio definitivo. Fontes atuais usam Arial como fallback, sem solicitações externas.

Não publicado. O preview usa noindex, nofollow; canonical, sitemap e imagem Open Graph não foram adicionados sem domínio/imagem aprovados. Ao publicar, configurar esses dados e revisar indexação e robots. Materiais de origem devem permanecer fora de public/.

## Estrutura dos componentes solicitados

O caminho padrão é src/components/ui (alias @/components/ui), seguindo a organização Astro dentro de src/. Essa pasta reúne componentes reutilizáveis e permite imports previsíveis pelo shadcn CLI. Estilos gerais: src/styles/global.css; Tailwind: src/styles/tailwind.css; Bento: src/components/ui/MagicBento.css. Utilitário cn: src/lib/utils.ts. components.json registra aliases, TypeScript e configuração Tailwind v4. Não são necessários providers nem estado global. A demo do botão fica em src/components/ui/demo.tsx e não é exibida no site.

React e Tailwind foram configurados manualmente conforme https://docs.astro.build/en/guides/integrations-guide/react/ e https://tailwindcss.com/docs/installation/framework-guides/astro. Não é preciso recriar o projeto pela CLI. Animate.css instalado com npm install animate.css --save; animações importadas localmente, sem CDN.

Os exemplos recebidos foram adaptados: navegação por WhatsApp usa âncora em vez de button; largura dos botões acomoda o texto em português; MagicBento recebe os temas canônicos em vez dos cards Analytics/Dashboard e usa creme/vinho/rosa. Imagens de banco não são necessárias a esses efeitos e não substituem o retrato real pendente.

Verificação desta integração: npm run build e npm run check passaram (13 arquivos, 0 erros, 0 avisos e 0 hints). HTML confirma seis articles, cinco FAQs, um H1 e contatos canônicos. Teste isolado do script confirma sete seções observadas, fadeInLeft no início, alternância dos três efeitos e limpeza ao ativar movimento reduzido. Revisão visual, interação real de hover/tilt e auditoria de acessibilidade em navegador permanecem pendentes pela indisponibilidade do navegador controlável.

Atualização de direção: testes isolados passaram para texto esquerdo/direito, título, caixa, texto centralizado e coluna mobile. Cada elemento é observado individualmente e anima uma vez ao aparecer. Wrappers do Bento separam a animação de entrada dos transforms GSAP de hover.

## Retrato e navegação RubberSegment

Foto original fornecida em image/perfil.jpeg, copiada para src/assets/perfil.jpeg. Astro gera WebP em 320, 480, 640 e 800px, com srcset, dimensões, loading=eager e fetchpriority=high. Texto alternativo: Natália Menezes Reis, psicóloga clínica. Moldura rosa e recorte 4:5 via CSS, sem alterar feições.

RubberSegment (src/components/ui/RubberSegment.tsx e RubberSegment.css) usa motion/react e está hidratado no cabeçalho. Adaptado para links nativos às quatro seções: preserva navegação sem JS, Enter, modificadores e foco. Setas/Home/End movem o foco entre links; Enter navega. Destaque elástico com dilatação, contração e arraste desktop; preferência de movimento reduzido troca diretamente de posição. Seleção acompanha a seção lida e não interrompe a animação durante a rolagem iniciada por clique. Mobile usa duas colunas e destaque estático, sem arraste. Menu fecha por clique, arraste e Escape. ResizeObserver, listeners, timers e animações são limpos na desmontagem.

Build gerou quatro WebPs (aproximadamente 10, 21, 38 e 61kB); tipos passaram sem erros na integração inicial. Conferência visual e testes reais de arraste/teclado continuam pendentes pela ausência de navegador controlável nesta sessão.

Verificação final: npm run check com 14 arquivos, 0 erros, 0 avisos e 0 hints; npm run build concluído. HTML confirma as quatro âncoras no cabeçalho, imagem com dimensões/srcset/alt e quatro WebPs. Teste isolado do handler de teclado passou para setas, Home/End e limites. Preview e foto responderam HTTP 200.


Entradas com fade explícito de opacidade 0 a 1, mantendo 650ms e direções por posição. animation-fill-mode:both mantém opacidade 0 durante o atraso em cascata. Conteúdo continua disponível sem JavaScript e com movimento reduzido.

Correção do ciclo de entrada: elementos observados recebem opacidade 0 antes do disparo, evitando a troca visível→transparente ao rolar. animationend/animationcancel removem classes e estilos temporários, liberando transforms e recursos após o efeito. Direções, fade 0→1 e 650ms mantidos. Teste scripts/verify-animation-lifecycle.mjs falhou antes da correção e passou depois; verifica transparência inicial, três direções, execução única, limpeza e movimento reduzido. Nenhum navegador controlável disponível para medir FPS ou confirmar o sintoma visual no dispositivo do cliente.

Menu mobile: corrigido seletor CSS que escondia a navegação em ambos os estados por verificar somente a presença de aria-expanded. A regra agora esconde apenas aria-expanded=false. Teste scripts/verify-mobile-menu.mjs reproduziu o erro antes da correção e valida abertura/fechamento, seletor de estado, Escape com retorno de foco, seleção de link e segmentnavigate.

Destaque desktop: a proteção do clique agora considera distância absoluta até a posição da âncora, tanto subindo quanto descendo. O acompanhamento da seção usa scroll-padding-top + scroll-margin-top reais em vez de 150px fixos. Primeira seleção e clique no item já ativo não expandem o destaque sobre outros slots. Teste scripts/verify-desktop-navigation.mjs reproduziu a troca indevida no código anterior e passou após a correção: navegação ascendente/descendente, chegada na âncora, rolagem manual, expiração do bloqueio e seleção inicial/repetida. Revisão visual real ainda depende de navegador disponível.

Favicon: public/favicon.svg, monograma NM vetorial em vinho sobre creme com cantos arredondados. Referenciado no BaseLayout; funciona sem fontes ou dependências externas.

Assinatura original recebida em image/Assinatura.png e integrada na seção 6 (Primeiro contato), com versões WebP responsivas e dimensões reservadas. Mantém os textos e CTAs; substitui a pendência de marca original para esse uso.
