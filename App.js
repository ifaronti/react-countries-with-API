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

    function formSubmit(event){
        event.preventDefault()
        event.stopPropagation()
        setSearch(`name/${inputsearch}`)
    }

    let regions = 
            <div className="region_selector">
                <div onClick={()=> setSelector(prevSelector => !prevSelector)} className="select_region ">
                    <p>Filter by region</p> 
                    <p className={selector ? 'point_up pointer': 'pointer'}>^</p>
                </div>
                <div className= {selector ? 'visible_regions':  'all_regions' }>
                    <button className="region_btn" onClick={()=>setSearch('region/Africa')}>Africa</button>
                    <button className="region_btn" onClick={()=> setSearch('region/America')}>America</button>
                    <button className="region_btn" onClick={()=> setSearch('region/Asia')}>Asia</button>
                    <button className="region_btn" onClick={()=> setSearch('region/Europe')}>Europe</button>
                    <button className="region_btn" onClick={()=> setSearch('region/Oceania')}>Oceania</button>
                </div>
            </div>

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
            return index > 3 ? !name: name
        })

        return(
            <Details
            flag = {country.flags.png}
                theme ={theme}
                name ={country.name.common}
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
                    <img src={`${process.env.PUBLIC_URL}/assets/images/searchIcon.png`} alt="" />
                </form>

    return(
        <div className="container">
                <main className='header'>
                    <section className="where"><h2>Where in the world?</h2></section>
                    <section className="theme_switcher" onClick={()=>theme === 'light' ? setTheme('dark'):setTheme('light')}>
                        <img className="moon" src={`${process.env.PUBLIC_URL}/assets/images/moon.svg`} alt="half moon" />
                        <p>{theme === 'light' ? 'Dark Mode': 'Light Mode'}</p>
                    </section>
                </main>
            <div className="app">
                {page && searchCountry}
                {page && <section>{regions}</section>}
                {!page && 
                <section>
                    <button className= "backBtn" onClick={()=>setPage(true)}>Back</button>
                    {detailsPage}
                </section>
                }
                {page && <div className="earth_nations">{humanity}</div>}
            </div>
        </div>
    )
}