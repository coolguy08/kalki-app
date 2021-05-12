import React,{useState} from 'react'
import {States,Map,Items} from '../../India';
import { addlead } from "../../requests";
import Alert from '../Alert';
import Loading from '../Loading';
import {LeadsSchema} from '../Validate';
import Header from './Header';

function HaveLeads() {
    const [name, setname] = useState('');
    const [state, setstate] = useState(States[0]);
    const [phone, setphone] = useState('');
    const [item, setitem] = useState(Items[0])
    const [paid, setpaid] = useState(false)
    const [districts, setdistricts] = useState(Map[state]);
    const [city, setcity] = useState(districts[0]);
    const [res, setres] = useState({display:false})
    const [loading, setloading] = useState(false);
    const [landmark, setlandmark] = useState('');
    const [description, setdescription] = useState('');

    const onStateChange=(e)=>{
        setstate(e.target.value);
        setcity(null);
        setdistricts(Map[e.target.value]);
    }

  async function submit()
  {
    const data={name,state,city,paid,token:localStorage.token,type:item,phone,landmark,description};

    const valid=LeadsSchema.isValidSync(data);
    if(!valid)
    {
      try {
        await LeadsSchema.validate(data)
      } catch (error) {
        setres({display:true,msg:error.message,short:'Error!',type:'danger'});
      }
      return;
    }
    
    setloading(true);

    const d=await addlead(data);
    if(d.status)
    {
      setres({display:true,msg:d.msg,short:'Inserted!',type:'success'});
      setname('');
      setphone('');
      setlandmark('');
      setdescription('');
      setstate(States[0]);
    }
    else
    {
      setres({display:true,msg:d.msg,short:'Error!',type:'danger'});
    }
    
    setloading(false);
    
  }
  
  const oncityChange=async(e)=>{
    setcity(e.target.value);
  }
  
  const onitemchange=async(e)=>{
      setitem(e.target.value);
  }

  if(loading)
  {
    return <Loading/>;
  }

    return (
      <>
      <Header/>
        <div className="form-container">
            {res.display && <Alert time={5000} setdisplay={setres} {...res}/>}
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Name</span>
                </div>
                <input type="text" value={name} onChange={(e)=>{setname(e.target.value)}} class="form-control" placeholder="fullname" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Phone</span>
                </div>
                <input type="number" value={phone} onChange={(e)=>{setphone(e.target.value)}} class="form-control" placeholder="Phone" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Landmark</span>
                </div>
                <input type="text" value={landmark} onChange={(e)=>{setlandmark(e.target.value)}} class="form-control" placeholder="landmark" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Description</span>
                </div>
                <input type="text" value={description} onChange={(e)=>{setdescription(e.target.value)}} class="form-control" placeholder="description" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

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
     <select class="custom-select" id="inputGroupSelect02" name="district" onChange={oncityChange}>
      
      {
        districts.map((val)=>{
          return <option selected={city==val}value={val}>{val}</option>
        })
      }
      </select>
      </div>
       }

      {
      city && <div class="input-group mb-3 lg-6">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect02" >Providing ?</label>
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
    item && <div className="paid">
        <div class="custom-control custom-switch">
  <input type="checkbox" class="custom-control-input" id="customSwitch1" checked={paid} onChange={()=>{setpaid(!paid)}}/>
  <label class="custom-control-label" for="customSwitch1">PAID</label>
</div>
    </div>
    }


     <button type="button" class="btn btn-primary button-fit" onClick={submit}>Submit</button>

        </div>
    </>
    )
}

export default HaveLeads
