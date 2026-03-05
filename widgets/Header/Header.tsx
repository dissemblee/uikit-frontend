import { Link, useNavigate } from "react-router"
import styles from "./Header.module.scss"
import { Button } from "@shared/ui/Button";
import { FaUser } from "react-icons/fa"
import { useGetAllUsersQuery, useGetUserByIdQuery } from "@entities/user";
import { useEffect, useState } from "react";
import { UserIcon } from "@features/UserIcon";

export const Header = () => {
  const navigate = useNavigate()
  const [randomUserId, setRandomUserId] = useState<string | null>(null);
  
  const { 
    data: usersData, 
    isLoading: usersLoading,
    isSuccess: usersSuccess 
  } = useGetAllUsersQuery({page: 1, perPage: 10})
  
  console.log("usersData", usersData)

  useEffect(() => {
    if (usersSuccess && usersData?.result && usersData.result.length > 0) {
      const data = usersData.result;
      const randomIndex = Math.floor(Math.random() * data.length);
      setRandomUserId(data[randomIndex].id);
      console.log("Выбран случайный ID:", data[randomIndex].id);
    }
  }, [usersData, usersSuccess]);

  const { 
    data: currentUserData, 
    isLoading: currentUserLoading,
    isSuccess: userSuccess 
  } = useGetUserByIdQuery(randomUserId || "", {
    skip: !randomUserId 
  });
  
  console.log("currentUserData", currentUserData)
  
  const renderRightContent = () => {
    if (usersLoading) {
      return (
        <>
          <Button variant="secondary" onClick={() => navigate("/login")}>
            ВОЙТИ
          </Button>
          <Button variant="primary" onClick={() => navigate("/registration")}>
            РЕГИСТРАЦИЯ
          </Button>
        </>
      );
    }

    if (!randomUserId) {
      return (
        <>
          <Button variant="secondary" onClick={() => navigate("/login")}>
            ВОЙТИ
          </Button>
          <Button variant="primary" onClick={() => navigate("/registration")}>
            РЕГИСТРАЦИЯ
          </Button>
        </>
      );
    }

    if (currentUserLoading) {
      return <div>Загрузка...</div>;
    }

    if (userSuccess && currentUserData?.result) {
      const user = Array.isArray(currentUserData.result) 
        ? currentUserData.result[0] 
        : currentUserData.result;
      
      return (
        <Link to={`profile/${user.id}`}>
          <UserIcon user={currentUserData.result} />
        </Link>
      );
    }

    return (
      <>
        <Button variant="secondary" onClick={() => navigate("/login")}>
          ВОЙТИ
        </Button>
        <Button variant="primary" onClick={() => navigate("/registration")}>
          РЕГИСТРАЦИЯ
        </Button>
      </>
    );
  };

  return (
    <header className={styles.Header}>
      <Link to={"/"} className={styles.Header__logo}>
        <span className={styles.Header__name}>UIKIT</span>
      </Link>
      <nav className={styles.Header__nav}>
        <Link to="/components" className={styles.Header__link}>
          Компоненты
        </Link>
        <Link to="/docs" className={styles.Header__link}>
          Документация
        </Link>
      </nav>
      <div className={styles.Header__nav}>
        {renderRightContent()}
      </div>
    </header>
  )
}