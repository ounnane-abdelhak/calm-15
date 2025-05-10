import { Lexer } from './Lexer.js';
import {Errorcalm} from './Errorcalm.js'
import {SemanticAnalysis} from './SemanticAnalysis.js'


export const FuncInterface ={

    adrmap : (txt,size,dep)=>{
        var adr='';
        switch(txt){
            case 0:
                adr = '000';
                break;
            case 1:
                adr = '001';
                break;
            case 2:
                adr = '010';
                break;
            case 3:
                adr = `11${ dep }`;
                //or
                break;
            case 4:
                adr = '100';
                break;
            case 5:
                adr = '011';
                break;
            case 6:
                adr = '101';
                break;
        }
        return adr
    },
    regmap : (txt)=>{
        var size = '';
        var reg = '';
        switch(txt){
            case 'R1':
                reg = '000';
                break;
            case 'R2':
                reg = '001';
                break;
            case 'R3':
                reg = '010';
                break;
            case 'R4':
                reg = '011';
                break;
            case 'ACC':
                reg = '100';
                break;
            case 'BR':
                reg = '101';
                break;
            case 'IDR':
                reg = '110';
                break;
            case 'SR':
                reg = '111';
                break;
            case 'R1R':
                reg = '000';
                break;
            case 'R2R':
                reg = '001';
                break;
            case 'R3R':
                reg = '010';
                break;
            case 'ACCR':
                reg = '011';
                break;
            case 'R1L':
                reg = '100';
                break;
            case 'R2L':
                reg = '101';
                break;
            case 'R3L':
                reg = '110';
                break;
            case 'ACCL':
                reg = '111';
                break;
            
            default:
                break;
        }
        return reg
    },
    
    decimalTobinByte:(decimalString,size)=>{
        let decimalNumber = parseInt(decimalString); // convert string to number
        let binaryNumber;
      
        if (decimalNumber < 0) {
          // Perform two's complement
          decimalNumber = Math.abs(decimalNumber) - 1;
          binaryNumber = decimalNumber.toString(2); // convert number to binary string
          while (binaryNumber.length < size) {
            binaryNumber = '0' + binaryNumber;
          }
          binaryNumber = binaryNumber
            .split('')
            .map((bit) => (bit === '0' ? '1' : '0'))
            .join(''); // invert bits
        } else {
          binaryNumber = decimalNumber.toString(2); // convert number to binary string
          while (binaryNumber.length < size) {
            binaryNumber = '0' + binaryNumber;
          }
        }
      
        return binaryNumber;
      }
    ,
    decimalToHexByte:(decimalString)=>{

        // Convert decimal to hexadecimal string
        let hexString = parseInt(decimalString, 10).toString(16);
        
        // Pad the hexadecimal string with leading zeros to 4 bytes (8 characters)
        while (hexString.length < 2) {
          hexString = '0' + hexString;
        }
        
        // Return the padded hexadecimal string
        return hexString;
    },


    binaryToHexoneByte : (decimalString)=>{
        // Convert decimal to hexadecimal string
        let hexString = parseInt(decimalString, 2).toString(16);
        
        // Pad the hexadecimal string with leading zeros to 4 bytes (8 characters)
        while (hexString.length < 2) {
          hexString = '0' + hexString;
        }
        
        // Return the padded hexadecimal string
        return hexString;
      },

    decimalToHex : (decimalString,size)=>{
        let decimalNumber = parseInt(decimalString, 10); // convert string to number
        let hexString;
      
        if (decimalNumber < 0) {
          // Perform two's complement
          decimalNumber = Math.abs(decimalNumber) - 1;
          hexString = decimalNumber.toString(16); // convert number to hexadecimal string
          while (hexString.length < size) {
            hexString = '0' + hexString;
          }
          hexString = hexString
            .split('')
            .map((digit) => (digit === '0' ? 'f' : (15 - parseInt(digit, 16)).toString(16)))
            .join(''); // invert digits
        } else {
          hexString = decimalNumber.toString(16); // convert number to hexadecimal string
          while (hexString.length < size) {
            hexString = '0' + hexString;
          }
        }
      
        return hexString;
      },

 binaryToHex( binaryString,size){

    // Split the binary string into chunks of 8 characters (1 byte)
const byteChunks = binaryString.match(/.{1,8}/g);

// Convert each byte chunk to its corresponding hex value
const hexChunks = byteChunks.map(chunk => {
  const decimalValue = parseInt(chunk, 2);
  return decimalValue.toString(16).padStart(2, '0');
});

// Combine the hex chunks into a single string
const hexString = hexChunks.join('');
while (hexString.length < size) {
           hexString = '0' + hexString;
     }
    return hexString;
 },

    //   binaryToHex: (binaryString,size)=>{
    //     // Convert decimal to hexadecimal string
    //     console.log("____________________________"+binaryString+" "+size)
    //     let hexString = parseInt(binaryString, 2).toString(16);
    //     // Pad the hexadecimal string with leading zeros to 4 bytes (8 characters)
    //     while (hexString.length < size) {
    //       hexString = '0' + hexString;
    //     }
        
    //     // Return the padded hexadecimal string
    //     return hexString;
    //   },

    Label_To_Num : (labelname,linenumber)=>{
        var labelobj = null ;
      

        Assembler.Labellist.forEach(element => { 
            if(element.name === labelname){
                labelobj = element
            }
        });

        if (labelobj === null)
        {
            //error
            return {type: 'ERROR', value: null};
        }else{
            //return the address
            return {type: 'NUMBER', value: labelobj.address}; 
    }},


    
    Label_To_Num3 : (labelname,linenumber)=>{
        var labelobj = null ;
      

        Assembler.STRlist.forEach(element => { 
            if(element.name === labelname){
                labelobj = element
            }
        });

        if (labelobj === null)
        {
            //error
            Errorcalm.SemanticError.push(new Errorcalm("Label or str not found",null,linenumber));
            return {type: 'ERROR', value: null};
        }else{
            //return the address
            return {type: 'NUMBER', value: labelobj.begin}; 
    }},




    
    Label_To_Num4 : (labelname,linenumber)=>{
        var labelobj = null ;
      

        Assembler.PROClist.forEach(element => { 
            if(element.name === labelname){
                labelobj = element
            }
        });

        if (labelobj === null)
        {
            //error
            Errorcalm.SemanticError.push(new Errorcalm("Procedure not found",null,linenumber));
            return {type: 'ERROR', value: null};
        }else{
            //return the address
            return {type: 'NUMBER', value: labelobj.adr}; 
    }},

    
    Label_To_Num2 : (labelname,linenumber,labels)=>{
        var labelobj = null ;
      

        labels.forEach(element => { 
            if(element.name === labelname){
                labelobj = element
            }
        });

        if (labelobj === null)
        {
            //error
            Errorcalm.SemanticError.push(new Errorcalm("Label2 not found",null,linenumber));
            return {type: 'ERROR', value: null};
        }else{
            //return the address
            return {type: 'NUMBER', value: labelobj.line}; 
    }},
    



    confirmationfunction : (input) => {
        var errormsg = []
        var err = false ;
        //console.log(input)
        // check Errorcalm.SemanticError first else do the thing you where doing
        if (Errorcalm.SemanticError.length > 0) {
            Errorcalm.printError();
            }
        else{
        for (let index = 0; index < input.length; index++) {
            if (input[index] instanceof Errorcalm) {
                errormsg.push({line: input[index].linenum, message:input[index].message})
                err = true
            }
        }}
        Errorcalm.addtoSemanticError(errormsg);
        return {errors: errormsg, status: !err};
    
    },


  addrmod : (listofpar,line) => {

    let err=0; 
    // go through the list of instructions if listofpar[index].value is different then , then add this element.value to the list 1
    // go throught an if there is an element.type='TEXT' you use Labeltonum to make it a number
    listofpar.forEach((element,index) => {
        if (element.type === 'TEXT') {
    ;
            if( FuncInterface.Label_To_Num(element.value, line).value==null){
                if(FuncInterface.Label_To_Num3(element.value, line).value==null){

                }else{listofpar[index] = FuncInterface.Label_To_Num3(element.value, line);}
            }else{listofpar[index] = FuncInterface.Label_To_Num(element.value, line);}
        }
    });
    
  
    var list1 = [];
    var list2 = [];
    var lastindex ;
    
    var index = 0;
    
    while (index < listofpar.length && listofpar[index].value !== ',') {
        list1.push(listofpar[index]);
        lastindex = index;
        index++;   
    }
    
    for (let index = lastindex+2; index < listofpar.length; index++) {
        list2[index-lastindex-2] = listofpar[index];
    }
    //console.log("list1---------------------------------",list1);
    //console.log("list2---------------------------------",list2);

    return {list1,list2};
    
    }



 ,defadrmod : (listofparam,i) => {
    var sizeofpar;

        if ( listofparam[0].value >  Assembler.MAXNUM ){
            //errooor
            
            Errorcalm.SemanticError.push(new Errorcalm("Wrong range of number",null,i));
            return {type:'ERROR',value:'Wrong range of number'}

        }else{

    if (listofparam[0].value > 255 || Assembler.reg1.includes(listofparam[0].value) )
        { 
            sizeofpar='1'
        }else{
            sizeofpar='0'
        }
    switch (listofparam.length) {
        
        case 1:
            //immediat
            //set the size used---------------------------------------------------------------------------!!!!!!!
            
            if ( listofparam[0].value >  32767 || listofparam[0].value <  -32767 ){
                //errooor
                
                Errorcalm.SemanticError.push(new Errorcalm("Wrong range of number",null,i));
                return {type:'ERROR',value:'Wrong range of number'}
    
            }else{
            
            return {type:listofparam[0].type,value:listofparam[0].value,adrmode:0,size:sizeofpar} 
            }
            break;
        
        case 2:
            //direct
            if(  listofparam[0].type === 'REGISTER' && listofparam[0].value !== 'BR' && listofparam[0].value !== 'IDR'  )
            {
                Errorcalm.SemanticError.push(new Errorcalm("Wrong number or type of parameters",null,i));
                return {type:'ERROR',value:'Wrong number or type of parameters'}
            }else{
            if ( listofparam[1].value === '*' && (listofparam[0].type === 'NUMBER' || listofparam[0].type === 'TEXT') ) {
                return {type:listofparam[0].type,value:listofparam[0].value,adrmode:1,size:sizeofpar} 
            }else{
                if( listofparam[0].value === 'BR'){ 
                    return {type:'NUMBER',value:'0',adrmode:5,size:sizeofpar}
                }else{
                    if (  listofparam[0].value === 'IDR' )
                    {
                        return {type:'NUMBER',value:'0',adrmode:4,size:sizeofpar}

                    }else{
                Errorcalm.SemanticError.push(new Errorcalm("Wrong number or type of parameters",null,i));
                return {type:'ERROR',value:'Wrong number or type of parameters'}
            }}}
        }
            break;
        
        case 3:
            //indirect
            if(  listofparam[0].type ==='REGISTER'   )
            {
                Errorcalm.SemanticError.push(new Errorcalm("Wrong number or type of parameters",null,i));
                return {type:'ERROR',value:'Wrong number or type of parameters'}
            }else{
            if (listofparam[1].value === '*' && listofparam[2].value === '*' && (listofparam[0].type === 'NUMBER' || listofparam[0].type === 'TEXT')) {
                return {type:listofparam[0].type,value:listofparam[0].value,adrmode:2,size:sizeofpar} 
            }else{
                Errorcalm.SemanticError.push(new Errorcalm("Wrong number or type of parameters",null,i));
                return {type:'ERROR',value:'Wrong number or type of parameters'}
            }
        }
            break;
        case 4:
            //dep
            
                    if (listofparam[1].value === '*' && listofparam[2].value === '+' && listofparam[3].type ==='NUMBER' ) {

                        switch (listofparam[0].type) {
                            case 'NUMBER':
                                if (listofparam[3].value <= Assembler.MAXNUM)
                                {
                                return {type:listofparam[0].type,value:listofparam[0].value,adrmode:3,depl:listofparam[3].value,size:0}

                                }else{

                                Errorcalm.SemanticError.push(new Errorcalm("Number size is bigger then MAXNUM",null,i));
                                return {type:'ERROR',value:'Number size is bigger then MAXNUM'}

                                }
                                break;

                            case 'REGISTER':
                                if (listofparam[0].value === 'BR' && listofparam[3].value !=='BR')
                                {
                                        return {type:'NUMBER',value:listofparam[3].value,adrmode:5,size:sizeofpar}
                                }else{
                                    if (listofparam[0].value === 'IDR' && listofparam[3].value !=='IDR')
                                    {
                                        return {type:'NUMBER',value:listofparam[3].value,adrmode:4,size:sizeofpar}
                                    }else{
                                        Errorcalm.SemanticError.push(new Errorcalm("Wrong number or type of parameters",null,i));
                                        return {type:'ERROR',value:'Wrong number or type of parameters'}
                                    }

                                }
                                break;
                                
                        }          
                    
                    }else{
                        Errorcalm.SemanticError.push(new Errorcalm("Wrong number or type of parameters",null,i));
                        return {type:'ERROR',value:'Wrong number or type of parameters'}              
                    }
                                    
            
    
            break;
        
            case 6:
                // based indexed
                if ( (listofparam[0].value =='IDR' || listofparam[0].value =='BR') && listofparam[1].value === '*' && listofparam[2].value === '+' && (listofparam[3].value === 'BR' || listofparam[3].value === 'IDR') && listofparam[4].value === '+' && listofparam[5].type === 'NUMBER' && listofparam[3].value !== listofparam[0].value)  {
                    return {type:'NUMBER',value:listofparam[5].value,adrmode:6,size:sizeofpar}
                }else{                
                   
                    Errorcalm.SemanticError.push(new Errorcalm("Wrong number or type of parameters",null,i));
                    return {type:'ERROR',value:'Wrong number or type of parameters'};
            }
            break;

        default:
            Errorcalm.SemanticError.push(new Errorcalm("Wrong parameters",null,i));
            return {type:'ERROR',value:'Wrong number or type of parameters'}
    }

    }

},



    }




export class  Assembler{

    static MAXNUM = 65535;
    static Labellist =[];
    static STRlist =[];
    static PROClist =[];
    // List of strings to exclude
    

    static reg1=['R1', 'R2', 'R3', 'R4', 'ACC', 'BR', 'IDR', 'SR']
    static reg2=['R1R', 'R2R', 'R3R', 'ACCR', 'R1L', 'R2L', 'R3L', 'ACCL']

    static excludedStrings = ['!', '"','\,', '#', '$', '%', '&', "'", '(', ')', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~','RET', 'PUSHA', 'POPA', 'NEG', 'NOT', 'SHL', 'SHR', 'RD', 'WRT', 'RDS', 'WRTS', 'PUSH', 'POP', 'ROR', 'ROL', 'CALL', 'BE', 'BNE', 'BS', 'BI', 'BIE', 'BSE', 'BR', 'NAND', 'CMP', 'MOV', 'ADD', 'SUB', 'MUL', 'DIV', 'AND', 'OR', 'XOR', 'NOR', 'R1', 'R2', 'R3', 'R4', 'ACC', 'BR', 'IDR', 'SR', 'R1R', 'R2R', 'R3R', 'ACCR', 'R1L', 'R2L', 'R3L', 'ACCL'];
                      

    constructor(input,input2){
       
        let lexicalList = input.map((t,index)=> {return new Lexer(t,index).LexicalList} )
        if (Errorcalm.LexicalError.length > 0) {
            Errorcalm.printError();
        }else{
        this.input = lexicalList;
   
        this.toAssemble = new SemanticAnalysis(this.input,input2);
        let ret = FuncInterface.confirmationfunction(this.toAssemble.Semanticlist);
        if (!ret.status) {
      
        }}
    }

    static assemble(input){
        //turn instruction object to 8 octet hexa represented as a string
        // input is one line of code
        var index = 0; 
            const element = input[0];
            switch(element.type){

                case 'INST2':
                    var opcode='' ;
                    var size = element.size ;
                    var ind='' ;
                    var regmod1='' ;
                    var regmod2 ;
                    var op1='';
                    var op2='';
                    var dep1='';
                    var dep2='';
                    var code='' ;


                    switch(element.value){
                        case 'ADD':
                            opcode = `0000000${size}`;
                            break;
                        case 'SUB':
                            opcode = `0000001${size}`;
                            break;
                        case 'MUL':
                            opcode = `0000010${size}`;
                            break;
                        case 'DIV':
                        opcode = `0000011${size}`;
                        break;
                        case 'AND':
                            opcode = `0000100${size}`;
                        break;
                        case 'OR':
                            opcode = `0000101${size}`;
                            break;
                        case 'XOR':
                            opcode = `0000110${size}`;
                            break;
                        case 'NOR':
                            opcode = `0000111${size}`;
                            break;
                        case 'NAND':
                            opcode = `0001000${size}`;
                            break;
                        case 'CMP':
                            opcode = `0001001${size}`;
                            break;
                        case 'MOV':
                            opcode = `0001100${size}`;

                        break;
                        default:
                            opcode = 'error';
                            break;
                    }
                    //opcode = FuncInterface.binaryToHex(opcode,4)
                    //console.log(input[1].type,input[2].type)
                    switch(input[1].type+','+input[2].type){

                        case 'REGISTER,REGISTER':
                       ind = '00';
                            regmod1 = FuncInterface.regmap(input[1].value);
                            regmod2 = FuncInterface.regmap(input[2].value);

                            code = opcode + ind + regmod1 + regmod2


                            //return {codehex:FuncInterface.binaryToHex(code,code.length/4),codebin:code};              
                            return FuncInterface.binaryToHex(code,code.length/4)  
  
                            break;
                            
                        break;
                        case 'REGISTER,NUMBER':
                               ind = '01';
                            regmod1 = FuncInterface.regmap(input[1].value);
                            regmod2 = FuncInterface.adrmap(input[2].adrmode,size, typeof input[2].depl =='undefined' ? 0 : input[2].depl>255 ? '1' :'0' );
                            //console.log(regmod2)
                                        
                            switch (regmod2) {
                                case '000':
                                    let long = size == 0 ? 8 : 16;
                                    op2 = FuncInterface.decimalTobinByte(input[2].value,long );
                                    break;  
                                case '001':
                                case '010':
                                    op2 = FuncInterface.decimalTobinByte(input[2].value,16 );
                                    // opcode = opcode.slice(0, -1) + '1';
                                    break;                      
                                case '110': 
                                dep2 = FuncInterface.decimalTobinByte(input[2].depl, input[2].depl > 255 ? 16 : 8 );
                                op2 = FuncInterface.decimalTobinByte(input[2].value,16);
                                break;
                                case '111':
                                    dep2 = FuncInterface.decimalTobinByte(input[2].depl , input[2].depl > 255 ? 16 : 8 );
                                    op2 = FuncInterface.decimalTobinByte(input[2].value,16);
                                break;
                                case '011':
                                case '100':
                                case '101':
                                    op2 = FuncInterface.decimalTobinByte(input[2].value,16);
                                break;

                                default:
                                    break;
                                                    
                            }
                            code = opcode + ind + regmod1 + regmod2 ;
                            code=code+op2+dep2;
                            //console.log(opcode,ind,regmod1,regmod2,op1,op2,dep1,dep2);
                            //return {codehex:FuncInterface.binaryToHex(code,code.length/4),codebin:code};           
                            return FuncInterface.binaryToHex(code,code.length/4)  
                            break;

                        case 'NUMBER,REGISTER':
                            ind = '10';
                            regmod1 = FuncInterface.adrmap(input[1].adrmode,size, typeof input[1].depl =='undefined' ? 0 : input[1].depl>255 ? '1' :'0');
                            regmod2 = FuncInterface.regmap(input[2].value);
                                        
                            switch (regmod1) {
                                case '000':
                                    let long = size == 0 ? 8 : 16;
                                    op1 = FuncInterface.decimalTobinByte(input[1].value,long);
                                    break; 
                                case '001':
                                case '010':
                                    op1 = FuncInterface.decimalTobinByte(input[1].value,16);
                                    // opcode = opcode.slice(0, -1) + '1';
                                    break;                      
                                case '110':  
                                dep1 = FuncInterface.decimalTobinByte(input[1].depl, input[1].depl > 255 ? 16 : 8 );
                                op1 = FuncInterface.decimalTobinByte(input[1].value,16);
                                                                break;
                                case '111':
                                    dep1 = FuncInterface.decimalTobinByte(input[1].depl, input[1].depl > 255 ? 16 : 8 );
                                    op1 = FuncInterface.decimalTobinByte(input[1].value,16);
                                break;
                                case '011':
                                case '100':
                                case '101':
                                    op1 = FuncInterface.decimalTobinByte(input[1].value,16);
                                break;

                                default:
                                    break;
                            
                                
                            }
                            code = opcode + ind + regmod1 + regmod2 ;
                            code=code +op1+dep1;

                            //return {codehex:FuncInterface.binaryToHex(code,code.length/4),codebin:code};   s;ldk
                            return FuncInterface.binaryToHex(code,code.length/4)
                                                     break;  

                        case 'NUMBER,NUMBER':
                            ind = '11';
                            regmod1 = FuncInterface.adrmap(input[1].adrmode,size, typeof input[1].depl =='undefined' ? 0 : input[1].depl>255 ? '1' :'0');
                            regmod2 = FuncInterface.adrmap(input[2].adrmode,size, typeof input[2].depl =='undefined' ? 0 : input[2].depl>255 ? '1' :'0' );
                                        
                            switch (regmod1) {
                                case '000':
                                    let long = size == 0 ? 8 : 16;
                                    op1 = FuncInterface.decimalTobinByte(input[1].value,long);
                                    break;  
                                case '001':
                                case '010':
                                    op1 = FuncInterface.decimalTobinByte(input[1].value,16);

                                    // opcode = opcode.slice(0, -1) + '1';;
                                    break;
                                case '110':
                                    dep1 = FuncInterface.decimalTobinByte(input[1].depl, input[1].depl > 255 ? 16 : 8 );
                                    op1 = FuncInterface.decimalTobinByte(input[1].value,16);
                                break;
                                case '111':
                                    dep1 = FuncInterface.decimalTobinByte(input[1].depl, input[1].depl > 255 ? 16 : 8  );
                                    op1 = FuncInterface.decimalTobinByte(input[1].value,16);
                              
                                    break;
                                case '011':
                                case '100':
                                case '101':
                                    op1 = FuncInterface.decimalTobinByte(input[1].value,16);
                                    break;
                                default:
                                    op1='error';
                                    dep1='error';
                                    break;
                            }
                            
                            switch (regmod2) {
                                case '000':
                                    let long = size == 0 ? 8 : 16;
                                    op2 = FuncInterface.decimalTobinByte(input[2].value,long);
                                    break;      
                                case '001':
                                    op2 = FuncInterface.decimalTobinByte(input[2].value,16);
                                case '010':
                                    op2 = FuncInterface.decimalTobinByte(input[2].value,16);
                                    // opcode = opcode.slice(0, -1) + '1';
                                    break;            
                                case '110':      
                                    dep2 = FuncInterface.decimalTobinByte(input[2].depl, input[2].depl > 255 ? 16 : 8 );
                                    op2 = FuncInterface.decimalTobinByte(input[2].value,16);
                        

                                break;                      
                                case '111':
                                    dep2 = FuncInterface.decimalTobinByte(input[2].depl , input[2].depl > 255 ? 16 : 8 );
                                    op2 = FuncInterface.decimalTobinByte(input[2].value, 16 );
                               

                                case '011':
                                case '100':
                                case '101':
                                    op2 = FuncInterface.decimalTobinByte(input[2].value,16);
                                break;
                                
                                default:
                                    op2='error';
                                    dep2='error';
                                    break;
                                
                            }

                            code = opcode  + ind + regmod1 + regmod2 ;
                            code= code + op1 + op2;
                            code= code + dep1 + dep2;

                            //return {codehex:FuncInterface.binaryToHex(code,code.length/4),codebin:code};
                            //console.log(code)
                            //console.log(dep1)
                            //console.log(FuncInterface.binaryToHex(dep1,4))
                            //console.log(FuncInterface.binaryToHex(code,code.length/4))
                            return FuncInterface.binaryToHex(code,code.length/4)
                            break;

                        default:
                            ind = 'error';
                            break;

                    }
                    break;
                                
                case 'INST0':
                    switch(element.value){
                        case 'RET':
                            return '3D';
                        case 'PUSHA':
                            return '21';
                        case 'POPA':
                            return '23';
                            case 'STOP':
                             return 'FF';                        
                            
                    }
                case 'INST1':
                    if (['MOVS','NEG', 'NOT', 'SHL', 'SHR', 'RD', 'WRT', 'PUSH', 'POP', 'ROR', 'ROL'].includes(element.value)) {
                        var reg ;
                        var size  ;
                        var oppcode;
                        //console.log(element);
                        switch(element.value){
                            case 'NEG':
                                oppcode = '0100';
                                break;
                            case 'NOT':
                                oppcode = '0101';
                                break;
                            case 'SHL':
                                oppcode = '0110';
                                break;
                            case 'SHR':
                                oppcode = '0111';
                                break;
                            case 'RD':
                                oppcode = '1000';
                                break;
                            case 'WRT':
                                oppcode = '1001';
                                break;
                            case 'PUSH':
                                oppcode = '1010';
                                break;
                            case 'POP':
                                oppcode = '1011';
                                break;
                            case 'ROR':
                                oppcode = '1100';
                                break;
                            case 'ROL':
                                oppcode = '1101';
                                break;
                                case 'MOVS':
                                oppcode = '1110';
                                break;
                                
                            default:
                                break;
                        }
                         
                        if (oppcode != '1001' && oppcode != '1000' && oppcode != '1110' ) {
                        if (element.adrmode === 0 && input[1].type === 'REGISTER') {
                            switch(input[1].value){
                                case 'R1':
                                    reg = '000';
                                    size = '1';
                                    break;
                                case 'R2':
                                    reg = '001';
                                    size = '1';
                                    break;
                                case 'R3':
                                    reg = '010';
                                    size = '1';
                                    break;
                                case 'R4':
                                    reg = '011';
                                    size = '1';
                                    break;
                                case 'ACC':
                                    reg = '100';
                                    size = '1';
                                    break;
                                case 'BR':
                                    reg = '101';
                                    size = '1';
                                    break;
                                case 'IDR':
                                    reg = '110';
                                    size = '1';
                                    break;
                                case 'SR':
                                    reg = '111';
                                    size = '1';
                                    break;
                                case 'R1R':
                                    reg = '000';
                                    size = '0';
                                    break;
                                case 'R2R':
                                    reg = '001';
                                    size = '0';
                                    break;
                                case 'R3R':
                                    reg = '010';
                                    size = '0';
                                    break;
                                case 'ACCR':
                                    reg = '011';
                                    size = '0';
                                    break;
                                case 'R1L':
                                    reg = '100';
                                    size = '0';
                                    break;
                                case 'R2L':
                                    reg = '101';
                                    size = '0';
                                    break;
                                case 'R3L':
                                    reg = '110';
                                    size = '0';
                                    break;
                                case 'ACCL':
                                    reg = '111';
                                    size = '0';
                                    break;
                                
                                default:
                                    break;
                            }
                            
                            let instcode=oppcode+reg+size;
                            return FuncInterface.binaryToHexoneByte(instcode) ;
                        }
                        }else {
                                let instcode = oppcode + '011'+'1';
                            return FuncInterface.binaryToHexoneByte(instcode) ;
                        }

                    }else{
                    var oppcode = "";
                    
                    switch(element.value){
                        case 'CALL':
                            oppcode = '33';
                            break;
                        case 'BE':
                            oppcode = '25';
                            break;
                        case 'BNE':
                            oppcode = '27';
                            break;
                        case 'BS':
                            oppcode = '29';
                            break;
                        case 'BI':
                            oppcode = '2B';
                            break;
                        case 'BIE':
                            oppcode = '2D';
                            break;
                        case 'BSE':
                            oppcode = '2F';
                            break;
                        case 'BRI':
                            oppcode = '31';
                            break;
                            case 'RDS':
                            oppcode = '39'
                            break;
                            case 'WRTS':
                            oppcode = '3B'
                            break;
                            case 'LODS':
                            oppcode = '35'
                            break;
                            case 'CMPS':
                            oppcode = '37'
                            break;
                          
                        default:
                            break;
                    }
                    let instcode;
                    if ( oppcode === '35' ||  oppcode === '37') {
                        instcode=oppcode;
                    }else{
                        var adr = FuncInterface.decimalToHex(input[1].value,4);
                        instcode=oppcode+adr;
                    }
                    return instcode;
                   
                }
            }
        }   
        static assemblecode(input1,input2,input3){
     
            let output = new Assembler(input1,input2) ;
            var assembledcode = [];
            var toassmb = (output && output.toAssemble && output.toAssemble.Semanticlist) ? output.toAssemble.Semanticlist : "Semanticlist is undefined";
            if ( Errorcalm.SemanticError.length ===0 ) {

                for (let index = 0; index < toassmb.length; index++) {
         
                    assembledcode.push(Assembler.assemble(toassmb[index])) 
                
                }
                console.log("\nAssembled code: \n",assembledcode)
                return assembledcode;
 
                
            }else{

                return "error";

            }

        }


  }





//var input = ["MOV 0,0"]

//console.log("\nInput: \n", Assembler.assemblecode(input))

/*
let output = new Assembler(input) ;






console.log("\nLabel list: \n",Assembler.Labellist)

//console.log("\nSemantic list: \n", output?.toAssemble?.Semanticlist ?? "Semanticlist is undefined");
console.log("\nSemantic list: \n", (output && output.toAssemble && output.toAssemble.Semanticlist) ? output.toAssemble.Semanticlist : "Semanticlist is undefined");
var toassmb = (output && output.toAssemble && output.toAssemble.Semanticlist) ? output.toAssemble.Semanticlist : "Semanticlist is undefined";
var assembledcode = []

for (let index = 0; index < toassmb.length; index++) {
         
    assembledcode.push(Assembler.assemble(toassmb[index])) 
    console.log("\nAssembled code: \n",assembledcode)

}

console.log("\nAssembled code: \n",assembledcode)
//console.log has to be deleted    03cd11b4000a 
*/
/*
console.log("\ncode:",
Assembler.assemble(  [
    { type: 'INST2', value: 'ADD', size: '1' },
    { type: 'NUMBER', value: '100', adrmode: 4, size: '1' },
    { type: 'REGISTER', value: 'R1', adrmode: 0, size: '1' }
  ])
)

console.log("\ncode:",
Assembler.assemble(  [
    { type: 'INST2', value: 'ADD', size: '1' },
    { type: 'NUMBER', value: '2', adrmode: 4, size: '1' },
    { type: 'REGISTER', value: 'R1', adrmode: 0, size: '1' }
  ])
)


console.log("\ncode:",
Assembler.assemble(  [
    { type: 'INST2', value: 'ADD', size: '1' }, //8 ----**2
    { type: 'NUMBER', value: '65535', adrmode: 0, size: '1' },//8 (11 000 101)------**2 + OP1=11B4
    { type: 'NUMBER', value: '4555', adrmode: 6, size: '1' }// DEP2
  ]))*/

//10001101101000
//000000000001010ffff
