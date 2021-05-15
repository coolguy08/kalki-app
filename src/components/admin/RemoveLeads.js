import React,{useState,useEffect} from 'react';
import {States,Map,Items} from '../../India';
import {getLeads,removeleadbyadmin} from '../../requests';
import Loading from '../Loading';
import moment from 'moment';
import Header from './Header';
//import {getLocation} from './location';

const increaseby=10;
function RemoveLeads() {
  const [counter, setcounter] = useState(0);
  const [loading, setloading] = useState(false);
  const [more, setmore] = useState(false);
  const [havemore, sethavemore] = useState(true);
  const [verified, setverified] = useState(false);

  const [state, setstate] = useState(States[0]);
  const [districts, setdistricts] = useState(Map[state]);
  const [district, setdistrict] = useState(districts[0]);
  
  //this is for the reponse comming from api
  const [items, setitems] = useState([]);

  //when districts change district
  useEffect(() => {
      setdistrict(districts[0]);
      return () => {
         // cleanup
      }
  }, [districts])

  const onStateChange=(e)=>{
      setstate(e.target.value);
      setdistricts(Map[e.target.value]);
  }

  async function loadmore()
  {
    setcounter(counter+increaseby);
    setmore(true);
    const data={state:state,city:district,start:counter+increaseby,end:increaseby,sortby:'dislikes',order:'desc'}
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



async function search()
{
    setloading(true);
    setcounter(0);
    sethavemore(true);
    const data={state:state,city:district,start:0,end:increaseby,sortby:'dislikes',order:'desc'}
    const d=await getLeads(data);
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
          <div className="input-group mb-3 lg-6">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="inputGroupSelect01">State</label>
        </div>
        <select className="custom-select"  id="inputGroupSelect01" name="state" onChange={onStateChange}> 
         
          {
            States.map((val)=>{
              return <option  selected={state===val}value={val} key={val}>{val}</option>
            })
          }
        </select>
     </div>
       }

       {
       state && <div className="input-group mb-3 lg-6">
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor="inputGroupSelect02" >Region/City</label>
      </div>
     <select className="custom-select" value={district} id="inputGroupSelect02" name="district" onChange={ondistrictChange}>
      
      {
        districts.map((val)=>{
          return <option selected={district===val} value={val} key={val}>{val}</option>
        })
      }
      </select>
      </div>
       }


        {
           <div className="search-btn">
           <button type="button" class="btn btn-primary button-fit" onClick={search}>Search</button>
          </div>
       }
      
      </div>
      
      {items && items.length>0?<Display items={items}/>:''}

      <div className="more">{items && items.length>0?more?<More/>:havemore?<a onClick={loadmore}>more</a>:'No data found':''}</div>


    
    </div>
   
  );
}


function Display(props)
{
    const [items, setitems] = useState(props.items)
    const [removing, setremoving] = useState(false);
    
    async function remove(key)
    {
        setremoving(key);
        
        const d=await removeleadbyadmin({leadid:key,token:localStorage.token});
        if(d && d.status)
        {
            setitems(items.filter(function(val){return val._id!=key}));
        }
        else
        {
            alert('error occured');
        }
        setremoving('');
        
        
    }

   
    return (
       <>
       <div className="items-container">
       <div className="row">
       {
           items.map((item)=>{
               return <Card  data={item} remove={remove}  removing={removing}/>;
           })
       }
       </div>
       </div>
       </>
    )
}


function Card(props)
{
      
    return (
        <div class="col-sm-4" id={props._id}>
        <div class="card text-center">
        
        <div class="card-body">
          <h5 class="card-title">{props.data.type}</h5>
          <h6 class="card-text">Name : {props.data.name}</h6>
          <p class="card-text">{props.data.landmark}</p>
          <p class="card-text"><a href={`tel:`+props.data.phone}>📞 {props.data.phone}</a></p>
          {props.data.paid?<p class="card-text">💸 Paid</p>:<p class="card-text">🆓 Free</p>}
          <p class="card-text">{props.data.description}</p>
          <div className="btn-grp">
          
          <button class="btn btn-danger" onClick={()=>props.remove(props.data._id)}>{props.removing==props.data._id?'Removing...':'remove'}</button>
          </div>
          
        </div>
        <div class="card-footer text-muted">
        <div className="btn-grp">
               <div>{props.data.likes} likes</div>
               <div>{props.data.dislikes} dislikes</div>
            </div>
        <br/>
          {moment(new Date(props.data.created_on)).fromNow()}
        </div>
      </div>
      </div>

    )

}
function More()
{
  return (
    <div class="spinner-border text-primary" role="status">
             <span class="sr-only">Loading...</span>
            </div>
  )
}

export default RemoveLeads;
