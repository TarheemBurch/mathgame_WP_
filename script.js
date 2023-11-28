const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName");
const dob = document.getElementById("dob");
const age = document.getElementById("age");
const email = document.getElementById("email");
const gender = document.getElementById("gender");
const task = document.getElementById("task");
const registrationForm = document.getElementById("registrationForm");
const register =document.getElementById("register");
const registerButton = document.getElementById("registerButton");
const startButton = document.getElementById("startButton");
const endButton = document.getElementById("endButton");
const checkAnswerButton = document.getElementById("checkAnswerButton");
const nextButton = document.getElementById("nextButton");
const percentageScoreButton = document.getElementById("percentageScoreButton"); 
const equationid =document.getElementById("equationid");
const answerInput = document.getElementById("answerInput");
const showpercentage = document.getElementById("showpercentage");
const showallplayers = document.getElementById("showallplayers");
const playArea = document.getElementById("playArea");
const textAreas = document.getElementById("textAreas");
const chartsContainer = document.getElementById("chartsContainer")

dob.max = new Date().toISOString().split("T")[0];
let answer, player, PlayerRegistrationData =[];

        function calculateAge()
        {
            let today = new Date();
            let birthDate = new Date(dob.value);
            let ageCalculated = today.getFullYear() - birthDate.getFullYear();
                                                   
            age.value = ageCalculated;    
            return ageCalculated;
        }

        function Register()
        {
            
            if ((firstName.value).length <= 4)
            {
                alert("Firstname must be alteast 4 charcters long")
                return;  
            }
            
            if ((lastName.value).length <= 4)
            {
                alert("Lastname must be alteast 4 charcters long")
                return;  
            }
            
            if(dob.value ==='')
            {
                alert("No date of birth selected");
                return;
            }
            
            if(age.value <= 8 || age.value >= 12)
            {
                alert("Age must be within 8 and 12 years");
                return;  
            }
            
            if ((email.value).endsWith("@gmail.com"));
            else
            {
                alert("Email must be of type '@gmail.com");
                return; 
            }   

            if(gender.value !== "M" && gender.value !== "F")
            {
                alert("Ensure gender is 'Male' or 'Female'");
                return; 
            }

            PlayerRegistrationData.push({
                firstName: firstName.value,
                lastName: lastName.value,
                dob: dob.value,
                age: age.value,
                email: email.value,
                gender: gender.value,
                questions: [],
                answers: [],
                correct: 0,
                incorrect: 0
            });
    registrationForm.reset();
    register.style.maxHeight = "0";
    register.style.overflow = 'hidden';
    registerButton.disabled = true;
    startButton.disabled = false;
}

function PlayGame() 
{
    startButton.disabled = true;
    checkAnswerButton.disabled = false;
    nextButton.disabled = true;

    chartsContainer.style.maxHeight = "100%";
    chartsContainer.style.overflow = "visible";

    let num1 = Math.round(Math.random() * 9) + 1;
    let num2 = Math.round(Math.random() * 5) + 1;

    let equation = num1 + " x " + num2 + " = ";
    answer = num1 * num2;

    playArea.style.maxHeight="100%";
    playArea.style.overflow = "visible";

    equationid.textContent = equation;
    answerInput.value = "";
}


function CheckAnswer() 
{
    if(answerInput.value == "")
    {
        alert('No value entred');
    }
    else
    {
        checkAnswerButton.disabled = true;
        endButton.disabled = false;
        percentageScoreButton.disabled =false;
    
        var player = PlayerRegistrationData[PlayerRegistrationData.length - 1];
    
    
        if (parseInt(answerInput.value) === answer) 
        {
            alert('Well Done!!! The answer is correct');
            player.correct++;
            player.questions.push(equationid.textContent);
            player.answers.push(answerInput.value + " (Correct)");
        } 
        else 
        {
            alert("The correct answer is: " + answer);
            player.incorrect++;
            player.questions.push(equationid.textContent);
            player.answers.push(answerInput.value + " (Incorrect)");
        }
        
        nextButton.disabled = false;
        showAllStats();
        findPercentageScore();
    }
}
function End() 
{
    findPercentageScore();
    register.style.maxHeight = "100%";
    register.style.overflow = "visible";
    playArea.style.maxHeight = "0";
    textAreas.style.overflow = "hidden";
    textAreas.style.maxHeight = "0";
    playArea.style.overflow = "hidden";
    playArea.style.maxHeight = "0";
    chartsContainer.style.overflow = "hidden";
    chartsContainer.style.maxHeight = 0;
    endButton.disabled = true;
    startButton.disabled = true;
    checkAnswerButton.disabled = true;
    percentageScoreButton.disabled = true;
    showpercentage.value = "";
    registerButton.disabled = false;
    nextButton.disabled =true;
}


function showAllStats() 
{
    textAreas.style.maxHeight = "100%";
    textAreas.style.overflow ="visible";
    var displayText = "";

    for (var i = 0; i < PlayerRegistrationData.length; i++) {
        var player = PlayerRegistrationData[i];
        displayText += player.firstName + " " + player.lastName + ", Age: " + player.age + "\n";

        for (var j = 0; j < player.questions.length; j++) {
            displayText += "Question: " + player.questions[j] + ", Answer: " + player.answers[j] + "\n";
        }

        var totalQuestions = player.questions.length;
        var correctAnswers = player.correct;
        var incorrectAnswers = player.incorrect;
        var percentage = (correctAnswers / totalQuestions) * 100;

        displayText += "Total Questions: " + totalQuestions + ", Correct Answers: " + correctAnswers +
            ", Incorrect Answers: " + incorrectAnswers + ", Percentage Score: " + percentage.toFixed(2) + "%\n\n";
    }

    showallplayers.value = displayText;
}

function showCharts() {
    var totalPlayers = PlayerRegistrationData.length;
  
    // Calculate gender percentages
    var femaleCount = PlayerRegistrationData.filter(player => player.gender === 'F').length;
    var maleCount = PlayerRegistrationData.filter(player => player.gender === 'M').length;
    var femalePercentage = (femaleCount / totalPlayers) * 100;
    var malePercentage = (maleCount / totalPlayers) * 100;
    // Create gender frequency bar chart using Chart.js
    var canEl = document.getElementById("genderChart").getContext("2d");
        var config = {
            type: "bar",
            data: {
                labels: ["M", "F"],
                datasets: [{
                    label: 'Gender',
                    data: [maleCount, femaleCount],
                    backgroundColor: [
                        'rgba(76, 192, 192, 0.2)',
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(76, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
        var genderChart = new Chart(canEl, config);
    

    
    // Calculate percentage score range percentages
    var scoreRanges = [0, 0, 0, 0, 0, 0, 0];
    PlayerRegistrationData.forEach(player => {
      var percentage = (player.correct / (player.correct + player.incorrect)) * 100;
      if (percentage < 50) scoreRanges[0]++;
      else if (percentage >= 50 && percentage < 60) scoreRanges[1]++;
      else if (percentage >= 60 && percentage < 70) scoreRanges[2]++;
      else if (percentage >= 70 && percentage < 80) scoreRanges[3]++;
      else if (percentage >= 80 && percentage < 90) scoreRanges[4]++;
      else if (percentage >= 90 && percentage < 100) scoreRanges[5]++;
      else if (percentage === 100) scoreRanges[6]++;
    });
  
    // Create percentage score range frequency bar chart
    var scoreChart = "<b>Percentage Score Chart:</b><br>";
    scoreChart += "< 50%: <img src='thinbar.png' height = 20px width='" + scoreRanges[0] * 15 + "px'/> " + (scoreRanges[0] / totalPlayers * 100).toFixed(1) + "%<br>";
    scoreChart += "50-59%: <img src='thinbar.png' height = 20px width='" + scoreRanges[1] * 15 + "px'/> " + (scoreRanges[1] / totalPlayers * 100).toFixed(1) + "%<br>";
    scoreChart += "60-69%: <img src='thinbar.png' height = 20px width='" + scoreRanges[2] * 15 + "px'/> " + (scoreRanges[2] / totalPlayers * 100).toFixed(1) + "%<br>";
    scoreChart += "70-79%: <img src='thinbar.png' height = 20px width='" + scoreRanges[3] * 15 + "px'/> " + (scoreRanges[3] / totalPlayers * 100).toFixed(1) + "%<br>";
    scoreChart += "80-89%: <img src='thinbar.png' height = 20px width='" + scoreRanges[4] * 15 + "px'/> " + (scoreRanges[4] / totalPlayers * 100).toFixed(1) + "%<br>";
    scoreChart += "90-99%: <img src='thinbar.png' height = 20px width='" + scoreRanges[5] * 15 + "px'/> " + (scoreRanges[5] / totalPlayers * 100).toFixed(1) + "%<br>";
    scoreChart += "100%: <img src='thinbar.png' height = 20px width='" + scoreRanges[6] * 15 + "px'/> " + (scoreRanges[6] / totalPlayers * 100).toFixed(1) + "%<br>";
  
    document.getElementById("showcharts").innerHTML = scoreChart;
  }
  

function findPercentageScore() {
    var player = PlayerRegistrationData[PlayerRegistrationData.length - 1];
    var totalQuestions = player.questions.length;
    var correctAnswers = player.correct;
    var percentage = (correctAnswers / totalQuestions) * 100;

    var displayText = player.firstName + " " + player.lastName + ": " +
        "Total Questions: " + totalQuestions + ", " +
        "Correct Answers: " + correctAnswers + ", " +
        "Percentage Score: " + percentage.toFixed(2) + "%";

    document.getElementById("showpercentage").value = displayText;
}


// Call showCharts() every 1 seconds after the page loads
window.onload = function () {
    showCharts();
    setInterval(showCharts, 1000);
}
// perloader
var loader = document.getElementById("preloader");
window.addEventListener("load", function () {
    loader.style.display = "none"
})

