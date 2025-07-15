import React, { useState } from 'react';
import { FaLink, FaRocket, FaMobile, FaChartLine } from 'react-icons/fa';
import UrlForm from './components/UrlForm';
import UrlResult from './components/UrlResult';
import './App.css';

function App() {
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleShorten = async (originalUrl) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/shorten/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ original_url: originalUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.original_url || 'Failed to shorten URL');
      }

      const data = await response.json();
      setShortUrl(data.short_url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setShortUrl('');
    setError('');
  };

  return (
    <div className="app">
      

      <main>
        <section className="hero">
          <div className="hero-content">
            <h2>Free URL Shortener</h2>
            <p>Create shortened links and share anywhere. Perfect for social media, emails, and marketing.</p>
            <div className="url-form-container">
              <UrlForm onSubmit={handleShorten} loading={loading} />
              {error && <p className="error">{error}</p>}
              {shortUrl && <UrlResult shortUrl={shortUrl} onReset={handleReset} />}
            </div>
          </div>
        </section>

        <section className="features">
          <div className="feature-card">
            <div className="feature-icon"><FaRocket /></div>
            <h3>Fast & Simple</h3>
            <p>ShortURL is incredibly easy to use. Paste your long link and get your shortened URL instantly with just one click.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><FaLink /></div>
            <h3>Unlimited Links</h3>
            <p>Shorten any URL, no matter the length. Our service works with all standard web links.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><FaMobile /></div>
            <h3>Cross-Platform</h3>
            <p>Works seamlessly across all devices - smartphones, tablets and desktop computers.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><FaChartLine /></div>
            <h3>Reliable</h3>
            <p>Enterprise-grade infrastructure ensures your links are always available when you need them.</p>
          </div>
        </section>

        
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} ShortURL. By Mohamed Safi.</p>
      </footer>
    </div>
  );
}

export default App;
