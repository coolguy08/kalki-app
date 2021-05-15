import {React,useState,useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {check_session} from './requests'
import Loading from './components/Loading'

function PrivateRoute(props) {
    const [is_logged_in, setis_logged_in] = useState(false);
    const [loading, setloading] = useState(true)

    useEffect(() => {
        async function fetchData() {
          const d=await check_session(localStorage.token,props.role)
          setis_logged_in(d.is_session_valid)
          setloading(false)
          
        }
        if(localStorage.token)
        {   
            fetchData()
        }
        else
        {
            setis_logged_in(false)
            setloading(false)
        }
        
        return () => {
         
          setloading(true);
        }
        
       
      },[props.component])


    if(loading)
    {
      return <Loading/>;
    }
    if(is_logged_in)//if user is Authentic
    {
       return <props.component/>;
    }
    else
    {
      localStorage.removeItem('token');
      return <Redirect to='/signin?refer=1'/>
    }
    
}

export default PrivateRoute
