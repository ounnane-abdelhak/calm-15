import { Assembler } from './Assembler.js';
import { Errorcalm } from './Errorcalm.js';
import { SemanticAnalysis } from './SemanticAnalysis.js';
export class Lexer {
  static Errors = [];
 
  static isValidString(str) {
    // Check if the string contains any special characters
    if (/[^a-zA-Z0-9_]/.test(str)) {
      return false;
    }else{
    
    // Check if the string begins with a number
    if (/^\d/.test(str)) {
      return false;
    }else{
    // Check if the string is in the excluded list
    if (Assembler.excludedStrings.includes(str)) {
      return false;
    }else{    
    // If none of the above conditions are met, the string is valid ;
    //console.log("valid string")
    return true;
    }
  }}
  }   

    constructor(code,line) {
      //console.log(code.m atch(/([a-zA-Z0-9]+\d*(?:[a-zA-Z09]+)?|\*|,|\+)/g))
  
      this.LexicalList = code.match(/([A-Za-z0-9]+|[*,+~`!@#%\^&()_=\[\]{};:$"',.<>?\\-])/g).filter(function (t) {
        return t.length > 0;
      }).map((t,index)=> {


        if (isNaN(t)) {
          if (
            t === 'R1' ||
            t === 'R2' ||
            t === 'R3' ||
            t === 'R4' ||
            t === 'ACC' ||
            t === 'BR' ||
            t === 'IDR' ||
            t === 'SR' ||
            t === 'R1R' ||
            t === 'R2R' ||
            t === 'R3R' ||
            t === 'ACCR' ||
            t === 'R1L' ||
            t === 'R2L' ||
            t === 'R3L' ||
            t === 'ACCL'
          ) {
            return {
              type: 'REGISTER',
              value: t
            };
          } else if (
            t === 'RET' ||
            t === 'PUSHA' ||
            t === 'POPA' ||
            t==='STOP'
          ) {
            return {
              type: 'INST0',
              value: t
            };
          } else if (
            t === 'NEG' ||
            t === 'NOT' ||
            t === 'SHL' ||
            t === 'SHR' ||
            t === 'RD' ||
            t === 'WRT' ||
            t === 'PUSH' ||
            t === 'POP' ||
            t === 'ROR' ||
            t === 'ROL' ||
            t === 'CALL' ||
            t === 'BE' ||
            t === 'BNE' ||
            t === 'BS' ||
            t === 'BI' ||
            t === 'BIE' ||
            t === 'BSE' ||
            t === 'BRI' ||
            t === 'RDS' ||
            t === 'MOVS' ||
            t === 'LODS' ||
            t === 'CMPS' ||
            t === 'WRTS'
          ) {
            return {
              type: 'INST1',
              value: t
            };
          } else if (
            t === 'NAND' ||
            t === 'CMP' ||
            t === 'MOV' ||
            t === 'ADD' ||
            t === 'SUB' ||
            t === 'MUL' ||
            t === 'DIV' ||
            t === 'AND' ||
            t === 'OR' ||
            t === 'XOR' ||
            t === 'NOR'
          ) {
            return {
              type: 'INST2',
              value: t
            };
          } else if (
            t === '*' ||
            t === ',' ||
            t === '+' ||
            t === '-'
          ) {
            return {
              type: 'SPECIAL CHARACTER',
              value: t
            };
          } else if (t === 'LABEL') {
            return {
              type: 'LABEL'
            };
          } else {
            if (Lexer.isValidString(t)) {
              return {
                type: 'TEXT',
                value: t
              };
            } else {
              Lexer.Errors.push(new Errorcalm("Invalid string", "LEXER", line));
              Errorcalm.set_LexicalError(new Errorcalm("Invalid string", "LEXER", line));
              return {
                type: 'ERROR',
                value: t
              }
            }
          }
          
        } else{
  
            return { type: 'NUMBER', value: t };
          
        }
      });
      let lexlist= this.LexicalList
      lexlist.forEach((element,index,lexlist) => {
        if (element.type =='NUMBER') {
          if ( lexlist[index-1].value=='-' && lexlist[index-1].type=='SPECIAL CHARACTER'  ){
            console.log( '-'+element.value )
            lexlist.splice(index-1, 1);
            if( parseInt('-'+element.value,10) < -32768){
              Lexer.Errors.push(new Errorcalm("Number out of range", "LEXER", line)) ; //change this 0 to the line number
              Errorcalm.set_LexicalError(new Errorcalm("Number out of range", "LEXER", line));
            }else{
            lexlist[index-1]={
              type: 'NUMBER'
              ,value: `-${element.value}`
            }}
        }
      }
        
      });
      this.LexicalList = lexlist;

    }

  }