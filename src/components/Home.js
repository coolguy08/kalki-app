import React,{useState,useEffect} from 'react';
import {States,Map,Items} from '../India';
import {getLeads} from '../requests';
import DisplayItems from './DisplayItems';
import Header from './Header';
import Loading from './Loading';
//import {getLocation} from './location';

function Home() {
  const [counter, setcounter] = useState(0);
  const [loading, setloading] = useState(false);
  const [state, setstate] = useState(States[0]);
 
  const [item, setitem] = useState(Items[0]);
  const [verified, setverified] = useState(true);
  const [paid, setpaid] = useState(false);
  const [districts, setdistricts] = useState(Map[state]);
  const [district, setdistrict] = useState(districts[0]);
  
  //this is for the reponse comming from api
  const [items, setitems] = useState([]);
  


  const onStateChange=(e)=>{
      setstate(e.target.value);
      setdistricts(Map[e.target.value]);
  }
function more()
{
  setcounter(counter+10);
}
const ondistrictChange=async(e)=>{
  setdistrict(e.target.value);
}

const onitemchange=async(e)=>{
    setitem(e.target.value);
}

async function search()
{
    setloading(true);
    const data={state:state,city:district,verified:verified,paid:paid,type:item}
    const d=await getLeads(data);
    if(d)
    {
      setitems(d.data);
    }
    else
    {
      console.log("Server Error Occured");
    }
    
    
    setloading(false);
    
}

if(loading)
{

  return <Loading/>;
}

  return (
  
    <div className="App">
      <Header/>
      <div className="search">
      
       {
          <div class="input-group mb-3 lg-6">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01">State</label>
        </div>
        <select class="custom-select" id="inputGroupSelect01" name="state" onChange={onStateChange}> 
         
          {
            States.map((val)=>{
              return <option selected={state==val} value={val}>{val}</option>
            })
          }
        </select>
     </div>
       }

       {
       state && <div class="input-group mb-3 lg-6">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect02" >Region/City</label>
      </div>
     <select class="custom-select" id="inputGroupSelect02" name="district" onChange={ondistrictChange}>
      
      {
        districts.map((val)=>{
          return <option selected={district==val}value={val}>{val}</option>
        })
      }
      </select>
      </div>
       }

      {
      district && <div class="input-group mb-3 lg-6">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect02" >Looking For ?</label>
      </div>
     <select class="custom-select" id="inputGroupSelect02" name="district" onChange={onitemchange}>
      
      {
        Items.map((val)=>{
          return <option selected={val==item} value={val}>{val}</option>
        })
      }
      </select>
      </div>
       
      }

    {
    item && <div className="radio-grp"><div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={verified} onChange={()=>{setverified(!verified)}}/>
    <label class="form-check-label" for="flexSwitchCheckDefault">Verified</label>
    </div>
    <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault2" checked={paid} onChange={()=>{setpaid(!paid)}}/>
    <label class="form-check-label" for="flexSwitchCheckDefault2">Paid</label>
        </div></div>
    }


       
       {
           item && <div className="search-btn">
           <button type="button" class="btn btn-primary button-fit" onClick={search}>Search</button>
          </div>
       }
      
      </div>
      
      {items && items.length>0 && <DisplayItems items={items}/>}

      


    
    </div>
   
  );
}

export default Home;
