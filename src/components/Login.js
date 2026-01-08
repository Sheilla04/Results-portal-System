import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
  Lock, 
  Eye, 
  EyeSlash,
  Mortarboard,
  PersonBadge,
  Building,
  ArrowLeft,
  Person
} from 'react-bootstrap-icons';
import './Login.css';

function Login() {
  const { role } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const roleConfig = {
    student: {
      title: "Student Portal",
      icon: Mortarboard,
      color: "#0066cc",
      gradient: "linear-gradient(135deg, #0066cc 0%, #3399ff 100%)",
      description: "Access your examination results and academic records",
      placeholder: "Student ID or Email"
    },
    lecturer: {
      title: "Lecturer Portal",
      icon: PersonBadge,
      color: "#00875a",
      gradient: "linear-gradient(135deg, #00875a 0%, #00b37d 100%)",
      description: "Upload and manage student examination results",
      placeholder: "Staff ID or Email"
    },
    admin: {
      title: "Examination Office",
      icon: Building,
      color: "#172b4d",
      gradient: "linear-gradient(135deg, #172b4d 0%, #2c3e50 100%)",
      description: "Manage official examination records and verification",
      placeholder: "Admin ID or Email"
    }
  };

  const config = roleConfig[role] || roleConfig.student;
  const Icon = config.icon;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // TEMPORARY (API integration comes later)
      if (role === "student") navigate("/student");
      if (role === "lecturer") navigate("/lecturer");
      if (role === "admin") navigate("/admin");
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-layout">
        {/* Left Panel - Branding */}
        <div className="login-left-panel" style={{ background: config.gradient }}>
          <div className="left-panel-content">
            <button 
              className="back-button"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="me-2" size={18} />
              Back to Roles
            </button>
            
            <div className="brand-section">
              <div className="logo-container mb-4">
                <Icon size={48} color="white" />
              </div>
              <h1 className="brand-title">{config.title}</h1>
              <p className="brand-description">{config.description}</p>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="login-right-panel">
          <div className="right-panel-content">
            {/* Mobile Header - Hidden on desktop */}
            <div className="mobile-header d-lg-none">
              <button 
                className="mobile-back-button"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="me-2" size={18} />
                Back
              </button>
              <div className="mobile-brand">
                <div className="mobile-icon me-3" style={{ background: config.gradient }}>
                  <Icon size={24} color="white" />
                </div>
                <div>
                  <h4 className="mobile-title">{config.title}</h4>
                  <small className="mobile-description">{config.description}</small>
                </div>
              </div>
            </div>

            {/* Login Form */}
            <div className="login-card">
              <div className="card-body">
                <div className="form-header">
                  <h2 className="form-title">Sign In</h2>
                  <p className="form-subtitle">Enter your credentials to access the system</p>
                </div>

                <form onSubmit={handleLogin}>
                  {/* Username Field */}
                  <div className="form-group">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <Person size={18} />
                      </span>
                      <input
                        id="username"
                        type="text"
                        className="form-control"
                        placeholder={config.placeholder}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <div className="input-group password-input">
                      <span className="input-group-text">
                        <Lock size={18} />
                      </span>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="form-options">
                    <div className="remember-me">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <a href="#forgot" className="forgot-password" style={{ color: config.color }}>
                      Forgot password?
                    </a>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="login-button"
                    disabled={isLoading}
                    style={{ background: config.gradient }}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner" role="status" aria-hidden="true"></span>
                        Authenticating...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </button>

                  {/* Terms */}
                  <div className="terms">
                    <small>
                      By signing in, you agree to our{" "}
                      <a href="#terms" style={{ color: config.color }}>
                        Terms of Service
                      </a>
                    </small>
                  </div>

                  {/* Divider */}
                  <div className="divider">
                    <span>or</span>
                  </div>

                  {/* Help Section */}
                  <div className="help-section">
                    <p>Having trouble signing in?</p>
                    <div className="help-buttons">
                      <button
                        type="button"
                        className="help-button"
                        onClick={() => window.location.href = `mailto:support@university.edu?subject=${config.title} Login Help`}
                      >
                        Contact Support
                      </button>
                      <button
                        type="button"
                        className="help-button"
                        onClick={() => window.location.href = "/help"}
                      >
                        Help Center
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Footer */}
            <div className="footer">
              <small>
                © 2024 University Examination System
                <span className="separator">•</span>
                <a href="#privacy">Privacy</a>
                <span className="separator">•</span>
                <a href="#security">Security</a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
