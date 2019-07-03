export function doAuth(){
  return {type:'PROCESSING'};
}

export function logged(profile){
  return {type:'PROFILE',profile};
}

export function loginError(msg){
  return {type:'ERROR', msg};
}
