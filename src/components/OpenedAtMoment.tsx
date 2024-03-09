import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { TipBar } from "@/components/TipBar"

export const OpenedAtMoment = () => {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-normal">Abertos no momento</h2>
        <Link className="flex text-orange-500 items-center uppercase" href="/menus">Ver Tudo
          <ChevronRight />
        </Link>
      </div>
      <ul>
        <li className="mb-8">
          <Link href="">
            <Image src="/images/default-banner.png" alt="The Dogs" width={327} height={137} className="rounded-xl w-full" />
            <h3 className="mt-2">The Dogs</h3>
            <p className="font-thin">Lachonete -  HotDog - Lanches - Porções</p>
            <TipBar />
          </Link>
        </li>
        <li className="mb-8">
          <Link href="">
            <Image src="/images/default-banner.png" alt="The Dogs" width={327} height={137} className="rounded-xl w-full" />
            <h3 className="mt-2">Issa Lanches</h3>
            <p className="font-thin">Lachonete - Lanches - Porções</p>
            <TipBar />
          </Link>
        </li>
        <li className="mb-8">
          <Link href="">
            <Image src="/images/default-banner.png" alt="The Dogs" width={327} height={137} className="rounded-xl w-full" />
            <h3 className="mt-2">Bel do pastel</h3>
            <p className="font-thin">Lachonete -  Pastel - Lanches - Porções - Salgados</p>
            <TipBar />
          </Link>
        </li>
        <li className="mb-8">
          <Link href="">
            <Image src="/images/default-banner.png" alt="The Dogs" width={327} height={137} className="rounded-xl w-full" />
            <h3 className="mt-2">The Dogs</h3>
            <p className="font-thin">Lachonete -  HotDog - Lanches - Porções</p>
            <TipBar />

          </Link>
        </li>
      </ul>
    </section>
  )
}