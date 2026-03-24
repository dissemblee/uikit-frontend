import { CreateComponentForm } from "@features/CreateComponentForm";
import { FormWrapSection } from "@shared/ui/FormWrapSection";

export const CreateComponentSection = () => {
  const tips = [
    "Используйте короткое и понятное название" ,
    "Добавьте подробное описание проекта",
    "Выберите подходящий фреймворк",
    "Загрузите архив с вашим проектом"
  ];

  return (
    <FormWrapSection
      title={"Создайте новый компонент"}
      tipsTitle={"Советы по созданию компонента"}
      tips={tips}
    >
      <CreateComponentForm />
    </FormWrapSection>
  )
}
