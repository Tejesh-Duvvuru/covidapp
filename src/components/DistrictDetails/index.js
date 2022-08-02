import { Component } from "react";
// import Popup from 'reactjs-popup'
// import ShareGmail from "../ShareGmail";
import './index.css'
import 'reactjs-popup/dist/index.css'
import { Link } from "react-router-dom";
class DistrictDetails extends Component{
        state = {
            allDistrictDetails : [],
            searchDistrictInput: '',
            sort: false
        }

        getDistrictWiseDetails = async () =>{
        const stateURL = 'https://data.covid19india.org/state_district_wise.json'
        const options = {
            method: 'GET'
        }

        let response = await fetch(stateURL, options)
        let jsonData = await response.json()
        const statename = this.props.match.params.statename
        // console.log("jsondata", jsonData)
        let districtData = jsonData?.[statename]?.districtData	
        // console.log(districtData, "--------------")
        let districtDetailsArr =[]
        if(districtData !== undefined){
            districtDetailsArr = Object.entries(districtData)
        }
        this.setState({
            allDistrictDetails: districtDetailsArr
        })
    }

    onChangeSearchInput = event => {
        this.setState({
            searchDistrictInput: event.target.value
        })
      }

      sortDistricts = () =>{
        let {allDistrictDetails} = this.state
        let sortdata =  allDistrictDetails.sort((a, b) => {
            return a[1].confirmed - b[1].confirmed;
           
        });
        
        console.log("sortdata",sortdata)

        this.setState({
            allDistrictDetails:sortdata,
            sort: true
        })
    }

    normallOrder = () => {
        this.getDistrictWiseDetails()
        this.setState({
            sort: false
        }) 
    }


    componentDidMount(){
         console.log(this.props.match.params)
         this.getDistrictWiseDetails() 
    }

    render(){        
        const statename = this.props.match.params.statename
        const {allDistrictDetails, searchDistrictInput, sort} = this.state
        // console.log("all",allDistrictDetails)
        let searchStateResults =[]
        if(allDistrictDetails.length !== 0){

            searchStateResults = allDistrictDetails.filter( each =>
                each[0].toUpperCase().includes(searchDistrictInput.toUpperCase())
            )
        }
        // console.log("searchresult",searchStateResults)
        
        return(
            
           <div className="state-view">
            {allDistrictDetails.length !== 0 ? (
            <>
                <div className="district-top">
                    <h1 className="state-name">State: {statename}</h1>
                    <Link to={"/"} className="back-to-state Sort-button">Back to State</Link>
                </div>
                <input
                    type="search"
                    onChange={this.onChangeSearchInput}
                    value={searchDistrictInput}
                    placeholder="Search by District Name"
                    className="input-style"
                />
                {sort === false ? 
                (<button type="button" onClick={this.sortDistricts} className='Sort-button'>Sort By Confirmed Cases</button>):
                (<button type="button" onClick={this.normallOrder} className='Sort-button'>Actually Order</button>)}
            
            <ul className="card-container">
            {searchStateResults.map( (each,i)  => {
               return( 
               <li key={i} className="list-container">
                    <h1 className="state-heading">{each[0]}</h1>
                    <div className='card-inside-container'>
                        <div className="card-top">
                            <h1 className="text-content">Active Cases: {each[1].active}</h1>
                            <h1 className="text-content">Confirmed Cases: {each[1].confirmed}</h1>
                        </div>
                        <div className="card-top">
                            <h1 className="text-content">Death Cases: {each[1].deceased}</h1>
                            <h1 className="text-content">Recovered Cases: {each[1].recovered}</h1>
                        </div>
                        {/* <Popup 
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
                                        <ShareGmail Sharedetails={each}/>
                                    </div>
                                </div>
                             )}
                        </Popup> */}
                    </div>
                </li>)
            })
            }
            </ul>
            </>):(<h1>No Data Related to {statename}</h1>)}
           </div>
        )
    }
}

export default DistrictDetails