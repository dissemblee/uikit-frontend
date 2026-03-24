import { CreateRepositoryForm } from "@features/CreateRepositoryForm";
import { FormWrapSection } from "@shared/ui/FormWrapSection";

export const CreateRepositorySection = () => {
  const tips = [
    "Используйте короткое и понятное название" ,
    "Добавьте подробное описание проекта",
    "Выберите подходящий фреймворк"
  ];

  return (
    <FormWrapSection
      title={"Создайте новый репозиторий"}
      tipsTitle={"Советы по созданию репозитория"}
      tips={tips}
    >
      <CreateRepositoryForm />
    </FormWrapSection>
  )
}
