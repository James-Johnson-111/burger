function submition() {
    const value1 = document.getElementById("usrname").value;
    const value2 = document.getElementById("usremail").value;
    const value3 = document.getElementById("usrhouse").value;
    const value4 = document.getElementById("usrstreet").value;
    const value5 = document.getElementById("usrsector").value;
    const value6 = document.getElementById("usrtown").value;
    const value7 = document.getElementById("delmode").value;
    const validate1 = /^[A-Za-z]+$/;
    const validate2 = /^[0-9]+$/;
    switch (true) {
        case (value1 == ""):
        document.getElementById("error1").innerHTML="First Name must required";
        return false;
        break;
        case (value2 == ""):
        document.getElementById("error2").innerHTML="Last Name must required";
        return false;
        break;
        case (value3 == ""):
        document.getElementById("error3").innerHTML="Email must required";
        return false;
        break;
        case (value4 == ""):
        document.getElementById("error4").innerHTML="Address must required";
        return false;
        break;
        case (value5 == ""):
        document.getElementById("error5").innerHTML="Password must required";
        return false;
        break;
        case (value6 == ""):
        document.getElementById("error6").innerHTML="confirmation must required";
        return false;
        break;
        case (value7 == ""):
        document.getElementById("error8").innerHTML="Mobile No. must required";
        return false;
        break;
    }
    // if (value1.match(validate1)) {
    //     true;
    // }else {
    //     document.getElementById("error1").innerHTML="Name only contains letters";
    //     return false;
    // }
    // if (value1.match(validate1)) {
    //     true;
    // }else {
    //     document.getElementById("error2").innerHTML="Name only contains letters";
    //     return false;
    // }
    // if (value1.match(validate2)) {
    //     true;
    // }else {
    //     document.getElementById("error8").innerHTML="Cell only contains numbers";
    //     return false;
    // }
    // switch (true) {
    //     case (a.length < 3):
    //     document.getElementById("error1").innerHTML="Name must contains 3 letters";
    //     return false;
    //     break;
    //     case (b.length < 3):
    //     document.getElementById("error2").innerHTML="Name must contains 3 letters";
    //     return false;
    //     break;
    //     case (d.length < 10):
    //     document.getElementById("error4").innerHTML="address must contains 10 letters";
    //     return false;
    //     break;
    //     case (e.length < 5):
    //     document.getElementById("error5").innerHTML="password must contains 5 letters";
    //     return false;
    //     break;
    //     case (f.length < 5):
    //     document.getElementById("error6").innerHTML="password must contains 5 letters";
    //     return false;
    //     break;
    //     case (h.length < 11):
    //     document.getElementById("error8").innerHTML="cell must contains 12 letters";
    //     return false;
    //     break;
    // }
    // if ((h.charAt(h.length-0)!='0') && (h.charAt(h.length-1)!='3')) {
    //     document.getElementById("error8").innerHTML="this is not a valid number";
    //     return false;
    // }
    // if ((c.charAt(c.length-4)!='.') && (c.charAt(c.length-3)!='.')) {
    //     document.getElementById("error3").innerHTML="Email is not valid";
    //     return false;
    // }
    // if (e != f) {
    //     document.getElementById("error5").innerHTML="password do not match";
    //     document.getElementById("error6").innerHTML="password do not match";
    //     return false;
    // }
}