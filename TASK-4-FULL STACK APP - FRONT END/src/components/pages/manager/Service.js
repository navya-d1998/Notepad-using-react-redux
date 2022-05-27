import { PinDropSharp } from '@material-ui/icons';
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
      setSnackbarmsg("Timesheet Reviewed Successfully");


    })
    .catch(error => {



      console.log('error', error);

      if (error.response.status === 500) {
        setSnackbaropen(true);
        setSnackbartype('error');
        setSnackbarmsg("Something went wrong.");
      }

      else if (error.response.status === 404) {
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
    setSnackbartype("error");
    setSnackbarmsg("Something went wrong try again!");
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
    setSnackbartype("error");
    setSnackbarmsg("Something went wrong try again!");
  }

}
export function addproject(setSnackbaropen, setSnackbartype, setSnackbarmsg, item) {

  console.log(item);
  var projectss;

  const fetch = async () => {

    var token = localStorage.getItem('token');

    projectss = await axios.post('https://localhost:44336/api/managerlogin/project1',
      {
        nameofservice: item.nameofservice,
        fromdate: item.fromdate,
        todate: item.todate,
        reviewr_id: item.reviewr_id,
        manager_id: "774a8edb-6554-46d4-85d1-1d4f6911af7d",
        project_status: "created",
        Project_details: item.Project_details
      },
      {
        headers: { "Content-type": "application/json", "Authorization": `Bearer ${token}` },
      }
    )
    console.log(projectss);

    setSnackbaropen(true);
    setSnackbartype("success");
    setSnackbarmsg(" project has been added!");


  }

  try {
    fetch();

  }
  catch (e) {
    console.log(e);
    setSnackbaropen(true);
    setSnackbartype("error");
    setSnackbarmsg("Something went wrong try again!");
  }

}



export function GetAllProjects(setRecords, setOpenLoad, showLoader, hideLoader, setSnackbaropen) {

  var projectss;

  const fetch = async () => {


    var token = localStorage.getItem('token');

    console.log(token);

    projectss = await axios.get('https://localhost:44336/api/managerlogin/createdprojects', { headers: { "Authorization": `Bearer ${token}` } }
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


export function GetAllTimesheets(setRecords, setOpenLoad, showLoader, hideLoader, setSnackbaropen) {

  var projectss;

  const fetch = async () => {

    var token = localStorage.getItem('token');

    projectss = await axios.get('https://localhost:44336/api/managerlogin/viewtimesheets', { headers: { "Authorization": `Bearer ${token}` } }
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

    if (error.response.status === 404) {
      setSnackbaropen(true);

    }
  }

}

export function GetAllResubmittedTimesheets(setRecords, setOpenLoad, showLoader, hideLoader, setSnackbaropen) {
  var projectss;

  const fetch = async () => {

    var token = localStorage.getItem('token');

    projectss = await axios.get('https://localhost:44336/api/managerlogin/viewresubmittedtimesheets', { headers: { "Authorization": `Bearer ${token}` } }
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



export function GetProjectdetails(id, setProjectdetails, setOpenLoad, showLoader, hideLoader, setSnackbaropen, history) {
  var projectss;

  const fetch = async () => {


    var token = localStorage.getItem('token');

    console.log(token);

    projectss = await axios.get('https://localhost:44336/api/managerlogin/projectdetails/' + id, { headers: { "Authorization": `Bearer ${token}` } }
    )
    console.log(projectss.data);

    setProjectdetails(projectss.data);

    hideLoader();

  };
  try {

    fetch();

  }
  catch (error) {

    hideLoader();

    if (error.response.status === 404) {
      console.log(error)
      history.push('/');
      setOpenLoad(true);
    }


  }

}


export function Approveproject(setSnackbaropen, setSnackbartype, setSnackbarmsg, projectid) {

  var projectss;

  const fetch = async () => {

    var token = localStorage.getItem('token');

    projectss = await axios.post('https://localhost:44336/api/managerlogin/projectedit',
      {
        id: projectid,
        status: "approved"
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
    setSnackbartype("error");
    setSnackbarmsg("Something went wrong try again!");
  }

}

export function Pendingproject(setSnackbaropen, setSnackbartype, setSnackbarmsg, projectid) {

  var projectss;

  const fetch = async () => {

    var token = localStorage.getItem('token');

    projectss = await axios.post('https://localhost:44336/api/managerlogin/projectedit',
      {
        id: projectid,
        status: "pending"
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
    setSnackbartype("error");
    setSnackbarmsg("Something went wrong try again!");
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


