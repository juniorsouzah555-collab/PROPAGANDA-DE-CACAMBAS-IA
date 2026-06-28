const { google } = require("googleapis");

async function main() {
  const saJson = process.env.GSC_SERVICE_ACCOUNT_JSON;
  const siteUrl = process.env.GSC_SITE_URL;

  if (!saJson || !siteUrl) {
    console.error("GSC_SERVICE_ACCOUNT_JSON ou GSC_SITE_URL não configurados");
    process.exit(1);
  }

  const credentials = JSON.parse(saJson);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/webmasters"]
  });

  const searchconsole = google.searchconsole({ version: "v1", auth });

  // 1. Tentar adicionar o site
  try {
    await searchconsole.sites.add({ siteUrl });
    console.log(`Site adicionado: ${siteUrl}`);
  } catch (err) {
    if (err.code === 403) {
      console.log(`Site já existe ou sem permissão: ${siteUrl}`);
    } else {
      throw err;
    }
  }

  // 2. Verificar o site via arquivo (já existe googlec18c1b42f27809f2.html no repo)
  try {
    const verifyRes = await searchconsole.sites.verify({
      siteUrl,
      requestBody: { verificationMethod: "FILE" }
    });
    console.log("Verificação via FILE:", JSON.stringify(verifyRes.data));
  } catch (err) {
    console.log("Erro na verificação FILE (pode já estar verificado):", err.message);
  }

  // 3. Listar sites para confirmar
  const list = await searchconsole.sites.list();
  const sites = list.data.siteEntry || [];
  console.log("\nSites no GSC:");
  sites.forEach(s => console.log(`- ${s.siteUrl} [${s.permissionLevel}]`));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
