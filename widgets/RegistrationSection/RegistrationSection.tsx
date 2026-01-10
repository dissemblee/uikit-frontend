import { useNavigate } from "react-router";
import styled from "./RegistrationSection.module.scss"
import { RegistrationForm } from "@features/RegistrationForm"

export const RegistrationSection = () => {
  const navigate = useNavigate();

  return (
    <section className={styled.RegistrationSection}>
      <div onClick={() => navigate(-1)} className={styled.GoBack}>
        Назад
      </div>
      <h1>Регистрация</h1>
      <RegistrationForm />
    </section>
  )
}