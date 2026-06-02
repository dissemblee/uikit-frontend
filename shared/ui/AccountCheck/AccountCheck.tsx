import { Link } from "react-router"
import styles from "./AccountCheck.module.scss"

export const AccountCheck = ({isAccount}: {isAccount: boolean}) => {
  if (isAccount) return <div className={styles.AccountCheck}>У вас уже есть аккаунт? <Link to="/login" className={styles.AccountCheck__Link}>Войдите!</Link></div>
  else return <div className={styles.AccountCheck}>У вас ещё нет аккаунта? <Link to="/registration" className={styles.AccountCheck__Link}>Создайте его!</Link></div>
}