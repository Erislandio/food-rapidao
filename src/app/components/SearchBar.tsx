export const SearchBar = () => (
  <div className="relative">
    <div className="absolute top-4 inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
      </svg>
    </div>
    <input type="search" id="default-search" className="pl-10 w-full rounded-lg bg-gray-100 border-none p-4 h-auto mt-4 placeholder:font-thin placeholder:text-sm outline-none focus:border-none" placeholder="buscar por lachonetes, restaurantes ou comidas" required />
  </div>
)