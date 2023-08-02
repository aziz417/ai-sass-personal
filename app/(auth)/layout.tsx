import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react"


const AuthLayout = ({
      children
}: {
      children: ReactNode
}) => {
      return (
            <>
                  <div className="flex items-center justify-center h-full">
                        <Link href={"/"}>
                              <Button>Home</Button>

                        </Link>

                        {children}
                  </div>

            </>
      )
}

export default AuthLayout;