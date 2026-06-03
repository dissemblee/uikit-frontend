import { VersionComponentForm } from "@features/VersionComponentForm/VersionComponentForm";
import { FormWrapSection } from "@shared/ui/FormWrapSection";

export const VersionComponentSection = () => {
  const tips = [
    "Передайте код для новой версии компонента" ,
  ];

  return (
    <FormWrapSection
      title={"Создайте новую версию компонента"}
      tipsTitle={"Советы по версионированию компонента"}
      tips={tips}
    >
      <VersionComponentForm />
    </FormWrapSection>
  )
}
