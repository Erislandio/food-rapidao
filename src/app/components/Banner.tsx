import Image from 'next/image'

export const Banner = () => (
  <section className='w-full mt-8'>
    <Image width={374} height={180} loading='lazy' src="/images/default-banner.png" alt="Banner da loja x" className="rounded-2xl w-full" />
    <h1 className='mt-6 mb-2'>The Dogs</h1>
    <p className='text-gray-400 font-light'>
      Bem-vindo à nossa lanchonete, onde os sabores ganham vida e os momentos se tornam memoráveis. Adentre um ambiente acolhedor, onde o aroma irresistível de hambúrgueres grelhados...
    </p>
  </section>
)