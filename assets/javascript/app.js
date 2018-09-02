var questions = [
  {
    question: "From which country do Frech fries originate?",
    answers: [
      {
        text: "Belgium",
        isCorrect: true
      },
      {
        text: "France",
        isCorrect: false
      },
      {
        text: "Germany",
        isCorrect: false
      },
      {
        text: "United Kingdom",
        isCorrect: false
      }
    ],
    image: "fries.jpg"
  },
  {
    question: "What color are aircraft black boxes?",
    answers: [
      {
        text: "Red",
        isCorrect: false
      },
      {
        text: "Black",
        isCorrect: false
      },
      {
        text: "Orange",
        isCorrect: true
      },
      {
        text: "Blue",
        isCorrect: false
      }
    ],
    image: "black_box.jpg"
  },
  {
    question: "The average person does what thirteen times a day?",
    answers: [
      {
        text: "Touch their face",
        isCorrect: false
      },
      {
        text: "Laugh",
        isCorrect: true
      },
      {
        text: "Urinate",
        isCorrect: false
      },
      {
        text: "Curse",
        isCorrect: false
      }
    ],
    image: "laugh.jpg"
  },
  {
    question: "In California you can't legally buy a mousetrap without _________?",
    answers: [
      {
        text: "an ID",
        isCorrect: false
      },
      {
        text: "a hunting license",
        isCorrect: true
      },
      {
        text: "cash",
        isCorrect: false
      },
      {
        text: 'saying "please"',
        isCorrect: false
      }
    ],
    image: "hunting_license.jpg"
  },
  {
    question: "Who is the sister-in-law of your dad's only brother?",
    answers: [
      {
        text: "Your grandmother",
        isCorrect: false
      },
      {
        text: "Your aunt",
        isCorrect: false
      },
      {
        text: "Your mother",
        isCorrect: true
      },
      {
        text: "Your sister",
        isCorrect: false
      }
    ],
    image: "mom.jpg"
  },
  {
    question: "What did Einstein call \"the most difficult thing to understand\"?",
    answers: [
      {
        text: "His mother",
        isCorrect: false
      },
      {
        text: "Politics",
        isCorrect: false
      },
      {
        text: "Quantum physics",
        isCorrect: false
      },
      {
        text: 'Income Taxes',
        isCorrect: true
      }
    ],
    image: "income_tax.jpg"
  }
];

// Declare global variables
var currentQuestionNumber = 0;
var currentQuestionObj = questions[currentQuestionNumber];
var seconds = 30;
var secondsInterval;
var messageTimeout;
var totalCorrect = 0;
var totalIncorrect = 0;
var totalUnanswered = 0;
var correct;

function resetTotals() {
  totalCorrect = 0;
  totalIncorrect = 0;
  totalUnanswered = 0;
  currentQuestionNumber = 0;
}

$(document).ready(function () {

  // Declare DOM nodes
  var $timeRemaining = $('#time-remaining');
  var $seconds = $('#seconds');
  var $question = $('#question');
  var $answerList = $('#answer-list');
  var $answer1 = $('#answer-list li:nth-child(1)');
  var $answer2 = $('#answer-list li:nth-child(2)');
  var $answer3 = $('#answer-list li:nth-child(3)');
  var $answer4 = $('#answer-list li:nth-child(4)');
  var $message = $('#message');
  var $correctAnswer = $('#correct-answer');
  var $image = $('#image');
  var $results = $('#results');
  var $start = $('#start');

  // Hide elements that aren't needed on page load
  $timeRemaining.hide();
  $question.hide();
  $answerList.hide();
  $message.hide();
  $correctAnswer.hide();
  $image.hide();
  $results.hide();

  function startTimer() {
    // Clear any already started timer
    clearInterval(secondsInterval);
    // Start an interval that fires the countdown every second
    secondsInterval = setInterval(countDown, 1000);
    seconds = 30;
    $seconds.text(seconds);
    $timeRemaining.show();
  }

  function stopTimer() {
    clearInterval(secondsInterval);
  }

  function hideQuestion() {
    $question.hide();
    $answerList.hide();
  }

  function showMessage(message) {
    $message.show();
    $message.text(message);
  }

  function countDown() {
    seconds--;

    //  Display the number of seconds remaining
    $seconds.text(seconds);

    //  Once number hits zero...
    if (seconds === 0) {
      endQuestion('You ran out of time!');
      totalUnanswered++;
    }
  }

  function endQuestion(message) {
    stopTimer();
    hideQuestion();
    // Display answer for 4 seconds
    showMessage(message);
    displayAnswer();

    setTimeout(setNextQuestion, 4000)
  }
  function setNextQuestion() {
    currentQuestionObj = questions[currentQuestionNumber];
    $message.hide();
    $correctAnswer.hide();
    $image.hide();
    startQuestion();
  }
  function displayAnswer() {
    // Loop through the current question to find the correct answer
    for (var i = 0; i < currentQuestionObj.answers.length; i++) {

      // Display the correct answer when it is found
      if (currentQuestionObj.answers[i].isCorrect) {        
        $correctAnswer.html("The correct answer was: <span class=\"green\">" + currentQuestionObj.answers[i].text + "</span>");
        var image = "assets/images/" + currentQuestionObj.image;
        console.log(image);
        $image.attr("src", image);
        $image.show();
      }
    };
    // Only display the correct answer if the user got it wrong
    if (!correct) {
      $correctAnswer.show();
    }
  }

  function startQuestion() {
    $message.hide();
    currentQuestionObj = questions[currentQuestionNumber];

    // Only jump into the next question if there are questions remaining
    if (currentQuestionNumber < questions.length) {
      currentQuestionNumber++;
      startTimer();

      // show time, question, and answers
      $question.show();
      $answerList.show();
      
      // Display text changes
      $question.text(currentQuestionObj.question);
      $answer1.text(currentQuestionObj.answers[0].text);
      $answer2.text(currentQuestionObj.answers[1].text);
      $answer3.text(currentQuestionObj.answers[2].text);
      $answer4.text(currentQuestionObj.answers[3].text);

      // Assign "correct" data to the answer if it exists
      $answer1.data('correct', currentQuestionObj.answers[0].isCorrect);
      $answer2.data('correct', currentQuestionObj.answers[1].isCorrect);
      $answer3.data('correct', currentQuestionObj.answers[2].isCorrect);
      $answer4.data('correct', currentQuestionObj.answers[3].isCorrect);
    } else {
      // If no questions are left, display the results
      showMessage("All done, here's how you did!");
      $timeRemaining.hide();
      $results.html(
        '<p>Correct Answers: ' + totalCorrect + '<br>' + 
        'Incorrect Answers: ' + totalIncorrect + '<br>' +
        'Unanswered: ' + totalUnanswered + '</p>'
      );
      $results.show();
      $start.text('Start Over?');
      $start.show();

      // After displaying results, reset totals in preparation for next round
      resetTotals();
    }
  };

  // Press start to start the game
  $start.on('click', function () {
    
    resetTotals();
    $results.hide();
    $start.hide();

    startQuestion();
  });

  // When the user clicks an answer, check if it's correct
  $answerList.on('click', 'li', function () {
      var message;
      if ($(this).data('correct')) {
        message = "Correct!"
        totalCorrect++;
        correct = true;
      } else {
        message = "Nope!";
        totalIncorrect++;
        correct = false;
      }
      
      endQuestion(message)
  });
});