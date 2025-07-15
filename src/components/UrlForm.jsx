import React, { useState } from 'react';

function UrlForm({ onSubmit, loading }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="url-form">
      <div className="input-group">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste your long URL here"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Shortening...' : 'Shorten'}
        </button>
      </div>
    </form>
  );
}

export default UrlForm;