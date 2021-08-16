import React,{useState,useEffect} from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import {login,check_session} from '../requests';
import Alert from './Alert';
import Header from './Header';
import Loading from './Loading';
import {registerSchema} from './Validate';

function Signin() {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [role, setrole] = useState('user');
    const [res, setres] = useState({display:false});
    const [loading, setloading] = useState(true);
    const [logged_in, setlogged_in] = useState(false);
   
   const history=useHistory();

   //to check where the request come from
   useEffect(() => {
       const url=new URL(window.location.href);
       if(url.search=='?refer=1')
       {
        setres({display:true,msg:"Login First",short:'Error!',type:'danger'});
       }
       return () => {
           
       }
   }, [])
    //check session 
    useEffect(() => {
        async function fetch_data()
        {
            const d=await check_session(localStorage.token);
            if(d.is_session_valid)
            {
                setlogged_in(true);
                setrole(d.role);
                setloading(false);
            }
            else
            {
                localStorage.clear();
                setloading(false);
            }
        }
        
        if(localStorage.token)
        {
            fetch_data();
        }
        else
        {
            setloading(false);
        }

        return () => {
            //cleanup
        }
    }, [])


   const onroleChange=(e)=>{
       if(role=='user')
       {
           setrole('admin');
       }
       else
       {
           setrole('user');
       }
       
   }

    async function submit()
    {


        const valid=registerSchema.isValidSync({email,password});
        if(!valid)//if not valid
        {
            try {
                await registerSchema.validate({email,password});
            } catch (err) {
                console.log(err.message);
                setres({display:true,msg:err.message,short:'Error!',type:'danger'});
            }
          return
        }

        setloading(true);
        const d=await login(email,password,role);
        
        if(d.logged_in===false || d.logged_in==undefined) 
        {
            setres({display:true,msg:d==''?'No Internet':d.msg,short:'Error!',type:'danger'});
            
        }
        localStorage.token=d.token;
        setlogged_in(d.logged_in);
        setloading(false);
    }



    if(loading)//data is fetching
    {
        return <><Header/><Loading/></>;
    }

    if(logged_in)//if user is logged in
    {
        if(role=='admin')
        {
            return  <Redirect to='/admin' />
        }
        else
        {
            return <Redirect to='/dashboard' />
            
        }

    }

    return (
        <>
        <Header/>
        <div className="login-container">

            {
                
             res.display && <Alert  time={4000} setdisplay={setres} {...res}/>
            }

<center>
             <div className="paid">
                <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="customSwitch1" checked={role=='user'?false:true} onChange={onroleChange}/>
                <label class="custom-control-label" for="customSwitch1">Admin</label>
                </div>
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Email</span>
                </div>
                <input type="email" value={email}onChange={(e)=>{setemail(e.target.value)}} class="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1" required/>
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Password</span>
                </div>
                <input type="password" value={password} onChange={(e)=>{setpassword(e.target.value)}} class="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            
            
            <button type="button" class="btn btn-primary button-fit" onClick={submit}>Login</button>
            
            <br/>
            <br/>
            
            <a onClick={()=>history.push("/register")} className="havelead">Register?</a>
            </center>
            
        </div>
        </>
    )
}

export default Signin;
