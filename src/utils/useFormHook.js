import { useState } from 'react';

export default function useForm(inval) {

  const [values, setValues] = useState(inval);

  return [values, (e)=>{
    return setValues({
        ...values,
        [e.target.name]: e.target.value
      })
  }]
}