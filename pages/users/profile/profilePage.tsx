import { useUserInfo } from "@shared/hooks/useUserInfo";
import { OwnProfile } from "@widgets/OwnProfile";
import { PublicProfile } from "@widgets/PublicProfile";
import { useParams } from "react-router";

export const ProfilePage = () => {
  const { username } = useParams();
  const { displayName } = useUserInfo();

  const isOwn = !username || username === displayName;
  return (
    <main>
      {isOwn ? <OwnProfile /> : <PublicProfile username={username} />}
    </main>
  )
}
