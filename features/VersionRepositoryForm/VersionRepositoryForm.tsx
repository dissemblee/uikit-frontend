import { useForm } from "@shared/hooks/useForm"
import { Button } from "@shared/ui/Button"
import { FiSearch, FiX, FiPlus } from "react-icons/fi"
import { FormError } from "@shared/ui/FormError"
import { useGetAllComponentsQuery } from "@entities/component"
import { useState, useMemo, useRef, useEffect } from "react"
import styles from "./CreateRepositoryForm.module.scss"
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
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedComponents, setSelectedComponents] = useState<{ buildId: string; name: string; username: string }[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const { data: componentsData, isLoading: componentsLoading } = useGetAllComponentsQuery({
    skip: 0,
    limit: 100,
  })

  const allComponents = componentsData?.result?.data || []

  useEffect(() => {
    if (!initialized && existingComponents.length > 0) {
      setSelectedComponents(
        existingComponents.map((cb: { buildId: any; name: any; username: any }) => ({
          buildId: cb.buildId,
          name: cb.name,
          username: cb.username,
        }))
      )
      setInitialized(true)
    }
  }, [existingComponents, initialized])

  const filteredComponents = useMemo(() => {
    if (!searchQuery.trim()) return []
    const query = searchQuery.toLowerCase()
    return allComponents
      .filter(c =>
        c.name?.toLowerCase().includes(query) ||
        c.username?.toLowerCase().includes(query)
      )
      .filter(c => !selectedComponents.some(s => s.buildId === c.buildId))
  }, [searchQuery, allComponents, selectedComponents])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleAddComponent = (component: typeof allComponents[0]) => {
    setSelectedComponents(prev => [...prev, {
      buildId: component.buildId!,
      name: component.name,
      username: component.username,
    }])
    setSearchQuery("")
    setIsSearchOpen(false)
  }

  const handleRemoveComponent = (buildId: string) => {
    setSelectedComponents(prev => prev.filter(c => c.buildId !== buildId))
  }

  const form = useForm({
    initialValues: {},
    validate() {
      const errors: any = {}
      if (selectedComponents.length === 0) errors.components = "Добавьте хотя бы один компонент"
      return errors
    },
    async onSubmit() {
      const dto = {
        componentBuildIds: selectedComponents.map(c => c.buildId),
      }

      const result = await newVersion({
        repoId: repo!.id,
        dto
      })

      if ('error' in result) throw result.error
      navigate(`/repositories/${username}/${name}`)
    },
  })

  if (repoLoading) return <div>Загрузка...</div>
  if (!repo) return <div>Репозиторий не найден</div>

  return (
    <form onSubmit={form.handleSubmit} className={styles.Form}>
      <div className={styles.ComponentSearch} ref={searchRef}>
        <label className={styles.ComponentSearch__Label}>
          // Компоненты
        </label>

        <div className={styles.ComponentSearch__InputWrapper}>
          <FiSearch className={styles.ComponentSearch__SearchIcon} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setIsSearchOpen(true)
            }}
            onFocus={() => setIsSearchOpen(true)}
            placeholder="Поиск компонентов..."
            className={styles.ComponentSearch__Input}
          />
        </div>
        <br />

        {isSearchOpen && searchQuery && (
          <div className={styles.ComponentSearch__Results}>
            {componentsLoading ? (
              <div className={styles.ComponentSearch__Loading}>Загрузка компонентов...</div>
            ) : filteredComponents.length === 0 ? (
              <div className={styles.ComponentSearch__Empty}>Ничего не найдено</div>
            ) : (
              filteredComponents.map(component => (
                <div
                  key={component.id}
                  className={styles.ComponentSearch__Result}
                  onClick={() => handleAddComponent(component)}
                >
                  <div className={styles.ComponentSearch__ResultInfo}>
                    <span className={styles.ComponentSearch__ResultName}>{component.name}</span>
                    <span className={styles.ComponentSearch__ResultMeta}>
                      {component.username} • {component.framework}
                    </span>
                  </div>
                  <FiPlus className={styles.ComponentSearch__AddIcon} />
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {selectedComponents.length > 0 && (
        <>
          <div className={styles.SelectedComponents}>
            <div className={styles.SelectedComponents__Title}>
              // Выбранные компоненты ({selectedComponents.length})
            </div>
            <div className={styles.SelectedComponents__List}>
              {selectedComponents.map(c => (
                <div key={c.buildId} className={styles.SelectedComponents__Item}>
                  <span className={styles.SelectedComponents__ItemName}>
                    {c.username}/{c.name}
                  </span>
                  <button
                    type="button"
                    className={styles.SelectedComponents__Remove}
                    onClick={() => handleRemoveComponent(c.buildId)}
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <br />
        </>
      )}

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
