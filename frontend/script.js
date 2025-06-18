let click =0;
 const c= document.getElementById("courses")
    const p = document.getElementById("purchased");
const space=    document.getElementById("m-right")
async function getName() {
    const token = localStorage.getItem("token");
    const user = await axios.get("http://localhost:3000/user/", {
        headers: {
            Authorization: token
        }
    });
    console.log(user);
    return user.data.name;
}
getName().then(n => {
    // console.log(name);
    fname = n;
});
let fname ;
function user_info(){
    click++;
    const n = document.getElementById("name");
    const h = document.querySelector("#name h2");
    h.innerHTML=fname
    // name.h2.innerHTML="heee";
    if(click%2!==0){
    n.style.display = "block"

    }else{
        n.style.display = "none"
    }
    
}
// console.log(localStorage.getItem("token"))
// let showcourses = true;
async function getcourses(){
    c.style.color="black"
    p.style.color ="rgb(7, 152, 242)"
    let response = await axios.get("http://localhost:3000/course/preview")
    let courses;
    if(response){courses =response.data.courses };
    let clutter="";
    if(courses){
        courses.forEach(element => {
            clutter += ` <div class="cards">
                    <div id="c-upper">
                        <img src="${element.imgUrl}" alt="">
                    </div>
                    <div id="c-lower">
                        <div id="l">
                            <h2>${element.title}</h2>
                            <h4> ${element.description} </h4>
                        </div>
                        <button onclick="buy('${element._id}')">₹${element.price}</button>
                    </div>
                </div>`;
        });
    }
    document.getElementById("m-right").innerHTML =clutter;
}
 getcourses();


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
                    <button>open</button>
                </div>
            </div>`;
        }
    });
     }
   }
    document.getElementById("m-right").innerHTML =clutter;


}

async function buy(n){
    console.log("in buy")
    const token = localStorage.getItem("token")
   const res = await axios.post("http://localhost:3000/course/purchase", {courseId:n},{
        headers:{
            Authorization:token
        }
    })
    console.log(res.data.message)
}


