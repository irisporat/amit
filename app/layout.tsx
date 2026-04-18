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
import './globals.css';

const rubik = Rubik({ subsets: ['hebrew', 'latin'], weight: ['400', '500', '700', '800'], variable: '--font-main' });
const frankRuhlLibre = Frank_Ruhl_Libre({ subsets: ['hebrew', 'latin'], weight: ['400', '700'], variable: '--font-title' });
const kleeOne = Klee_One({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-handwriting' });
const fredoka = Fredoka({ subsets: ['latin'], weight: ['300', '400', '600', '700'], variable: '--font-fredoka' });
const assistant = Assistant({ subsets: ['hebrew', 'latin'], weight: ['300', '400', '700'], variable: '--font-assistant' });
const varelaRound = Varela_Round({ subsets: ['latin', 'hebrew'], weight: ['400'], variable: '--font-varela' });
const amaticSC = Amatic_SC({ subsets: ['latin', 'hebrew'], weight: ['400', '700'], variable: '--font-amatic' });

export const metadata: Metadata = {
  title: 'החברים של עמית',
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
      <body>{children}</body>
    </html>
  );
}
