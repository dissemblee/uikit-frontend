import { Link, useNavigate } from "react-router"
import styles from "./Header.module.scss"
import { useGetAllUsersQuery, useGetUserByIdQuery } from "@entities/user";
import { useEffect, useState } from "react";
import { UserIcon } from "@features/UserIcon";
import { Button } from "@shared/ui/Button";

export const Header = () => {
  const navigate = useNavigate()
  const [randomUserId, setRandomUserId] = useState<string | null>(null);

  const {
    data: usersData,
    isLoading: usersLoading,
    isSuccess: usersSuccess
  } = useGetAllUsersQuery({ page: 1, perPage: 10 })

  useEffect(() => {
    if (usersSuccess && usersData?.result && usersData.result.length > 0) {
      const data = usersData.result;
      const randomIndex = Math.floor(Math.random() * data.length);
      setRandomUserId(data[randomIndex].id);
    }
  }, [usersData, usersSuccess]);

  const {
    data: currentUserData,
    isLoading: currentUserLoading,
    isSuccess: userSuccess
  } = useGetUserByIdQuery(randomUserId || "", {
    skip: !randomUserId
  });

  const renderRight = () => {
    if (usersLoading || currentUserLoading) {
      return <div className={styles.Header__userSkeleton} />;
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
          Войти
        </Button>
        <Button onClick={() => navigate("/registration")}>
          Регистрация
        </Button>
      </>
    );
  };

  return (
    <header className={styles.Header}>
      <Link to="/">
        <b className={styles.Header__name}>UIKIT</b>
      </Link>

      <nav>
        <Link to="/components" className={styles.Header__link}>
          <b>Компоненты</b>
        </Link>
        <Link to="/docs" className={styles.Header__link}>
          <b>Документация</b>
        </Link>
      </nav>

      <div className={styles.Header__actions}>
        {renderRight()}
      </div>
    </header>
  )
}
