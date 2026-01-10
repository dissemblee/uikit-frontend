import styled from "./LoginPage.module.scss"
import { LoginSection } from "@widgets/LoginSection";

export const LoginPage = () => {
  return (
    <main className={styled.LoginPage}>
      <LoginSection />
    </main>
  );
};