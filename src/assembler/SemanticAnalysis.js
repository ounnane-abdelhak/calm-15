import { Lexer } from './Lexer.js';
import { Errorcalm } from './Errorcalm.js';
import { Assembler,FuncInterface } from "./Assembler.js";
import {  memory } from "../pages/Ide/index.jsx";
import { TwosComplement } from '../Emulator/ALU.js';


function convertNum(num, from, to) {
    const todec = parseInt(num, from);
    return todec.toString(to);
  }
export class SemanticAnalysis {
    Semanticlist = []
    constructor(input,input2) { 
      let offset=0;

        let lexicalList = input;
        for(let i = 0; i < lexicalList.length; i++){
            // here operation with each line of code
            // we must check if it is a label or an instruction
            // if it is a label we have to check that the next element is a number and it has to be < from a number we fix
            
              let firstword = lexicalList[i][0]
              let firstwordtype = firstword.type
              
              switch (firstwordtype) {
                    
                  case 'LABEL':
                    const functLABEL = ()=> {
                        if (lexicalList[i].length == 3) {
                            if (lexicalList[i][2].type == 'NUMBER'){
                            if( lexicalList[i][2].value < Assembler.MAXNUM){
                                if(lexicalList[i][1].type == 'TEXT'){
                                    if(Lexer.isValidString(lexicalList[i][1].value)){
                                        //  filters for text standards and validity of the text
                                        // check if label already existing 
                                            var found = false ;
                                            var labelname = firstword.value ;
                                            Assembler.Labellist.forEach(element => { 
                                                if(element.name === labelname){
                                                    found = true
                                                }
                                            });
                                        if (!found) {    
                                        //this.Semanticlist.push(lexicalList[i]); 
                                        //stop pushing here because we don't need it
                                        Assembler.Labellist.push({ name: lexicalList[i][1].value, address: lexicalList[i][2].value, linedeclared:i })
                                   }else{
                                        Errorcalm.SemanticError.push(new Errorcalm("LABEL already declared",null,i))
                                    }
                                }else{ Errorcalm.SemanticError.push(new Errorcalm("LABEL name is not valid",null,i)) }
                                }else{
                                    Errorcalm.SemanticError.push(new Errorcalm("LABEL name not defined",null,i))
                              }
                            }else{
                                 Errorcalm.SemanticError.push(new Errorcalm("Number size is bigger then MAXNUM",null,i))
                            }}else{ 
                                 Errorcalm.SemanticError.push(new Errorcalm("LABEL must be a number",null,i))
                            }
                          }else{
                            if (Lexer.isValidString(lexicalList[i][2].value )) {
                                Errorcalm.SemanticError.push(new Errorcalm("LABEL must have only two operands",null,i))
                            }else
                            {
                                Errorcalm.SemanticError.push(new Errorcalm("LABEL name is not valid",null,i))
                            }
                            }
 
                      }
                      
                      functLABEL();
                      break;
                      case 'INST0': 
                          // No params instructions: INST0 ::=    RET, PUSHA, POPA
                          // We must have no op after it 

                            const functINST0 = ()=> { 

                                if (lexicalList[i].length == 1) {
                                    this.Semanticlist.push(lexicalList[i]);
                                }else{
                                    Errorcalm.SemanticError.push(new Errorcalm("INST0 must have no operands",null,i))
                            }}
                        

                      functINST0();
                      break ;



                      case 'INST1':
                        // ONE params instructions: INST1 ::=  NEG, NOT, SHL, SHR, RD, WRT, RDS, WRTS, PUSH, POP, ROR, ROL, CALL, BE, BNE, BS, BI, BIE, BSE, BR
                        //|                                                                          .               |
                        //|        Must have only one other param: it must be valid                  .               |
                        //|        or one param and other special chars: they must be valid  also  .                 |
                        //|        That other special char is used for addressing modes mainly    .                  |
                        //|-----------------------------------------------------------------------------------------.
                                                    // check if size of first list == size of second list and assign it to the size of the instruction
                        const functINST1 = ()=> {
                            var firstparam = lexicalList[i][1]
                            if (['NEG','NOT', 'SHL', 'SHR', 'PUSH', 'POP', 'ROR', 'ROL'].includes( lexicalList[i][0].value )) {
                                //rd or write from or to register only..
                                // Labels are not allowed
                                if(firstparam){
                                    if (firstparam.type == 'REGISTER'  && lexicalList[i].length == 2) {
                                        this.Semanticlist.push([{  type:lexicalList[i][0].type, value: lexicalList[i][0].value, adrmode:0  },lexicalList[i][1]]);
                                    }
                                    else{
                                        Errorcalm.SemanticError.push(new Errorcalm("INST1 must have one register as operand",null,i))
                                    }
                                } else {
                                    Errorcalm.SemanticError.push(new Errorcalm("INST1 must have an operand",null,i))
                                }
                            }else if (lexicalList[i][0].value == "WRT" || lexicalList[i][0].value == "RD" || lexicalList[i][0].value == "MOVS"|| lexicalList[i][0].value === 'LODS' || lexicalList[i][0].value === 'CMPS' ) {
                                if (lexicalList[i].length !== 1) {
                                    Errorcalm.LexicalError.push(new Errorcalm(`${lexicalList[i][0].value} Instruction can't have operands`,null,i));
                                } else {
                                    this.Semanticlist.push([{type:lexicalList[i][0].type, value: lexicalList[i][0].value, adrmode:0 }]);
                                }
                            }else if( lexicalList[i][0].value=="CALL" ){
                                  
                                if (firstparam) {
                                    switch(firstparam.type){
                                    case 'NUMBER':
                                                Errorcalm.SemanticError.push(new Errorcalm("operand can't be a number",null,i))                           
                                    break;
                                    
                                    case 'REGISTER' :
                                            Errorcalm.SemanticError.push(new Errorcalm("Instruction cannot have register as operand",null,i))
                                    break;
                                    
                                    case 'TEXT' :
                                            //+ ajouter opp avec labels,  I guess DONE
                                            // Do the needed operations after transformations and ADD TESTs it's not safe here !
                                            // add addressing modes direct and indirect for labels
                                            //check if it's present in label list
                                          
        
                                                if (lexicalList[i].length==2) {
                                                    
                                                    if(Lexer.isValidString(lexicalList[i][1].value)){

                                                        this.Semanticlist.push([{type:lexicalList[i][0].type, value:lexicalList[i][0].value, adrmode:0 },{type:FuncInterface.Label_To_Num4(firstparam.value,i,input2).type, value:FuncInterface.Label_To_Num4(firstparam.value,i,input2).value}]);

                                                }else{ Errorcalm.SemanticError.push(new Errorcalm("LABEL name is not valid",null,i)) }

                                                 
                                            }else{
                                                 Errorcalm.SemanticError.push(new Errorcalm("wrong number of parameter",null,i))}
                                        
                                    }
                                } else {
                                    Errorcalm.SemanticError.push(new Errorcalm("INST1 must have an operand",null,i))
                                }
                            
                              
                                
                            }else{
                            // use it as function
                            // funcnum(lexicalList[i],i)
                            // add in the body firstparam definition
                            // var firstparam = lexicalList[i][1]
                            if (firstparam) {
                                switch(firstparam.type){
                                case 'NUMBER' :
                                        //check addressing
                                        if (firstparam.value < Assembler.MAXNUM) {
                                        
                                        switch (lexicalList[i].length) {
                                            case 2:
                                                this.Semanticlist.push([{type:lexicalList[i][0].type, value: lexicalList[i][0].value, adrmode:0 },lexicalList[i][1]]);
                                                console.log("this.Semanticlist", [{type:lexicalList[i][0].type, value: lexicalList[i][0].value, adrmode:0 },lexicalList[i][1]]);
                                                break;
                                        
                                            default:
                                                Errorcalm.SemanticError.push(new Errorcalm("Wrong number or type of operands",null,i))
                                                break;
                                        }    }else{
                                            Errorcalm.SemanticError.push(new Errorcalm("Number size is bigger then MAXNUM",null,i))
                                        }                               
                                    
                                break;
                                
                                case 'REGISTER' :
                                        Errorcalm.SemanticError.push(new Errorcalm("Instruction cannot have register as operand",null,i))
                                break;
                                
                                case 'TEXT' :
                                        //+ ajouter opp avec labels,  I guess DONE
                                        // Do the needed operations after transformations and ADD TESTs it's not safe here !
                                        // add addressing modes direct and indirect for labels

                                        //check if it's present in label list
                                        if (lexicalList[i][0].value === 'RDS' || lexicalList[i][0].value === 'WRTS' ) {
                                            if (lexicalList[i].length === 2) {
                                                const isInLabel = Assembler.Labellist.some(obj => obj.name === lexicalList[i][1].value);
                                                const isInStr = Assembler.STRlist.some(obj => obj.name === lexicalList[i][1].value);
                                                if (isInLabel || isInStr) {
                                                    if (isInLabel) {
                                                        const label = Assembler.Labellist.filter(obj => obj.name === lexicalList[i][1].value);
                                                        this.Semanticlist.push([{type:lexicalList[i][0].type, value:lexicalList[i][0].value, adrmode:0 },{type:'NUMBER', value:label[0].address}]);
                                                    } else {
                                                        const str = Assembler.STRlist.filter(obj => obj.name === lexicalList[i][1].value);
                                                        this.Semanticlist.push([{type:lexicalList[i][0].type, value:lexicalList[i][0].value, adrmode:0 },{type:'NUMBER', value:str[0].begin}]);
                                                    }
                                                } else {
                                                    Errorcalm.SemanticError.push(new Errorcalm("Label or Str doesn't exist",null,i))
                                                }
                                            } else{
                                                Errorcalm.SemanticError.push(new Errorcalm("Wrong Number of operands",null,i))
                                            }
                                        } else {
                                            switch (lexicalList[i].length) {

                                                case 2:
                                                    this.Semanticlist.push([{type:lexicalList[i][0].type, value:lexicalList[i][0].value, adrmode:0 },{type:FuncInterface.Label_To_Num2(firstparam.value,i,input2).type, value:FuncInterface.Label_To_Num2(firstparam.value,i,input2).value}]);
                                                    
                                                break;
                                                
                                                case 5:
                                                    // indirect
                                                    if (lexicalList[i][2].value == '*' && lexicalList[i][3].value == '+' && lexicalList[i][4].type == 'NUMBER' && (0 < lexicalList[i][4].value) && ( Assembler.MAXNUM > lexicalList[i][4].value) ) {
                                                        this.Semanticlist.push([{type:lexicalList[i][0].type, value:lexicalList[i][0].value, adrmode:3 },{type:FuncInterface.Label_To_Num2(firstparam.value,i,input2).type, value:FuncInterface.Label_To_Num2(firstparam.value,i,input2).value},{type:lexicalList[i][4].type, value:lexicalList[i][4].value}]);
                                                    }else{
                                                        Errorcalm.SemanticError.push(new Errorcalm("Wrong expression or wrong size of number",null,i))
                                                    }
                                                
                                                break;
                                            
                                                default:
                                                    Errorcalm.SemanticError.push(new Errorcalm("Wrong number or type of operands",null,i))
                                                    break;
                                            }
                                        }
                                    
                                }
                            } else {
                                Errorcalm.SemanticError.push(new Errorcalm("INST1 must have an operand",null,i))
                            }
                        
                        }
                                                

                            
                        }

                      functINST1();
                      break ;
                      
                      case 'INST2':
                        //check if there is a comma if not throw error which is comma missing
                        var nocomma = true ;
                        lexicalList[i].forEach(element => {
                            if (element.value == ',') {
                                nocomma = false ;
                            }});

                        if (nocomma)  
                        {
                            Errorcalm.SemanticError.push(new Errorcalm("Comma missing",null,i))
                           

                        }
                        else{
                            // check also for first operand based ind and second indexed or based or opposite 
                            // check if size of first list == size of second list and assign it to the size of the instruction
                            var list1,list2 =[];
                            list1 = FuncInterface.addrmod(lexicalList[i].slice(1),i).list1 ;
                            //console.log("list1",list1[0].type)
                            list2 = FuncInterface.addrmod(lexicalList[i].slice(1),i).list2 ;

         if(list1.length>0 && list2.length>0){
                            if(( FuncInterface.defadrmod(list1,i).type=='NUMBER')&& lexicalList[i][0].value == 'MOV' && FuncInterface.defadrmod(list1,i).adrmode==0 ) {
                                //console.log("here------------------------")

                                        Errorcalm.SemanticError.push(new Errorcalm("Number can't be first operand",null,i))
                            }else{
                            //console.log("\nlist1",list1,"\nlist2",list2)
                            //console.log("\nlist1",FuncInterface.defadrmod(list1),"\nlist2",FuncInterface.defadrmod(list2))
                            //console.log("list1",FuncInterface.defadrmod(list1,i).size,"list2",FuncInterface.defadrmod(list2,i).size)
                            
                        if ((FuncInterface.defadrmod(list1,i).size !== FuncInterface.defadrmod(list2,i).size && FuncInterface.defadrmod(list2,i).type =='REGISTER' && FuncInterface.defadrmod(list1,i).type =='REGISTER' )  || ( FuncInterface.defadrmod(list1,i).size == 0 && FuncInterface.defadrmod(list2,i).size == 1 && FuncInterface.defadrmod(list1,i).type =='REGISTER' )) {

                                Errorcalm.SemanticError.push(new Errorcalm("Wrong size or type of operands",null,i))
                             

                            }else{
                                let asize =  ( FuncInterface.defadrmod(list2,i).size == 1 ) || ( FuncInterface.defadrmod(list1,i).size == 1 )? 1 : 0;
                                //console.log(asize);
                                this.Semanticlist.push([{type:lexicalList[i][0].type, value:lexicalList[i][0].value,size:asize},FuncInterface.defadrmod(list1,i),FuncInterface.defadrmod(list2,i)]);
                            }
                            }}
                        else{if(list1.length==0){Errorcalm.SemanticError.push(new Errorcalm("first operand is missing",null,i))}
                        else{Errorcalm.SemanticError.push(new Errorcalm("second operand is missing",null,i))}}}

                      break ;
                

                      default:
                        Errorcalm.SemanticError.push(new Errorcalm("invalid instruction",null,i))
                            break;
                          
             
                  
            }
            

           
          
        }
    }






    //estandards for each instruction 

    // for label we only have to check that the next element is a number and it has to be < from a number we fix 
    
    
    // No params instructions: INST0 ::= RET, PUSHA, POPA
    // We must have no op after it 
    


    // ONE params instructions: INST1 ::=  NEG, NOT, SHL, SHR, RD, WRT, PUSH, POP, ROR, ROL, CALL, BE, BNE, BS, BI, BIE, BSE, BR
    //|                                                                                         |
    //|        Must have only one other param: it must be valid                                 |
    //|        or one param and other special chars: they must be valid  also                   |
    //|        That other special char is used for addressing modes mainly                      |
    //|-------------------------------------------------------------------------------------------

    
    // TWO params instructions: NAND, CMP, MOV, ADD, SUB, MUL, DIV, AND, OR, XOR, NOR
    // they may be only two operands or two operands with special chars
    // check for the problem of first operand is a number
    // define addressing mode
    // some special errors for special instructions

    

    // Label instformat LABEL num check this num if it is valid.;

}


/*
const MAXNUM =6000 // max adress for label



var input = ["LABEL imo 145537", "MOV R1, 14", " ADD R1,R2**","PUSHA 55"]

//console.log(new Lexer(input[0]).LexicalList)

var output = new SemanticAnalysis(["LABEL 145537"])

console.log(output.Semanticlist)*/
