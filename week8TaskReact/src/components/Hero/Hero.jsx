import Card from './Card';

const Hero = ({ content }) => {
  return (
    <section className='hero'>
      <h1>Welcome to Our Platform</h1>
      <div className='card-container'>
        {content.map((card, index) => (
          <Card key={index} title={card.title} description={card.desc} />
        ))}
      </div>
    </section>
  );
};

export default Hero;