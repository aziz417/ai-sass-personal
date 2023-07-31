import { Button } from '@/components/ui/button'

import Image from 'next/image'
import Link from "next/link"
export default function Home() {
  return (<>
    <div>Landing page (unprotentad)</div>
    <Link href={"/sign-up"}>

      <Button>Sign-Up</Button>

    </Link>

    <Link href={"/sign-in"}>

      <Button>Sign-In</Button>

    </Link>


  </>
  )
}
