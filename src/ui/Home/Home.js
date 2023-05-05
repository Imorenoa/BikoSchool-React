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
    const onFilter1 = (filter1) => {
        console.log(filter1)
        setFilter1(filter1)
    }

    const onFilter2 = (filter2) => {
        console.log(filter2)
        setFilter2(filter2)
    }

  return (
    <main className="container">
      <Header />
      <ComicList comics={[]} characters={characters} onFilter1={ onFilter1 } onFilter2={ onFilter2 } />
      <Footer itemsCount={0} />
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

const ComicList = ({ comics, characters, onFilter1, onFilter2 }) => {
    const clearFilters = () => {
        onFilter1('')
        onFilter2('')
    }

  return (
    <section>
      <p className="inputLabel">
        Selecciona una pareja de personajes
      </p>
      <div className="inputContainer">
        <Select options={ characters } onFilter={ onFilter1 } />
        <Select options={ characters } onFilter={ onFilter2 }/>
        <button className="clearButton" onClick={clearFilters}>Limpiar búsqueda</button>
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

const Select = ({ options, onFilter }) => {
  return (
    <select className="characterSelector" onChange={e => onFilter(e.target.value)}>
      <option value="" />
      {
        options.map(option => {
          return <option key={option.value} value={option.value}>{option.label}</option>
        })
      }
    </select>
  )
}
