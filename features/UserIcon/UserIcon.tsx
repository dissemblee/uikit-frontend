import type { UserDto } from "@entities/user"
import { FaUser } from "react-icons/fa"
import styled from "./UserIcon.module.scss"

export const UserIcon = ({user}: {user?: UserDto}) => {
  return (
    <article className={styled.UserIcon}>
      <FaUser />
    </article>
  )
}