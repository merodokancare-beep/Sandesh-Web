import './globals.css';

export const metadata = {
  title: 'Sandesh Travels | Sikkim Tour Packages, North Sikkim Car Rental & Itineraries',
  description: 'Book Sikkim holiday packages, North Sikkim Jeep tours to Gurudongmar & Yumthang, Innova Crysta car rental, and get instant customized WhatsApp quotations with 20+ owned fleet.',
  keywords: 'Sikkim tour packages, Gangtok taxi, North Sikkim tour, Gurudongmar lake cab, Innova rental Sikkim, Sandesh Travels, Sikkim travel agent',
  openGraph: {
    title: 'Sandesh Travels | Custom Sikkim Tour Packages & Fleet Rental',
    description: 'Book customized Sikkim tour itineraries with company-owned fleet and verified mountain drivers.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Sandesh Travels '
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
