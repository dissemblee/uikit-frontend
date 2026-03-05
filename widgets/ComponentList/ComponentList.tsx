import { Button } from "@shared/ui/Button";
import { Link } from "react-router";
import styled from "./ComponentList.module.scss";
import { ComponentCard } from "@features/ComponentCard";
import { useGetAllComponentsQuery } from "@entities/component";

export const ComponentList = () => {
  const { data, isLoading, isError } = useGetAllComponentsQuery({ perPage: 1, page: 10});

  const components =
    Array.isArray(data?.result)
      ? data.result
      : data?.result?.itemsLeft ?? [];

  if (isError) return <div>Ошибка загрузки</div>;

  if (isError) return <div>Загрузка</div>;

  return (
    <section className={styled.ComponentList}>
      <div className={styled.ComponentHead}>
        <h1>Компоненты</h1>
        <Link to="/components/create">
          <Button>Новый компонент</Button>
        </Link>
      </div>

      <div className={styled.ComponentList__Wrap}>
        {components.map(comp => (
          <ComponentCard component={comp} key={comp.id} />
        ))}
        {!components?.length && !isLoading && (
          <div>Видимо репозиториев еще нет...</div>
        )}
      </div>
    </section>
  )
}