import React,{useState,useEffect} from 'react';
import {States,Map,Items} from '../India';
import {getLeads} from '../requests';
import DisplayItems from './DisplayItems';
import Header from './Header';
import Loading from './Loading';
//import {getLocation} from './location';

const increaseby=10;

function Home() {
  const [counter, setcounter] = useState(0);
  const [loading, setloading] = useState(false);
  const [state, setstate] = useState(States[0]);
  const [more, setmore] = useState(false);
  const [havemore, sethavemore] = useState(true);
  const [all, setall] = useState(false);
 
  const [item, setitem] = useState(Items[0]);
  const [verified, setverified] = useState(false);
  const [paid, setpaid] = useState(false);
  const [districts, setdistricts] = useState(Map[state]);
  const [district, setdistrict] = useState(districts[0]);
  
  //this is for the reponse comming from api
  const [items, setitems] = useState([]);
  

const onStateChange=(e)=>{
      setstate(e.target.value);
      setdistrict(Map[e.target.value][0]);
      setdistricts(Map[e.target.value]);
  }

async function loadmore()
{
  setcounter(counter+increaseby);
  setmore(true);
  const data={state:state,city:district,verified:verified==false?undefined:true,paid:paid==false?undefined:true,type:item,start:counter+increaseby,end:increaseby,order:'desc',sortby:'likes'}
  const d=await getLeads(data);
  if(d && d.data.length==0)//if there is no data
  {
    sethavemore(false);
    setmore(false);
    return;
  }

  if(d)
  {
    let temp=items;
    for(let i=0;i<d.data.length;i++)
    {
      temp.push(d.data[i]);
    }
    setitems(temp);
  }
 
  setmore(false);

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
    setcounter(0);
    sethavemore(true);
    const data={state:state,city:district,verified:verified==false?undefined:true,paid:paid==false?undefined:true,type:item,start:0,end:increaseby,order:'desc',sortby:'likes'}
    const d=await getLeads(data);
    if(d.error)
    {
      alert('Error occured');
      setloading(false);
      return;
    }
    if(d)
    {
      setitems(d.data);
      if(d.data.length==0)
      {
        alert('No Data Found');
      }
    }
    else
    {
      alert('Server Error');
      console.log("Server Error Occured");
    }
    
    
    setloading(false);
    
}

if(loading)
{

  return <>
  <Header/>
  <Loading/>
  </>;
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
        <select class="custom-select" id="inputGroupSelect01" value={state} name="state" onChange={onStateChange}> 
         
          {
            States.map((val)=>{
              return <option key={val} value={val}>{val}</option>
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
     <select class="custom-select" id="inputGroupSelect02" value={district} name="district" onChange={ondistrictChange}>
           
      {
        districts.map((val)=>{
          return <option key={val} value={val}>{val}</option>
        })
      }
      </select>
      </div>
       }

      {
      district && <div class="input-group mb-3 lg-6">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect03" >Looking For ?</label>
      </div>
     <select class="custom-select" id="inputGroupSelect03" value={item} name="district" onChange={onitemchange}>
      
      {
        Items.map((val)=>{
          return <option  key={val} value={val}>{val}</option>
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

      <div className="more">{items && items.length>0?more?<More/>:havemore?<a onClick={loadmore}>more</a>:'No data found':''}</div>


    
    </div>
   
  );
}

function More()
{
  return (
            <div class="spinner-border text-primary" role="status">
             <span class="sr-only">Loading...</span>
            </div>
  )
}

export default Home;
