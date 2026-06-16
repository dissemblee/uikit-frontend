import { useCreateRepositoryMutation } from "@entities/repository"
import { useForm } from "@shared/hooks/useForm"
import { Button } from "@shared/ui/Button"
import { Input, Textarea, TagInput, SearchSelect, type SearchSelectItem } from "@shared/ui/Inputs"
import type { RepositoryCreateDto } from "@entities/repository"
import { FiCode, FiFileText } from "react-icons/fi"
import { FormError } from "@shared/ui/FormError"
import { useGetAllComponentsQuery } from "@entities/component"
import { useMemo } from "react"
import { useNavigate } from "react-router"
import { RepoTag } from "@entities/repository/dto/main.dto"

export const CreateRepositoryForm = () => {
  const [create, { isLoading }] = useCreateRepositoryMutation()

  const navigate = useNavigate()
  const tagOptions = Object.values(RepoTag)

  const { data: componentsData, isLoading: componentsLoading } =
    useGetAllComponentsQuery({ skip: 0, limit: 100 })

  const allComponents = componentsData?.result?.data || []

  const componentItems: SearchSelectItem[] = useMemo(
    () =>
      allComponents
        .filter((c): c is (typeof c & { buildId: string }) => Boolean(c.buildId))
        .map((c) => ({
          key: c.buildId,
          label: `${c.name}-v${c.version}` || c.id || "",
          meta: `${c.username} • ${c.framework}`,
        })),
    [allComponents]
  )

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      tags: [] as RepoTag[],
      components: [] as { buildId: string; name: string; username: string; version: string }[],
    },

    validate(values) {
      const errors: any = {}

      if (!values.name) errors.name = "Введите имя"
      if (values.tags.length === 0) errors.tags = "Введите хотя-бы одни тег"
      if (!values.description) errors.description = "Введите описание"
      if (values.description.length >= 300)
        errors.description = "Слишком длинное описание, максимум 300 символов"
      if (values.components.length === 0)
        errors.components = "Добавьте хотя бы один компонент"

      return errors
    },

    async onSubmit(values) {
      const dto: RepositoryCreateDto = {
        name: values.name,
        description: values.description,
        componentBuildIds: values.components.map((c) => c.buildId),
        tags: values.tags,
      }

      const result = await create(dto)

      if ("error" in result) {
        throw result.error
      }

      navigate(`/builds/repositories/${result.data.result?.build?.id}`)
    },
  })

  const selectedItems: SearchSelectItem[] = useMemo(
    () =>
      form.values.components.map((c) => ({
        key: c.buildId,
        label: `${c.username}/${c.name}-v${c.version}`,
      })),
    [form.values.components]
  )

  const handleSelectComponent = (item: SearchSelectItem) => {
    const comp = allComponents.find((c) => c.buildId === item.key)
    if (!comp || !comp.buildId) return

    const componentToAdd: {
      buildId: string
      name: string
      username: string
      version: string
    } = {
      buildId: comp.buildId,
      name: comp.name || comp.id || "",
      username: comp.username || "",
      version: String(comp.version || ""),
    }

    form.setValues((prev) => ({
      ...prev,
      components: [...prev.components, componentToAdd],
    }))
  }

  const handleRemoveComponent = (item: SearchSelectItem) => {
    form.setValues((prev) => ({
      ...prev,
      components: prev.components.filter((c) => c.buildId !== item.key),
    }))
  }

  return (
    <form onSubmit={form.handleSubmit}>
      <Input
        label="Имя репозитория"
        {...form.field("name")}
        icon={<FiCode />}
        placeholder="моя-библиотека-компонентов"
      />

      <SearchSelect
        label="Компоненты"
        placeholder="Поиск компонентов..."
        items={componentItems}
        selected={selectedItems}
        onSelect={handleSelectComponent}
        onRemove={handleRemoveComponent}
        isLoading={componentsLoading}
        error={form.errors.components}
      />

      <TagInput
        label="Теги"
        options={tagOptions}
        {...form.field("tags")}
        value={form.values.tags}
        onChange={(next) =>
          form.setValues((prev) => ({
            ...prev,
            tags: next as RepoTag[],
          }))
        }
        placeholder="начните вводить..."
      />

      <Textarea
        label="Описание"
        {...form.field("description")}
        icon={<FiFileText />}
        placeholder="Коллекция полезных UI компонентов для React"
      />

      <FormError message={form.submitError} />

      <Button
        type="submit"
        disabled={form.isSubmitting}
        loading={isLoading}
        loadingText="Создаем репозиторий..."
        nonBlock
      >
        Создать репозиторий
      </Button>
    </form>
  )
}
