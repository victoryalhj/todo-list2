//유저가 값을 입력한다
//+버튼을 클릭하면 할일 추가
//delete버튼을 클릭하면 할일 삭제
//check버튼을 클릭하면 할일이 끝나면서 밑줄이간다
//진행중 끝남 탭을 누르면, 언더바가 이동
//끝난탭은 끝난아이템만, 진행중 탭은 진행중 탭만
//전체탭을 누르면 전체 아이템으로 돌아옴


let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []
addButton.addEventListener("click",addTask)

function addTask() {
  let taskContent = taskInput.value;
  taskList.push(taskContent);
  console.log(taskList);
  render();
}


function render() {
  let resultHTML = '';
  for(let i=0; i<taskList.length; i++) {
    resultHTML += `<div class="task">
          <div>${taskList[i]}</div>
          <div>
            <button>check</button>
            <button>delete</button>
          </div>
        </div>`
  }

  document.getElementById('task-board').innerHTML = resultHTML

}
render();