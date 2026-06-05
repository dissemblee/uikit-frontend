import { VersionRepositoryForm } from "@features/VersionRepositoryForm";
import { FormWrapSection } from "@shared/ui/FormWrapSection";

export const VersionRepositorySection = () => {
  const tips = [
    "Добавьте или удалите компоненты в репозитории",
  ];

  return (
    <FormWrapSection
      title={"Создайте новую версию репозитория"}
      tipsTitle={"Советы по версионированию репозитория"}
      tips={tips}
    >
      <VersionRepositoryForm />
    </FormWrapSection>
  )
}
