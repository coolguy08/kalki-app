import React, { useEffect ,useState} from 'react'

function Alert(props){
    const [type, settype] = useState("alert alert-dismissible fade show alert-"+props.type);
    useEffect(() => {
        
        
      const timer=  setTimeout(() => {
            props.setdisplay({display:false});
        }, props.time);
        return () => {
            clearTimeout(timer);
        }

    }, [])

    return (
        <div>
            {
                props.display && 
                <div class={type} role="alert">
            <strong>{props.short}&nbsp;</strong> {props.msg}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={()=>props.setdisplay({display:false})}>
                <span aria-hidden="true">&times;</span>
            </button>
            </div>

            }
        </div>
    )
}

export default Alert
