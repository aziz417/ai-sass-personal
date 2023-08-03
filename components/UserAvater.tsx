import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useUser } from "@clerk/nextjs";

const UserAvater = () => {
      const { user } = useUser()
      return (
            <div >
                  <Avatar>
                        <AvatarImage src={user?.profileImageUrl} />
                        <AvatarFallback>
                              {user?.firstName?.charAt(0)}
                              {user?.lastName?.charAt(0)}
                        </AvatarFallback>
                  </Avatar>
            </div>
      )
}

export default UserAvater;