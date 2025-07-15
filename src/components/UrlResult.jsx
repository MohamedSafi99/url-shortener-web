import React from 'react';

function UrlResult({ shortUrl, onReset }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="result-container">
      <div className="result-box">
        <span className="short-url">{shortUrl}</span>
        <div className="action-buttons">
          <button onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button onClick={() => window.open(shortUrl, '_blank')}>
            Visit Link
          </button>
          <button onClick={onReset} className="reset-btn">
            Shorten Another
          </button>
        </div>
      </div>
    </div>
  );
}

export default UrlResult;