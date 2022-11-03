import LoginPage from './login';
import RegisterPage from './register';

import styles from 'assets/css/Auth.module.css';

export default function AuthPage() {
  return (
    <div className={styles['section']}>
      <div className="container">
        <div className={`row justify-content-center ${styles['full-height']}`}>
          <div className="col-12 text-center align-self-center py-5">
            <div className={`${styles.section} pb-5 pt-5 pt-sm-2 text-center`}>
              <h6 className="mb-0 pb-3">
                <span>Log In </span>
                <span>Sign Up</span>
              </h6>
              <input
                className={styles.checkbox}
                type="checkbox"
                id="reg-log"
                name="reg-log"
              />
              <label htmlFor="reg-log"></label>
              <div className={`${styles['card-3d-wrap']} mx-auto`}>
                <div className={styles['card-3d-wrapper']}>
                  <LoginPage />
                  <RegisterPage />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
