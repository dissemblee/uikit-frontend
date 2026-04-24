import { Link } from "react-router"
import styled from "./AccountCheck.module.scss"

export const AccountCheck = ({isAccount}: {isAccount: boolean}) => {
  if (isAccount) return <div className={styled.AccountCheck}>У вас уже есть аккаунт? <Link to="/login" className={styled.AccountCheck__Link}>Войдите!</Link></div>
  else return <div className={styled.AccountCheck}>У вас ещё нет аккаунта? <Link to="/registration" className={styled.AccountCheck__Link}>Создайте его!</Link></div>
}