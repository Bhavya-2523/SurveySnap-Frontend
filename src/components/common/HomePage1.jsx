import { useState } from 'react';
import './HomePage1.css';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const FeatureCard = ({ icon, title, description }) => (
    <div className="p-4 bg-black rounded shadow feature-card">
      <div className="mb-3">{icon}</div>
      <h3 className="h4 text-white mb-3">{title}</h3>
      <p className="text-secondary mb-0">{description}</p>
    </div>
  );

  const TestimonialCard = ({ quote, author, role, rating }) => (
    <div className="p-4 bg-dark rounded shadow">
      <div className="d-flex mb-3">
        {[...Array(rating)].map((_, i) => (
          <i key={i} className="bi bi-star-fill" style={{ color: '#ff7700' }}></i>
        ))}
      </div>
      <p className="text-white mb-4">"{quote}"</p>
      <div className="d-flex align-items-center">
        <div className="bg-secondary rounded-circle me-3" style={{ width: '40px', height: '40px' }}></div>
        <div>
          <p className="mb-0 text-white">{author}</p>
          <p className="mb-0 text-secondary small">{role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="homepage d-flex flex-column min-vh-100 bg-dark">
      {/* Header */}
      <header className="sticky-top bg-dark text-white border-bottom border-secondary">
        <div className="container py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <span className="fs-4 fw-bold">
                <span className="text-white">Survey</span>
                <span style={{ color: '#ff7700' }}>Snap</span>
              </span>
            </div>

            <nav className="d-none d-md-flex align-items-center gap-4">
              <Link to="/login" className="btn text-white" style={{ backgroundColor: '#ff7700' }}>Login</Link>
              <Link to="/signup" className="btn text-white" style={{ backgroundColor: '#ff7700' }}>Signup</Link>
            </nav>

            <button
              className="d-md-none btn btn-dark text-light p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className={`bi bi-${isMenuOpen ? 'x' : 'list'} fs-4`} style={{ color: '#ff7700' }}></i>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-dark text-white py-5 border-bottom border-secondary">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="mb-4">
                <h1 className="display-4 fw-bold mb-3">
                  Create Surveys with <span style={{ color: '#ff7700' }}>EASE</span>
                </h1>
                <p className="lead text-secondary mb-4">
                  Build, participate, and analyze surveys faster than ever with our platform.
                </p>
                <div className="d-flex gap-3 mb-4">
                  <Link to="/survey/addsurvey" className="btn text-white btn-lg px-4" style={{ backgroundColor: '#ff7700' }}>
                    Start generating surveys <i className="bi bi-chevron-right ms-2"></i>
                  </Link>
                  <button className="btn btn-outline-secondary btn-lg px-4">
                    more
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="bg-black rounded p-4 position-relative">
                <div className="d-flex mb-4">
                  <div className="rounded-circle me-2" style={{ width: '10px', height: '10px', backgroundColor: '#ff4d4f' }}></div>
                  <div className="rounded-circle me-2" style={{ width: '10px', height: '10px', backgroundColor: '#ff7700' }}></div>
                  <div className="rounded-circle me-2" style={{ width: '10px', height: '10px', backgroundColor: '#52c41a' }}></div>
                </div>
                <div className="bg-dark rounded mb-4 p-3">
                  <div className="bg-secondary rounded mb-2" style={{ height: '15px', width: '40%' }}></div>
                  <div className="bg-secondary rounded" style={{ height: '15px', width: '60%' }}></div>
                </div>
                <div className="bg-dark rounded p-3 mb-4">
                  <div className="bg-secondary rounded mb-3" style={{ height: '100px' }}></div>
                  <div className="bg-secondary rounded" style={{ height: '100px' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-5 bg-black text-white">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Powerful Features</h2>
            <p className="text-secondary lead">Everything you need to create effective surveys</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <FeatureCard
                icon={<i className="bi bi-magic fs-1" style={{ color: '#ff7700' }}></i>}
                title="Simplicity to create"
                description="Generate survey and get response from participants with one click only "
              />
            </div>
            <div className="col-md-4">
              <FeatureCard
                icon={<i className="bi bi-bar-chart-line fs-1" style={{ color: '#ff7700' }}></i>}
                title="Real-Time Analytics"
                description="Get instant insights with dynamic charts and automated reports"
              />
            </div>
            <div className="col-md-4">
              <FeatureCard
                icon={<i className="bi bi-shield-check fs-1" style={{ color: '#ff7700' }}></i>}
                title="Enterprise Security"
                description="Bank-grade security with end-to-end encryption and compliance certifications"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-5 bg-dark text-white">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Trusted By Thousands</h2>
            <p className="text-secondary lead">What our users say about SurveySnap</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <TestimonialCard
                quote="The AI suggestions have revolutionized how we create customer feedback surveys."
                author="Sarah Johnson"
                role="Product Manager"
                rating={5}
              />
            </div>
            <div className="col-md-4">
              <TestimonialCard
                quote="Cut our survey creation time by 70% while improving response quality."
                author="Michael Chen"
                role="Marketing Director"
                rating={5}
              />
            </div>
            <div className="col-md-4">
              <TestimonialCard
                quote="The analytics dashboard alone is worth the subscription."
                author="Alex Rodriguez"
                role="Data Analyst"
                rating={4}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-5 border-top border-secondary">
        <div className="container py-4">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="mb-3">
                <span className="fs-4 fw-bold">
                  <span className="text-white">Survey</span>
                  <span style={{ color: '#ff7700' }}>Snap</span>
                </span>
              </div>
              <p className="text-secondary small">
                AI-powered survey platform for modern teams
              </p>
              <div className="d-flex gap-3">
                <a href="#" className="text-secondary"><i className="bi bi-twitter"></i></a>
                <a href="#" className="text-secondary"><i className="bi bi-linkedin"></i></a>
                <a href="#" className="text-secondary"><i className="bi bi-facebook"></i></a>
              </div>
            </div>
            <div className="col-md-2">
              <h6 className="text-white mb-3">Product</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-secondary text-decoration-none small">Features</a></li>
                <li className="mb-2"><a href="#" className="text-secondary text-decoration-none small">Pricing</a></li>
                <li className="mb-2"><a href="#" className="text-secondary text-decoration-none small">Templates</a></li>
                <li className="mb-2"><a href="#" className="text-secondary text-decoration-none small">Security</a></li>
              </ul>
            </div>
            <div className="col-md-2">
              <h6 className="text-white mb-3">Company</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="text-secondary text-decoration-none small">About</a></li>
                <li className="mb-2"><a href="#" className="text-secondary text-decoration-none small">Blog</a></li>
                <li className="mb-2"><a href="#" className="text-secondary text-decoration-none small">Careers</a></li>
                <li className="mb-2"><a href="#" className="text-secondary text-decoration-none small">Contact</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h6 className="text-white mb-3">Stay Updated</h6>
              <div className="input-group">
                <input type="email" className="form-control bg-dark border-secondary" placeholder="Enter your email" />
                <button className="btn text-white" style={{ backgroundColor: '#ff7700' }}>
                  Subscribe <i className="bi bi-arrow-right"></i>
                </button>
              </div>
              <p className="text-secondary small mt-2">Get product updates and survey tips</p>
            </div>
          </div>
          <div className="border-top border-secondary mt-5 pt-4 text-center text-md-start">
            <p className="text-secondary small mb-0">
              &copy; {new Date().getFullYear()} SurveySnap. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;