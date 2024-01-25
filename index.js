let correct_options = document.getElementsByClassName("ans");
let total_score = correct_options.length;  // total score is the number of questions

function submit(){
    
    let score = 0
    for (let i=0; i<correct_options.length; i++){
        if (correct_options[i].checked){
            score++;
        }
    }

    alert(`Your score is: ${score}/${total_score}`);

}