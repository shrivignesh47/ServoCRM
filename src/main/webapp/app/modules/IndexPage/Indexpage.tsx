import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './IndexPage.scss';

const Header = () => {
  return (
    <header className="header-unique">
      <nav className="navbar-unique">
        <ul className="nav-links-unique">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/crm">Access Our CRM</Link></li>
        </ul>
      </nav>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="footer-unique">
      <p>&copy; 2024 Your Company. All rights reserved.</p>
    </footer>
  );
};

const Home = () => <div className="content-unique">Welcome to our website!</div>;
const Contact = () => <div className="content-unique">Contact us at contact@ourcompany.com</div>;
const About = () => <div className="content-unique">We are a company that provides CRM solutions.</div>;
const Crm = () => <div className="content-unique">Access our CRM here.</div>;

const Indexpage = () => {
  return (
   <p>s</p>
  );
};

export default Indexpage;
