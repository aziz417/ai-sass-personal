import { Button } from '@/components/ui/button'

import Link from 'next/link'

export default function Home() {
  return (<>
    <div>Landing page (unprotentad) f</div>
    <Link href={"/sign-up"}>

      <Button>Sign-Up</Button>

    </Link>
    

    <Link href={"/sign-in"}>

      <Button>Sign-In</Button>

    </Link>


  </>
  )
}
