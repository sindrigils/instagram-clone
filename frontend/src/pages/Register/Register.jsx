import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";

import RegisterForm from "../../components/RegisterForm/RegisterForm";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./Register.module.css";

function Register() {
  useEffect(() => {
    document.body.style.backgroundColor = "white";

    return () => {
      document.body.style.backgroundColor = "black";
    };
  }, []);

  const { isLoading } = useSelector((state) => state.user);
  if (isLoading) return <Spinner />;

  return (
    <div className={styles.container}>
      <RegisterForm />
    </div>
  );
}

export default Register;
