import { Component } from "react";
import Popup from 'reactjs-popup'
import ShareGmail from "../ShareGmail";
import './index.css'
import 'reactjs-popup/dist/index.css'
class StateDetails extends Component{
        state = {
            stateDetails : [],
            searchStateInput: '',
            sort: false
        }

    getStateWiseDetails = async () =>{
        const stateURL = 'https://data.covid19india.org/data.json'
        const options = {
            method: 'GET'
        }

        let response = await fetch(stateURL, options)
        let jsonData = await response.json()
        this.setState({
            stateDetails: jsonData.statewise		
        })
    }

    onChangeSearchInput = event => {
        this.setState({
            searchStateInput: event.target.value
        })
      }

    sortStates = () =>{
        let {stateDetails} = this.state
        let sortdata = stateDetails.sort((a, b) => {
            return a.confirmed - b.confirmed;
        });

        this.setState({
            stateDetails:sortdata,
            sort: true
        })
    }

    normallOrder = () => {
        this.getStateWiseDetails()
        this.setState({
            sort: false
        }) 
    }

    componentDidMount(){
           this.getStateWiseDetails() 
    }

    render(){
        const {stateDetails, searchStateInput, sort} = this.state
        const searchStateResults = stateDetails.filter( each =>
            each.state.toUpperCase().includes(searchStateInput.toUpperCase())
          )
        return(
           <div className="state-view">
            <input
                type="search"
                onChange={this.onChangeSearchInput}
                value={searchStateInput}
            />
            {sort === false ? (<button type="button" onClick={this.sortStates}>Sort By Confirmed Cases</button>):
            (<button type="button" onClick={this.normallOrder}>Actually Order</button>)}
            
            <ul className="card-container">
            {searchStateResults.map( (each,i)  => {
               return( 
               <li key={i} className="list-container">
                    <h1 className="state-heading">{each.state}</h1>
                    <div className='card-inside-container'>
                        <div className="card-top">
                            <h1 className="text-content">Active Cases: {each.active}</h1>
                            <h1 className="text-content">Confirmed Cases: {each.confirmed}</h1>
                        </div>
                        <div className="card-top">
                            <h1 className="text-content">Death Cases: {each.deaths}</h1>
                            <h1 className="text-content">Recovered Cases: {each.recovered}</h1>
                        </div>
                        <Popup 
                            modal
                            trigger={
                               
                                <button type="button" className="addEmp-button">
                                    Share
                                </button>                           
                             }
                        >
                            {close => (
                                <div>
                                    <button
                                    type="button"
                                className="close-popup"
                                onClick={() => close()}
                                    >
                                    Close
                                    </button>
                                    <div>
                                        <ShareGmail/>
                                    </div>
                                </div>
                             )}
                        </Popup>
                    </div>
                </li>)
            })

            }
            </ul>
           </div>
        )
    }
}

export default StateDetails