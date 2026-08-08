// Vercel serverless function — advanced extraction path (Gemini vision).
// Runs on Vercel's servers only. Key never reaches the browser.
//
// NOTE: verify the exact model name in https://aistudio.google.com before
// relying on this in production — API details can change over time and
// this was written without live access to current docs.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { imageBase64, mediaType } = req.body || {};

  if (!imageBase64 || !mediaType) {
    return res.status(400).json({ error: 'Image manquante' });
  }

  if (imageBase64.length > 7_000_000) {
    return res.status(413).json({ error: 'Image trop volumineuse' });
  }

  const MODEL = 'gemini-1.5-flash'; // check aistudio.google.com if this errors

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text:
                    "Extrais tout le texte visible dans cette image, y compris manuscrit, mot pour mot, en conservant la structure (lignes, tableaux si présents). Réponds uniquement avec le texte extrait, sans commentaire. Si aucun texte n'est visible, réponds exactement: Aucun texte détecté."
                },
                {
                  inline_data: {
                    mime_type: mediaType,
                    data: imageBase64
                  }
                }
              ]
            }
          ]
        })
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('Gemini API error:', geminiRes.status, errText);
      return res.status(502).json({ error: "Erreur du service d'extraction avancée" });
    }

    const data = await geminiRes.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('\n') || '';

    return res.status(200).json({ text });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
