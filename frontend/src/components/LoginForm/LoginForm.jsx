import { Link } from "react-router-dom";
import { useState } from "react";

import facebook from "../../assets/icons/facebook.svg";
import useAuth from "../../services/useAuth";
import styles from "./LoginForm.module.css";
import FlashMessage from "../../utils/alerts/Alerts";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [flashMessage, setFlashMessage] = useState([]);
  const { handleLoginUser } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    handleLoginUser(username, password, setFlashMessage);
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        {flashMessage && (
          <span className={styles.alert}>
            <FlashMessage messages={flashMessage} onClose={setFlashMessage} />
          </span>
        )}
        <div className={styles.loginFormContainer}>
          <div className={styles.header}>Instagram</div>
          <div className={styles.prompt}>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">Log in</button>
            </form>
          </div>
          <div className={styles.divider}>
            <div className={styles.line}></div>
            <strong>OR</strong>
            <div className={styles.line}></div>
          </div>
          <div className={styles.footer}>
            <div className={styles.facebookPrompt}>
              <img className={styles.facebookIcon} src={facebook} alt="" />
              <strong>Log in with Facebook</strong>
            </div>
            <a className={styles.forgotPassword} href="/">
              Forgot password?
            </a>
          </div>
        </div>

        <div className={styles.signupContainer}>
          <p>
            Don't have an account?
            <Link to="/register">
              <strong> Sign up</strong>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
