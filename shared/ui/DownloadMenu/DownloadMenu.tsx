import { useState } from "react";
import { FiCopy, FiDownload, FiMoreVertical } from "react-icons/fi"
import styles from "./DownloadMenu.module.scss";

export const DownloadMenu = ({downloadUrl}: {downloadUrl: string;}) => {
  const [open, setOpen] = useState(false);
  const npmCommand = `npm i ${downloadUrl}`;
  const parts = downloadUrl.split("/");
  const version = parts[parts.length - 1];
  const name = parts[parts.length - 2];
  const filename = `${name}-${version}.tar.gz`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(npmCommand);
    setOpen(false);
  };

  return (
    <div className={styles.DownloadMenu}>
      <button
        className={styles.DownloadMenu__MenuButton}
        onClick={() => setOpen((v) => !v)}
      >
        <FiMoreVertical />
      </button>

      {open && (
        <div className={styles.DownloadMenu__MenuDropdown}>
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            download={filename}
            className={styles.DownloadMenu__MenuItem}
          >
            <FiDownload />
            Установить архив
          </a>

          <button
            onClick={copyToClipboard}
            className={styles.DownloadMenu__MenuItem}
          >
            <FiCopy />
            Установить через npm
          </button>

          <div className={styles.DownloadMenu__MenuCode}>
            {npmCommand}
          </div>
        </div>
      )}
    </div>
  )
}
