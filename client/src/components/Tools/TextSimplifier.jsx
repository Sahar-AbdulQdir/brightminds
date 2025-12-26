import React, { useState } from 'react';
import './ToolsStyles/TextSimplifier.css';

const TextSimplifier = () => {
  const [inputText, setInputText] = useState('');
  const [simplifiedText, setSimplifiedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [complexityLevel, setComplexityLevel] = useState('medium');
  const [targetAudience, setTargetAudience] = useState('general');

  // If you're using your own backend (recommended for security)
  const USE_BACKEND_PROXY = true;
  const BACKEND_URL = 'https://lexiaminds-private-test.onrender.com/api/simplify'; // Replace with your backend URL

  const handleSimplify = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to simplify');
      return;
    }

    if (!USE_BACKEND_PROXY && !apiKey) {
      setError('Please enter your OpenAI API key');
      setShowApiKey(true);
      return;
    }

    setIsLoading(true);
    setError('');
    setSimplifiedText('');

    try {
      let response;
      
      if (USE_BACKEND_PROXY) {
        // Using your own backend (more secure)
        response = await fetch(BACKEND_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: inputText,
            complexityLevel,
            targetAudience
          }),
        });
      } else {
        // Direct OpenAI API call (less secure - exposes API key)
        response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: `Simplify the following text for ${targetAudience} audience. Make it ${complexityLevel === 'very-simple' ? 'extremely simple' : complexityLevel === 'simple' ? 'simple' : 'moderately simple'}. Use shorter sentences, simpler words, and clearer structure.`
              },
              {
                role: 'user',
                content: inputText
              }
            ],
            temperature: 0.7,
            max_tokens: 1000
          })
        });
      }

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (USE_BACKEND_PROXY) {
        setSimplifiedText(data.simplifiedText || data.result);
      } else {
        setSimplifiedText(data.choices[0].message.content);
      }
      
    } catch (err) {
      setError(`Error simplifying text: ${err.message}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
    } catch (err) {
      setError('Failed to paste from clipboard. Please paste manually.');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(simplifiedText);
      alert('Simplified text copied to clipboard!');
    } catch (err) {
      setError('Failed to copy text');
    }
  };

  const clearAll = () => {
    setInputText('');
    setSimplifiedText('');
    setError('');
  };

  const wordCount = (text) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  return (
    <div className="text-simplifier-container">
      <h1>AI Text Simplifier</h1>
      <p className="subtitle">Simplify complex text using AI</p>

      {/* Complexity Settings */}
      <div className="settings-panel">
        <div className="setting-group">
          <label>Simplification Level:</label>
          <select 
            value={complexityLevel} 
            onChange={(e) => setComplexityLevel(e.target.value)}
          >
            <option value="very-simple">Very Simple</option>
            <option value="simple">Simple</option>
            <option value="medium">Medium</option>
          </select>
        </div>
        
        <div className="setting-group">
          <label>Target Audience:</label>
          <select 
            value={targetAudience} 
            onChange={(e) => setTargetAudience(e.target.value)}
          >
            <option value="children">Children</option>
            <option value="general">General Public</option>
            <option value="students">Students</option>
            <option value="non-native">Non-Native Speakers</option>
          </select>
        </div>
      </div>

      {/* API Key Input (only for direct API use) */}
      {!USE_BACKEND_PROXY && (
        <div className="api-key-section">
          <button 
            onClick={() => setShowApiKey(!showApiKey)}
            className="toggle-api-btn"
          >
            {showApiKey ? 'Hide' : 'Show'} API Key Settings
          </button>
          
          {showApiKey && (
            <div className="api-key-input">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your OpenAI API key"
              />
              <p className="api-key-note">
                Note: Your API key is stored locally and not sent to any server except OpenAI.
                For production, use a backend proxy.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Input Section */}
      <div className="input-section">
        <div className="section-header">
          <h2>Original Text</h2>
          <div className="word-count">Words: {wordCount(inputText)}</div>
        </div>
        
        <div className="text-area-container">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste or type your complex text here..."
            rows={8}
          />
          <div className="button-group">
            <button onClick={handlePaste} className="paste-btn">
              📋 Paste
            </button>
            <button onClick={() => setInputText('')} className="clear-btn">
              🗑️ Clear
            </button>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="control-section">
        <button 
          onClick={handleSimplify} 
          disabled={isLoading || !inputText.trim()}
          className="simplify-btn"
        >
          {isLoading ? 'Simplifying...' : '✨ Simplify Text'}
        </button>
        
        <button onClick={clearAll} className="clear-all-btn">
          Clear All
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      {/* Output Section */}
      {simplifiedText && (
        <div className="output-section">
          <div className="section-header">
            <h2>Simplified Text</h2>
            <div className="word-count">Words: {wordCount(simplifiedText)}</div>
          </div>
          
          <div className="text-output">
            <div className="simplified-text">
              {simplifiedText}
            </div>
            <button onClick={handleCopy} className="copy-btn">
              📋 Copy Simplified Text
            </button>
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>AI is simplifying your text...</p>
        </div>
      )}

      {/* Usage Tips */}
      <div className="tips">
        <h3>💡 Tips:</h3>
        <ul>
          <li>For best results, paste text between 100-1000 words</li>
          <li>Adjust the simplification level based on your needs</li>
          <li>The "Very Simple" setting is great for children or non-native speakers</li>
          {USE_BACKEND_PROXY ? (
            <li>This app uses a secure backend proxy</li>
          ) : (
            <li>You need an OpenAI API key. Get one at <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">OpenAI</a></li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TextSimplifier;