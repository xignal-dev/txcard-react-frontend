// import environment from "../constants/environment";


export function isEmpty(value) { 
  if( value == "" || value == null || value == undefined || value == 'undefined' || ( value != null && typeof value == "object" && !Object.keys(value).length ) ) { 
    return true;
  } else { 
    return false;
  } 
};

export function sleep(ms) {
  return new Promise(resolve => {
      setTimeout(resolve, ms);
  })
}

export function randomCode(n) {
  let code = '';
  
  for (let i = 0; i < n; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
}

export function floorVolume(volume) {
  if (!isNaN(volume)) {
    let decimalized = new Decimal(volume);
    return decimalized.toFixed(0, Decimal.ROUND_UP);
  } else {
    return volume;
  }
}

export function floorPrice(price) {
  if (!isNaN(price)) {
    let decimalized = new Decimal(price);
    return decimalized.toFixed(Decimal.ROUND_UP);
  } else {
    return price;
  }
}
