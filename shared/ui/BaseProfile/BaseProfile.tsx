import { Link } from "react-router";
import { FiGitBranch, FiBox } from "react-icons/fi";
import { UserIcon } from "@features/UserIcon";
import styles from "./BaseProfile.module.scss";
import type { ReactNode } from "react";

type Props = {
  username: string;
  badge?: ReactNode;
  subtitle?: ReactNode;
  infoRows?: ReactNode;
  actions?: ReactNode;
  extra?: ReactNode;
  stats?: ReactNode;
};

export const BaseProfile = ({
  username,
  badge,
  subtitle,
  infoRows,
  actions,
  extra,
  stats,
}: Props) => {
  return (
    <section className={styles.BaseProfile}>
      <div className={styles.BaseProfile__Card}>
        <div className={styles.BaseProfile__Header}>
          <div className={styles.BaseProfile__HeaderTop}>
            <UserIcon username={username} />
            <div>
              <h2>
                {username} <br />
                {badge}
              </h2>
              {subtitle && (
                <span className={styles.BaseProfile__Sub}>{subtitle}</span>
              )}
            </div>
          </div>

          <nav className={styles.BaseProfile__Nav}>
            <Link
              to={`/repositories/${username}`}
              className={styles.BaseProfile__NavLink}
            >
              <FiGitBranch size={12} /> репозитории
            </Link>
            <Link
              to={`/components/${username}`}
              className={styles.BaseProfile__NavLink}
            >
              <FiBox size={12} /> компоненты
            </Link>
          </nav>
        </div>

        {(infoRows || actions) && (
          <div className={styles.BaseProfile__Body}>
            {infoRows}
            {actions && (
              <div className={styles.BaseProfile__Actions}>{actions}</div>
            )}
          </div>
        )}

        {extra}

        {stats && <div className={styles.BaseProfile__Stats}>{stats}</div>}
      </div>
    </section>
  );
};
