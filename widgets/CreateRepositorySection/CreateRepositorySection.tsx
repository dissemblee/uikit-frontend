import { useNavigate } from "react-router";
import styled from "./CreateRepositorySection.module.scss"
import { CreateRepositoryForm } from "@features/CreateRepositoryForm";
import { FiArrowLeft, FiGithub, FiInfo, FiStar } from "react-icons/fi";
import { useState } from "react";

export const CreateRepositorySection = () => {
  const navigate = useNavigate();
  const [showTips, setShowTips] = useState(false);

  return (
    <section className={styled.CreateRepositorySection}>
      <div className={styled.header}>
        <button onClick={() => navigate(-1)} className={styled.goBack}>
          <FiArrowLeft /> Назад
        </button>
        
        <h1>Создание нового репозитория</h1>
        
        <button 
          className={styled.infoButton}
          onClick={() => setShowTips(!showTips)}
        >
          <FiInfo />
        </button>
      </div>

      {showTips && (
        <div className={styled.tipsPanel}>
          <h3>✨ Советы по созданию репозитория</h3>
          <ul>
            <li>Используйте короткое и понятное название</li>
            <li>Добавьте подробное описание проекта</li>
            <li>Выберите подходящий фреймворк</li>
          </ul>
        </div>
      )}

      <CreateRepositoryForm />
    </section>
  )
}