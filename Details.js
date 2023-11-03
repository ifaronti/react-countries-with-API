export default function Details(props){
    return(
        <main className="wrap_main">
            <main className='details_main'>
                <img className="details_flag" src={props.flag} alt="national flag"/>
                <section key={props.name} className="native-borders">
                    <h2 className="details_official">{props.name}</h2>

                    <p><span className= 'nunya_boldish nunya_details'>Native Name</span>: {props.nativeName}</p>

                    <p><span className='nunya_boldish nunya_details'>Population</span>: {props.population}</p>

                    <p><span className='nunya_boldish nunya_details'>Region</span>: {props.region}</p>

                    <p><span className= 'nunya_boldish nunya_details'>Sub Region</span>: {props.subregion}</p>

                    <p><span className='nunya_boldish nunya_details'>Capital</span>: {props.capital}</p>
                </section>

                <section key={props.domain} className="domain-languages">
                    <p><span className= 'nunya_boldish nunya_details'>Top Level Domain</span>: {props.domain}</p>

                    <p><span className='nunya_boldish nunya_details'>Currencies</span>: {props.currencies}</p>
                    
                    <p><span className='nunya_boldish nunya_details'>Languages(s)</span>: {props.languages}</p>
                </section>
                <p className='theBorders'><span className='nunya_boldish nunya_borders'>Border Countries:</span> {props.borders}</p>
            </main>
        </main>
    )
}