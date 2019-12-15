import React from 'react';
import marked from 'marked';

export default function ArticleBody({ body }) {
  const markup = { __html: marked(body, { sanitize: true }) };
  
  return (
    <div dangerouslySetInnerHTML={markup}></div>
  );
}