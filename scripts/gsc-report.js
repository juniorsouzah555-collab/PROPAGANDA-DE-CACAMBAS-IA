// Consulta a API oficial e gratuita do Google Search Console e gera um relatório markdown.
// Requer os secrets do repositório:
//   GSC_SERVICE_ACCOUNT_JSON -> conteúdo JSON da service account do Google Cloud (com acesso de leitura no GSC)
//   GSC_SITE_URL              -> URL exata cadastrada no Search Console (ex: https://seudominio.com.br/)
//
// Setup manual necessário (uma vez, feito pelo usuário, não pelo robô):
// 1. Criar projeto gratuito no Google Cloud Console.
// 2. Ativar a "Search Console API".
// 3. Criar uma Service Account e gerar uma chave JSON.
// 4. No Google Search Console, adicionar o e-mail da service account como usuário com acesso "Restrito" (leitura).
// 5. Salvar o JSON da chave como secret GSC_SERVICE_ACCOUNT_JSON no GitHub (Settings > Secrets > Actions).

const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

async function main() {
  const saJson = process.env.GSC_SERVICE_ACCOUNT_JSON;
  const siteUrl = process.env.GSC_SITE_URL;

  if (!saJson || !siteUrl) {
    console.log("GSC_SERVICE_ACCOUNT_JSON ou GSC_SITE_URL não configurados — pulando geração de relatório real.");
    writeReport("# Relatório SEO\n\nSecrets do Search Console ainda não configurados. Configure GSC_SERVICE_ACCOUNT_JSON e GSC_SITE_URL nos secrets do repositório para habilitar dados reais.\n");
    return;
  }

  const credentials = JSON.parse(saJson);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"]
  });

  const searchconsole = google.searchconsole({ version: "v1", auth });

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 28);

  const fmt = (d) => d.toISOString().split("T")[0];

  const res = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: fmt(startDate),
      endDate: fmt(endDate),
      dimensions: ["query"],
      rowLimit: 25
    }
  });

  const rows = res.data.rows || [];

  let md = `# Relatório SEO — últimos 28 dias\n\n`;
  md += `Site: ${siteUrl}\n\n`;
  md += `| Palavra-chave | Cliques | Impressões | CTR | Posição média |\n`;
  md += `|---|---|---|---|---|\n`;

  rows.forEach((r) => {
    const [query] = r.keys;
    md += `| ${query} | ${r.clicks} | ${r.impressions} | ${(r.ctr * 100).toFixed(1)}% | ${r.position.toFixed(1)} |\n`;
  });

  md += `\n## Sugestões automáticas (revisar manualmente antes de aplicar)\n\n`;
  rows
    .filter((r) => r.impressions > 50 && r.position > 10)
    .forEach((r) => {
      md += `- A keyword "${r.keys[0]}" tem ${r.impressions} impressões mas posição média ${r.position.toFixed(1)}. Considere reforçar essa palavra-chave no H2/FAQ da página.\n`;
    });

  writeReport(md);
}

function writeReport(content) {
  const dir = path.join(__dirname, "..", "reports");
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `seo-report-${new Date().toISOString().split("T")[0]}.md`);
  fs.writeFileSync(file, content);
  console.log("Relatório gerado em", file);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
