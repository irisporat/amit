import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'עגלת קפה "החברים של עמית" - דף ראשי',
};

export default function CoffeeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
