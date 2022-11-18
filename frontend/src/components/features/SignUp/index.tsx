import { BsBootstrap } from 'react-icons/bs';

import styles from 'assets/css/SignUp.module.css';

export default function SignUpPage() {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className={styles.background}></div>
      <div className={`${styles.card} align-self-center`}>
        <BsBootstrap className={styles.logo} size={28} />
        <h2>Create Account</h2>
        <form className={styles.form}>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">SIGN UP</button>
        </form>
        <footer>
          Existing users, sign in
          <a href="#">here</a>
        </footer>
      </div>
    </div>
  );
}
