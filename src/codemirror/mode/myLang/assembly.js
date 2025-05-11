import define from 'requirejs'
import  CodeMirror from 'codemirror'

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror.css"));
  
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror.css"], mod);
  
  else // Plain browser env
    mod(CodeMirror);

})(function(CodeMirror) { 

  CodeMirror.defineMode("8086", function(config, parserConfig) {
      var keywords = ["cmps","and","nand","nor","xor","or","lods","movs","rds","wrts","str","cmp","mov", "add", "sub", "mul", "div", "jmp", "call", "ret", "push", "pop", "label", "bri", "be", "bne", "bs", "bi", "bse", "bie", "ror", "rol", "shr", "shl","pusha","popa","rd","wrt"];
      var registers = ["r1", "r2", "r3", "r4", "idr", "br", "sr", "acc", "r1l", "r1r", "r2l", "r2r", "r3l", "r3r", "accl", "accr"];
      var macro=["proc","endp","macro","endm"];
      var number = /-?(?:0x[0-9a-f]+|\d+)/i;
      function tokenBase(stream, state) {
        var ch = stream.next();
        if (ch === "/") {
          if (stream.eat("")) {
            state.tokenize = tokenComment;
            return state.tokenize(stream, state);
          }
          if (stream.eat("/")) {
            stream.skipToEnd();
            return "comment";
          }
        }
        if (ch === ";" || ch === "#") {
          stream.skipToEnd();
          return "comment";
        }
        if (ch === '"') {
          stream.eatWhile(/[^"]/); 
          if (stream.eat('"')) {
              return "mess"; 
          }
      }
  

        if (/[a-zA-Z_]/.test(ch)) {
          stream.eatWhile(/[\w.]/);
          var cur = stream.current().toLowerCase();

              if (keywords.indexOf(cur) >= 0) {
              return "key";
              } 
              if (registers.indexOf(cur) >= 0) {
                  return "reg";
              }
              if (macro.indexOf(cur) >= 0) {
                return "mac";
            }   
 
            

          }
          if (/\d/.test(ch)) {
            stream.match(number);
            return "num";
          }

        if(/[@*]/.test(ch)){
            return "opadr";
        }

        if(/[[]]/.test(ch)){
            return "opadr"
        }


      return null;
    }

    function tokenComment(stream, state) {
      let maybeEnd = false, ch;

      while ((ch = stream.next())) {
        if (ch === "/" && maybeEnd) {
          state.tokenize = null;
          break;
        }

        maybeEnd = ch === "";
      }

      return "comment";
    }

    return {
      startState: function() {
        return {
          tokenize: null,
        };
      },

      token: function(stream, state) {
        if (state.tokenize) {
          return state.tokenize(stream, state);
        }

        return tokenBase(stream, state);
      },
    };
  });

});