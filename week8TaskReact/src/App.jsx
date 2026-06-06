import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const navData = [
    { label: 'Home', url: '/' },
    { label: 'About', url: '/about' },
    { label: 'Services', url: '/services' },
    { label: 'Contact', url: '/contact' }
  ];

  const heroData = [
    { title: 'Feature 1', desc: 'High performance web apps.' },
    { title: 'Feature 2', desc: 'Responsive design focus.' },
    { title: 'Feature 3', desc: 'Modern UI/UX standards.' }
  ];

  return (
    <div className="App">
      <Navbar links={navData} />
      <main>
        <Hero content={heroData} />
      </main>
      <Footer year="2026" companyName="TechFlow Solutions" />
    </div>
  );
}

export default App;