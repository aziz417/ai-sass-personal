import { Button } from "@/components/ui/button";
import { ReactNode } from "react"
import Link from "next/link"

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