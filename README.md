# Caçambas Diadema Express — Landing Page

Landing page estática focada em conversão via WhatsApp para aluguel de caçambas em Diadema.

## Estrutura

- `index.html` — página única, sem framework, otimizada para Core Web Vitals.
- `styles.css` — estilos não-críticos, carregados de forma assíncrona.
- `script.js` — tracking de clique no botão de WhatsApp (não bloqueia a navegação).
- `config.example.json` — dados de negócio centralizados (telefone, nome, bairros). **Os dados atuais no HTML são fictícios** — troque antes de publicar oficialmente.
- `robots.txt` / `sitemap.xml` — SEO técnico.
- `vercel.json` — headers de cache e segurança.
- `.github/workflows/seo-report.yml` + `scripts/gsc-report.js` — robô semanal de SEO (ver abaixo).

## Antes de publicar oficialmente

1. Substituir no `index.html`:
   - Número de WhatsApp (`5511966661234`) pelo número real, em todos os 3 botões.
   - Nome da empresa, bairros atendidos, depoimentos (atualmente fictícios) e domínio (`seudominio.com.br`).
2. Adicionar uma imagem real para `og-image.png` (compartilhamento em redes sociais).

## Tracking de cliques (sem custo, sem Meta)

O botão usa um link `https://wa.me/<numero>` — funciona sozinho, sem depender de nada além disso.

Opcionalmente, para receber estatísticas de clique:

1. Crie uma instância gratuita do [n8n](https://n8n.io) (self-hosted ou n8n.cloud free tier).
2. Crie um workflow com um node **Webhook** (método POST).
3. Conecte o Webhook a um node de notificação (Telegram, Email) e/ou a um Google Sheets para registrar os cliques.
4. Copie a URL do webhook e cole em `script.js`, substituindo `N8N_WEBHOOK_URL`.

Enquanto a URL não for configurada, o tracking é ignorado silenciosamente e o redirecionamento pro WhatsApp continua funcionando normalmente.

## Robô de SEO gratuito (GitHub Actions)

Toda semana, uma Action consulta a API oficial e gratuita do Google Search Console e abre um **Pull Request** com um relatório de palavras-chave (cliques, impressões, posição) e sugestões de melhoria. **Nenhuma mudança é aplicada automaticamente** — você revisa e decide o que fazer.

Setup manual (uma vez):

1. Crie um projeto gratuito no [Google Cloud Console](https://console.cloud.google.com/).
2. Ative a **Search Console API**.
3. Crie uma **Service Account** e gere uma chave JSON.
4. No [Google Search Console](https://search.google.com/search-console), adicione o e-mail da service account como usuário com acesso de leitura.
5. No repositório do GitHub, vá em **Settings → Secrets and variables → Actions** e crie:
   - `GSC_SERVICE_ACCOUNT_JSON` — cole o conteúdo do JSON da chave.
   - `GSC_SITE_URL` — a URL exata cadastrada no Search Console (ex: `https://seudominio.com.br/`).

Sem esses secrets configurados, a Action ainda roda, mas gera um relatório avisando que estão pendentes — não falha.

## Deploy

```bash
# Repositório GitHub (já criado e publicado pelo agente)
git remote -v

# Deploy na Vercel — requer login manual uma única vez:
vercel login   # abre link de device code, autorize no navegador
vercel --prod
```

## Monitoramento de concorrentes

Não incluído nesta primeira versão (exigiria scraping de SERP, que viola os termos do Google, ou ferramentas pagas como SEMrush/Ahrefs). Pode ser adicionado depois como verificação simples de mudança de conteúdo em URLs de concorrentes específicas, se desejado.
