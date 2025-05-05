import { generalPurposeRegister } from "./Register.js";

function TwosComplement(num,size) { //a is a string 
    let a=num.toString(2);
    let len=a.length
    for (let i = 0; i < size-len; i++) {
        a='0'+a;
    }
    if(num<0){
    let find1=false
    for (let i = a.length; i >=0; i--) {
        if(find1==true){
            if (a[i]=='1') {
                a=replaceAt(a,i,'0');
            }else{
                a=replaceAt(a,i,'1');
            }
        }
        if (a[i]==1) {
            find1=true;
        }
    } }
    return a;
}

function BinToDec(a,size) { //a is a string 
    if(a.charAt[0]==='1'){
    let find1=false
    for (let i = size-1; i >=0; i--) {
        if(find1==true){
            if (a[i]=='1') {
                a=replaceAt(a,i,'0');
            }else{
                a=replaceAt(a,i,'1');
            }
        }
        if (a[i]==1) {
            find1=true;
        }
    } }
    return parseInt(a,2);
}


//for strings to do str[index]=newChar "Which is not allowed in js "
function replaceAt(str, index, newChar) {
    function replacer(origChar, strIndex) {
        if (strIndex === index)
            return newChar;
        else
            return origChar;
    }
    return str.replace(/./g, replacer);
}

function fullzero(size,res){
    while (res.length<size) {
    res="0"+res;
    }
    return res;
}
class Alu{
     //ALU Components:
     //---------------
    Acc=new generalPurposeRegister();
    constructor(){
        this.Rual1=new generalPurposeRegister();
        this.Rual2=new generalPurposeRegister();
        
        this.Flags=['0','0','0','0','0','0','0','0'];
         //zero,signe,carry,parity,p/im,overflow,      
         //parity:number of ones in a number
         //i have 6 FlAGS
    }

       //-------------------------------      
        setFlags(i,value){
        this.Flags[i]=value;            
    }
    getFlags(i){
        return this.Flags[i];
    }
    getAllFlags(){
        return this.Flags;
    }



       //!!!! Note:
       // Flags will b modified in all methods 

       //Arithmetic Methods:
       //-------------------

       compareBinary(size) {
        let diff = '';
        let borrow = 0;
        let i = this.Rual1.value.length - 1;
        while (i >= 0) {
          const bitA = parseInt(this.Rual1.value[i]);
          const bitB = parseInt(this.Rual2.value[i]);
          let sub = bitA - bitB - borrow;
          if (sub < 0) {
            sub += 2;
            borrow = 1;
          } else {
            borrow = 0;
          }
          diff = sub.toString() + diff;
          if (i === size) {
            break;
          }
          i--;
        }
        this.Flags[0] = (parseInt(diff, 2) === 0) ? '1' : '0';
        this.Flags[1] = diff[0];
        this.Flags[2] = borrow.toString();
        const onesCount = (diff.match(/1/g) || []).length;
        this.Flags[3] = (onesCount % 2).toString();
        this.Flags[4] = diff[diff.length - 1];
        const signA = this.Rual1.getvalue()[0];
        const signB = this.Rual2.getvalue()[0];
        const signDiff = diff[0];
        this.Flags[5] = (signA !== signB && signDiff !== signA) ? '1' : '0';
      }
      

    addBinary(size) {
        let sum = '';
        let carry = 0;
        let i = this.Rual1.value.length - 1;
        while (i >= 0) {
        const bitA = i >= 0 ? parseInt(this.Rual1.value[i]) : 0;
        const bitB = i >= 0 ? parseInt(this.Rual2.value[i]) : 0;
        const bitSum = bitA + bitB + carry;
        sum = (bitSum % 2) + sum;
        carry = Math.floor(bitSum / 2);
        if (i==size) {
            break;
        }
        i--;
        } 
         // the result 
        this.Acc.value=sum;
         // Flags:
          //stadars:
         if (parseInt(this.Acc.getvalue())==0) {this.Flags[0]='1'}//zero
         this.Flags[1]=this.Acc.getvalue()[0];//signe
         this.Flags[2]=carry.toString();//carry
         let figure="1"
         this.Flags[3] = ((sum.match(new RegExp(figure, "g")) || []).length %2).toString();//parity
         this.Flags[4]=this.Acc.getvalue()[size-1];//p/imp
          //overflow
          if (this.Rual1.getvalue()[0]==this.Rual2.getvalue()[0]) {
              if (this.Rual1.getvalue()[0]!=this.Acc.getvalue()[0]) {
                  this.Flags[5]='1';
                }
            }
        }
       
        subBinary(size) {
            if (this.Rual1.value.length !== size || this.Rual2.value.length !== size) {
              throw new Error("Binary string length does not match the expected size.");
            }
          
            let onesComplement = "";
            for (let i = 0; i < size; i++) {
              onesComplement += (this.Rual2.value[i] === '0') ? '1' : '0';
            }
          
  
            let onesComplementInt = parseInt(onesComplement, 2);
            let twoComplementInt = onesComplementInt + 1;
            let twoComplementStr = twoComplementInt.toString(2);
          

            twoComplementStr = fullzero(size, twoComplementStr);
          
            // Update Rual2 with its two's complement.
            this.Rual2.setvalue(twoComplementStr);
          
            this.addBinary(size);
            let result = this.Acc.getvalue();
          

            if (this.Rual1.getvalue()[0] === twoComplementStr[0] && result[0] !== this.Rual1.getvalue()[0]) {
              this.Flags[5] = '1';
            } else {
              this.Flags[5] = '0';
            }

            this.Flags[0] = (parseInt(result, 2) === 0) ? '1' : '0';

            this.Flags[1] = result[0];

            const rual1Int = parseInt(this.Rual1.getvalue(), 2);
            const sumInt = rual1Int + parseInt(twoComplementStr, 2);
            const maxVal = 1 << size; 
            this.Flags[2] = (sumInt >= maxVal) ? '1' : '0';

            const onesCount = (result.match(/1/g) || []).length;
            this.Flags[3] = (onesCount % 2 === 0) ? '1' : '0';

            this.Flags[4] = result[size - 1];
          }
          
       
 
       binaryMultiply(size) {
         let binaryString1=(this.Rual1.getvalue()).substring(0,size);
     
         
         //two's complement  of the abs part of a     
         if(this.Rual1.getvalue()[0]=='1'){
             let i=size;
             let find1=false;
             for (let i = size; i >=0; i--) {
                 if(find1==true){
                     if (binaryString1[i]=='1') {
                         binaryString1=replaceAt(binaryString1,i,'0');
                     }else{
                         binaryString1=replaceAt(binaryString1,i,'1');
                     }
                 }
                 if (binaryString1[i]==1) {
                     find1=true;
                 }
             }
         }
         let binaryString2=this.Rual2.getvalue().substring(0,size);//verifier

     
         //two's complement  of the abs part of b  
         if(this.Rual2.getvalue()[0]=='1'){
             let i=size;
             let find1=false
             for (let i = size; i >=0; i--) {
                 if(find1==true){
                     if (binaryString2[i]=='1') {
                         binaryString2=replaceAt(binaryString2,i,'0');
                     }else{
                         binaryString2=replaceAt(binaryString2,i,'1');
                     }
                 }
                 if (binaryString2[i]==1) {
                     find1=true;
                 }
             }
         } 
         
         let int1 = parseInt(binaryString1, 2)
 
         let int2 = parseInt(binaryString2, 2)
 
         let res= (int1 * int2).toString(2);
     
         if(res.length>=16 ){res=fullzero(32,res)}
         else{ res=fullzero(16,res)}
         if (this.Rual1.getvalue()[0]==this.Rual2.getvalue()[0]) {
   
             
         }else{

             let find1=false
             for (let i = res.length; i >=0; i--) {
                 if(find1==true){
                     if (res[i]=='1') {
                         res=replaceAt(res,i,'0');
                     }else{
                         res=replaceAt(res,i,'1');
                     }
                 }
                 if (res[i]==1) {
                     find1=true;
                 }
            }
        }
        

        if(res.length>16){
            let resacc=res.substring(16,32);
            this.Acc.setvalue(resacc);
            let resr4=res.substring(0,16);
            return resr4;
        }else{
            this.Acc.setvalue(res);
        }

        //il faut regler le problem de l'overflow
        if (parseInt(this.Acc.getvalue())==0) {this.Flags[0]='1'}//zero
        this.Flags[1]=this.Acc.getvalue()[0];//signe
       //this.Flags[2]=carry.toString();//carry
        let figure="1"
        this.Flags[3] = ((this.Acc.value.match(new RegExp(figure, "g")) || []).length %2).toString();//parity
        this.Flags[4]=this.Acc.getvalue()[size-1];//p/imp
        
        if (res.length>size) {
                this.Flags[5]='1';
            }
            
    }


       DivBinary(size){
         
         let binaryString1=(this.Rual1.getvalue()).substring(1,size);

         
         //two's complement  of the abs part of a     
         if(this.Rual1.getvalue()[0]=='1'){
             let i=size;
             let find1=false;
             for (let i = size; i >=0; i--) {
                 if(find1==true){
                     if (binaryString1[i]=='1') {
                         binaryString1=replaceAt(binaryString1,i,'0');
                     }else{
                         binaryString1=replaceAt(binaryString1,i,'1');
                     }
                 }
                 if (binaryString1[i]==1) {
                     find1=true;
                 }
             }
         }
         let binaryString2=this.Rual2.getvalue().substring(1,size);

     
         //two's complement  of the abs part of b  
         if(this.Rual2.getvalue()[0]=='1'){
             let i=size;
             let find1=false
             for (let i = size; i >=0; i--) {
                 if(find1==true){
                     if (binaryString2[i]=='1') {
                         binaryString2=replaceAt(binaryString2,i,'0');
                     }else{
                         binaryString2=replaceAt(binaryString2,i,'1');
                     }
                 }
                 if (binaryString2[i]==1) {
                     find1=true;
                 }
             }
         } 
 
         let int1 = parseInt(binaryString1, 2)

         let int2 = parseInt(binaryString2, 2)

         let q= (Math.floor(int1 / int2)).toString(2);
 
         let r=(int1 % int2).toString(2)
         q=fullzero(size,q);
   
         r=fullzero(size,r);
         //positive or negativ quotient
         if (this.Rual1.getvalue()[0]==this.Rual2.getvalue()[0]) {
    
             
         }else{

             let find1=false
             for (let i =q.length; i >=0; i--) {
                 if(find1==true){
                     if (q[i]=='1') {
                         q=replaceAt(q,i,'0');
                     }else{
                         q=replaceAt(q,i,'1');
                     }
                 }
                 if (q[i]==1) {
                     find1=true;
                 }
             }
         }
           
         
         //positive or negative reste                     
 
         if(this.Rual1.getvalue()[0]=='0') {

          }else{
 
           let find1=false
           for (let i =r.length; i >=0; i--) {
               if(find1==true){
                   if (r[i]=='1') {
                       r=replaceAt(r,i,'0');
                   }else{
                       r=replaceAt(r,i,'1');
                   }
               }
               if (r[i]==1) {
                   find1=true;
               }
           } 
   
 
         }
         if (parseInt(this.Acc.getvalue())==0) {this.Flags[0]='1'}//zero
         this.Flags[1]=this.Acc.getvalue()[0];//signe
         //this.Flags[2]=carry.toString();//carry
         let figure="1"
         this.Flags[3] = ((this.Acc.value.match(new RegExp(figure, "g")) || []).length %2).toString();//parity
         this.Flags[4]=this.Acc.getvalue()[size-1];//p/imp

         
        this.Acc.setvalue(q);

        return r;
 
 
       }
 
      //Logical Methods:
      //----------------
 
       andBinary(size) {
         let res = '';
         
         for (let i = 16-size; i < 16; i++) {
           res += this.Rual1.value[i] === '1' && this.Rual2.value[i] === '1' ? '1' : '0';
         }
         
        this.Acc.value=res;
        if (parseInt(this.Acc.getvalue())==0) {this.Flags[0]='1'}//zero
         this.Flags[1]=this.Acc.getvalue()[0];//signe
        //this.Flags[2]=carry.toString();//carry
         let figure="1"
         this.Flags[3] = ((this.Acc.value.match(new RegExp(figure, "g")) || []).length %2).toString();//parity
         this.Flags[4]=this.Acc.getvalue()[size-1];//p/imp
       }
 
 
       orBinary(size) {
         let res = '';
         
         for (let i = 16-size; i < 16; i++) {
           res += this.Rual1.value[i] === '1' || this.Rual2.value[i] === '1' ? '1' : '0';
         }
         
         this.Acc.value=res;
         if (parseInt(this.Acc.getvalue())==0) {this.Flags[0]='1'}//zero
         this.Flags[1]=this.Acc.getvalue()[0];//signe
        //this.Flags[2]=carry.toString();//carry
         let figure="1"
         this.Flags[3] = ((this.Acc.value.match(new RegExp(figure, "g")) || []).length %2).toString();//parity
         this.Flags[4]=this.Acc.getvalue()[size-1];//p/imp
       }
 
    nandBinary(size) {
        let res = '';
         
         for (let i = 16-size; i < 16; i++) {
           res += this.Rual1.value[i] === '1' && this.Rual2.value[i] === '1' ? '0' : '1';
         }
         
         this.Acc.value=res;
         if (parseInt(this.Acc.getvalue())==0) {this.Flags[0]='1'}//zero
         this.Flags[1]=this.Acc.getvalue()[0];//signe
        //this.Flags[2]=carry.toString();//carry
         let figure="1"
         this.Flags[3] = ((this.Acc.value.match(new RegExp(figure, "g")) || []).length %2).toString();//parity
         this.Flags[4]=this.Acc.getvalue()[size-1];//p/imp
       }
      
       
       norBinary(size) {
         let res = '';
         
         for (let i = 16-size; i < 16; i++) {
           res += this.Rual1.value[i] === '0' && this.Rual2.value[i] === '0' ? '1' : '0';
         }
         
         this.Acc.value=res;
         if (parseInt(this.Acc.getvalue())==0) {this.Flags[0]='1'}//zero
         this.Flags[1]=this.Acc.getvalue()[0];//signe
        //this.Flags[2]=carry.toString();//carry
         let figure="1"
         this.Flags[3] = ((this.Acc.value.match(new RegExp(figure, "g")) || []).length %2).toString();//parity
         this.Flags[4]=this.Acc.getvalue()[size-1];//p/imp
       }
      
 
       xorBinary(size) {
         let res = '';
         
         for (let i = 16-size; i < 16; i++) {
           res += this.Rual1.value[i] !== this.Rual2.value[i] ? '1' : '0';
         
         }
 
         this.Acc.value=res;
         if (parseInt(this.Acc.getvalue())==0) {this.Flags[0]='1'}//zero
         this.Flags[1]=this.Acc.getvalue()[0];//signe
        //this.Flags[2]=carry.toString();//carry
         let figure="1"
         this.Flags[3] = ((this.Acc.value.match(new RegExp(figure, "g")) || []).length %2).toString();//parity
         this.Flags[4]=this.Acc.getvalue()[size-1];//p/imp
       }
        
       //specific operations :
 
       ROL(size){
         let result1;
         let result2;
         let result;
         let carry=0;
         result1=this.Rual1.getvalue().substring(1,size);
           result2=this.Rual1.getvalue().charAt(0);
           result=result1+result2;
           carry=result2//FLAG Carry
           
           this.Acc.setvalue(result);
           if (parseInt(this.Acc.getvalue())==0) {this.Flags[0]='1'}//zero
         this.Flags[1]=this.Acc.getvalue()[0];//signe
        this.Flags[2]=carry.toString();//carry
         let figure="1"
         this.Flags[3] = ((this.Acc.value.match(new RegExp(figure, "g")) || []).length %2).toString();//parity
         this.Flags[4]=this.Acc.getvalue()[size-1];//p/imp
       }
 
       ROR(size){
         let result1;
         let result2;
         let result;
         let carry=0;
         result1=this.Rual1.getvalue().substring(0,size-1);
           result2=this.Rual1.getvalue().charAt(size-1);
           result=result2+result1;
         carry=result2//FLAG Carry
         this.Acc.setvalue(result);
         if (parseInt(this.Acc.getvalue())==0) {this.Flags[0]='1'}//zero
         this.Flags[1]=this.Acc.getvalue()[0];//signe
        this.Flags[2]=carry.toString();//carry
         let figure="1"
         this.Flags[3] = ((this.Acc.value.match(new RegExp(figure, "g")) || []).length %2).toString();//parity
         this.Flags[4]=this.Acc.getvalue()[size-1];//p/imp
       }
    SHL(size){
        let result1;
        let result;
        let carry=0;
        result1=this.Rual1.getvalue().substring(1,size);
        carry=this.Rual1.getvalue().charAt(0);//FLAG Carry
        result=result1+'0';
        
        this.Acc.setvalue(result);
        if (parseInt(this.Acc.getvalue())==0) {this.Flags[0]='1'}//zero
        this.Flags[1]=this.Acc.getvalue()[0];//signe
        this.Flags[2]=carry.toString();//carry
        let figure="1"
        this.Flags[3] = ((this.Acc.value.match(new RegExp(figure, "g")) || []).length %2).toString();//parity
        this.Flags[4]=this.Acc.getvalue()[size-1];//p/imp
    }
    SHR(size){
        let result1;
        let result;
        let carry=0;
        result1=this.Rual1.getvalue().substring(0,size-1);
        result='0'+result1;
        carry='0';
        this.Acc.setvalue(result);
        if (parseInt(this.Acc.getvalue())==0) {this.Flags[0]='1'}//zero
        this.Flags[1]=this.Acc.getvalue()[0];//signe
        this.Flags[2]=carry.toString();//carry
        let figure="1"
        this.Flags[3] = ((this.Acc.value.match(new RegExp(figure, "g")) || []).length %2).toString();//parity
        this.Flags[4]=this.Acc.getvalue()[size-1];//p/imp
    }
    NOT(size){
        let result="";
        for (let i = 16-size; i < 16; i++) {
            if(this.Rual1.getvalue().charAt(i)==='0'){
                result=result+'1';
            }else{
                result=result+'0'
            }
        }
        if(size===16){
            this.Acc.setvalue(result);
        }else{
            this.Acc.setright(result);
        }
        if (parseInt(this.Acc.getvalue())==0) {this.Flags[0]='1'}//zero
        this.Flags[1]=this.Acc.getvalue()[0];//signe
        let figure="1"
        this.Flags[3] = ((this.Acc.value.match(new RegExp(figure, "g")) || []).length %2).toString();//parity
        this.Flags[4]=this.Acc.getvalue()[size-1];//p/imp
    }
    NEG(size){
        let num=0;
        if(size===8){
            num=BinToDec(this.Rual1.getright(),8);
            num=-num;
        }else if(size===16){
            num=BinToDec(this.Rual1.getvalue(),16);
            num=-num;
        }
        if(size===16){
            this.Acc.setvalue(TwosComplement(num,16));
        }else{
            this.Acc.setright(TwosComplement(num,8));
        }
        if (parseInt(this.Acc.getvalue())==0) {this.Flags[0]='1'}//zero
        this.Flags[1]=this.Acc.getvalue()[0];//signe
        let figure="1"
        this.Flags[3] = ((this.Acc.value.match(new RegExp(figure, "g")) || []).length %2).toString();//parity
        this.Flags[4]=this.Acc.getvalue()[size-1];//p/imp
    }

}

export default Alu;
export {TwosComplement,replaceAt,fullzero};