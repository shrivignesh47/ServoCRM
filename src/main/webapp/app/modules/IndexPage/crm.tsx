import React,{ useEffect } from 'react';
import './crm.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Crm() {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.nav-container');
      if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='crm-container'>
      <nav className='nav-container'>
        <div className='nav-left'>
          <img src='path-to-your-logo.png' alt='Logo' className='logo' />
        </div>
        <div className='nav-right'>
          <a href='#home' className='nav-link'>Home</a>
          <a href='#about' className='nav-link'>About</a>
          <a href='#feature' className='nav-link'>Features</a>
          <a href='#contact' className='nav-link'>Contact</a>
          <button className='nav-button'>Button</button>
        </div>
      </nav>
      <div id='home' className='home-container' >
        <div className='text-container'>
          <h1>ServoCRM</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum massa vel enim feugiat gravida.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum massa vel enim feugiat gravida.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum massa vel enim feugiat gravida.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum massa vel enim feugiat gravida.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum massa vel enim feugiat gravida.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum massa vel enim feugiat gravida.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum massa vel enim feugiat gravida.
          </p>
          <button>Get Started</button>
        </div>
        <div className='image-container'>
          <img src='https://img.freepik.com/free-vector/isometric-crm-illustration_52683-83950.jpg' alt='ServoCRM Illustration' className='home-image' />
        </div>
      </div>
      <div  id='about' className='about-container'>
        <div className='image-container'>
          <img src='https://cdni.iconscout.com/illustration/premium/thumb/crm-system-4487382-3722743.png' alt='About Us Illustration' className='about-image' />
        </div>
        <div className='text-container'>
          <h1>About Us</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum massa vel enim feugiat gravida.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum massa vel enim feugiat gravida.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum massa vel enim feugiat gravida.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum massa vel enim feugiat gravida.
          </p>
          <div className='stats-container'>
            <div className='stat-box'>
              <h2>3.5</h2>
              <p>Years Experience</p>
            </div>
            <div className='stat-box'>
              <h2>23</h2>
              <p>Project Challenge</p>
            </div>
            <div className='stat-box'>
              <h2>830+</h2>
              <p>Positive Reviews</p>
            </div>
            <div className='stat-box'>
              <h2>100K</h2>
              <p>Trusted Students</p>
            </div>
          </div>
        </div>
      </div>
      <div id='feature' className='feature-container'>
      <h2 className='feature-heading'>Features to help you focus</h2>
        <p className='feature-head-p'>ServoCRM is full of features that help you prioritize deals, track performance, and predict revenue.</p>
        <div className='features'>
          <div className='feature-box'>
            <i className='fas fa-chart-line feature-icon'></i>
            <h3>Manage leads and deals</h3>
            <p>Get more hot leads fed straight into your sales pipelines around the clock from your custom chatbot and web forms.</p>
          </div>
          <div className='feature-box'>
            <i className='fas fa-phone-alt feature-icon'></i>
            <h3>Track communications</h3>
            <p>Track calls, emails, and contact history exactly where you need to and have full visibility and control of your schedule.</p>
          </div>
          <div className='feature-box'>
            <i className='fas fa-robot feature-icon'></i>
            <h3>Automate and grow</h3>
            <p>Eliminate busywork by automating repetitive administrative tasks and learn from artificial intelligence.</p>
          </div>
          <div className='feature-box'>
            <i className='fas fa-chart-pie feature-icon'></i>
            <h3>Insights and reports</h3>
            <p>Deep dive into metrics customized for your business and measure company performance against set goals.</p>
          </div>
          <div className='feature-box'>
            <i className='fas fa-shield-alt feature-icon'></i>
            <h3>Privacy and security</h3>
            <p>Have full transparency and peace of mind on when and how your business data is being used.</p>
          </div>
          <div className='feature-box'>
            <i className='fas fa-mobile-alt feature-icon'></i>
            <h3>Mobile apps and integrations</h3>
            <p>Access ServoCRM from your mobile device and integrate with your favorite sales-boosting apps.</p>
          </div>
        </div>
      </div>
      <div className='rating-container'>
      <h2 className='rating-heading'>Over 100+ reviews & ratings</h2>
      <p className='rating-head-p'>Hignly rated by many customers all over the world</p>
      <div className='logo-marquee'>
          <div className='logo-track'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' alt='Google Logo' className='company-logo' />
            <img src='https://www.svgrepo.com/show/303143/microsoft-logo.svg' alt='Microsoft Logo' className='company-logo' />
            <img src='https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' alt='SourceForge Logo' className='company-logo' />
            <img src='https://w7.pngwing.com/pngs/243/1018/png-transparent-capterra-logo-review-platforms-logos.png' alt='Capterra Logo' className='company-logo' />
            <img src='https://cdn.freelogovectors.net/wp-content/uploads/2023/09/mozilla-firefox-logo-01-freelogovectors.net_.png' alt='Opera Logo' className='company-logo' />
          </div>
        </div>
      </div>
      <div id='contact' className='contact-container'>
        <div className='text-container'>
          <h1>Contact Us</h1>
          <p>Connect with us today to explore how ServoCRM can streamline your business operations and 
            enhance customer relationships. Whether you have questions, need support, or just want to 
            learn more, our team is here to help. Reach out through our social media channels or drop 
            us an email, and we'll get back to you promptly.</p>
          <div className='social-icons'>
            <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-facebook-f'></i>
            </a>
            <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-twitter'></i>
            </a>
            <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-instagram'></i>
            </a>
            <a href='mailto:someone@example.com'>
              <i className='fas fa-envelope'></i>
            </a>
          </div>
        </div>
        <div className='contact-image-container'>
          <img src='https://static.vecteezy.com/system/resources/thumbnails/015/199/701/small_2x/customer-support-contact-us-woman-with-headphones-and-microphone-with-computer-talking-with-clients-personal-assistant-service-hotline-operator-advises-customer-online-global-technical-support-vector.jpg' alt='Contact Us Illustration' className='contact-image' />
        </div>
      </div>
      <div className='footer-container'>
        <p>&copy; 2024 ServoCRM. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Crm;
