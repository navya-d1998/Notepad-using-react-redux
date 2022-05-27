import axios from 'axios';
import * as React from 'react';



const KEYS = {
  employees: 'employees',
  employeeId: 'employeeId'
}

export const getDepartmentCollection = () => ([
  { id: '1', title: 'Development' },
  { id: '2', title: 'Marketing' },
  { id: '3', title: 'Accounting' },
  { id: '4', title: 'HR' },
])

export function insertEmployee(data) {
  let employees = getAllEmployees();
  data['id'] = generateEmployeeId()
  employees.push(data)
  localStorage.setItem(KEYS.employees, JSON.stringify(employees))
}

export function updateEmployee(data) {
  let employees = getAllEmployees();
  let recordIndex = employees.findIndex(x => x.id == data.id);
  employees[recordIndex] = { ...data }
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function deleteEmployee(id) {
  let employees = getAllEmployees();
  employees = employees.filter(x => x.id != id)
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function generateEmployeeId() {
  if (localStorage.getItem(KEYS.employeeId) == null)
    localStorage.setItem(KEYS.employeeId, '0')
  var id = parseInt(localStorage.getItem(KEYS.employeeId))
  localStorage.setItem(KEYS.employeeId, (++id).toString())
  return id;
}

export function getAllEmployees() {
  if (localStorage.getItem(KEYS.employees) == null)
    localStorage.setItem(KEYS.employees, JSON.stringify([]))
  let employees = JSON.parse(localStorage.getItem(KEYS.employees));
  let departments = getDepartmentCollection();
  return employees.map(x => ({
    ...x,
    department: departments[x.departmentId - 1].title
  }))
}


export function edittimesheet(setSnackbaropen, setSnackbartype, setSnackbarmsg, employee, timesheetid) {

  console.log("ll")
  var token = localStorage.getItem('token');

  axios.post('https://localhost:44336/api/managerlogin/timesheetedit', {
    id: timesheetid,
    status: employee.status,
    flag: employee.flag,
    comments: employee.comments
  }, { headers: { "Authorization": `Bearer ${token}` } }
  )
    .then(response => {

      setSnackbaropen(true);
      setSnackbartype('success');
      setSnackbarmsg("");


    })
    .catch(error => {



      console.log('error', error);

      if (error.response === 500) {
        setSnackbaropen(true);
        setSnackbartype('error');
        setSnackbarmsg("Something went wrong.");
      }

      else if (error.response === 404) {
        setSnackbaropen(true);
        setSnackbartype('info');
        setSnackbarmsg("Timesheet not found.");
      }
      else {
        setSnackbaropen(true);
        setSnackbartype('error');
        setSnackbarmsg("Something went wrong.");
      }

    });





}






export function addtask(setSnackbaropen, setSnackbartype, setSnackbarmsg, item, projectid) {


  var projectss;

  const fetch = async () => {

    var token = localStorage.getItem('token');

    projectss = await axios.post('https://localhost:44336/api/managerlogin/project_tasks',
      {
        project_id: projectid,
        taskname: item.taskname,
        duration: item.duration
      },
      {
        headers: { "Content-type": "application/json", "Authorization": `Bearer ${token}` },
      }
    )
    console.log(projectss);

    setSnackbaropen(true);
    setSnackbartype("success");
    setSnackbarmsg(" Task has been added!");
  }
  try {
    fetch();
  }
  catch (e) {
    setSnackbaropen(true);
    setSnackbartype('error');
    setSnackbarmsg("Something went wrong.");
    console.log(e);
  }

}

export function changeprojectstatus(setSnackbaropen, setSnackbartype, setSnackbarmsg, projectid) {


  var projectss;

  const fetch = async () => {

    var token = localStorage.getItem('token');

    projectss = await axios.post('https://localhost:44336/api/managerlogin/projectedit',
      {
        id: projectid,
        status: "not alloted"
      },
      {
        headers: { "Content-type": "application/json", "Authorization": `Bearer ${token}` },
      }
    )
    console.log(projectss);

    setSnackbaropen(true);
    setSnackbartype("success");
    setSnackbarmsg(" project status changed!");
  }
  try {
    fetch();

  }
  catch (e) {
    console.log(e);
    setSnackbaropen(true);
    setSnackbartype('error');
    setSnackbarmsg("Something went wrong.");
  }

}


export function GetAllProjects(setRecords, setOpenLoad, showLoader, hideLoader, setSnackbaropen) {

  var projectss;

  const fetch = async () => {


    var token = localStorage.getItem('token');

    console.log(token);

    projectss = await axios.get('https://localhost:44336/api/employeelogin/projects', { headers: { "Authorization": `Bearer ${token}` } }
    )
    console.log(projectss.data);

    setRecords(projectss.data);

    hideLoader();
    setOpenLoad(false);

  };
  try {

    fetch();

  }
  catch (error) {

    hideLoader();

  }

}
export function Getalltasks(id, setTasks, setOpenLoad, showLoader, hideLoader, setSnackbaropen) {

  var projectss;

  const fetch = async () => {

    var token = localStorage.getItem('token');

    console.log(token);

    projectss = await axios.get('https://localhost:44336/api/managerlogin/projecttasks/' + id, { headers: { "Authorization": `Bearer ${token}` } }
    )
    console.log(projectss.data);

    setTasks(projectss.data);

    hideLoader();
    setOpenLoad(false);

  };
  try {

    fetch();

  }
  catch (error) {

    hideLoader();


  }

}
export function GetProjectdetails(id, setProjectdetails, setOpenLoad, showLoader, hideLoader, setSnackbaropen) {

  var projectss;

  const fetch = async () => {

    var token = localStorage.getItem('token');

    console.log(token);

    projectss = await axios.get('https://localhost:44336/api/managerlogin/projectdetails/' + id, { headers: { "Authorization": `Bearer ${token}` } }
    )
    console.log(projectss.data);

    setProjectdetails(projectss.data);

    hideLoader();
    setOpenLoad(false);

  };
  try {

    fetch();

  }
  catch (error) {

    hideLoader();

  }

}

export function GetAllTimesheets(setRecords, setOpenLoad, showLoader, hideLoader, setSnackbaropen) {

  var projectss;

  const fetch = async () => {

    var token = localStorage.getItem('token');

    projectss = await axios.get('https://localhost:44336/api/employeelogin/timesheets1', { headers: { "Authorization": `Bearer ${token}` } }
    )
    console.log(projectss.data);

    setRecords(projectss.data);

    hideLoader();
    setOpenLoad(false);

  };
  try {

    fetch();

  }
  catch (error) {
    hideLoader();
    console.log(error);
    if (error.response.status === 404) {    //hideLoader();
      setSnackbaropen(true);
      setOpenLoad(true);

    }
  }

}

export function GetAllResubbmittedTimesheets(setRecords, setOpenLoad, showLoader, hideLoader, setSnackbaropen) {

  var projectss;

  const fetch = async () => {

    var token = localStorage.getItem('token');

    projectss = await axios.get('https://localhost:44336/api/employeelogin/resubmittimesheets', { headers: { "Authorization": `Bearer ${token}` } }
    )
    console.log(projectss.data);

    setRecords(projectss.data);


    hideLoader();
    setOpenLoad(false);

  };
  try {

    fetch();

  }
  catch (e) {
    hideLoader();
    console.log(e);
    hideLoader();

    if (e.response.status === 404) {

      setOpenLoad(true);

    }
  }

}


export function GetAllpending(setRecords, setOpenLoad, showLoader, hideLoader, setSnackbaropen) {

  var projectss;

  const fetch = async () => {

    var token = localStorage.getItem('token');

    projectss = await axios.get('https://localhost:44336/api/employeelogin/pendingtimesheets', { headers: { "Authorization": `Bearer ${token}` } }
    )
    console.log(projectss.data);

    setRecords(projectss.data);

    hideLoader();
    setOpenLoad(false);

  };
  try {

    fetch();

  }
  catch (e) {
    hideLoader();
    console.log(e);
    hideLoader();

    if (e.response.status === 404) {
      setSnackbaropen(true);

    }
  }

}


export function History(setRecords, setOpenLoad, showLoader, hideLoader, setSnackbaropen) {

  var projectss;

  const fetch = async () => {

    var token = localStorage.getItem('token');

    projectss = await axios.get('https://localhost:44336/api/employeelogin/timesheetshistory', { headers: { "Authorization": `Bearer ${token}` } }
    )
    console.log(projectss.data);

    setRecords(projectss.data);

    hideLoader();
    setOpenLoad(false);

  };
  try {

    fetch();

  }
  catch (e) {

    hideLoader();
    console.log(e);


    if (e.response.status === 404) {
      setSnackbaropen(true);

    }
  }

}


export function GetAllReviewers(setReviewers) {

  var projectss;

  const fetch = async () => {

    var token = localStorage.getItem('token');

    projectss = await axios.get('https://localhost:44336/api/managerlogin/allreviewers', { headers: { "Authorization": `Bearer ${token}` } }
    )

    setReviewers(projectss.data);
    projectss = projectss.data;

    console.log(projectss);


  };
  try {

    fetch();

  }
  catch (e) {

    console.log(e);

  }



}