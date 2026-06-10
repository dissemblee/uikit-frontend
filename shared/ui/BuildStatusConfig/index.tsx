import { BuildStatus } from "@shared/types/api";
import { FiCheckCircle, FiClock, FiLoader, FiXCircle } from "react-icons/fi";

export const buildStatusConfig: Record<
  BuildStatus,
  {
    icon: React.ReactNode;
    label: string;
    className: string;
  }
> = {
  [BuildStatus.PENDING]: {
    icon: <FiClock size={14} />,
    label: "Ожидание",
    className: "pending",
  },
  [BuildStatus.RUNNING]: {
    icon: <FiLoader size={14} />,
    label: "В процессе",
    className: "in_progress",
  },
  [BuildStatus.SUCCESS]: {
    icon: <FiCheckCircle size={14} />,
    label: "Завершено",
    className: "completed",
  },
  [BuildStatus.FAILED]: {
    icon: <FiXCircle size={14} />,
    label: "Ошибка",
    className: "failed",
  },
};
