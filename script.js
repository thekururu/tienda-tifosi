const WEBHOOK_URL = "https://discord.com/api/webhooks/1462958023139135665/JKS0xqyqZhiiS_ipKTKS3wJyHb3SPEnfUoNTGRfaukpYBhdzLsYgt9OLTGYXaPlns-wL"; // REEMPLAZA ESTO

document.getElementById('storeForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = document.getElementById('btnEnviar');
    const user = document.getElementById('username').value;
    const discId = document.getElementById('discordId').value;
    const select = document.getElementById('product');
    const product = select.value;
    const price = select.options[select.selectedIndex].getAttribute('data-price');

    btn.disabled = true;
    btn.innerText = "Procesando...";

    const fechaHora = new Date().toLocaleString('es-ES', { 
        dateStyle: 'full', 
        timeStyle: 'short' 
    });

    const payload = {
        content: `🚨 **¡NUEVA COMPRA!** <@${discId}>`,
        embeds: [{
            title: "🛒 Detalles del Pedido",
            color: 16039018, // Color rosado/rojo
            fields: [
                { name: "📦 Producto", value: `**${product}**`, inline: true },
                { name: "💰 Precio", value: `\`${price}\``, inline: true },
                { name: "👤 Usuario", value: user, inline: true },
                { name: "🆔 ID Cliente", value: `\`${discId}\``, inline: true },
                { name: "📅 Fecha y Hora", value: fechaHora, inline: false }
            ],
            footer: { text: "Sistema de Ventas Automático" },
            timestamp: new Date()
        }]
    };

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("¡Pedido enviado! Revisa Discord.");
            document.getElementById('storeForm').reset();
        } else {
            alert("Error al enviar el pedido.");
        }
    } catch (error) {
        alert("Error de conexión.");
    } finally {
        btn.disabled = false;
        btn.innerText = "Confirmar Pedido";
    }
});