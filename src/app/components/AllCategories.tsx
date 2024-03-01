import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import Button from "@/components/buttons/Button";

const options = [
  'Todos',
  'Restaurantes',
  'Lanchonetes',
  'Sorveterias',
]

export const AllCategories = () => {

  const [selected, setSelected] = useState(0)

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <h2 className="font-normal">Todas as Categorias</h2>
        <Link className="flex text-orange-500 items-center uppercase" href="/menus">Ver Tudo
          <ChevronRight />
        </Link>
      </div>
      <div className="overflow-hidden w-full">
        <section className="mt-4 overflow-hidden">
          <div className="flex items-center justify-center overflow-hidden">
            <div className="overflow-x-auto whitespace-nowrap">
              <ul className="flex flex-nowrap gap-4 overflow-visible w-fit">
                {options.map((category, index) => (
                  <li key={category} className="pb-2">
                    <Button onClick={() => setSelected(index)} className={`shadow-md focus:bg-orange-500 rounded-full pt-2 pb-2 pl-6 pr-6 hover:bg-orange-500 blockrounded-full min-w-14 text-sm font-light ${selected === index ? 'border-orange-500 bg-orange-500 text-white ' : 'border-gray-100 font-light bg-white body text-black hover:bg-orange-500'}`}>
                      {category}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
