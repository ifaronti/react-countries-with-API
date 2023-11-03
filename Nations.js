export default function nation(props){
    return(
        <main onClick={()=> props.showDetails(props.id)} key={props.name.common} className= 'country_card'>
            <img className="flag" src={props.flag} alt="" />
            <section className="country_info">
                <p className='name'>{props.name}</p>

                <p id="nunya" className='population'> 

                    <span className='nunya_boldish'>Population</span>: 
                    <span className= 'nunya_light'> {props.population}</span>

                </p>

                <p id="nunya" className='region'> 

                    <span className='nunya_boldish'>Region</span>: 
                    <span className='nunya_light'> {props.region}</span>

                </p>

                <p id="nunya" className='capital'> 

                    <span className='nunya_boldish'>Capital</span>: 
                    <span className= 'nunya_light'> {props.capital}</span>

                </p>
            </section>
        </main>
    )
}