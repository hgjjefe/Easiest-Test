let page0 = document.getElementById("page0"); // title screen
let page1 = document.getElementById("page1"); // first page of questions
let page2 = document.getElementById("page2");
let page3 = document.getElementById("page3");
let page4 = document.getElementById("page4");
let page5 = document.getElementById("page5");
let page6 = document.getElementById("page6");

let radio_buttons = document.querySelectorAll('input[type="radio"]');
let submitBtn = document.getElementById("submitBtn");
for (let i=0;i<radio_buttons.length; i++){
    if ( i % 4 == 0){
        radio_buttons[i].value = "A";
    }else if ( i % 4 == 1){
        radio_buttons[i].value = "B";
    }else if ( i % 4 == 2){
        radio_buttons[i].value = "C";
    }else if ( i % 4 == 3){
        radio_buttons[i].value = "D";
    }
}


let correct_options = document.getElementsByClassName("ans");
let total_score = correct_options.length;  // total score is the number of questions
let page_index = 0;
let submitted = false;
let selected_ans = [0];  
let correct_ans = [0, 
'D','D','B','A','B','A','D','C','B','C',
'A','B','A','A','C','B','A','B','C','C',
'C','A','D','D','B','C','A','C','C','B',
'D','C','D','A','C','D','D','D','D','B',
'B','A','B','C','A'
]

const ID_LIST = ["page0", "page1", "page2", "page3", "page4", "page5", "page6"];

let init_page = document.getElementById(ID_LIST[page_index]);
init_page.style.display = "block";

// TIMER
let timer = document.getElementById("timer");
let display = document.getElementById("display");
timer.style.display = "none";

let counter = null;
let startTime = 0;
let elapsedTime = 0;
let timeAllowed = 135 * 60 * 1000;  // 135 minutes or any other value
let remainingTime = timeAllowed;
let isRunning = false;

// BUTTONS
function start(){
    page0.style.display = "none";
    page1.style.display = "block";
    timer.style.display = "block";
    page_index = 1;
    timerStart();
}

function next(){
    let cur_page = document.getElementById(ID_LIST[page_index]);
    let next_page = document.getElementById(ID_LIST[page_index + 1]);
    console.log(cur_page,next_page);
    cur_page.style.display = "none";
    next_page.style.display = "block";
    if (submitted && page_index == 4){
        page6.style.display = "block";  // show answers on last page if submitted
    }

    page_index ++;
    window.scrollTo(0, document.body.scrollHeight);
}

function prev(){
    let cur_page = document.getElementById(ID_LIST[page_index]);
    let prev_page = document.getElementById(ID_LIST[page_index - 1]);
    console.log(cur_page,prev_page);
    cur_page.style.display = "none";
    prev_page.style.display = "block";
    page6.style.display = "none";

    page_index --;
    window.scrollTo(0, document.body.scrollHeight);
}


function submit(){
    submitted = true;
 
    // store the user answers in a list
    for (let i = 0; i < radio_buttons.length; i+=4) {
        if (radio_buttons[i].checked){
            selected_ans.push("A");
        }else if (radio_buttons[i+1].checked){
            selected_ans.push("B");
        }else if (radio_buttons[i+2].checked){
            selected_ans.push("C");
        }else if (radio_buttons[i+3].checked){
            selected_ans.push("D");
        }else{
            selected_ans.push("null");
        }
    }

    for (let i = 0; i < radio_buttons.length; i++) {
        radio_buttons[i].disabled = true;  // disabled radio buttons
    }
    submitBtn.disabled = true;
    
    let score = 0    // calculate score
    for (let i=0; i<correct_options.length; i++){
        if (correct_options[i].checked){
            score++;
        }
    }
    timerStop();
    if (remainingTime <= 0){
        alert("Time is up!");
    }
    let score_message = `Your score: ${score}/${total_score}`;
    alert(score_message);
    page6.innerHTML = score_message;
    page6.style.fontSize = "30px";

    if (page_index == 5){
        page6.style.display = "block";
    }
    
    createTable();
}

function createTable(){  // table for user to check answer
    let table = document.createElement("table");
    
    let row1 = document.createElement("tr");
    let cell1 = document.createElement("th");
    cell1.textContent = "Question no.";
    let cell2 = document.createElement("th");
    cell2.textContent = "Your answer";
    let cell3 = document.createElement("th");
    cell3.textContent = "Correct answer";
    row1.appendChild(cell1);
    row1.appendChild(cell2);
    row1.appendChild(cell3);
    table.appendChild(row1);

    for (let i=1;i<46;i++){
        let row = document.createElement("tr");
        let cell1 = document.createElement("td");
        cell1.textContent = i;
        let cell2 = document.createElement("td");
        cell2.textContent = selected_ans[i];
        let cell3 = document.createElement("td");
        cell3.textContent = correct_ans[i];
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        table.appendChild(row);
    }
    
    
    page6.appendChild(table);
}


// TIMER FUNCTIONS
function timerStart(){
    if (!isRunning){
        startTime = Date.now() - elapsedTime;
        counter = setInterval(timerUpdate,10);
        isRunning = true;
    }
}
function timerStop(){
    if (isRunning){
        clearInterval(counter);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}
function timerReset(){
    clearInterval(counter);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "02:15:00.00";
}

function timerUpdate(){
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    remainingTime = timeAllowed - elapsedTime;
    if (remainingTime <= 0){
        submit();
        remainingTime = 0;
    }

    let hours = Math.floor(remainingTime / (1000 * 60 * 60));
    let minutes = Math.floor(remainingTime / (1000 * 60) % 60);
    let seconds = Math.floor(remainingTime / (1000) % 60);
    let milliseconds = Math.floor(remainingTime % 1000 / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    display.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}