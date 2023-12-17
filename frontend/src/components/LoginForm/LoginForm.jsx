import { Link } from "react-router-dom";
import { useState } from "react";

import facebook from "../../assets/icons/facebook.svg";
import useAuth from "../../services/authService";
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
      <div className={styles.login_container}>
        {flashMessage && (
          <span className={styles.alert}>
            <FlashMessage messages={flashMessage} onClose={setFlashMessage} />
          </span>
        )}
        <div className={styles.login_form_container}>
          <div className={styles.header}>Instagram</div>
          <div className={styles.prompt}>
            <form className={styles.login_form} onSubmit={handleSubmit}>
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
            <div className={styles.facebook_prompt}>
              <img className={styles.facebook_icon} src={facebook} alt="" />
              <strong>Log in with Facebook</strong>
            </div>
            <a className={styles.forgot_password} href="/">
              Forgot password?
            </a>
          </div>
        </div>

        <div className={styles.signup_container}>
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
