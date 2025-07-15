import React, { useEffect, useState } from 'react';

const API_KEY = '37c5c787ed158bee492a3330a624bfa5'; 

function News() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`https://gnews.io/api/v4/search?q=weather&lang=en&max=10&token=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setArticles(data.articles);
      })
      .catch(err => {
        console.error("Failed to fetch news:", err);
      });
  }, []);

  return (
    <div>
      <h1>Weather News 📰</h1>
      {articles.length === 0 && <p>Loading news...</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {articles.map((article, i) => (
          <li key={i} style={{ marginBottom: '20px', textAlign: 'left' }}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default News;
