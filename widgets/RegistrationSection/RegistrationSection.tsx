import { RegistrationForm } from "@features/RegistrationForm"
import { FormWrapSection } from "@shared/ui/FormWrapSection";

export const RegistrationSection = () => {
  const tips = [
    "Придумайте надежный пароль" ,
    "Введите ваш обычный логин",
    "Незабудем про почту, это важно",
  ];

  return (
    <FormWrapSection
      title={"Регистрация"}
      tipsTitle={"Советы по регистрации"}
      tips={tips}
    >
      <RegistrationForm />
    </FormWrapSection>
  )
}