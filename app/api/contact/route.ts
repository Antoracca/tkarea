import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, project } = body;

    // Validation
    if (!name || !email || !project) {
      return NextResponse.json(
        { error: 'Nom, email et description du projet sont requis' },
        { status: 400 }
      );
    }

    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // TODO: Intégrer votre service d'email ici (Resend, SendGrid, etc.)
    // Exemple avec Resend:
    // const { data, error } = await resend.emails.send({
    //   from: 'TK ARÉA <onboarding@resend.dev>',
    //   to: ['info@tkarea.com'],
    //   subject: `Nouveau projet de ${name}`,
    //   html: `
    //     <h2>Nouveau contact depuis le site</h2>
    //     <p><strong>Nom:</strong> ${name}</p>
    //     <p><strong>Entreprise:</strong> ${company || 'Non renseigné'}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Projet:</strong></p>
    //     <p>${project}</p>
    //   `
    // });

    console.log('Nouveau contact reçu:', { name, company, email, project });

    return NextResponse.json(
      {
        success: true,
        message: 'Message envoyé avec succès! Nous vous recontacterons rapidement.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur API contact:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi' },
      { status: 500 }
    );
  }
}
