//유저가 값을 입력한다
//+버튼을 클릭하면 할일 추가
//delete버튼을 클릭하면 할일 삭제
//check버튼을 클릭하면 할일이 끝나면서 밑줄이간다
//1.check버튼을 클릭하는 순간 true > false
//2.true이면 끝난걸로 간주하고 밑줄 보여주기
//3.false이면 안끝난걸로 간주하고 그대로

//진행중 끝남 탭을 누르면, 언더바가 이동
//끝난탭은 끝난아이템만, 진행중 탭은 진행중 탭만
//전체탭을 누르면 전체 아이템으로 돌아옴


let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let tabsUnderLinde = document.getElementById("under-line");
let taskList = [];
let mode = "all";
let filterList = [];


//누나의 유투브 영상을 참고해서 예쁜 슬라이드바 만들기
tabs.forEach(menu=>menu.addEventListener("click",(e)=>tabsIndicator(e)))

function tabsIndicator(e) {
  tabsUnderLinde.style.left = e.currentTarget.offsetLeft + "px";
  tabsUnderLinde.style.width = e.currentTarget.offsetWidth + "px";
  tabsUnderLinde.style.top =
    e.currentTarget.offsetTop  + e.currentTarget.offsetHeight + "px";
}

//입력한 할일이 없다면 아이템이 추가 안되게 막아보자!( 버튼을 disable) 
addButton.addEventListener("click",addTask)
taskInput.addEventListener("input",function(){
  if (taskInput.value.trim() === "") {
    addButton.disabled = true;
  }else {
    addButton.disabled = false;
  }
})

//Enter 버튼 클릭하면 자동으로 아이템 추가하기
taskInput.addEventListener("keydown",function(e){
  if(e.key === "Enter") {
    addTask();
  }
})

for(let i=1; i<tabs.length; i++){
  tabs[i].addEventListener("click",function(event){
    filter(event);
  });
}
//할일추가
function addTask() {
  let taskContent = taskInput.value.trim();
  if(taskContent ==="")
    return;

  let task = {
    id:randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false
  };

  taskList.push(task);
  taskInput.value= "";
  addButton.disabled = true;
  // console.log(taskList);
  render();
}


//taskList를 그려줌
//진행중 또는 끝남 tab에서 아이템을 삭제하면 바로 적용되게 해보기
function render() {
  let list = [];
  if(mode==="all"){
    list = taskList;
  }else if(mode === "ongoing"){
    list = taskList.filter(task => !task.isComplete);
  }else if(mode === "done") {
    list = taskList.filter(task => task.isComplete);
  }

 let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete) {
      resultHTML += `<div class="task task-complete">
          <div class="task-done">${list[i].taskContent}</div>
          <div>
            <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-undo"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>`;
    } else {
      resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
          <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for(let i=0; i<taskList.length; i++){
    if(taskList[i].id == id){
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}

function deleteTask(id) {
  for(let i=0; i<taskList.length; i++){
    if(taskList[i].id == id){
      taskList.splice(i,1)
      break;
    }
  }
  render();
}

//filter
function filter(event){
  mode = event.target.id;
  filterList = [];
  if(mode === "all"){
    //ALL
    render()
  }else if(mode === "ongoing"){
    //NOT DONE task.isComplete=false
    for(let i=0; i<taskList.length; i++){
      if(taskList[i].isComplete === false){
        filterList.push(taskList[i])
      }
    }
    render();
  }else if(mode === "done"){
    //DONE task.isComplete=true
    for(let i=0; i<taskList.length; i++){
      if(taskList[i].isComplete === true){
        filterList.push(taskList[i])  
      }
    }
    render();
  }
}

function randomIDGenerate() {
  return '_' + Math.random().toString(36).substr(2, 9);
}