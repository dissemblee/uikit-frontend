import { useForm } from "@shared/hooks/useForm"
import { Button } from "@shared/ui/Button"
import { SearchSelect, type SearchSelectItem } from "@shared/ui/Inputs"
import { FormError } from "@shared/ui/FormError"
import { useGetAllComponentsQuery } from "@entities/component"
import { useMemo, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useGetRepositoryByIdQuery, useNewVersionRepositoryMutation } from "@entities/repository"

export const VersionRepositoryForm = () => {
  const { username, name } = useParams<{ username: string; name: string }>()
  const navigate = useNavigate()

  const { data: repoData, isLoading: repoLoading } = useGetRepositoryByIdQuery({
    username: username!,
    name: name!,
  })

  const repo = repoData?.result
  const latestBuild = repo?.builds?.[0]
  const existingComponents = latestBuild?.componentBuilds ?? []

  const [newVersion, { isLoading }] = useNewVersionRepositoryMutation()
  const [initialized, setInitialized] = useState(false)

  const { data: componentsData, isLoading: componentsLoading } = useGetAllComponentsQuery({
    skip: 0,
    limit: 100,
  })

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
      components: [] as { buildId: string; name: string; username: string, version: string }[],
    },

    validate(values) {
      const errors: any = {}
      if (values.components.length === 0)
        errors.components = "Добавьте хотя бы один компонент"
      return errors
    },

    async onSubmit(values) {
      const result = await newVersion({
        repoId: repo!.id,
        dto: {
          componentBuildIds: values.components.map((c) => c.buildId),
        },
      })

      if ("error" in result) throw result.error

      navigate(`/builds/repositories/${result.data.result?.build?.id}`)
    },
  })

  useEffect(() => {
    if (!initialized && existingComponents.length > 0) {
      form.setValues({
        components: existingComponents.map((cb) => ({
          buildId: cb.buildId,
          name: cb.name,
          username: cb.username,
          version: String(cb.version),
        })),
      })
      setInitialized(true)
    }
  }, [existingComponents, initialized])

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
    if (!comp?.buildId) return

    form.setValues((prev) => ({
      ...prev,
      components: [
        ...prev.components,
        {
          buildId: comp.buildId as string,
          name: comp.name || comp.id || "",
          username: comp.username || "",
          version: String(comp.version) || "",
        },
      ],
    }))
  }

  const handleRemoveComponent = (item: SearchSelectItem) => {
    form.setValues((prev) => ({
      ...prev,
      components: prev.components.filter((c) => c.buildId !== item.key),
    }))
  }

  if (repoLoading) return <div>Загрузка...</div>
  if (!repo) return <div>Репозиторий не найден</div>

  return (
    <form onSubmit={form.handleSubmit}>
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

      <FormError message={form.submitError} />

      <Button
        type="submit"
        disabled={form.isSubmitting}
        loading={isLoading}
        loadingText="Создаём версию..."
        nonBlock
      >
        Создать версию
      </Button>
    </form>
  )
}
