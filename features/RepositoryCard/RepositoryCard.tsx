import type { RepositoryDto } from "@entities/repository";
import moment from "moment";
import styles from "./RepositoryCard.module.scss";
import { Link, useNavigate } from "react-router";

export const RepositoryCard = ({ repo }: { repo: RepositoryDto }) => {
  const navigate = useNavigate();

  const isPublic = true;
  const statusBadge = isPublic ? "public" : "private";

  return (
    <article
      className={styles.RepositoryCard}
      onClick={() => navigate(`/repository/${repo.id}`)}
    >
      <span className={styles.RepoIcon}>📦</span>
      <Link
        to={`/repositories/${repo.id}`}
        onClick={(e) => e.stopPropagation()}
      >
        {repo.name}
      </Link>

      <div className={styles.RepoDetails}>{repo.description}</div>

      <div className={styles.RepoDetails}>
        {Object.entries(repo.meta).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong> {value}
          </div>
        ))}
      </div>

      <div>
        {moment(repo.updatedAt).format("DD.MM.YYYY")}
      </div>

      <span className={`${styles.RepoBadge} ${styles[statusBadge]}`}>
        {statusBadge}
      </span>
    </article>
  );
};
