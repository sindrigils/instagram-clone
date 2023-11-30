import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./LoginForm.module.css";
import facebook from "../../assets/icons/facebook.svg";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submitted");
  }

  return (
    <div className={styles.container}>
      <div className={styles.login_container}>
        <div className={styles.header}>Instagram</div>
        <div className={styles.prompt}>
          <form className={styles.login_form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          Don't have an account?{" "}
          <Link to="/register">
            <strong>Sign up</strong>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
