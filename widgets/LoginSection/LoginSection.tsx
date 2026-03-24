import { LoginForm } from "@features/LoginForm/LoginForm"
import { FormWrapSection } from "@shared/ui/FormWrapSection";

export const LoginSection = () => {
  const tips = [
    "Вспомните свой надежный пароль" ,
    "Введите ваш обычный логин",
  ];

  return (
    <FormWrapSection
      title={"Место входа"}
      tipsTitle={"Советы по входу"}
      tips={tips}
    >
      <LoginForm />
    </FormWrapSection>
  )
}