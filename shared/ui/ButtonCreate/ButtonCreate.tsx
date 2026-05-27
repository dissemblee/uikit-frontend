import { FiPlus } from "react-icons/fi"
import { Button } from "../Button/Button"

export const ButtonCreate = () => {
  return (
    <Button nonBlock variant="primary" size="md" iconLeft={<FiPlus />}>
      создать
    </Button>
  )
}
