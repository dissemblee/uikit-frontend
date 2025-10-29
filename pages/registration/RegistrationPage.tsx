import { RegistrationForm } from "@features/RegistrationForm/RegistrationForm";
import styled from "./RegistrationPage.module.scss"

export const RegistrationPage = () => {
  return (
    <main className={styled.RegistrationPage}>
      <RegistrationForm />
    </main>
  );
};