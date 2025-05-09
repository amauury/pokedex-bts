import { useState, useEffect } from 'react'
import { langResources } from './langResources'
import IndividualPokemon from './composants/individualPokemon'

interface Pokemon {
  id: number
  name: { [key: string]: string }
  weight: number
  height: number
  types: number[]
  generation: number
  image: string
  image_shiny: string
  stats: {
    hp: number
    atk: number
    def: number
    spe_atk: number
    spe_def: number
    vit: number
  }
  evolvedFrom: { [key: string]: string }
  evolvesTo: { [key: string]: string }
}

function App() {
  const [listPokemon, setListPokemon] = useState<Pokemon[]>([])
  const [listGeneration, setListGeneration] = useState<number[]>([])
  const [lang, setLang] = useState<'fr' | 'en'>('fr')
  const listSort = [
    langResources[lang].n_croissant, langResources[lang].n_decroissant, 
    langResources[lang].a_z, langResources[lang].z_a, 
    langResources[lang].poids_croissant, langResources[lang].poids_decroissant, 
    langResources[lang].taille_croissant, langResources[lang].taille_decroissant
  ]

  const [loading, setLoading] = useState<boolean>(true) 
  const [error, setError] = useState<string | null>(null) 

  const [search, setSearch] = useState<string>('')
  const [isVisible, setIsVisible] = useState<Pokemon | null>(null)

  const [filterGeneration, setFilterGeneration] = useState<string | null>(null)
  const [sortSelection, setSortSelection] = useState<string | null>(null) 

  const toggleLang = () => {
    setLang((prevLang) => (prevLang === "fr" ? "en" : "fr"))
  }

  useEffect(() => {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow" as RequestRedirect
    }

    fetch("http://127.0.0.1:5001/api/pokemon", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          setListPokemon(data.data)
          const generations = [...new Set<number>(data.data.map((pokemon: Pokemon) => pokemon.generation))]
          setListGeneration(generations)
        } else {
          throw new Error("Données invalides")
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false))
  }, [])

  const sortPokemon = (pokemonList: Pokemon[]): Pokemon[] => {
    switch (sortSelection) {
      case langResources[lang].n_croissant:
        return pokemonList.sort((a, b) => a.id - b.id)  
      case langResources[lang].a_z:
        return pokemonList.sort((a, b) => a.name[lang].localeCompare(b.name[lang]))
      case langResources[lang].z_a:
        return pokemonList.sort((a, b) => a.weight - b.weight)
      case langResources[lang].poids_croissant:
        return pokemonList.sort((a, b) => a.height - b.height)
      case langResources[lang].taille_croissant:
        return pokemonList.sort((a, b) => b.id - a.id )  
      case langResources[lang].n_decroissant:
        return pokemonList.sort((a, b) => b.name[lang].localeCompare(a.name[lang]))
      case langResources[lang].poids_decroissant:
        return pokemonList.sort((a, b) => b.weight - a.weight)
      case langResources[lang].taille_decroissant:
        return pokemonList.sort((a, b) => b.height - a.height)
      default:
        return pokemonList 
    }
  }

  const filterPokemon = listPokemon.filter((pokemon) => 
    pokemon.name[lang].toLowerCase().includes(search.toLowerCase()) &&
    (filterGeneration ? pokemon.generation === Number(filterGeneration) : true)
  )

  const sortedPokemon = sortPokemon(filterPokemon)

  return (
    <div>
      {loading && <p>Chargement en cours...</p>}
      {error && <p>Erreur : {error}</p>}
      <header className="flex flex-col items-center w-full p-4 relative">
        <img 
          src="https://pokedex.3rgo.tech/static/media/logo.8d5a42efb18b7834c118.png" 
          alt="logo" 
          className="w-40 md:w-52 mb-4" 
        />

        <button 
          onClick={toggleLang}
          className={`absolute top-4 right-4 w-9 h-7 border-2 border-white rounded bg-no-repeat bg-center bg-cover ${
            lang === 'fr' 
              ? 'bg-[url("https://pokedex.3rgo.tech/static/media/fr.0313c7eacb9633130ffb.svg")]' 
              : 'bg-[url("https://pokedex.3rgo.tech/static/media/us.bbbd9f5266841b5c49cc.svg")]'
          }`}
          aria-label="Switch Language"
        />

        <div className="w-full bg-red-400 rounded-xl p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-center">
          
          <div className="flex flex-col text-white text-sm font-medium">
            <label htmlFor="search" className="mb-1">{langResources[lang].rechercher}</label>
            <input 
              id="search"
              type="text"
              placeholder={langResources[lang].rechercher}
              className="p-2 rounded border border-white text-black"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-col text-white text-sm font-medium">
            <label htmlFor="sort" className="mb-1">{langResources[lang].tri}</label>
            <select 
              id="sort"
              name="Sort"
              value={sortSelection || ""}
              onChange={(e) => setSortSelection(e.target.value || null)}
              className="p-2 rounded border border-white text-black"
            >
              <option value="">{langResources[lang].tous}</option>
              {listSort.map((sort, index) => (
                <option key={index} value={sort}>{sort}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col text-white text-sm font-medium">
            <label htmlFor="generation" className="mb-1">{langResources[lang].generation}</label>
            <select 
              id="generation"
              name="Generation"
              value={filterGeneration || ""}
              onChange={(e) => setFilterGeneration(e.target.value || null)}
              className="p-2 rounded border border-white text-black"
            >
              <option value="">{langResources[lang].tous}</option>
              {listGeneration.map((generation, index) => (
                <option key={generation} value={generation}>{generation}</option>
              ))}
            </select>
          </div>

        </div>
      </header>

      <div className='flex gap-3 w-full flex-wrap px-15 justify-center'>
        {isVisible && (
          <IndividualPokemon 
            pokemon={isVisible}
            pokemons={listPokemon}
            types={[]}
            lang={lang}
            onClose={() => setIsVisible(null)}
          />
        )}
        {sortedPokemon.length > 0 ? 
          sortedPokemon.map((pokemon, index) => (
            <div 
              key={index} 
              className='rounded-md shadow-md bg-red-50 p-3 w-56'
              onClick={() => setIsVisible(pokemon)}
            >
              <div className='flex justify-between w-full'>
                <div>#{pokemon.id}</div>
                <div className='flex justify-center align-center rounded-full bg-red-950 text-white w-6 h-6'>{pokemon.generation}</div>
              </div>

              <div className="text-center" >
                <div className="flex justify-center" >
                  <img src={pokemon.image} alt="image pokemon" className="w-24 h-24" />
                </div>
                <div>{pokemon.name[lang]}</div>
              </div>
            </div>
          )) :
        (
          <div>{langResources[lang].aucun_resultat}</div>
        )}
      </div>

    </div>
  )
}

export default App
