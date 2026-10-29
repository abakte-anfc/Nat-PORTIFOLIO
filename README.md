# Natália Menezes Reis

Site institucional estático em Astro e TypeScript. Estrutura editorial adaptada do projeto local C:/PALICE, com camadas de papel, transições por rolagem, cartão de retrato e contato em cartão-postal. Preserva foto, assinatura, creme #F3EDE3, vinho #6B1B2C, rosa #FDBFD3 e conteúdo profissional da Natália. Não incorpora dados profissionais da Alice. C:/PALICE não foi alterado.

## Execução

Node utilizado: 24.19.0. No PowerShell, use npm.cmd caso a política bloqueie npm.ps1.

- `npm.cmd ci`: instalar dependências do lockfile.
- `npm.cmd run dev -- --port 4321`: http://127.0.0.1:4321/.
- `npm.cmd run check`: verificar tipos e arquivos Astro.
- `npm.cmd run build`: gerar HTML estático e WebP em dist/.
- `npm.cmd run preview -- --port 4321`: servir o build local.

## Conteúdo e próximo serviço

- src/data/professional.ts: identificação e contatos canônicos.
- src/data/content.ts: textos integrais, sete temas, quatro etapas e cinco FAQs. Incluído “Sofrimento relacionado ao trabalho” conforme solicitação de 29/10/2026.
- src/data/services.ts: serviço atual e reserva do próximo. Substituir additionalService = null por um objeto com title e description quando houver texto aprovado. A grade já acomoda os dois cartões. Até lá, o segundo serviço não aparece no HTML e não exibe texto provisório.
- src/pages/index.astro: estrutura e seções.
- src/components/ChapterTransition.astro: cenas decorativas de papel.
- src/scripts/paper-motion.ts: menu, cartão e movimento por rolagem.
- src/styles/global.css: base editorial adaptada da referência local.
- src/styles/editorial.css: identidade e ajustes responsivos da Natália.

Componentes React e scripts do layout anterior foram preservados, mas não são usados pela página atual. Os scripts antigos de menu, RubberSegment e Animate.css verificam a estrutura anterior. A verificação atual é scripts/verify-editorial.mjs.

## Comportamento

Conteúdo e FAQ em HTML estático. Sem JavaScript, navegação disponível e cenas intermediárias retiradas. Menu móvel fecha após seleção e Escape, devolvendo foco no Escape. Escolha manual da face do cartão tem prioridade sobre rolagem. Movimento reduzido remove cenas extensas e movimentos automáticos, mantendo a troca manual de face sem animação.

Todos os CTAs usam https://wa.me/557588634101. Contatos externos abrem na mesma aba. Sem formulário, analytics, pixels, agendamento automático ou envio de mensagens.

## Verificação de 29/10/2026

- npm.cmd run check: 21 arquivos, zero erros, avisos ou hints.
- npm.cmd run build: concluído com imagens WebP responsivas.
- node scripts/verify-editorial.mjs: cinco larguras (360, 390, 768, 1024, 1440px), movimento normal/reduzido, overflow, conteúdo integral, contatos, âncoras, teclado, menu, Escape, cartão, FAQ e conteúdo sem JavaScript. Capturas em docs/previews e relatório em docs/previews/results.json. Capturas de celular e desktop inspecionadas visualmente.

O script de navegador utiliza temporariamente Playwright de C:/PALICE/node_modules e Chromium local, com caminhos explícitos no script. Ajustar em outro computador. Nenhuma dependência nova foi instalada. Não rodar build/check/dev simultaneamente: houve conflito inicial no cache Vite; check repetido sequencialmente passou.

Limites: sem medição Core Web Vitals ou auditoria WCAG automatizada. Ampliação CSS a 200% é simulação de reflow, não zoom nativo do navegador. Fontes Aileron/Poppins continuam com fallback Arial por falta de arquivos web licenciados. Retrato e assinatura originais integrados.

## Publicação

Somente local; não publicado. Mantém noindex, nofollow. Domínio, canonical, sitemap e imagem Open Graph aprovada dependem da publicação. Materiais de origem fora de public/.

Ajustes de movimento: o retrato inicia a virada quando seu topo chega a 20% da altura da tela, percorrendo 90% da altura para completar o giro. Folhas têm sobra lateral de 45vw ou 45svh (o maior); fundo revelado tem inset de -10% para não mostrar laterais durante a escala. `node scripts/verify-motion-adjustments.mjs` verifica início tardio, giro gradual, cobertura lateral das folhas e fundo e ausência de overflow em 390/1440px, com capturas em três estágios de abertura.
