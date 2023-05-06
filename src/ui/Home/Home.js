import './Home.css'
import React, {useEffect, useState} from 'react'
import {api} from "../../api";

export const Home = () => {

    const [ characters, setCharacters ] = useState([])
    const [ comics, setComics ] = useState([])
    const [ filter1, setFilter1 ] = useState('')
    const [ filter2, setFilter2 ] = useState('')

    useEffect(()=>{
        const fetchCharacters = async ()=> {
            const allCharacters = await api.characters()
            const optionsCharacter = allCharacters.map(({id, name}) => ( {
                value: id,
                label: name
            }))
            setCharacters(optionsCharacter)
        }
        fetchCharacters();
    }, [])

    useEffect( () => {
        if (!filter1 || !filter2) return
        const getMatchedComics = async () =>{

            const comics1 = await api.comics(filter1)

            const comics2 = await api.comics(filter2)

            const commonComics = comics1.filter( el1 => comics2.some(el2 => el1.id === el2.id))
            setComics(commonComics);
        }
        getMatchedComics();
    }, [filter1, filter2]
)

    const onFilter1 = (filter1) => {
        setFilter1(filter1)
    }

    const onFilter2 = (filter2) => {
        setFilter2(filter2)
    }

    const clearFilters = () => {
        setFilter1('');
        setFilter2('')
        setComics([])
    }

  return (
    <main className="container">
      <Header />
      <ComicList comics={comics} characters={characters} onFilter1={ onFilter1 } onFilter2={ onFilter2 } clearFilters={clearFilters} filter1 = { filter1 } filter2 = { filter2} />
      <Footer itemsCount={comics.length} />
    </main>
  )
}

const Header = () => {
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

const ComicList = ({ comics, characters, onFilter1, onFilter2, clearFilters, filter1, filter2 }) => {
  return (
    <section>
      <p className="inputLabel">
        Selecciona una pareja de personajes
      </p>
      <div className="inputContainer">
        <Select options={ characters } onFilter={ onFilter1 } filter ={ filter1 } />
        <Select options={ characters } onFilter={ onFilter2 } filter = { filter2 }/>
        <button className="clearButton" onClick={ clearFilters }>Limpiar búsqueda</button>
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

const Footer = ({ itemsCount }) => {
  return (
    <footer>
      <p>Elementos en la lista: {itemsCount}</p>
    </footer>
  )
}

const Select = ({ options, onFilter, filter }) => {
  return (
    <select className="characterSelector" value={ filter } onChange={ e => onFilter(e.target.value) }>
      <option value="" />
      {
        options.map(option => {
          return <option key={option.value} value={option.value}>{option.label}</option>
        })
      }
    </select>
  )
}
