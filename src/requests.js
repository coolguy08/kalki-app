const BASE="https://kalki-api.herokuapp.com/api";




async function getbypost(url,data)
{ 
  var result='';
   try
   {
    result = await fetch(BASE + url, { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(data) })
    .then(res => res.json())
    
   }
   catch(err){
     console.error(err);
   }

   return result;
  
  
}

async function getLeads(data)
{
     var res = {};
    try {
        const d=await fetch(BASE+'/getleads?'+`state=${data.state}&city=${data.city}&type=${data.type}&verified=${data.verified}&paid=${data.paid}`);
       res=await d.json();
    }
    catch (err) {
        console.log(err);
        res.error = err
    }


    //console.log(res);
    return res
    
    
    

}


const check_session = async (token,role) => {
    
    let data = {
        token: token,
        role: role
    }
    var res = {};
    try {
        res = await getbypost('/verify',data);
    }
    catch (err) {
        console.log(err);
        res.error = err
        res.is_session_valid=false;
        return res
    }



    return res

}

const register=async(email,password)=>{
    const data={
        email,password
    }
    var res = {};
    try {
        res = await getbypost('/register',data);
    }
    catch (err) {
        console.log(err);
        res.error = err
    }
    return res;

}


const login=async(email,password,role)=>{
    const data={
        email,password,role:role
    }
    var res = {};
    try {
        res = await getbypost('/login',data);
    }
    catch (err) {
        console.log(err);
        res.error = err
    }
    return res;

}

const addlead=async(data)=>
{
    var res = {};
    try {
        res = await getbypost('/addlead',data);
    }
    catch (err) {
        console.log(err);
        res.error = err
    }
    return res;


}

const logout=async(history)=>{
    
    try {
        
        getbypost('/logout',{token:localStorage.token});
        localStorage.clear();
        history.push("/signin");
        
    }
    catch (err) {
        console.log(err);
        
    }
}


export{
    getLeads,check_session,
    register,login,addlead,logout
}