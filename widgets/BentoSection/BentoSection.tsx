import { BentoCard } from "@shared/ui/BentoCard"
import styled from "./BentoSection.module.scss"

export const BentoSection = () => {
  return (
    <section className={styled.BentoSection}>
      <div className={styled.BentoSection__1}>
        <BentoCard 
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="6" height="6" rx="1.5" fill="#7F77DD"></rect><rect x="10" y="2" width="6" height="6" rx="1.5" fill="#7F77DD" opacity="0.4"></rect><rect x="2" y="10" width="6" height="6" rx="1.5" fill="#7F77DD" opacity="0.4"></rect><rect x="10" y="10" width="6" height="6" rx="1.5" fill="#7F77DD" opacity="0.2"></rect></svg>
          }
          domain={"компоненты"}
          title={"просмотр и установка компонентов"}
          description={"Изучайте UI-компоненты от сообщества. Фильтруйте по фреймворку, скачивайте готовый пакет и добавляйте прямо в свой node_modules."}
          linkText={"перейти к компонентам"}
          linkTo={"/components"}
          extra={
            <div className={styled.BentoSection__TagContainer}>
              <span className={styled.BentoSection__Tag}>React</span>
              <span className={styled.BentoSection__Tag}>Vue</span>
              <span className={styled.BentoSection__Tag}>Angular</span>
            </div>
          }
        />
      </div>

      <div className={styled.BentoSection__2}>
        <BentoCard 
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2v14M2 9h14" stroke="#7F77DD" stroke-width="1.5" stroke-linecap="round"></path></svg>
          }
          domain={"публикация"}
          title={"загрузите ваш компонент"}
          description={"Поделитесь тем, что вы создали. Мы скомпилируем его в отдельный пакет — другие смогут установить его как любой npm-пакет."}
          linkText={"опубликовать компонент"}
          linkTo={"/components/create"}
          backgroundColor="#EEEDFE"
          backgroundIconColor="#ffffff"
          color="#534AB7"
        />
      </div>

      <div className={styled.BentoSection__3}>
        <BentoCard 
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="6" stroke="#1D9E75" stroke-width="1.2"></circle><path d="M6 9l2 2 4-4" stroke="#1D9E75" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          }
          domain={"сборка"}
          title={"мониторинг сборок"}
          linkText={"смотреть все сборки"}
          linkTo={"/builds"}
          backgroundIconColor="#EAF3DE"
          extra={
            <div className={styled.BentoSection__TagContainer} style={{flexDirection: "column" }}>
              <div className={`${styled.BentoSection__Tag} ${styled.BentoSection__BuildRow}`}>
                <span className={styled.BentoSection__Title}>
                  <div className={`${styled.BentoSection__BuildDot} ${styled[`BentoSection__BuildDot--gray`]}`} />
                  datepicker v2.1
                </span>
                <span style={{color: "#B4B2A9"}}>pending</span>
              </div>
              <div className={`${styled.BentoSection__Tag} ${styled.BentoSection__BuildRow}`}>
                <span className={styled.BentoSection__Title}>
                  <div className={`${styled.BentoSection__BuildDot} ${styled[`BentoSection__BuildDot--yellow`]}`} />
                  toast v0.3
                </span>
                <span style={{color: "#EF9F27"}}>in_progress</span>
              </div>
              <div className={`${styled.BentoSection__Tag} ${styled.BentoSection__BuildRow}`}>
                <span className={styled.BentoSection__Title}>
                  <div className={`${styled.BentoSection__BuildDot} ${styled[`BentoSection__BuildDot--green`]}`} />
                  button v11.7
                </span>
                <span style={{color: "#1D9E75"}}>completed</span>
              </div>
            </div>
          }
        />
      </div>

      <div className={styled.BentoSection__4}>
        <BentoCard 
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="12" rx="2" stroke="#7F77DD" stroke-width="1.2"></rect><path d="M2 7h14" stroke="#7F77DD" stroke-width="1.2"></path><path d="M6 11h6" stroke="#7F77DD" stroke-width="1.2" stroke-linecap="round"></path></svg>
          }
          domain={"репозитории"}
          title={"собирайте компоненты в сборки"}
          description={"Объединяйте связанные компоненты в один репозиторий. Скачивайте весь набор как единый пакет — устанавливайте как полноценную мини-библиотеку в свой проект. Идеально подходит для дизайн-систем и коллекций общих компонентов для команд."}          linkText={"открыть репозитории"}
          linkTo={"/repositories"}
          backgroundColor="#EEEDFE"
          backgroundIconColor="#ffffff"
          color="#534AB7"
        />
      </div>

      <div className={styled.BentoSection__5}>
        <BentoCard 
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="6" r="3" stroke="#7F77DD" stroke-width="1.2"></circle><path d="M3 15c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="#7F77DD" stroke-width="1.2" stroke-linecap="round"></path></svg>
          }
          domain={"мои компоненты"}
          title={"управление опубликованным"}
          description={"Редактируйте, обновляйте версии и отслеживайте статистику загрузок ваших опубликованных компонентов. Смотрите, как сообщество использует ваши работы."}          linkText={"open repositories"}
          linkTo={"/repositories"}
        />
      </div>

      <div className={styled.BentoSection__6}>
        <BentoCard 
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L11.5 7H16L12.5 10.5L14 15.5L9 12.5L4 15.5L5.5 10.5L2 7H6.5L9 2Z" stroke="#BA7517" stroke-width="1.2" stroke-linejoin="round"></path></svg>
          }
          domain={"популярное"}
          title={"самые скачиваемые за неделю"}
          linkText={"смотреть всё"}
          linkTo={"/components"}
          backgroundIconColor="#FAEEDA"
          extra={
            <div className={styled.BentoSection__TagContainer} style={{flexDirection: "column" }}>
              <div className={`${styled.BentoSection__Tag} ${styled.BentoSection__BuildRow}`}>
                <span className={styled.BentoSection__Title}>
                  <div className={`${styled.BentoSection__BuildDot} ${styled[`BentoSection__BuildDot--gray`]}`} />
                  CommandMenu
                </span>
              </div>
              <div className={`${styled.BentoSection__Tag} ${styled.BentoSection__BuildRow}`}>
                <span className={styled.BentoSection__Title}>
                  <div className={`${styled.BentoSection__BuildDot} ${styled[`BentoSection__BuildDot--gray`]}`} />
                  Modal
                </span>
              </div>
              <div className={`${styled.BentoSection__Tag} ${styled.BentoSection__BuildRow}`}>
                <span className={styled.BentoSection__Title}>
                  <div className={`${styled.BentoSection__BuildDot} ${styled[`BentoSection__BuildDot--gray`]}`} />
                  Form
                </span>
              </div>
            </div>
          }
        />
      </div>

      <div className={styled.BentoSection__7}>
        <BentoCard 
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4h10M4 8h7M4 12h5" stroke="#7F77DD" stroke-width="1.3" stroke-linecap="round"></path></svg>
          }
          domain={"документация"}
          title={"документация по платформе"}
          description={"Узнайте, как публиковать, собирать и устанавливать компоненты. Изучите справочник API для интеграции с CI/CD."}          linkText={"read the docs"}
          linkTo={"/docs"}
        />
      </div>

      <div className={styled.BentoSection__8}>
        <BentoCard 
          icon={
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 9l3 3 5-5" stroke="#7F77DD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          }
          domain={"начните работу"}
          title={"впервые здесь?"}
          description={"Чтобы публиковать компоненты и управлять репозиториями, вам необходимо создать свой аккаунт."}
          linkText={"попробовать"}
          linkTo={"/registration"}
          backgroundColor="#EEEDFE"
          backgroundIconColor="#ffffff"
          color="#534AB7"
        />
      </div>
    </section>
  )
}
