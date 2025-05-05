const speedObj = { value: 4 };
export const adrs=[];
export const pushadrs=(adr)=>{adrs.push(adr);}
export const getadrs=()=>{return adrs.pop()}
export let code=[] ;
export const getcode=()=>{
  return [...code];
}
export const setcode=(cd)=>{
  code=[...cd];}

export const setSpeed = (val) => {
  speedObj.value = val;
  setparam()
};
export const getSpeed = () => speedObj.value;
const param={value:0.25};
const setparam=()=>{
  if(getSpeed()==1){param.value=2}else{
    if(getSpeed()==2){param.value=1}else{
      if(getSpeed()==3){
        param.value=0.5
      }else{
        param.value=0.25
      }
    }
  }
}
export const nsp=()=>param.value;


export const code2 = ()=>{return getcode().map(line => {
  let inQuotes = false;
  let cleanLine = "";
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
      cleanLine += char;
      continue;
    }
    if (!inQuotes) {
      if (char === '#' || char === ';') break;
      if (char === '/' && line[i + 1] === '/') break;
    }
    cleanLine += char;
  }

  const tokens = cleanLine.match(/"[^"]*"|\S+/g);
  if (!tokens) return null;
  return tokens.map(t =>
    t.startsWith('"') && t.endsWith('"') ? t : t.toUpperCase()
  );
})
.filter(arr => arr !== null); }  
