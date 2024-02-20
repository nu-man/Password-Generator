function submitform(event){
    event.preventDefault()
   let formdata={}
   formdata.lenght=document.getElementById("password-length").value
   formdata.symbols=document.getElementById("symbols").checked
   formdata.digits=document.getElementById("Digits").checked
   formdata.lowercase=document.getElementById("lowercase").checked
   formdata.uppercase=document.getElementById("uppercase").checked
   formdata.duplicates=document.getElementById("duplicates").checked
   formdata.ambiguous=document.getElementById("ambiguous").checked
   console.log(formdata)
}

generatepassword({
    length:25,
    symbols:true,
    digits:true,
    lowercase:true,
    uppercase:true,
    excludeDuplicates:true,
    includeambigious:false
})
function generatepassword(pass){
    console.clear();
    let iplength=pass.length
    let symbols=pass.symbols
    let digits=pass.digits
    let lowercase=pass.lowercase
    let uppercase=pass.uppercase
    let excludeDuplicates=pass.excludeDuplicates
    let includeambiguous=pass.includeambiguous
    let asciiranges=[],password=[]
    if(symbols==1||symbols==true){
        asciiranges.push({min:40,max:45},{min:47,max:47},{min:58,max:58},{min:61,max:61},{min:63,max:64},{min:91,max:95},{min:40,max:45},{min:123,max:125})
    }
    if(digits==1||digits==true){
        asciiranges.push({min:48,max:57})
    }
    if(lowercase==1||lowercase==true){
        asciiranges.push({min:97,max:122})
    }
    if(uppercase==1||uppercase==true){
        asciiranges.push({min:65,max:90})
    }
    if(includeambiguous==1||includeambiguous==true){
        asciiranges.push({min:39,max:39},{min:46,max:46},{min:59,max:60},{min:62,max:62},{min:96,max:96},{min:125,max:125})
    }
     password=passwordgenerator(asciiranges,(iplength-password.length),password)
    if((excludeDuplicates==1)||(excludeDuplicates== true)){
    let password1=[...new Set(password)]
    ;
    while(password1.length<iplength){
        //let remainingLength = iplength - password1.length
        password1=passwordgenerator(asciiranges,(iplength-password.length),password1)
        password1=[...new Set(password1)]
        // remainingLength = iplength - password1.length;
        //console.log(password1);
    }
    password=[...new Set(password1)]
    }
    console.log(`generated password : ${password.join("")}`);      
}
function passwordgenerator(asciiranges,length,password){
    for(let i=0;i<length;i++){
        var picked=asciiranges[Math.floor(Math.random()*asciiranges.length)]
        password.push(String.fromCharCode(Math.floor(Math.random()*(picked.max-picked.min)) + picked.min))
    }
    return password

}

function dummy(){
    document.getElementById("len").innerText=document.getElementById("password-length").value
}
