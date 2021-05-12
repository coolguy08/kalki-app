import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router';
import {register} from '../requests';
import Alert from './Alert';
import Header from './Header';
import Loading from './Loading';
import {registerSchema} from './Validate';

function Register() {

    const history=useHistory();
    const [loading, setloading] = useState(false);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [repassword, setrepassword] = useState('');
    const [res, setres] = useState({display:false});

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

        if(password!=repassword)
        {
            //alert("password not matched!");
            setres({display:true,msg:'password not matched',short:'Error!',type:'danger'});
            return;
        }
         
        setloading(true);
        const d=await register(email,password);
        if(d.status)
        {
            
            setres({display:true,msg:'Registered Succesfully',short:'Hurray!',type:'success'})
            setemail('');
            setpassword('');
            setrepassword('');
            
        }
        else
        {
            setres({display:true,msg:d.msg,short:'Oops!',type:'danger'})
            
        }
        setloading(false);
    }

    if(loading)
    {
        return <Loading/>;
    }

    return (
        <>
        <Header/>
        <div className="login-container">


           {
              res.display && <Alert time={5000} setdisplay={setres} {...res} />
           }

        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Email</span>
            </div>
            <input type="email" value={email}onChange={(e)=>{setemail(e.target.value)}} class="form-control" placeholder="email" aria-label="Username" aria-describedby="basic-addon1" required/>
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Password</span>
            </div>
            <input type="password" value={password}onChange={(e)=>{setpassword(e.target.value)}} class="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">Confirm-password</span>
            </div>
            <input type="password" value={repassword}onChange={(e)=>{setrepassword(e.target.value)}} class="form-control" placeholder="password" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
       
        <button type="button" class="btn btn-primary button-fit" onClick={submit}>Submit</button>
        <br/>
        <br/>
        <center>
            <a onClick={()=>history.push("/signin")} className="havelead">
            Already have account?
            </a>
        </center>
        
    </div>
    </>
    )
}

export default Register
