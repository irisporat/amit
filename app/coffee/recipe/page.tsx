import type { Metadata } from 'next';
import CoffeeApp from '@/components/CoffeeApp';

export const metadata: Metadata = {
  robots: 'noindex',
};

export default function CoffeeRecipePage() {
  return (
    <main className="main-content-scroll">
      <CoffeeApp />
    </main>
  );
}
