import { BaseInput } from "@shared/ui/Inputs"

export const CreateRepositoryForm = () => {
  return (
    <section>
      <h1>Страница Входа</h1>
      <form>
        <BaseInput label="Название"/>
        <BaseInput label="Описание"/>
        <BaseInput type="file" label="Код"/>
      </form>
    </section>
  )
}