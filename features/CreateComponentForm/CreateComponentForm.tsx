import { useForm } from "@shared/hooks/useForm"
import { Button } from "@shared/ui/Button"
import { FileInput, Input, Select, Textarea, TagInput } from "@shared/ui/Inputs"
import { FiCode, FiFileText, FiPackage, FiTag, FiUpload } from "react-icons/fi"
import { useCreateComponentMutation, Framework, ComponentTag } from "@entities/component"
import { useState } from "react"
import { FormError } from "@shared/ui/FormError"
import { useNavigate } from "react-router"

export const CreateComponentForm = () => {
  const [create, { isLoading }] = useCreateComponentMutation()
  const [file, setFile] = useState<File | null>(null)
  const navigate = useNavigate()

  const tagOptions = Object.values(ComponentTag)

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      framework: Framework.REACT,
      tags: [] as ComponentTag[],
    },

    validate(values) {
      const errors: any = {}
      if (!values.name) errors.name = "Введите имя"
      if (!values.description) errors.description = "Введите описание"
      if (!values.framework) errors.framework = "Укажите фреймворк"
      if (!file) errors.file = "Выберите файл компонента"
      if (values.description.length >= 300) {
        errors.description = "Слишком длинное описание, максимум 300 символов"
      }
      return errors
    },

    async onSubmit(values) {
      if (!file) return

      const formData = new FormData()
      formData.append("file", file)
      formData.append("name", values.name)
      formData.append("description", values.description)
      formData.append("framework", values.framework)
      formData.append("dependencies", JSON.stringify({ axios: "^1.13.6" }))
      formData.append("tags", JSON.stringify(values.tags))

      const result = await create(formData)
      if ("error" in result) {
        throw result.error
      }

      navigate(`/components`)
    },
  })

  const frameworkOptions = [
    { value: Framework.REACT, label: "⚛️ React" },
    { value: Framework.VANILLA, label: "🍦 Vanilla" },
  ]

  return (
    <form onSubmit={form.handleSubmit}>
      <Input
        label="Имя компонента"
        {...form.field("name")}
        icon={<FiCode />}
        placeholder="Button"
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
        placeholder="Кнопка для отправки форм"
      />

      <TagInput
        label="Теги"
        options={tagOptions}
        value={form.values.tags}
        onChange={(next) =>
          form.setValues((prev) => ({
            ...prev,
            tags: next as ComponentTag[],
          }))
        }
        placeholder="начните вводить..."
      />

      <FileInput
        label="Файл компонента"
        icon={<FiUpload />}
        value={file}
        onChange={(newFile) => {
          setFile(newFile)
          if (form.submitError) form.setSubmitError(null)
        }}
        acceptedFileTypes={[".ts", ".tsx", ".js", ".jsx"]}
        maxSize={1024 * 1024}
      />

      <FormError message={form.submitError} />

      <Button
        type="submit"
        disabled={form.isSubmitting}
        loading={isLoading}
        loadingText="Создаем компонент..."
        nonBlock
      >
        Создать компонент
      </Button>
    </form>
  )
}
