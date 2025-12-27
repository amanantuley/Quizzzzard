import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const isValidEmail = (v) => /.+@.+\..+/.test(v);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    if (!isValidEmail(email)) {
      setErr("Please enter a valid email address.");
      return;
    }
    if (pass.length < 6) {
      setErr("Password must be at least 6 characters.");
      return;
    }
    try {
      setBusy(true);
      // In this simplified setup, authenticate locally
      login({ email });
      nav("/dashboard");
    } catch (error) {
      setErr(error?.response?.data?.message || error?.message || "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="auth-wrap" aria-labelledby="login-heading">
      <div className="auth-card">
        <h2 id="login-heading">Login</h2>
        <p className="auth-sub">Access your dashboard and save your progress.</p>
        <form onSubmit={submit} className="auth-form">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <div className="auth-row">
            <label htmlFor="password">Password</label>
            <button
              type="button"
              className="auth-show"
              onClick={() => setShowPass((s) => !s)}
              aria-label={showPass ? "Hide password" : "Show password"}
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>
          <input
            id="password"
            type={showPass ? "text" : "password"}
            autoComplete="current-password"
            required
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="••••••"
          />

          <div className="auth-row">
            <label className="auth-check">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/" className="auth-link">Forgot password?</Link>
          </div>

          {err && <div className="auth-error" role="alert">{err}</div>}

          <button className="auth-btn" type="submit" disabled={busy}>
            {busy ? "Signing in…" : "Login"}
          </button>
        </form>

        <p className="auth-alt">
          No account? <Link to="/register" className="auth-link">Register</Link>
        </p>
      </div>
    </section>
  );
}
