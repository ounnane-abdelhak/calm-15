import { Assembler,FuncInterface } from "./Assembler.js";
import { SemanticAnalysis } from "./SemanticAnalysis.js";
import { Lexer } from "./Lexer.js";

export class Errorcalm{

    static LexicalError = [];
    static SemanticError = [];
    static errorr=0;
    constructor(message,type,line){
        this.message = message;
        this.type = type;
        this.line = line+1;
    }

    static set_LexicalError(lexerror){

           // if (Errorcalm.SemanticError.find((err) => {
            //return err.message === lexerror.message && err.type === lexerror.type && err.linenum === lexerror.linenum;
            //})) {
            //} else {
                Errorcalm.LexicalError.push(lexerror);
            //}

    }

    static  set_SemanticError(synerror){
        if (Errorcalm.SemanticError.find((err) => {
            return err.message === synerror.message && err.type === synerror.type && err.linenum === synerror.linenum;
            })) {
            } else {
                Errorcalm.SemanticError.push(synerror);
            }
    }
    static printError(){
        let theError;
        Errorcalm.LexicalError = [...new Set(Errorcalm.LexicalError)];
        Errorcalm.SemanticError = [...new Set(Errorcalm.SemanticError)];
        const numerr = Errorcalm.LexicalError.length + Errorcalm.SemanticError.length;
        if(numerr ==0){
            return ''
        }else{
            numerr ==1 ? theError="\nThere is 1 error in your code:\n" : theError=`\nThere are ${numerr} errors in your code cannot assemble:\n`;
            for (let i = 0; i < Errorcalm.SemanticError.length; i++) {
                if(i==0){
                    theError+="  Semantic Errors:\n"
                }
                theError+="  "+Errorcalm.SemanticError[i].message+"\n the line : "+Errorcalm.SemanticError[i].line+"\n";
            }
            for (let i = 0; i < Errorcalm.LexicalError.length; i++) {
                if(i==0){
                    theError+="  Lexical Errors:\n"
                }
                theError+="  "+Errorcalm.LexicalError[i].message+"\n the line : "+Errorcalm.LexicalError[i].line+"\n";
            }
        Errorcalm.errorr=1;
 
        return theError;}
    }
    static addtoSemanticError(errs){
        Errorcalm.SemanticError= errs.concat(Errorcalm.SemanticError);    }
    static addtoLexicalError(errs){
        Errorcalm.LexicalError= errs.concat(Errorcalm.LexicalError);
    }

}   


