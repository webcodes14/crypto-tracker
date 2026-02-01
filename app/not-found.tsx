import Link from 'next/link'

export default function NotFound() {
  
  return (
    <div className="text-center my-12">
      <h2>Nenalezeno</h2>
      <p className="mt-2 mb-4">Nepodařilo se najít požadovaný zdroj</p>
      <Link className="border border-solid border-neutral-800 px-4 py-2 m-4 cursor-pointer hover:bg-neutral-800 transition-colors duration-300 ease-linear hover:text-white" href="/">Domů</Link>
    </div>
  )
}