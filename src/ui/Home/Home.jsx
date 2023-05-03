import React, {useEffect, useState} from 'react'
import './Home.css'

import { api } from '../../api'

export const Home = () => {
    const [ filter, setFilter ] = useState('');
    const [ comics, setComics ] = useState([])

    useEffect( () => {
        const getData = async () => {
            api.allComics().then(
                res => setComics(res))
            }
        getData().catch(console.error)
    }, [] )

    /* Preguntas:
    Yo no le estoy indicando await a la llamada a la api. Sin embargo no veo diferencia en su funcionamientoo ni
    en los datos de red. Puede ser por que api.allComics ya tiene un await?
    */
/*
    useEffect(() => {
        const fetchAllComics = async () => {
            const allComics = await api.allComics()
            setComics(allComics)
        }

        fetchAllComics()
    }, [])
*/

  const filteredComics = comics.filter(comic => comic.title.toLowerCase().includes(filter.toLowerCase()))

  return (
    <main className="container">
      <Header />
      <ComicList comics={filteredComics} filter={filter} onFilter={setFilter} />
      <Footer itemsCount={filteredComics.length} />
    </main>
  )
}

export const Header = () => {
  return (
    <header>
      <h1 className="title">
        Buscador de cómics de Marvel
      </h1>
      <h2 className="subtitle">
        Este buscador encontrará los cómics en los que aparezcan los dos personajes que selecciones en el formulario
      </h2>
    </header>
  )
}

export const ComicList = ({ filter, onFilter, comics }) => {
  return (
    <section>
      <p className="inputLabel">
        Escribe un personaje en la lista
      </p>
      <div className="inputContainer">
        <input className="filterInput" onInput={e => onFilter(e.target.value)} value={filter} />
        <button className="clearButton" onClick={() => onFilter('')}>Limpiar búsqueda</button>
      </div>
      {comics.map(comic => (
        <div key={comic.id} className="comicCard">
          <p className="comicTitle">
            {comic.title}
          </p>
          <p>{comic.characters.join(', ')}</p>
        </div>
      ))}
    </section>
  )
}

export const Footer = ({ itemsCount }) => {
  return (
    <footer>
      <p>Elementos en la lista: {itemsCount}</p>
    </footer>
  )
}






