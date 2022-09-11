import React from 'react';
import { Link } from 'react-router-dom';
import './MenuLink.css';

function MenuLink(props) {

  return (
    <Link to={props.route} className={`nav-link ${props.class}`}>{props.text}</Link>
  );
}

export default MenuLink;