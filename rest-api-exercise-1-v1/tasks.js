function task1() {
  return fetch("http://localhost:3000"); // TODO: replace this
}

async function task2() {
  const response = await fetch("http://localhost:3000/task2",{ 
 method:"PATCH",})
  return response.json();
}

function task3() {
  const paramsObj = { user_id: 3, role: "admin" };
  const searchParams = new URLSearchParams(paramsObj);
  return fetch(`http://localhost:3000/task3?${searchParams}`, {
    method: "POST",
  });
}

function task4() {
  return fetch("http://localhost:3000/task4",{
    method:"POST",
    body: JSON.stringify({
      username: "admin",
      password: "password",
  }),
  headers:{
    "Content-Type":"application/json",
  },
  }) 
}

export { task1, task2, task3, task4 };
