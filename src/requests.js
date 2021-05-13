const BASE="https://kalki-api.herokuapp.com/api";
// const BASE="http://localhost:5000/api";




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
    let query=``;
    if(data.state)
    {
        query+=`state=${data.state}&`
    }
    if(data.city)
    {
        query+=`city=${data.city}&`;
    }
    if(data.type)
    {
        query+=`type=${data.type}&`;
    }
    if(data.verified!=undefined)
    {
        query+=`verified=${data.verified}&`;
    }
    if(data.paid!=undefined)
    {
        query+=`paid=${data.paid}&`
    }
    if(data.start==0 || data.start>0)
    {
        query+=`start=${data.start}&`
    }
    if(data.end)
    {
        query+=`end=${data.end}&`
    }
    if(data.sortby)
    {
        query+=`sortby=${data.sortby}&`
    }
    if(data.order)
    {
        query+=`order=${data.order}&`
    }
   


    try {
        const d=await fetch(BASE+'/getleads?'+query);
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



const verifylead=async(data)=>{
    var res = {};
    try {
        res = await getbypost('/verifylead',data);
    }
    catch (err) {
        console.log(err);
        res.error = err
    }
    return res;
}

const removeleadbyadmin=async(data)=>{
    var res = {};
    try {
        res = await getbypost('/removeleadbyadmin',data);
    }
    catch (err) {
        console.log(err);
        res.error = err
    }
    return res;
}

const removelead=async(data)=>{
    var res = {};
    try {
        res = await getbypost('/removelead',data);
    }
    catch (err) {
        console.log(err);
        res.error = err
    }
    return res;
}

const getleadsbyemail=async(data)=>{
    var res = {};
    try {
        res = await getbypost('/getleadsbyemail',data);
    }
    catch (err) {
        console.log(err);
        res.error = err
    }
    return res;
}


const like=async(key)=>{
    let res={};
    try {
        const d=await fetch(BASE+'/increaselikes?leadid='+key);
       res=await d.json();
    }
    catch (err) {
        console.log(err);
        res.error = err
    }
    return res;
}

const dislike=async(key)=>{
    let res={};
    try {
        const d=await fetch(BASE+'/increasedislikes?leadid='+key);
       res=await d.json();
    }
    catch (err) {
        console.log(err);
        res.error = err
    }
    return res;
}

const removelike=async(key)=>{
    let res={};
    try {
        const d=await fetch(BASE+'/decreaselikes?leadid='+key);
       res=await d.json();
    }
    catch (err) {
        console.log(err);
        res.error = err
    }
    return res;
}

const removedislike=async(key)=>{
    let res={};
    try {
        const d=await fetch(BASE+'/decreasedislikes?leadid='+key);
       res=await d.json();
    }
    catch (err) {
        console.log(err);
        res.error = err
    }
    return res;
}


export{
    getLeads,check_session,
    register,login,addlead,logout,verifylead,
    removelead,removeleadbyadmin,
    getleadsbyemail,
    like,dislike,removelike,removedislike
}