import React, {useState, useEffect} from "react"
import Nations from "./components/Nations"
import Details from "./components/Details"

export default function App(){
    let [search, setSearch] = useState('all')
    let [countries, setCountries] = useState([])
    let [searchParam, setSearchParam] = useState([])
    let [country, setCountry] = useState([])
    let [inputsearch, setInputSearch] = useState('')
    let [theme, setTheme] = useState(()=> {
       return JSON.parse(localStorage.getItem('theme'))|| 'light'
    })
    let [selector, setSelector] = useState(false)
    let [page, setPage] = useState(true)

    useEffect(()=> {
        fetch(`https://restcountries.com/v3.1/all`)
            .then(res => {
                return res.json()
            })
            .then(data => setCountries(data))
    },[])

    useEffect(()=> {
        fetch(`https://restcountries.com/v3.1/${search}`)
            .then(res => {
                return res.json()
            })
            .then(data => setSearchParam(data))
    },[search])

    useEffect(()=>{
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', JSON.stringify(theme))
    }, [theme])

    function showDetails(id){
       countries.map(count => {
        return count.cca2 === id ? (setPage(false), setCountry([count])): '' 
         })
    }

    function handleChange(event){
        let{value} = event.target
        setInputSearch(value)
    }

    let themeSvg = 
            <section className="moon">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="26" 
                    height="26">
                        <path 
                            fill={theme === 'light' ? "#676767": 'white'}
                            fill-rule="evenodd" 
                            d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
                        />
                </svg>
            </section>

    let leftSvg = 
        <section className="left">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="26" 
                height="20" 
                fill={theme === 'light' ? 'black':'white'} 
                class="bi bi-arrow-left" viewBox="1 1 12 12">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>

        </section>
    
    function formSubmit(event){
        event.preventDefault()
        event.stopPropagation()
        setSearch(`name/${inputsearch}`)
    }

    let regions = 
            <section className="region_selector">
                <section onClick={()=> setSelector(prevSelector => !prevSelector)} className="select_region ">
                    <p>Filter by region</p> 
                    <p className={selector ? 'point_up pointer': 'pointer'}>^</p>
                </section>
                <section className= {selector ? 'visible_regions':  'all_regions' }>
                    <button className="region_btn" onClick={()=>setSearch('region/Africa')}>Africa</button>
                    <button className="region_btn" onClick={()=> setSearch('region/America')}>America</button>
                    <button className="region_btn" onClick={()=> setSearch('region/Asia')}>Asia</button>
                    <button className="region_btn" onClick={()=> setSearch('region/Europe')}>Europe</button>
                    <button className="region_btn" onClick={()=> setSearch('region/Oceania')}>Oceania</button>
                </section>
            </section>

    let humanity = searchParam.map(country => {
        return (
            <Nations
                key = {country.name.common}
                flag = {country.flags.png}
                name = {country.name.common}
                population = {country.population}
                region = {country.region}
                capital = {country.capital}
                theme ={theme}
                showDetails = {showDetails}
                id = {country.cca2}
            />
        )
    })

    let detailsPage = 
    country.map(country => {
        let currency = Object.values(country.currencies).map(currency => {
            return currency.name
        })

        let borders = country.borders ? country.borders:['No Borders']

        let showBorders = countries.map(country => {
            let theBorders = []
            borders.map(border =>{
                return country.cca3 === border ? theBorders.push(<button className={theme === 'light' ? 'borderBtn':'borderBtn borderlessBtn'} onClick={()=> setCountry([country])}>{country.name.common}</button>): []
            })
            return theBorders
        })

        let languages = Object.values(country.languages).join(', ')

        let nativeName = Object.values(country.name.nativeName).map(name => {
            return name.common
        })

        let natives = nativeName.filter((name, index) => {
            return index > 2 ? !name: name
        })

        return(
            <Details
                flag = {country.flags.png}
                theme ={theme}
                name ={country.name.official}
                nativeName ={(natives).join(', ')}
                population = {country.population}
                region = {country.region}
                subregion = {country.subregion}
                capital = {(country.capital).join(', ')}
                borders = {showBorders}
                domain ={country.tld}
                currencies= {currency.join(', ')}
                languages = {languages}
            />
        )
    })

    let searchCountry = 
                <form className='searchForm' onSubmit={formSubmit} >
                    <input 
                        type="text" 
                        value={inputsearch}
                        onChange={handleChange}
                        name="inputsearch"
                        placeholder="search for a country..."
                        className= 'input darken'
                    />
                    <img src={`${process.env.PUBLIC_URL}/assets/images/searchIcon.png`} alt="search icon" />
                </form>

    return(
            <main className="app">
                <section className='header'>
                    <section className={page ? "where":'details_where'}><h2>Where in the world?</h2></section>
                    <section className="theme_switcher" onClick={()=>theme === 'light' ? setTheme('dark'):setTheme('light')}>
                        {themeSvg}
                        <p>{theme === 'light' ? 'Dark Mode': 'Light Mode'}</p>
                    </section>
                </section>
                {page && searchCountry}
                {page && <section>{regions}</section>}
                {!page && 
                <section>
                    <button 
                        className= "backBtn" 
                        onClick={()=>setPage(true)}>
                        {leftSvg}
                        Back
                    </button>
                    {detailsPage}
                </section>
                }
                {page && <section className="earth_nations">{humanity}</section>}
            </main>
    )
}