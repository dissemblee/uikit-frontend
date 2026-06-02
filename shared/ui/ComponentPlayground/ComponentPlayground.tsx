import ShikiHighlighter from "react-shiki";
import styles from "./ComponentPlayground.module.scss";
import { useEffect, useRef, useState } from "react";

export const ComponentPlayground = ({buildId, text}: {buildId: string | undefined; text: string | undefined}) => {
  const [tab, setTab] = useState<"preview" | "code">("code");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'resize' && iframeRef.current) {
        iframeRef.current.style.height = `${e.data.height + 100}px`;
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  if(!buildId || !text) return null;

  return (
    <div className={styles.ComponentPlayground}>
      <div
        className={styles.ComponentPlayground__Tabs}
        onClick={() => setIsOpen((v) => !v)}
        style={{ cursor: "pointer" }}
      >
        <span className={styles.ComponentPlayground__Toggle}>
          {isOpen ? "▾" : "▸"}
        </span>
        {isOpen && (
          <>
            <span
              className={tab === "code" ? styles.ComponentPlayground__TabActive : styles.ComponentPlayground__Tab}
              onClick={(e) => { e.stopPropagation(); setTab("code"); }}
            >
              $ view --исходный код
            </span>
            <span
              className={tab === "preview" ? styles.ComponentPlayground__TabActive : styles.ComponentPlayground__Tab}
              onClick={(e) => { e.stopPropagation(); setTab("preview"); }}
            >
              $ view --предпросмотр
            </span>
          </>
        )}
        {!isOpen && (
          <span className={styles.ComponentPlayground__Tab}>
            $ view --исходный код / предпросмотр
          </span>
        )}
      </div>

      {isOpen && (
        <div className={styles.ComponentPlayground__Body}>
          {tab === "preview" && (
            <>
              {buildId && (
                <iframe
                  ref={iframeRef}
                  src={`http://localhost:8080/api/components/previews/${buildId}/page`}
                  sandbox="allow-scripts"
                  className={styles.ComponentPlayground__Preview}
                  style={{ height: 0 }}
                />
              )}
            </>
          )}
          {tab === "code" && (
            <ShikiHighlighter language={"ts"} theme="github-light" showLineNumbers>
              {text || "Source code not available"}
            </ShikiHighlighter>
          )}
        </div>
      )}
    </div>
  );
}