import { useForm } from "@shared/hooks/useForm"
import { Button } from "@shared/ui/Button"
import { FileInput, Input, Select, Textarea } from "@shared/ui/Inputs"
import { FiArchive, FiCode, FiFileText, FiPackage } from "react-icons/fi"
import { useCreateComponentMutation } from "@entities/component"
import type { ComponentCreateDto } from "@entities/component/component.dto"
import { useState } from "react"
import { FormError } from "@shared/ui/FormError"

export const CreateComponentForm = () => {
  const [create, { isLoading }] = useCreateComponentMutation()
  const [archive, setArchive] = useState<File | null>(null)

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
      if (!archive) errors.archive = "Выберите архив проекта"
      if (values.description.length >= 300) errors.description = "Слишком длинное описание, максимум 300 символов"
      
      return errors
    },

    async onSubmit(values) {
      if (!archive) return

      const dto: ComponentCreateDto = {
        name: values.name,
        description: values.description,
        meta: { framework: values.framework },
        archive,
      }

      const result = await create(dto)

      if ('error' in result) {
        throw result.error
      }
    },
  })

  const frameworkOptions = [
    { value: "React",   label: "⚛️ React"   },
    { value: "Angular", label: "🅰️ Angular" },
    { value: "Vanilla", label: "🍦 Vanilla" },
    { value: "Vue",     label: "🔥 Vue"     },
    { value: "Svelte",  label: "🔄 Svelte"  },
  ]

  return (
    <form onSubmit={form.handleSubmit}>
      <Input
        label="Имя компонента"
        {...form.field("name")}
        icon={<FiCode />}
        placeholder="Лучшая кнопка"
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
        placeholder="Это самая лучшая кнопка для React!"
      />
      <FileInput
        label="Архив проекта"
        icon={<FiArchive />}
        value={archive}
        onChange={(file) => {
          setArchive(file)
          if (form.submitError) form.setSubmitError(null)
        }}
        acceptedFileTypes={['.zip', '.rar', '.7z', '.tar.gz', '.tgz']}
        maxSize={20 * 1024 * 1024}
      />

      <FormError message={form.submitError} />

      <Button
        type="submit"
        disabled={form.isSubmitting}
        loading={isLoading}
        loadingText="Формируем компоненты..."
      >
        🚀 Создать
      </Button>
    </form>
  )
}