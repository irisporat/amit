import type { Metadata } from 'next';
import {
  Fredoka,
  Rubik,
  Assistant,
  Varela_Round,
  Amatic_SC,
  Klee_One,
  Frank_Ruhl_Libre,
} from 'next/font/google';
import Navigation from '@/components/Navigation';
import './globals.css';

const rubik = Rubik({ subsets: ['hebrew', 'latin'], weight: ['400', '500', '700', '800'], variable: '--font-main' });
const frankRuhlLibre = Frank_Ruhl_Libre({ subsets: ['hebrew', 'latin'], weight: ['400', '700'], variable: '--font-title' });
const kleeOne = Klee_One({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-handwriting' });
const fredoka = Fredoka({ subsets: ['latin'], weight: ['300', '400', '600', '700'], variable: '--font-fredoka' });
const assistant = Assistant({ subsets: ['hebrew', 'latin'], weight: ['300', '400', '700'], variable: '--font-assistant' });
const varelaRound = Varela_Round({ subsets: ['latin', 'hebrew'], weight: ['400'], variable: '--font-varela' });
const amaticSC = Amatic_SC({ subsets: ['latin', 'hebrew'], weight: ['400', '700'], variable: '--font-amatic' });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hachaverimshel-amit.co.il';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'החברים של עמית | לזכרו של סמ"ר עמית פרידמן ז"ל',
    template: '%s | החברים של עמית',
  },
  description:
    'אתר זיכרון לסמ"ר עמית פרידמן ז"ל, לוחם בגדוד 932 חטיבת הנח"ל, שנפל בקרב ברפיח ב-27.8.2024. מלח הארץ ומלך החיים הטובים.',
  keywords: [
    'עמית פרידמן',
    'זיכרון',
    'נח"ל',
    'חרבות ברזל',
    'החברים של עמית',
    'לוחם',
    'גדוד 932',
    'חטיבת הנח"ל',
    'אתר זיכרון',
  ],
  authors: [{ name: 'החברים של עמית' }],
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: siteUrl,
    siteName: 'החברים של עמית',
    title: 'החברים של עמית | לזכרו של סמ"ר עמית פרידמן ז"ל',
    description:
      'אתר זיכרון לסמ"ר עמית פרידמן ז"ל, לוחם בגדוד 932 חטיבת הנח"ל, שנפל בקרב ברפיח ב-27.8.2024.',
    images: [
      {
        url: '/about/AmitP.png',
        width: 900,
        height: 1200,
        alt: 'סמ"ר עמית פרידמן ז"ל',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'החברים של עמית | לזכרו של סמ"ר עמית פרידמן ז"ל',
    description:
      'אתר זיכרון לסמ"ר עמית פרידמן ז"ל, לוחם בגדוד 932 חטיבת הנח"ל, שנפל בקרב ברפיח ב-27.8.2024.',
    images: ['/about/AmitP.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: { url: '/apple-touch-icon.png' },
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={[
        rubik.variable,
        frankRuhlLibre.variable,
        kleeOne.variable,
        fredoka.variable,
        assistant.variable,
        varelaRound.variable,
        amaticSC.variable,
      ].join(' ')}
    >
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
