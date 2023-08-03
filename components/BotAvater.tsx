import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useUser } from "@clerk/nextjs";

const BotAvater = () => {
      const { user } = useUser()
      return (
            <div >
                  <Avatar>
                        <AvatarImage className="w-8 h-8" src={"/logo.png"} />
                        <AvatarFallback>
                              {user?.firstName?.charAt(0)}
                              {user?.lastName?.charAt(0)}
                        </AvatarFallback>
                  </Avatar>
            </div>
      )
}

export default BotAvater;