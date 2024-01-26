let page0 = document.getElementById("page0"); // title screen
let page1 = document.getElementById("page1"); // first page of questions
let page2 = document.getElementById("page2");
let page3 = document.getElementById("page3");
let page4 = document.getElementById("page4");
let page5 = document.getElementById("page5");

let correct_options = document.getElementsByClassName("ans");
let total_score = correct_options.length;  // total score is the number of questions
let page_index = 0;

const ID_LIST = ["page0", "page1", "page2", "page3", "page4", "page5"];

let init_page = document.getElementById(ID_LIST[page_index]);
init_page.style.display = "block";

function start(){
    page0.style.display = "none";
    page1.style.display = "block";
    page_index = 1;
}

function next(){
    let cur_page = document.getElementById(ID_LIST[page_index]);
    let next_page = document.getElementById(ID_LIST[page_index + 1]);
    console.log(cur_page,next_page);
    cur_page.style.display = "none";
    next_page.style.display = "block";
    page_index ++;
    window.scrollTo(0, document.body.scrollHeight);
}

function prev(){
    let cur_page = document.getElementById(ID_LIST[page_index]);
    let prev_page = document.getElementById(ID_LIST[page_index - 1]);
    console.log(cur_page,prev_page);
    cur_page.style.display = "none";
    prev_page.style.display = "block";
    page_index --;
    window.scrollTo(0, document.body.scrollHeight);
}


function submit(){
    
    let score = 0
    for (let i=0; i<correct_options.length; i++){
        if (correct_options[i].checked){
            score++;
        }
    }

    alert(`Your score is: ${score}/${total_score}`);

}