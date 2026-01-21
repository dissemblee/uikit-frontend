import { MOCK_REPOSITORIES } from "@entities/repository/MOCK_REPOSITORIES";
import { Button } from "@shared/ui/Button";
import { Link } from "react-router";
import styled from "./ComponentList.module.scss";
import { ComponentCard } from "@features/ComponentCard";

export const ComponentList = () => {
  const component = MOCK_REPOSITORIES;

  return (
    <section className={styled.ComponentList}>
      <h1>Компоненты</h1>
      <Link to={"/repositories/create"}><Button>Создать компонент</Button></Link>
      <div className={styled.ComponentList__Wrap}>
        {component ? ( 
          component.map((component, key) => <ComponentCard component={component} key={key} />)
        ) : (
          <>Нет данных</>
        )}
      </div>
    </section>
  )
}