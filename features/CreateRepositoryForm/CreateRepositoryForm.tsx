import { Button } from "@shared/ui/Buttons"
import { BaseInput } from "@shared/ui/Inputs"

export const CreateRepositoryForm = () => {
  return (
    <form>
      <BaseInput label="Название"/>
      <BaseInput label="Описание"/>
      <BaseInput type="file" label="Код"/>

      <Button>Создать</Button>
    </form>
  )
}