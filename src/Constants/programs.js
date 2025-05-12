const programs = [
    {
        title: "Manipulating Arrays",
        content:"MACRO PRE A\nADD A,2\nMOV A,ACC\nENDM\nlabel tab 10\nmov IDR,0\nmov R1,0\nmov IDR*+tab,R1\nPRE R1\nPRE IDR\nLOOP:SUB IDR,20\nBNE LOOP"
    },
    {
        title: "Fibonacci",
        content:"mov r1, 1 //first term\nmov r2, 1 //second term\nmov r3, 0 //result\nmov r4, 5 //counter\nloop:\n//program\nadd r1, r2 //sum first and second terms\nmov r3, acc //move result to r3\nmov r1, r2 //second term becomes first\nmov r2, r3 //result becomes second term\nsub r4, 1 //decrement the counter\nmov r4, acc //move the value to r4\nbne loop //loop to instruction @16 if counter not null"
    },
    {
        title: "Factorial",
        content:"mov r1, 4 //n\nmov r2, 1 //result\n\n//program\nloop:\nmul r1, r2 //multiply n to result\nmov r2, acc //move the result to r2\nsub r1, 1 //decrement n by 1\nmov r1, acc //move the result to r1\nbne loop //move to instruction @ if n not null"
    },
    {
        title: "Recursive Factorial",
        content:"//result in R2\nfactorial proc\nmul r1, r2\nmov r2, acc\nsub r1, 1\nmov r1, acc\ncmp r1, 1\nbe end\ncall factorial\nend:ret\nfactorial endp\nmov r1, 5\nmov r2, 1\ncall factorial"
    },
    {
        title: "Hello, World !",
        content:"str msg \"Hello, World !$\" \nwrts msg"
    },
    {
        title: "Read a Character and Display It",
        content:"rd \nwrt"
    },
    {
        title: "Check if a number is even or odd",
        content:"str even \"even$\" \nstr odd \"odd$\" \nmov idr ,0\nmov r1, 6 //put the number here\ndiv r1, 2\ncmp r4, 0\nbne od\nwrts even\nbri end\nod:\nwrts odd\nend:\nmov r1, 1"
    },
    {
        title: "Simple counter (from 1 to 10)",
        content:"str minus \"-$\"\nmov r4, 48\nloop:\nadd r4, 1\nmov r4, acc\nwrt\nwrts minus\ncmp r4, 57\nbe end\nbri loop\nend: \nmov r4, 49\nwrt\nmov r4, 48\nwrt"
    },
]

export default programs;