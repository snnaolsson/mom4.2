# Dt207g - Moment 4.2 - Autentisering och säkerhet

*Repositoryt innehåller klientsidan som använder serverdelen från moment 4.1.*

## Webbapplikationen innehåller 3 sidor 
- Startsida, där man kan logga in
- Skapa konto, där man kan skapa ett nytt konto med användarnamn och lösenord för att kunna logga in. 
- Userside, "dold" sida som man automatiskt skickas till när man har loggat in med korrekta användaruppgifter. 

## För att komma igång 
- npm run build för att bygga sidan med parcel
- npm run start för att starta servern
**När man bygger/startar sidan första gången så kan man behöva specificera att man vill starta/bygga undersidan userside.html. Ibland skapar inte parcel den automatiskt eftersom den inte finns länkad i navigeringen och när man loggat in då så hamnar man bara tillbaka på index.html.**

