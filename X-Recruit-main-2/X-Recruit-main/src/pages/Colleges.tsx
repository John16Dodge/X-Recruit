import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Colleges = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-grow navbar-spacing">
        <section className="py-20">
          <div className="container-custom">
            <h1 className="text-4xl font-bold text-center">For Colleges</h1>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Colleges;
