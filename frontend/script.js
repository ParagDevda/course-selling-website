let click =0;
function user_info(n){
    click++;
    const name = document.getElementById("name");
    if(click%2!==0){
    name.style.display = "block"

    }else{
        name.style.display = "none"
    }
    
}

async function getcourses(){
    let response = await axios.get("http://localhost:3000/course/preview")
    // console.log(response.data.courses);
    let courses;
    if(response){courses =response.data.courses };
    console.log(courses)
    let clutter="";
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
    document.getElementById("m-right").innerHTML =clutter;
    console.log(clutter)
   

}
getcourses();
// console.log("hello")