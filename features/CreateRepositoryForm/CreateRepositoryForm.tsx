import { useCreateRepositoryMutation } from "@entities/repository"
import { useForm } from "@shared/hooks/useForm"
import { Button } from "@shared/ui/Button"
import { Input, Select, Textarea } from "@shared/ui/Inputs"
import type { RepositoryCreateDto } from "@entities/repository"
import { FiCode, FiFileText, FiPackage } from "react-icons/fi"
import { FormError } from "@shared/ui/FormError"

export const CreateRepositoryForm = () => {
  const [create, { isLoading }] = useCreateRepositoryMutation()

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      framework: "",
    },

    validate(values) {
      const errors: any = {}

      if (!values.name) errors.name = "Введите имя"
      if (!values.description) errors.description = "Введите описание"
      if (!values.framework) errors.framework = "Укажите фреймворк"
      if (values.description.length >= 300) errors.description = "Слишком длинное описание, максимум 300 символов"
      return errors
    },

    async onSubmit(values) {
      const dto: RepositoryCreateDto = {
        name: values.name,
        description: values.description,
        meta: {
          framework: values.framework,
        }
      }
      
      const result = await create(dto)

      if ('error' in result) {
        throw result.error
      }
    }
  })

  const frameworkOptions = [
    { value: "React", label: '⚛️ React' },
    { value: "Angular", label: '🅰️ Angular' },
    { value: "Vanilla", label: '🍦 Vanilla' },
    { value: "Vue", label: '🔥 Vue' },
    { value: "Svelte", label: '🔄 Svelte' },
  ]

  return(
    <form onSubmit={form.handleSubmit}>
      <Input
        label="Имя компонента"
        {...form.field("name")}
        icon={<FiCode />}
        placeholder="Репозиторий кнопок"
      />
      <Select
        label="Фреймворк"
        options={frameworkOptions}
        {...form.field("framework")}
        icon={<FiPackage />}
      />
      <Textarea
        label="Описание"
        {...form.field("description")}
        icon={<FiFileText />}
        placeholder="Это самый полный репозиторий кнопок для React"
      />

      <FormError message={form.submitError} />
      
      <Button type="submit" disabled={form.isSubmitting} loading={isLoading} loadingText="Создаем директории...">
        🚀 Создать
      </Button>
    </form>
  )
}
