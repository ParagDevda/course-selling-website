let click =0;
function user_info(name){
    click++;
    const name = document.getElementById("name");
    if(click%2!==0){
    name.style.display = "block"

    }else{
        name.style.display = "none"
    }
    
}
// console.log("hello")