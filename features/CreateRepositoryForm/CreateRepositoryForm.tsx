import { useCreateRepositoryMutation } from "@entities/repository"
import { useForm } from "@shared/hooks/useForm"
import { Button } from "@shared/ui/Button"
import { Input, TagInput, Textarea } from "@shared/ui/Inputs"
import type { RepositoryCreateDto } from "@entities/repository"
import { FiCode, FiFileText, FiSearch, FiX, FiPlus } from "react-icons/fi"
import { FormError } from "@shared/ui/FormError"
import { useGetAllComponentsQuery } from "@entities/component"
import { useState, useMemo, useRef, useEffect } from "react"
import styles from "./CreateRepositoryForm.module.scss"
import { useNavigate } from "react-router"
import { RepoTag } from "@entities/repository/dto/main.dto"

export const CreateRepositoryForm = () => {
  const [create, { isLoading, isSuccess }] = useCreateRepositoryMutation()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedComponents, setSelectedComponents] = useState<{ buildId: string; name: string; username: string }[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const tagOptions = Object.values(RepoTag)
  const { data: componentsData, isLoading: componentsLoading } = useGetAllComponentsQuery({
    skip: 0,
    limit: 100
  })

  const allComponents = componentsData?.result?.data || []

  const filteredComponents = useMemo(() => {
    if (!searchQuery.trim()) return []
    
    const query = searchQuery.toLowerCase()
    return allComponents.filter(component => {
      const componentName = component.name?.toLowerCase() || ""
      const componentId = component.id?.toLowerCase() || ""
      const username = component.username?.toLowerCase() || ""
      
      return componentName.includes(query) || 
             componentId.includes(query) || 
             username.includes(query)
    }).filter(component => !selectedComponents.some(s => s.buildId === component.buildId))
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

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      tags: [] as RepoTag[],
    },

    validate(values) {
      const errors: any = {}

      if (!values.name) errors.name = "Введите имя"
      if (!values.description) errors.description = "Введите описание"
      if (values.description.length >= 300) errors.description = "Слишком длинное описание, максимум 300 символов"
      if (selectedComponents.length === 0) errors.components = "Добавьте хотя бы один компонент"
      
      return errors
    },

    async onSubmit(values) {
      const dto: RepositoryCreateDto = {
        name: values.name,
        description: values.description,
        componentBuildIds: selectedComponents.map(c => c.buildId),
        tags: values.tags,
      }

      const result = await create(dto)

      if ('error' in result) {
        throw result.error
      }

      navigate('/repositories')
    }
  })

  const handleAddComponent = (component: typeof allComponents[0]) => {
    const buildId = component.buildId
    if (!buildId) return

    setSelectedComponents(prev => [...prev, { 
      buildId,
      name: component.name || component.id || "",
      username: component.username || "",
    }])
    setSearchQuery("")
    setIsSearchOpen(false)
  }

  const handleRemoveComponent = (buildId: string) => {
    setSelectedComponents(prev => prev.filter(c => c.buildId !== buildId))
  }

  return(
    <form onSubmit={form.handleSubmit} className={styles.Form}>
      <Input
        label="Имя репозитория"
        {...form.field("name")}
        icon={<FiCode />}
        placeholder="моя-библиотека-компонентов"
      />

      <Textarea
        label="Описание"
        {...form.field("description")}
        icon={<FiFileText />}
        placeholder="Коллекция полезных UI компонентов для React"
      />

      <TagInput
        label="Теги"
        options={tagOptions}
        value={form.values.tags}
        onChange={(next) =>
          form.setValues((prev) => ({
            ...prev,
            tags: next as RepoTag[],
          }))
        }
        placeholder="начните вводить..."
      />

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
              <div className={styles.ComponentSearch__Empty}>
                {searchQuery ? "Ничего не найдено" : "Начните вводить название компонента"}
              </div>
            ) : (
              filteredComponents.map(component => (
                <div
                  key={component.id}
                  className={styles.ComponentSearch__Result}
                  onClick={() => handleAddComponent(component)}
                >
                  <div className={styles.ComponentSearch__ResultInfo}>
                    <span className={styles.ComponentSearch__ResultName}>
                      {component.name}
                    </span>
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
        loadingText="Создаем репозиторий..." 
        nonBlock
      >
        Создать репозиторий
      </Button>
    </form>
  )
}