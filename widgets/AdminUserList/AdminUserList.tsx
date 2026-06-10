import { useState } from "react";
import { Link } from "react-router";
import { type UserPublicDto } from "@entities/auth";
import { BanUserModal } from "@features/BanUserModal";
import { ListWrapSection } from "@shared/ui/ListWrapSection";
import { Button } from "@shared/ui/Button";
import { Input, Select } from "@shared/ui/Inputs";
import { useCursorPagination } from "@shared/hooks/useCursorPagination";
import { LoadMoreButton } from "@shared/ui/LoadMoreButton";
import styles from "./AdminUserList.module.scss";
import { useGetAllUsersQuery, useUnbanUserMutation } from "@entities/auth";
import { formatDate } from "@shared/lib/time";
import { ConfirmModal } from "@features/ConfirmModal";

type SortType = "asc" | "desc";
type BanFilter = "" | "banned" | "active";

export const AdminUserList = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortType>("desc");
  const [banFilter, setBanFilter] = useState<BanFilter>("");
  const limit = 10;

  const { cursor, loadMore, isFirstPage } = useCursorPagination({
    limit,
    resetOn: [search, sort],
  });

  const { data, isLoading, isError, isFetching } = useGetAllUsersQuery({
    skip: cursor.skip,
    limit,
    startDate: cursor.startDate,
    search: search || undefined,
    sort,
  });

  const [unbanUser, { isLoading: isUnbanning }] = useUnbanUserMutation();

  const [banTarget, setBanTarget] = useState<string | null>(null);
  const [unbanTarget, setUnbanTarget] = useState<string | null>(null);
  const [adminTarget, setAdminTarget] = useState<string | null>(null);

  const users = data?.result?.data || [];
  const itemsLeft = data?.result?.itemsLeft ?? 0;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value as SortType);
  };

  const handleBanFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBanFilter(e.target.value as BanFilter);
  };

  const sortOptions = [
    { value: "desc", label: "Сначала новые" },
    { value: "asc", label: "Сначала старые" },
  ];

  const banFilterOptions = [
    { value: "", label: "Все пользователи" },
    { value: "active", label: "Только активные" },
    { value: "banned", label: "Только забанненные" },
  ];

  const visibleUsers = banFilter === ""
    ? users
    : users.filter((u) => banFilter === "banned" ? u.isBanned : !u.isBanned);

  const handleUnban = async (userId: string) => {
    setUnbanTarget(userId);
    try {
      await unbanUser({ userId }).unwrap();
    } finally {
      setUnbanTarget(null);
    }
  };

  const handleMakeAdmin = () => {
    // TODO: вызов мутации назначения админом
    console.log("Назначен админом:", adminTarget);
    setAdminTarget(null);
  };

  return (
    <>
      <ListWrapSection
        title="управление пользователями"
        isLoading={isLoading && isFirstPage}
        isError={isError}
        isEmpty={visibleUsers.length === 0 && !isLoading}
        emptyMessage="Пользователи не найдены"
        errorMessage="Не удалось загрузить список пользователей"
        totalCount={visibleUsers.length}
        skeletonCount={8}
        filters={
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Input
              type="text"
              placeholder="Поиск"
              value={search}
              onChange={handleSearchChange}
              label="Поиск по имени"
            />
            <Select
              value={sort}
              onChange={handleSortChange}
              options={sortOptions}
              label="Сортировка"
            />
            <Select
              value={banFilter}
              onChange={handleBanFilterChange}
              options={banFilterOptions}
              label="Статус"
            />
          </div>
        }
      >
        <div className={styles.AdminUserList__Table}>
          <div className={styles.AdminUserList__TableHead}>
            <div className={styles.AdminUserList__Cell}>пользователь</div>
            <div className={styles.AdminUserList__Cell}>статус</div>
            <div className={styles.AdminUserList__Cell}>причина</div>
            <div className={styles.AdminUserList__Cell}>кем</div>
            <div className={styles.AdminUserList__Cell}>дата</div>
            <div className={styles.AdminUserList__Cell}>действия</div>
          </div>
          {visibleUsers.map((user: UserPublicDto) => (
            <div
              key={user.id}
              className={[
                styles.AdminUserList__TableRow,
                user.isBanned ? styles["AdminUserList__TableRow--banned"] : "",
              ].filter(Boolean).join(" ")}
            >
              <div className={styles.AdminUserList__Cell}>
                <Link to={`/profile/${user.id}`} className={styles.AdminUserList__UserLink}>
                  {user.id}
                </Link>
              </div>

              <div className={styles.AdminUserList__Cell}>
                {user.isBanned ? (
                  <span className={styles.AdminUserList__BadgeBanned}>забанен</span>
                ) : (
                  <span className={styles.AdminUserList__BadgeActive}>активен</span>
                )}
              </div>

              <div className={styles.AdminUserList__Cell}>
                <span className={styles.AdminUserList__Muted}>
                  {user.banReason ?? "—"}
                </span>
              </div>

              <div className={styles.AdminUserList__Cell}>
                <span className={styles.AdminUserList__Muted}>
                  {user.isBanned
                    ? (user.bannedBy ?? "—")
                    : (user.unbannedBy ?? "—")}
                </span>
              </div>

              <div className={styles.AdminUserList__Cell}>
                <span className={styles.AdminUserList__Muted}>
                  {user.isBanned
                    ? (user.bannedAt ? formatDate(user.bannedAt) : "—")
                    : (user.unbannedAt ? formatDate(user.unbannedAt) : "—")}
                </span>
              </div>

              <div className={styles.AdminUserList__Cell}>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {user.isBanned ? (
                    <Button
                      variant="secondary"
                      nonBlock
                      onClick={() => handleUnban(user.id)}
                      loading={isUnbanning && unbanTarget === user.id}
                      loadingText="..."
                      className={styles.AdminUserList__ActionBtn}
                    >
                      разбанить
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="cancel"
                        nonBlock
                        onClick={() => setBanTarget(user.id)}
                        className={styles.AdminUserList__ActionBtn}
                      >
                        забанить
                      </Button>
                      <Button
                        variant="secondary"
                        nonBlock
                        onClick={() => setAdminTarget(user.id)}
                        className={styles.AdminUserList__ActionBtn}
                      >
                        назначить админом
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {itemsLeft > 0 && (
          <LoadMoreButton
            itemsLeft={itemsLeft}
            isFetching={isFetching}
            onClick={() => loadMore(data?.result)}
          />
        )}
      </ListWrapSection>

      {banTarget && (
        <BanUserModal
          userId={banTarget}
          onClose={() => setBanTarget(null)}
        />
      )}

      {adminTarget && (
        <ConfirmModal
          title="Назначить админом"
          message={`Вы уверены, что хотите назначить пользователя ${adminTarget} администратором?`}
          onConfirm={handleMakeAdmin}
          onClose={() => setAdminTarget(null)}
        />
      )}
    </>
  );
};
