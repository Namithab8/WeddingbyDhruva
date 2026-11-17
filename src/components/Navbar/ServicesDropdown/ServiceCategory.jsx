import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ServiceCategory({ category }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="mega-cat"
      onClick={() => navigate('/services')}
    >
      <span className="mega-cat-num">{category.num}.</span>
      <span className="mega-cat-title">{category.title}</span>
      <span className="mega-cat-arrow">›</span>
    </button>
  );
}
