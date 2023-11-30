import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./RegisterForm.module.css";
import facebook from "../../assets/icons/facebook.svg";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {}

  return (
    <div className={styles.container}>
      <div className={styles.register_container}>
        <div className={styles.header}>Instagram</div>
        <div className={styles.header_description}>
          Sign up to see photos and videos from your friends.
        </div>
        <div className={styles.fabebook_icon_login}>
          <a href="/">
            <img src={facebook} alt="" />
            <strong>Log in with Facebook</strong>
          </a>
        </div>
        <div className={styles.divider}>
          <div className={styles.line}></div>
          <strong>OR</strong>
          <div className={styles.line}></div>
        </div>

        <form className={styles.register_form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
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

          <button type="sumbit">
            <strong>Create an account</strong>
          </button>
        </form>
        <div className={styles.terms}>
          <p>
            By signing up, you agree to our Terms. Learn how we collect, use and
            share your data in our Privacy Policy and how we use cookies and
            similar technology in our Cookies Policy.
          </p>
        </div>
      </div>

      <div className={styles.login_container}>
        Have an account?{" "}
        <Link to="/login">
          <strong>Log in</strong>
        </Link>
      </div>
    </div>
  );
}

export default RegisterForm;
