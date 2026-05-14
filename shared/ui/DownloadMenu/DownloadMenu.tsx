import { useState } from "react";
import { FiCopy, FiDownload, FiMoreVertical } from "react-icons/fi"
import styled from "./DownloadMenu.module.scss";

export const DownloadMenu = ({downloadUrl}: {downloadUrl: string;}) => {
  const [open, setOpen] = useState(false);
  const npmCommand = `npm i ${downloadUrl}`;
  const packageId = downloadUrl.split("/").pop();

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(npmCommand);
    setOpen(false);
  };

  return (
    <div className={styled.DownloadMenu}>
      <button
        className={styled.DownloadMenu__MenuButton}
        onClick={() => setOpen((v) => !v)}
      >
        <FiMoreVertical />
      </button>

      {open && (
        <div className={styled.DownloadMenu__MenuDropdown}>
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            download={`${packageId}.tar.gz`}
            className={styled.DownloadMenu__MenuItem}
          >
            <FiDownload />
            Установить архив
          </a>

          <button
            onClick={copyToClipboard}
            className={styled.DownloadMenu__MenuItem}
          >
            <FiCopy />
            Установить через npm
          </button>

          <div className={styled.DownloadMenu__MenuCode}>
            {npmCommand}
          </div>
        </div>
      )}
    </div>
  )
}
