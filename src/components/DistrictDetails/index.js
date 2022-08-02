import { Component } from "react";
import Popup from 'reactjs-popup'
import ShareGmail from "../ShareGmail";
// import './index.css'
import 'reactjs-popup/dist/index.css'
class DistrictDetails extends Component{
        state = {
            allDistrictDetails : {},
            searchStateInput: '',
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
        console.log("jsondata", jsonData)
        let districtData = jsonData?.[statename]?.districtData	
        console.log(districtData, "--------------")
        this.setState({
            allDistrictDetails: districtData
        })
    }

    onChangeSearchInput = event => {
        this.setState({
            searchStateInput: event.target.value
        })
      }

    sortStates = () =>{
        let {allDistrictDetails} = this.state
        let allArray = Object.entries(allDistrictDetails);
        let sortdata =  allArray.sort((a, b) => {
            // console.log("a", a[1].confirmed)
            // console.log("b", b[1].confirmed)
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

    // districtDet = (statename, allDistrictDetails) =>{
       
        
    //     // let b = a
    //     console.log(statename)
    //     console.log("alldistricts",typeof(allDistrictDetails), allDistrictDetails)
    //     // console.log(x)
    //     // console.log(Object.keys(a))
    //     // console.log(b.districtData)
    //     let lenObj = Object.keys(allDistrictDetails).length
    //     if(lenObj !== 0){
    //         console.log("hello")
    //         let a = allDistrictDetails[statename]
    //         console.log(a.districtData)
    //     }
        
    // }

    componentDidMount(){
         console.log(this.props.match.params)
         this.getDistrictWiseDetails() 
    }

    render(){        
        const statename = this.props.match.params.statename
        const {allDistrictDetails, searchStateInput, sort} = this.state
        console.log("all",allDistrictDetails)
        let asArray
        let searchStateResults 
        if (sort !== true){
           asArray = Object.entries(allDistrictDetails);
        // console.log("asRay", asArray)
         searchStateResults = asArray.filter( each =>
            each[0].toUpperCase().includes(searchStateInput.toUpperCase())
        )
        }else{
            searchStateResults = allDistrictDetails.filter( each =>
                each[0].toUpperCase().includes(searchStateInput.toUpperCase())
            )
        }
        
        
        // console.log(asArray)
        // console.log(districtName)
        console.log("searchresult",searchStateResults)
        
        return(
            
           <div className="state-view">
            <h1>State: {statename}</h1>
            <input
                type="search"
                onChange={this.onChangeSearchInput}
                value={searchStateInput}
            />
            {sort === false ? (<button type="button" onClick={this.sortStates}>Sort By Confirmed Cases</button>):
            (<button type="button" onClick={this.normallOrder}>Actually Order</button>)}
            
            <ul className="card-container">
            {searchStateResults && 
            <>
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
            </>
            }
            </ul>
           </div>
        )
    }
}

export default DistrictDetails