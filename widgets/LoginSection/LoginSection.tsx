import { LoginForm } from "@features/LoginForm/LoginForm"
import styled from "./LoginSection.module.scss"
import { useNavigate } from "react-router"

export const LoginSection = () => {
  const navigate = useNavigate();
  return (
    <section className={styled.LoginSection}>
      <div onClick={() => navigate(-1)} className={styled.GoBack}>
        Назад
      </div>
      <h1>Вход</h1>
      <LoginForm />
    </section>
  )
}