import { Link, useLocation, useNavigate } from "react-router"
import styles from "./Header.module.scss"
import { Button } from "@shared/ui/Button";
import { FiArrowRight, FiUser } from "react-icons/fi";
import { tokenStore } from "@shared/tokenStore";
import { useEffect, useState } from "react";
import { Prompt } from "@shared/ui/Prompt/Prompt";

export const Header = () => {
  const location = useLocation();
  const [displayName, setDisplayName] = useState<string>("");

  const getCurrentPath = () => {
    const path = location.pathname;
    if (path === "/") return "~";
    
    const ruPaths: Record<string, string> = {
      "/components": "компоненты",
      "/repositories": "репозитории",
      "/builds": "сборки",
      "/docs": "документация"
    };
    
    if (ruPaths[path]) {
      return `~/${ruPaths[path]}`;
    }
    return `~${path}`;
  };

  useEffect(() => {
    const token = tokenStore.get();
    if (token) {
      try {
        const parts = token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          
          let rawUsername = payload.username || payload.userId || "User";
          
          try {
            const fixed = decodeURIComponent(escape(rawUsername));
            rawUsername = fixed;
          } catch (e) {
          }
          
          if (rawUsername.includes('Ð') || rawUsername.length > 20) {
            setDisplayName("User");
          } else {
            setDisplayName(rawUsername);
          }
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        setDisplayName("User");
      }
    }
  }, []);

  const navItems = [
    { path: "/components", label: "компоненты", command: "cd компоненты" },
    { path: "/repositories", label: "репозитории", command: "ls репозитории" },
    { path: "/builds", label: "сборки", command: "cat сборки" },
    { path: "/docs", label: "документация", command: "man документация" },
  ];

  const isAuth = !!tokenStore.get();

  return (
    <header className={styles.Header}>
      <Link to="/" className={styles.Header__Logo}>
        <Prompt path="~ uikit" />
      </Link>

      <nav className={styles.Header__Nav}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          if (isActive) {
            return (
              <div key={item.path} className={styles.Header__ActivePrompt}>
                <Prompt path={getCurrentPath()} showCursor />
              </div>
            );
          }
          
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={styles.Header__Link}
            >
              <code className={styles.Header__Command}>
                <span className={styles.Header__PromptSymbol}>$</span>
                <span className={styles.Header__CommandText}>{item.command}</span>
              </code>
            </Link>
          );
        })}
      </nav>

      <div className={styles.Header__Actions}>
        {isAuth ? (
          <Link to={`/profile/${displayName}`} className={styles.Header__Link}>
            <code className={styles.Header__UserCode}>
              <span className={styles.Header__PromptSymbol}>$</span>
              <span className={styles.Header__CommandText}>whoami</span>
              <span className={styles.Header__Output}> → {displayName}</span>
            </code>
          </Link>
        ) : (
          <Link to="/login" className={styles.Header__Link}>
            <code className={styles.Header__LoginCode}>
              <span className={styles.Header__PromptSymbol}>$</span>
              <span className={styles.Header__CommandText}>./login.sh</span>
              <FiArrowRight className={styles.Header__Arrow} />
            </code>
          </Link>
        )}
      </div>
    </header>
  )
}
