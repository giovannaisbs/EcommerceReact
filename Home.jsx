import ProductCard from '../components/ProductCard';

const Home = () => {
  const products = [
    { id: 1, name: 'Tênis Esportivo', description: 'Confortável e estiloso.', price: 199.99, image: '/shoes1.jpg' },
    { id: 2, name: 'Sandália Casual', description: 'Perfeita para o dia a dia.', price: 89.99, image: '/shoes2.jpg' },
  ];

  return (
    <div>
      <h1>Bem-vindo à Loja de Calçados</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
