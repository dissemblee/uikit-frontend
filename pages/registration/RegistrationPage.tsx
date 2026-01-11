import styled from "./RegistrationPage.module.scss"
import { RegistrationSection } from "@widgets/RegistrationSection";

export const RegistrationPage = () => {
  return (
    <main className={styled.RegistrationPage}>
      <RegistrationSection />
    </main>
  );
};
