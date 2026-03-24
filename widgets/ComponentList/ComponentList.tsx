import { Link } from "react-router";
import { ComponentCard } from "@features/ComponentCard";
import { useGetAllComponentsQuery } from "@entities/component";
import { ListWrapSection } from "@shared/ui/ListWrapSection";
import { ButtonCreate } from "@shared/ui/ButtonCreate";

export const ComponentList = () => {
  const { data, isLoading, isError } = useGetAllComponentsQuery({ perPage: 1, page: 10});

  const components =
    Array.isArray(data?.result)
      ? data.result
      : data?.result?.itemsLeft ?? [];

  return (
    <ListWrapSection
      title="Компоненты"
      action={
        <Link to="/components/create">
          <ButtonCreate />
        </Link>
      }
      isLoading={isLoading}
      isError={isError}
      isEmpty={components.length === 0}
      emptyMessage="Компонентов пока нет"
      errorMessage="Не удалось загрузить компоненты"
    >
      {components.map(comp => (
        <ComponentCard component={comp} key={comp.id} />
      ))}
    </ListWrapSection>
  )
}