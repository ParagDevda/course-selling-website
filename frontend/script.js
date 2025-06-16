let click =0;
 const c= document.getElementById("courses")
    const p = document.getElementById("purchased");
const space=    document.getElementById("m-right")
function user_info(n){
    click++;
    const name = document.getElementById("name");
    if(click%2!==0){
    name.style.display = "block"

    }else{
        name.style.display = "none"
    }
    
}
let showcourses = true;
async function getcourses(){
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
{showcourses && getcourses();}
// console.log("hello")

function purchased(){
    showcourses= false;
    console.log("hello")
   
    c.style.color="rgb(7, 152, 242)"
    p.style.color ="black"

}