# PassGen - Veilige Wachtwoord Generator & Manager

PassGen is een moderne web applicatie waarmee gebruikers sterke wachtwoorden kunnen genereren, de veiligheid van bestaande wachtwoorden kunnen controleren en hun wachtwoorden veilig kunnen opslaan.

## Belangrijkste Functies

- **Wachtwoord Generator**: Genereer sterke, willekeurige wachtwoorden met aanpasbare lengte en karakterset.
- **Wachtwoord Veiligheidscontrole**: Controleer of je wachtwoord voorkomt in bekende datalekken via de "Have I Been Pwned" API.
- **Wachtwoord Opslag**: Sla je wachtwoorden veilig op (versleuteld) en bekijk ze wanneer je ingelogd bent.
- **Beveiligingstips**: Lees handige tips over wachtwoordveiligheid en beste praktijken.

## Technische Details

### Tech Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: Firebase Firestore
- **Authenticatie**: Firebase Authentication
- **Beveiliging**: Firebase Security Rules, HIBP API voor veiligheidscontroles

### Veiligheid

- Wachtwoorden worden veilig opgeslagen via Firebase
- Veiligheidscontroles gebruikt k-Anonymity voor privacy
- Firestore security rules beschermen gebruikersgegevens

## Installatie en Gebruik

### Vereisten

- Node.js 16+ 
- npm of yarn
- Een Firebase account

### Lokale Setup

1. Clone de repository
   ```
   git clone https://github.com/[gebruikersnaam]/passgen.git
   cd passgen
   ```

2. Installeer dependencies
   ```
   npm install
   ```

3. Maak een Firebase project aan
   - Ga naar [Firebase Console](https://console.firebase.google.com/)
   - Maak een nieuw project aan
   - Activeer Authentication met Email/Password provider
   - Maak een Firestore database aan
   - Ga naar Project Settings > General > Your apps
   - Klik op Add app (Web) en volg de instructies

4. Maak een .env.local bestand aan met je Firebase configuratie
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=je_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=je_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=je_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=je_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=je_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=je_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=je_measurement_id
   ```

5. Start de ontwikkelingsserver
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in je browser

## Firestore Security Rules

Voeg deze security rules toe aan je Firestore database voor beveiliging:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /passwords/{passwordId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## Deployment

Deze applicatie kan eenvoudig worden gedeployed op platformen zoals:

- Vercel
- Netlify
- Firebase Hosting

## Licentie

MIT 