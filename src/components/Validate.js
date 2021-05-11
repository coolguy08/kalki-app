const yup=require('yup');

const registerSchema = yup.object().shape({

    email: yup.string().required().email(),
    password: yup.string().required().min(8).max(16),
    
  });

const LeadsSchema=yup.object().shape({

  
  phone: yup.string().required().min(10,'Invalid Phone Number').max(10,'Invalid Phone Number'),
  name: yup.string().required().min(3).max(25),
  state:yup.string().required(),
  city:yup.string().required(),
  landmark:yup.string().required()
  
});

 

export{
    registerSchema,LeadsSchema
}

