import { useCreateRepositoryMutation } from "@entities/repository"
import { useForm } from "@shared/hooks/useForm"
import { Button } from "@shared/ui/Button"
import { Input, Select, Textarea } from "@shared/ui/Inputs"
import type { RepositoryCreateDto } from "@entities/repository"
import styled from "./CreateRepositoryForm.module.scss"
import { FiCode, FiFileText } from "react-icons/fi"

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
      
      await create(dto)
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
        label="Логин"
        {...form.field("name")}
         icon={<FiCode />}
      />

      <Textarea
        label="Описание"
        {...form.field("description")}
        icon={<FiFileText />}
      />

      <Select
        label="Фреймворк"
        options={frameworkOptions}
        {...form.field("framework")}
      />
      
      <Button type="submit" disabled={form.isSubmitting} loading={isLoading} loadingText="Создание">
        🚀 Создать
      </Button>
      <div className={styled.formStats}>
        <span>✨ {Object.values(form.values).filter(Boolean).length}/3 заполнено</span>
      </div>
    </form>
  )
}
