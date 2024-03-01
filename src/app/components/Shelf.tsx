import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Button from "@/components/buttons/Button";

const products = [
  {
    nome: "Hambúrguer de Frango",
    preco: 15.99,
    descricao: "Um delicioso hambúrguer feito com carne de frango grelhada, alface, tomate e molho especial."
  },
  {
    nome: "Pizza Margherita",
    preco: 19.99,
    descricao: "Uma clássica pizza italiana com molho de tomate, mussarela fresca, manjericão e azeite de oliva."
  },
  {
    nome: "Salada Caesar",
    preco: 12.99,
    descricao: "Uma refrescante salada com alface romana, croutons crocantes, queijo parmesão e molho Caesar."
  },
  {
    nome: "Sushi Misto",
    preco: 25.99,
    descricao: "Uma seleção variada de sushi incluindo nigiri, sashimi e rolos de sushi."
  },
  {
    nome: "Frango à Parmegiana",
    preco: 18.99,
    descricao: "Peito de frango empanado, coberto com molho marinara e queijo mussarela, gratinado no forno."
  },
  {
    nome: "Massa Carbonara",
    preco: 16.99,
    descricao: "Uma massa italiana clássica com bacon, ovos, queijo parmesão e pimenta preta."
  },
  {
    nome: "Taco de Camarão",
    preco: 14.99,
    descricao: "Tacos de milho macio recheados com camarão grelhado, repolho, molho de coentro e limão."
  },
  {
    nome: "Risoto de Cogumelos",
    preco: 20.99,
    descricao: "Um cremoso risoto feito com arroz arbóreo, cogumelos selvagens e queijo parmesão."
  },
  {
    nome: "Sanduíche de Carne Assada",
    preco: 13.99,
    descricao: "Fatias suculentas de carne assada, queijo suíço, picles e mostarda, servidas em pão de centeio."
  },
  {
    nome: "Sorvete de Chocolate Belga",
    preco: 7.99,
    descricao: "Sorvete cremoso de chocolate belga, perfeito para os amantes de chocolate."
  }
];

export const Shelf = () => {
  return (
    <section className="mt-12">
      <h2>Dogs</h2>
      <div className="mt-4 flex justify-center">
        <ul className="grid grid-cols-2 gap-4">
          {products.map(product => (
            <li key={product.nome} className="shadow-lg rounded-xl border border-gray-100">
              <Link className="flex flex-col justify-between h-full" href="/item/">
                <Image className="rounded-xl w-full h-full rounded-b-none" alt={product.nome} src="/images/item.png" width={150} height={150} loading="lazy" />
                <div className="p-2">
                  <h3 className="text-sm min-h-11">{product.nome}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{product.preco.toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</span>
                    <Button className="bg-orange-500 border-none rounded-full size-10">
                      <Plus className="text-white size" />
                    </Button>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}