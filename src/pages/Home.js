import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '24px', color: '#2c3e50' }}>
          Welcome to Mutual Funds Investment Platform
        </h1>
        
        <p style={{ fontSize: '18px', color: '#34495e', marginBottom: '32px' }}>
          Discover and invest in mutual funds that match your financial goals
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          margin: '40px 0'
        }}>
          <FeatureCard
            title="Explore Funds"
            description="Browse through a wide range of mutual funds"
            link="/funds"
          />
          <FeatureCard
            title="Compare"
            description="Compare different funds side by side"
            link="/compare"
          />
          <FeatureCard
            title="Track Investments"
            description="Monitor your investments in one place"
            link="/dashboard"
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, link }) => {
  return (
    <Link to={link} style={{ textDecoration: 'none' }}>
      <div style={{
        padding: '24px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s',
        cursor: 'pointer',
        height: '100%'
      }}>
        <h3 style={{ marginTop: 0, color: '#2c3e50' }}>{title}</h3>
        <p style={{ color: '#7f8c8d' }}>{description}</p>
      </div>
    </Link>
  );
};

export default Home;
