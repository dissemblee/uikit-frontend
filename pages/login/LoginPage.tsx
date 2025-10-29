import { LoginForm } from "@features/LoginForm/LoginForm";
import styled from "./LoginPage.module.scss"

export const LoginPage = () => {
  return (
    <main className={styled.LoginPage}>
      <LoginForm />
    </main>
  );
};