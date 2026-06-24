// Tracking de clique no botão de WhatsApp — não bloqueia a navegação.
// Troque N8N_WEBHOOK_URL pela URL real do seu webhook n8n quando tiver a instância.
// Enquanto for placeholder, o fetch falha silenciosamente e o link wa.me continua funcionando normalmente.
(function () {
  var N8N_WEBHOOK_URL = "https://SEU-N8N-AQUI/webhook/whatsapp-click";

  var ctaIds = ["cta-hero", "cta-final-btn", "cta-fixed-btn"];

  ctaIds.forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;

    el.addEventListener("click", function () {
      if (N8N_WEBHOOK_URL.indexOf("SEU-N8N-AQUI") !== -1) return;

      try {
        fetch(N8N_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          keepalive: true,
          body: JSON.stringify({
            event: "whatsapp_click",
            source: id,
            ts: Date.now(),
            page: window.location.href
          })
        });
      } catch (e) {
        // Falha no tracking nunca deve impedir o cliente de ir pro WhatsApp.
      }
    });
  });
})();
