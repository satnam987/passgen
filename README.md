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
- **Database**: SQLite met Prisma ORM
- **Authenticatie**: JWT (JSON Web Tokens)
- **Beveiliging**: bcrypt voor wachtwoordhashing, HIBP API voor veiligheidscontroles

### Veiligheid

- Wachtwoorden worden veilig gehashed opgeslagen
- Veiligheidscontroles gebruikt k-Anonymity voor privacy
- API's zijn beveiligd met JWT authenticatie

## Installatie en Gebruik

### Vereisten

- Node.js 16+ 
- npm of yarn

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

3. Maak .env bestand aan
   ```
   JWT_SECRET=je_geheime_sleutel_hier
   ```

4. Setup database
   ```
   npx prisma migrate dev
   ```

5. Start de ontwikkelingsserver
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in je browser

## Deployment

Deze applicatie kan eenvoudig worden gedeployed op platformen zoals:

- Render
- Vercel
- Netlify
- Railway

## Licentie

MIT 