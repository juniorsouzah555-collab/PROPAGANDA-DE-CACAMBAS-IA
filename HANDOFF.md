# Status do projeto — Express Caçambas (Diadema)

Documento de continuidade. Leia antes de prosseguir com qualquer próxima etapa.

## O que já está pronto e publicado

- **Repositório**: https://github.com/juniorsouzah555-collab/PROPAGANDA-DE-CACAMBAS-IA (branch `master`, working tree limpo)
- **Site em produção**: https://express-cacambas-diadema.vercel.app (deploy via Vercel, conectado ao GitHub — push em `master` atualiza automaticamente)
- **Dados reais já aplicados** (não são mais fictícios):
  - Empresa: **Express Caçambas**
  - WhatsApp: **(11) 98255-7706** (usado nos 3 botões CTA + JSON-LD)
  - Telefone fixo: **(11) 5674-0305** (link `tel:` no hero, rodapé e JSON-LD)
  - 2 fotos reais da empresa em `img/` (já cortadas, redimensionadas e comprimidas)
- **Removido**: seção de depoimentos fictícios (usuário pediu remoção pois não tem depoimentos reais ainda)
- **Ainda fictício/genérico**: bairros atendidos (lista genérica de Diadema), domínio próprio (usuário decidiu deixar pra depois)

## Robô de SEO (GitHub Actions) — implementado mas NÃO ativo ainda

- Arquivos: `.github/workflows/seo-report.yml` + `scripts/gsc-report.js`
- Roda semanalmente, consulta API do Search Console, abre PR com relatório (nunca edita direto)
- Sem os secrets configurados, a Action roda mas só gera relatório "pendente" — não falha
- **Precisa pra ativar**: secrets `GSC_SERVICE_ACCOUNT_JSON` e `GSC_SITE_URL` no GitHub (Settings → Secrets and variables → Actions)

## EM ANDAMENTO AGORA — Setup do Google Search Console (pausado aqui)

Conta usada: `juniorsouzah555@gmail.com`

**Já feito:**
1. Projeto criado no Google Cloud Console: `express-cacambas-seo`
2. API "Google Search Console API" ativada
3. Service account criada: `gsc-bot@express-cacambas.iam.gserviceaccount.com`
4. Chave JSON gerada e baixada (usuário confirmou download, mas **o conteúdo do JSON ainda não foi compartilhado/configurado como secret** — isso ainda precisa ser feito)

**Travado em:** verificação de propriedade do site no Search Console.
- Usuário tentou cadastrar `https://express-cacambas-diadema.vercel.app` como propriedade tipo "Prefixo do URL"
- **Verificação por DNS não funciona** (domínio é `vercel.app`, usuário não é proprietário do domínio raiz)
- **Próximo passo decidido**: usar o método "Tag HTML" (meta tag) do Search Console
  - Usuário precisa copiar a tag `<meta name="google-site-verification" content="...">` da tela do Search Console
  - Próxima IA/sessão deve: inserir essa tag no `<head>` de `index.html`, commitar, dar push (deploy automático), e então o usuário clica em "Verificar" no Search Console
- Depois de verificado: usuário precisa ir em Configurações → Usuários e permissões → Adicionar usuário → colar `gsc-bot@express-cacambas.iam.gserviceaccount.com` com permissão de leitura

## Depois disso (ordem sugerida)

1. Finalizar verificação do Search Console (ver acima)
2. Configurar secrets no GitHub (`GSC_SERVICE_ACCOUNT_JSON` do conteúdo do JSON da service account, `GSC_SITE_URL` = `https://express-cacambas-diadema.vercel.app/`)
3. Google Business Profile (business.google.com, mesma conta) — ainda não iniciado. Maior impacto em SEO local, requer verificação por SMS/cartão postal (não automatizável)
4. Domínio próprio — usuário decidiu deixar pra depois, perguntar de novo quando relevante
5. Campanha paga (Google Ads) — usuário confirmou interesse futuro, mas nada deve ser construído até ele ter conta Google Ads + orçamento real (ver seção "Futuro: campanha paga" no README.md)

## Decisões/restrições importantes a respeitar

- **Não usar Playwright/automação de browser com login real do usuário** — usuário pediu isso explicitamente, foi recusado por risco de bloqueio de conta Google e por exigir verificação manual (SMS/postal) que não pode ser automatizada. Continuar guiando passo a passo manualmente.
- Não criar automação de campanha paga sem conta/orçamento real do usuário (ver README.md, seção "Futuro: campanha paga").
- Projeto `RELAMPAGO-CACAMBAS-` (em `C:\Users\newto\RELAMPAGO-CACAMBAS-`) é um negócio/projeto **separado e não relacionado** — não tocar.
- Nunca colar credenciais/senhas no chat; conteúdo de JSON de service account deve ir direto para GitHub Secrets, não para arquivos do repositório.
