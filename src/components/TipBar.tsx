import { Clock1, DoorOpen, Star } from "lucide-react";

export const TipBar = () => (
  <section className="mt-4">
    <ul className="flex items-center gap-8">
      <li className="flex items-center gap-2">
        <Star className="text-orange-500" />
        <span className="font-bold">4.5</span>
      </li>
      <li className="flex items-center gap-2">
        <DoorOpen className="text-orange-500" />
        <span className="font-bold text-green-600">Aberto</span>
      </li>
      <li className="flex items-center gap-2">
        <Clock1 className="text-orange-500" />
        <span className="font-bold">45 min</span>
      </li>
    </ul>
  </section>
)