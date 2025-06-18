let click =0;
 const c= document.getElementById("courses")
    const p = document.getElementById("purchased");
const space=    document.getElementById("m-right")
 async function getName(){
    const token = localStorage.getItem("token")
    const user = await axios.get("http://localhost:3000/user/",{
        headers:{
            Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjljOTI0ZTc2NDQ3YWU5MzY1MDc1ZiIsImlhdCI6MTc1MDI2OTcwOX0.hEn74rs1sq8XSz-9DYGAdWRwJcWZnLNAR7RnkQFoWJc"
        }
    })
    console.log(user)
    return user.data.name;
}
const name = getName();
console.log(name);
function user_info(n){
    click++;
    const name = document.getElementById("name");
    if(click%2!==0){
    name.style.display = "block"

    }else{
        name.style.display = "none"
    }
    
}
// console.log(localStorage.getItem("token"))
// let showcourses = true;
async function getcourses(){
    c.style.color="black"
    p.style.color ="rgb(7, 152, 242)"
    let response = await axios.get("http://localhost:3000/course/preview")
    // console.log(response.data.courses);
    let courses;
    if(response){courses =response.data.courses };
    console.log(courses)
    let clutter="";
   if(courses){
     courses.forEach(element => {
        clutter += ` <div class="cards">
                <div id="c-upper">
                    <img src=${element.imgUrl} alt="">
                </div>
                <div id="c-lower">
                    <div id="l">
                        <h2>${element.title}</h2>
                        <h4> ${element.description} </h4>
                    </div>
                    <button>₹${element.price}</button>
                </div>
            </div>`;
    });
   }
    document.getElementById("m-right").innerHTML =clutter;
    console.log(clutter)
    console.log("hhhhhhh")
   

}
 getcourses();
// console.log("hello")

async function purchased(){
 
    console.log("hello")
   
    c.style.color="rgb(7, 152, 242)"
    p.style.color ="black"
    const token = localStorage.getItem("token")
    let response = await axios.get("http://localhost:3000/user/purchases",{
        headers:{
            Authorization:token
        }
    });
    console.log(response.data.courses)
      let courses;
    if(response){courses =response.data.courses };
    console.log(courses)
    console.log(courses.length)
    let clutter="";
   if(courses){
     if(courses.length==0){
        clutter=`<h4>you haven't brought any course!</h4>`
     }else{
        courses.forEach(element => {
        if(element==null){console.log(null)}else{
            clutter += ` <div class="cards">
                <div id="c-upper">
                    <img src=${element.imgUrl} alt="">
                </div>
                <div id="c-lower">
                    <div id="l">
                        <h2>${element.title}</h2>
                        <h4> ${element.description} </h4>
                    </div>
                    <button>₹${element.price}</button>
                </div>
            </div>`;
        }
    });
     }
   }
    document.getElementById("m-right").innerHTML =clutter;


}