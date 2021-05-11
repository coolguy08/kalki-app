function getLocation() {
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
  }
  
  function showPosition(position) {
    console.log(position);
   
  }
  
  function showError(error) {
    console.log(error);
    
  }

export{
      getLocation
}