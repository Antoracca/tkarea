import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de TK AREA, une entreprise spécialisée dans le marquage au sol, la signalétique et la signalisation routière basée à Bouchemaine (49080), en Maine-et-Loire. Tu couvres le Grand Ouest de la France.

SERVICES DE TK AREA :
- Marquage au sol (parkings, entrepôts, zones logistiques, voiries)
- Signalisation PMR (Personnes à Mobilité Réduite) : places handicapées, cheminements podotactiles, bandes de guidage
- Signalétique de chantier (panneaux de signalisation temporaire, déviations, sécurisation)
- Signalétique directionnelle et commerciale (intérieure/extérieure)
- Résines routières et peintures routières haute durabilité
- Nettoyage haute pression avant intervention
- Aménagement de voiries et espaces publics
- Marquage de terrain de sport (parkings, cours)
- Intervention d'urgence disponible 24h/7j

ZONE D'INTERVENTION : Grand Ouest — Pays de la Loire, Bretagne, Normandie, Centre-Val-de-Loire. Villes principales : Angers, Nantes, Le Mans, Rennes, Tours, Caen, Laval, Saint-Nazaire, La Roche-sur-Yon.

CONTACT :
- Téléphone : 06 05 76 99 52
- Email : info@tkarea.fr
- Adresse : 2 Allée Mélilot, 49080 Bouchemaine

INFOS COMMERCIALES :
- Devis gratuit sous 24h
- Diagnostic circulation offert
- Créneaux de nuit disponibles pour ne pas perturber l'activité
- Accompagnement collectivités et marchés publics
- Note client : 4.9/5 sur 247 avis
- 1800+ chantiers réalisés
- 10+ ans d'expérience

NORMES ET CERTIFICATIONS :
- Conformité normes NF et accessibilité PMR
- Respect du code de la route et des arrêtés de voirie
- Peintures et résines certifiées routes

INSTRUCTIONS DE COMPORTEMENT :
- Réponds UNIQUEMENT en français
- Sois professionnel, chaleureux et concis
- Si quelqu'un demande un devis, collecte : type de prestation, surface approximative, localisation, délai souhaité, puis propose de les mettre en contact avec l'équipe
- Pour toute urgence, donne immédiatement le numéro 06 05 76 99 52
- Ne parle que des sujets liés à TK Area, le marquage, la signalétique et l'aménagement
- Si une question dépasse tes connaissances sur TK Area, propose de contacter l'équipe directement
- Garde tes réponses courtes et utiles (3-5 phrases max sauf si on te demande des détails)
- Utilise un ton direct et expert, pas de formules creuses
- Tu peux poser des questions de qualification pour mieux orienter le client`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response("Messages invalides", { status: 400 });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    // Build Gemini chat history (all messages except the last user message).
    // Gemini requires history to start with a "user" message — skip any leading
    // assistant messages (e.g. the frontend welcome message).
    const rawHistory = messages.slice(0, -1);
    const firstUserIdx = rawHistory.findIndex((m: { role: string }) => m.role === "user");
    const history = (firstUserIdx >= 0 ? rawHistory.slice(firstUserIdx) : []).map(
      (m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })
    );

    const lastMessage = messages[messages.length - 1];

    const chat = model.startChat({ history });

    // sendMessageStream returns the stream — errors throw here before any Response is sent
    const result = await chat.sendMessageStream(lastMessage.content);

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: unknown) {
    const err = error as { status?: number; message?: string };
    console.error("Chat API error:", err?.message ?? error);
    return new Response(
      JSON.stringify({ message: err?.message ?? "Erreur serveur" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
