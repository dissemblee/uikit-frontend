import { FiPlus } from "react-icons/fi"
import { Button } from "../Button/Button"
import styled from "./ButtonCreate.module.scss"

export const ButtonCreate = () => {
  return (
    <Button nonBlock variant="primary" className={styled.ButtonCreate}>
      <FiPlus /> создать
    </Button>
  )
}
