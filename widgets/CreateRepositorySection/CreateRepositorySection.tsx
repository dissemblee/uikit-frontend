import { useNavigate } from "react-router";
import styled from "./CreateRepositorySection.module.scss"
import { CreateRepositoryForm } from "@features/CreateRepositoryForm";

export const CreateRepositorySection = () => {
  const navigate = useNavigate();

  return (
    <section className={styled.CreateRepositorySection}>
      <div onClick={() => navigate(-1)} className={styled.GoBack}>
        Назад
      </div>
      <h1>Создание нового компонента</h1>
      <CreateRepositoryForm />
    </section>
  )
}