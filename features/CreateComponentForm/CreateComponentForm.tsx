import { useForm } from "@shared/hooks/useForm"
import { Button } from "@shared/ui/Button"
import { FileInput, Input, Select, Textarea } from "@shared/ui/Inputs"
import { FiCode, FiFileText, FiPackage, FiUpload } from "react-icons/fi"
import { useCreateComponentMutation } from "@entities/component"
import { useState } from "react"
import { FormError } from "@shared/ui/FormError"
import { useNavigate } from "react-router"

export const CreateComponentForm = () => {
  const [create, { isLoading }] = useCreateComponentMutation()
  const [file, setFile] = useState<File | null>(null)
  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      framework: "react" as const,
      fileExtension: "tsx" as const,
      version: "0.0.0.0"
    },

    validate(values) {
      const errors: any = {}
      if (!values.name) errors.name = "Введите имя"
      if (!values.description) errors.description = "Введите описание"
      if (!values.framework) errors.framework = "Укажите фреймворк"
      if (!values.fileExtension) errors.fileExtension = "Укажите расширение файла"
      if (!file) errors.file = "Выберите файл компонента"
      
      if (file) {
        const fileExt = file.name.split('.').pop()
        if (fileExt !== values.fileExtension) {
          errors.file = `Расширение файла (.${fileExt}) не соответствует выбранному (.${values.fileExtension})`
        }
      }
      
      if (values.description.length >= 300) {
        errors.description = "Слишком длинное описание, максимум 300 символов"
      }
      
      return errors
    },

    async onSubmit(values) {
      if (!file) return

      const formData = new FormData()
      formData.append("file", file)
      formData.append("version", values.version)
      formData.append("name", values.name)
      formData.append("description", values.description)
      formData.append("framework", values.framework)
      formData.append("fileExtension", values.fileExtension)
      formData.append("css", JSON.stringify("css"))
      formData.append("dependencies", JSON.stringify({"axios": "^1.13.6"}))

      const result = await create(formData)
      if ('error' in result) {
        throw result.error
      }
      
      navigate('/components')
    },
  })

  const frameworkOptions = [
    { value: "react", label: "⚛️ React" },
    { value: "vanilla", label: "🍦 Vanilla" },
  ]

  const extensionOptions = [
    { value: "ts", label: "TypeScript (.ts)" },
    { value: "tsx", label: "TypeScript React (.tsx)" },
    { value: "js", label: "JavaScript (.js)" },
    { value: "jsx", label: "JavaScript React (.jsx)" },
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
      
      <Select
        label="Расширение файла"
        options={extensionOptions}
        {...form.field("fileExtension")}
        icon={<FiCode />}
      />
      
      <Textarea
        label="Описание"
        {...form.field("description")}
        icon={<FiFileText />}
        placeholder="Кнопка для отправки форм"
      />
      
      <FileInput
        label="Файл компонента"
        icon={<FiUpload />}
        value={file}
        onChange={(newFile) => {
          setFile(newFile)
          if (form.submitError) form.setSubmitError(null)
        }}
        acceptedFileTypes={['.ts', '.tsx', '.js', '.jsx']}
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
