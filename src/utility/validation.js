const validate = (val, rules, connectedValue) =>{
  
  let isValid = true; 

  for (let rule in rules){
    switch(rule){
      case 'isEmail':
        isValid =  isValid && emailValidator(val)
        break;
      case 'minLength':
        isValid =  isValid && minLengthValidator(val, rules[rule])
        break;
      case 'equalTo':
        isValid =  isValid && equalToValidator(val, connectedValue[rule])
        break;
      case 'noPlace':
        isValid = isValid && emptyString(val)
        break
      default: 
        isValid = true
    }
  }
  return isValid;
}

const emailValidator = email =>{
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    email
  );
}

const minLengthValidator = (val, minLength) =>{
  return val.length >= minLength 
}

const equalToValidator = (val, checkValue) =>{  
   return val === checkValue
}

const emptyString = (val) =>{
  return val.trim() !== ""
}

export default validate;