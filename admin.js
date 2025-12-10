 const ADMIN_USER = "r456gaming";const ADMIN_PASS = "Error";
function login() {
  const u = document.getElementById("adminUser").value;


  const p = document.getElementById("adminPass").value;


  if (u === ADMIN_USER && p === ADMIN_PASS) {


    document.getElementById("panel").classList.remove("hidden");
    document.getElementById("loginBox").classList.add("hidden");
  } else {



    alert("Incorrect login");

  }
}

// Add Project (text + link)
function addProject() {
  const title = document.getElementById("projTitle").value;





  const desc = document.getElementById("projDesc").value;












  const link = document.getElementById("projLink").value;













  if (title.length < 3) {
    alert("Project title required.");





    return;
  }

  let projects = JSON.parse(localStorage.getItem("rus_projects") || "[]");







  projects.push({
    title: title,
    description: desc,











    link: link || ""
  });



  localStorage.setItem("rus_projects", JSON.stringify(projects));





  document.getElementById("status").innerText = "Project published!";
  
  
  
  document.getElementById("projTitle").value = "";




  document.getElementById("projDesc").value = "";




  document.getElementById("projLink").value = "";



}
