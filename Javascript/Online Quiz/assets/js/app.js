const quiz = new Object();
const answers = {
  _answer: [],
};
var questionNO = 0,
  flag = 0;

// Get QA
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    quiz._data = data;
    function getQuestions(userID) {
      quiz._data.forEach((qa, index) => {
        if (qa.userId == userID) {
          let answers = "";
          let rdc = 0;
          let answerText = qa.body.split("\n");
          let qPoints = ["A", "B", "C", "D"];
          answerText.forEach((i, index) => {
            rdc++;
            answers += `
                <div class="form-check">
                <input class="form-check-input disabled-element" qPoint="${qPoints[index]}" type="radio" name="flexRadioDefault" id="${qa.userId}${qa.id}${rdc}">
                <label class="form-check-label" for="flexRadioDefault1">
                    ${i}
                </label>
            </div>
                `;
          });

          document.querySelector(".cards").insertAdjacentHTML(
            "beforeend",
            `
            <div class="card hidden" id="question-${questionNO}" index="${questionNO}">
                <div class="card-body">
                    <h2 class="card-title text-center mb-4">${
                      questionNO + 1
                    }. Question</h2>
                    <p class="card-text">${qa.title}</p>
                    ${answers}
                </div>
            </div>
                
            `
          );
          questionNO++;
        }
      });
      document.querySelectorAll(".card")[0].classList.remove("hidden");

      function counterController() {
        let counter = 0;
        let indexNumber = 0;
        const counterInterval = setInterval(() => {
          document.querySelector("#down-counter").innerHTML = 30 - counter;
          if (counter < 10 && indexNumber < 10) {
            counter++;
            console.log("counter: ", counter);
          } else if (counter == 10 && indexNumber < 10) {
            counter++;
            document
              .querySelectorAll("#question-" + indexNumber + " input")
              .forEach((i) => {
                i.setAttribute("class", "form-check-input");
              });
            console.log("counter: ", counter);
          } else if (counter > 10 && counter < 30 && indexNumber < 10) {
            counter++;
            console.log("counter: ", counter);
          } else if (counter == 30 && indexNumber < 10) {
            if (
              document.querySelector(
                "#question-" + indexNumber + " input:checked"
              ) != undefined
            ) {
              let qPoint = document
                .querySelector("#question-" + indexNumber + " input:checked")
                .getAttribute("qPoint");
              answers._answer = [
                ...answers._answer,
                {
                  question_number: indexNumber,
                  answer: qPoint,
                },
              ];
            } else {
              answers._answer = [
                ...answers._answer,
                {
                  question_number: indexNumber,
                  answer: "-",
                },
              ];
            }

            document
              .querySelector("#question-" + indexNumber)
              .setAttribute("class", "card hidden");
            indexNumber++;
            if (indexNumber != 10) {
              document
                .querySelector("#question-" + indexNumber)
                .setAttribute("class", "card");
            }
            counter = 0;
          } else if (indexNumber == 10) {
            indexNumber--;
            document
              .querySelector("#question-" + indexNumber)
              .setAttribute("class", "card hidden");
            let answerHTML = ``;
            document
              .querySelector(".table-container.hidden")
              .setAttribute("class", "table-container");
            answers._answer.forEach((answerData, index) => {
              answerHTML += `
                    <tr>
                    <td>${index + 1}</td>
                    <td>${answerData.answer}</td>
                    </tr>
                    `;
            });
            document
              .querySelector("table #answers")
              .insertAdjacentHTML("afterbegin", answerHTML);
            document
              .querySelector("#down-counter")
              .setAttribute("style", "display:none;");
            clearInterval(counterInterval);
          }
        }, 1000);
      }

      counterController();
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var getURID = urlParams.get("id");
    getURID = parseInt(getURID);
    getQuestions(getURID);
  })
  .catch((error) => {
    console.error("Error fetching data: ", error);
  });
