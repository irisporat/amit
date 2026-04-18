import Navigation from '@/components/Navigation';
import CoffeeApp from '@/components/CoffeeApp';

export default function CoffeeRecipePage() {
  return (
    <>
      <div id="navigation-root">
        <Navigation pageTitle='קפה "החברים של עמית"' />
      </div>
      <main className="main-content-scroll">
        <CoffeeApp />
      </main>
    </>
  );
}
