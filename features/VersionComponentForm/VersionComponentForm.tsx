import { useForm } from "@shared/hooks/useForm"
import { Button } from "@shared/ui/Button"
import { FileInput } from "@shared/ui/Inputs"
import { FiUpload } from "react-icons/fi"
import { useNewVersionComponentMutation } from "@entities/component"
import { useState } from "react"
import { FormError } from "@shared/ui/FormError"
import { useNavigate, useParams } from "react-router"

export const VersionComponentForm = () => {
  const { username, name } = useParams<{ username: string; name: string }>();
  const [newVersion, { isLoading }] = useNewVersionComponentMutation()
  const [file, setFile] = useState<File | null>(null)
  const navigate = useNavigate()

  const form = useForm({
    initialValues: {},

    validate(values) {
      const errors: any = {}
      if (!file) errors.file = "Выберите файл компонента"
      if (!username) errors.username = "Имя пользователя не найдено"
      if (!name) errors.name = "Имя компонента не найдено"
      return errors
    },

    async onSubmit(values) {
      if (!file) return

      const formData = new FormData()
      formData.append("file", file)
      formData.append("dependencies", JSON.stringify({ axios: "^1.13.6" }))

      const result = await newVersion({formData, name: name!, username: username!})
      if ("error" in result) {
        throw result.error
      }

      navigate(`/components/${username}/${name}`)
    },
  })

  return (
    <form onSubmit={form.handleSubmit}>
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
