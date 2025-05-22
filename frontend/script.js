const sign_in = document.getElementById("sign-in");
const sign_up =document.getElementById("sign-up");
const img = document.querySelector("#left img");
const lower = document.getElementById("lower");
sign_in.addEventListener("click",function(){
    console.log("sign in...");
    let clutter = `<h3><span>*</span>Email</h4>
                    <input id="email" type="text" placeholder="Enter Your Email">
                <h3><span>*</span>Password</h4>
                    <input id="Password" type="password" placeholder="Enter Your Password">
                <button id="sign-in-btn" onclick="sign_in_fun()">Sign In</button>`
    lower.innerHTML = clutter;
    sign_in.style.color = "#1678ff";
    sign_up.style.color = "#000";
    img.src = "../components/login_img.png"
})
sign_up.addEventListener("click",function(){
    console.log("sign up");
    let clutter = `<h3><span>*</span>Email</h4>
                    <input id="email" type="text" placeholder="Enter Your Email">
                <h3><span>*</span>Password</h4>
                    <input id="Password" type="password" placeholder="Password must cantain(capital & small letters and special character)">
                <h3><span>*</span>First Name</h4>
                    <input id="Fname" type="text" placeholder="Enter Your First Name">
                <h3><span>*</span>Last Name</h4>
                    <input id="Lname" type="text" placeholder="Enter Your Last Name">
                <button id="sign-up-btn" onclick="sign_up_fun()">Sign Up</button>`
    lower.innerHTML = clutter;
    sign_up.style.color = "#1678ff";
     sign_in.style.color = "#000";
    img.src = "../components/signin_img.png"
})

async function sign_in_fun(){
    const email = document.getElementById("email").value;
    const password  = document.getElementById("Password").value;
    const res = await axios.post("http://localhost:3000/user/login",{
        email:email,
        Password:password
    })
    localStorage.setItem("token",res.data.token);
    console.log(res.data);
}
async function sign_up_fun(){
      const email = document.getElementById("email").value;
    const password  = document.getElementById("Password").value;
      const Fname = document.getElementById("Fname").value;
    const Lname  = document.getElementById("Lname").value;
    if(email==""||password==""||Lname==""||Fname==""){
        alert("enter right credential")
    }else{
       try {
         const res = await axios.post("http://localhost:3000/user/signup",{
            email:email,
            Password:password,
            FirstName:Fname,
            LastName:Lname
        })
        console.log(res.data.message)
        
        
       } catch (error) {
           console.log("there is some error");
       }
    }
    
}



