import { useState } from "react"

import Button from "@/components/buttons/Button"

const categories = [
  'Dogs',
  'Burge',
  'Porções',
  'Molhos',
  'Bebidas'
]

export const Categories = () => {

  const [selected, setSelected] = useState(0)

  return (
    <div className="overflow-hidden w-full">
      <section className="mt-12 overflow-hidden">
        <div className="flex items-center justify-center overflow-hidden">
          <div className="overflow-x-auto whitespace-nowrap">
            <ul className="flex flex-nowrap gap-4 overflow-visible w-fit">
              {categories.map((category, index) => (
                <li key={category} className="pb-2">
                  <Button onClick={() => setSelected(index)} className={`shadow-md focus:bg-orange-500 rounded-full pt-2 pb-2 pl-6 pr-6 hover:bg-orange-500 blockrounded-full min-w-14 text-xl font-light ${selected === index ? 'border-orange-500 bg-orange-500 text-white ' : 'border-gray-100 text-xl font-light bg-white body text-black hover:bg-orange-500'}`}>
                    {category}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}