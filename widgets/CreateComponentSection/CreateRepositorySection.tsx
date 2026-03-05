import { useNavigate } from "react-router";
import styled from "./CreateComponentSection.module.scss"
import { CreateRepositoryForm } from "@features/CreateRepositoryForm";

export const CreateComponentSection = () => {
  const navigate = useNavigate();

  return (
    <section className={styled.CreateComponentSection}>
      <div onClick={() => navigate(-1)} className={styled.GoBack}>
        Назад
      </div>
      <h1>Создание нового компонента</h1>
      <CreateRepositoryForm />
    </section>
  )
}