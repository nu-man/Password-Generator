function dummy() {
    document.getElementById("len").innerText=document.getElementById("password-length").value
}

function objectgen(event) {
    event.preventDefault()
    let a = {}
    a.length = document.getElementById("password-length").value
    a.symbols = document.getElementById("symbols").checked;
    a.digits = document.getElementById("Digits").checked;
    a.lowercase = document.getElementById("Lowercase").checked;
    a.uppercase = document.getElementById("Uppercase").checked;
    a.excludeDuplicates = document.getElementById("Duplicates").checked;
    a.excludeAmbiguos = document.getElementById("Ambiguous").checked;
    generatePassword(a)
}


function generatePassword(a) {

    let iplength = a.length
    let symbols = a.symbols
    let digits = a.digits
    let lowercase = a.lowercase
    let uppercase = a.uppercase
    let excludeDuplicates = a.excludeDuplicates
    let includeAmbiguos = a.excludeAmbiguos
    let asciiranges = [], password = []
    if ((symbols == 1) || (symbols == true)) {
        asciiranges.push({ min: 33, max: 38 }, { min: 40, max: 45 }, { min: 47, max: 47 }, { min: 58, max: 58 }, { min: 61, max: 61 }, { min: 63, max: 64 }, { min: 91, max: 95 }, { min: 123, max: 125 })
    }
    if ((digits == 1) || (digits == true)) {
        asciiranges.push({ min: 48, max: 57 })
    }
    if ((uppercase == 1) || (uppercase == true)) {
        asciiranges.push({ min: 65, max: 90 })
    }
    if ((lowercase == 1) || (lowercase == true)) {
        asciiranges.push({ min: 97, max: 122 })

    }
    if ((includeAmbiguos == 1) || (includeAmbiguos == true)) {
        asciiranges.push({ min: 39, max: 39 }, { min: 46, max: 46 }, { min: 59, max: 60 }, { min: 62, max: 62 }, { min: 96, max: 96 }, { min: 125, max: 125 })

    }
    password = passwordgenerator(asciiranges, (iplength - password.length), password)

    if ((excludeDuplicates == 1) || (excludeDuplicates == true)) {
        let password1 = [...new Set(password)]
        while (password1.length < iplength) {
            password1 = passwordgenerator(asciiranges, (iplength - password1.length), password1)
            password1 = [...new Set(password1)]
        }
        password = [...new Set(password1)]
    }
    document.getElementById("textarea").value = (password.join(""))

}

function passwordgenerator(asciiranges, length, password) {
    for (let index = 0; index < length; index++) {
        var pick = asciiranges[Math.floor(Math.random() * asciiranges.length)];
        password.push(String.fromCharCode(Math.floor(Math.random() * (pick.max - pick.min)) + pick.min))
    }
    return password
}
function copy() {
    navigator.clipboard.writeText(document.getElementById("textarea").value)
    alert("password succesfully copied to clipboard")
}
}
