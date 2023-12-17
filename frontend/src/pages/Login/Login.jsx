import { useEffect } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./Login.module.css";

function Login() {
  useEffect(() => {
    document.body.style.backgroundColor = "white";

    return () => {
      document.body.style.backgroundColor = "black";
    };
  }, []);

  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
}

export default Login;
