import axios from 'axios';
import Swal from 'sweetalert2';


function handleAddNewTask() {
  const defaultAssigned_to = this.props.projectTeam[0].fullName;
  const newTask = {
    description: `New Task`,
    scrum_id: this.props.scrumId,
    assigned_to: defaultAssigned_to,
    status: 'To Do',
    action_type: 'Coding'
  }
  axios.post(`/api/v1/tasks/new`, newTask)
    .then(({ data: { data } }) => {
      this.setState(prevState => {
        return { tasks: prevState.tasks.concat(data) }
      })
    })
    .catch(err => this.setState({ error: 'Error' }));
};

function handleEditTask(event, record, column) {
  const { tasks } = this.state;
  //Add a new task
  // if (this.state.newTask || record.id === tasks[tasks.length - 1].id) {
  //   return this.handleAddTask(event, column);
  // }
  //Edit Task
  const newTask = event.target.value;
  const taskId = record.id;
  const clonedTasks = [...tasks];
  const updateTask = clonedTasks.find(task => task.id === taskId);
  updateTask[column] = newTask;

  //No Validate this momemnt, will be edited later.
  this.updateTasks(clonedTasks);
};

function validateTask(task) {
  if (task.priority && isNaN(task.priority)) {
    this.setState({ error: 'Priority should be a number' });
    return false;
  }
  if (task.est_time && isNaN(task.est_time)) {
    this.setState({ error: 'Estimate time should be a number' });
    return false;
  }
  if (task.spent_time && isNaN(task.spent_time)) {
    this.setState({ error: 'Spent time should be a number' });
    return false;
  }
  if(task.total_efforts && isNaN(task.total_efforts)){
    this.setState({ error: 'Total efforts should be a number' });
    return false;
  }
  return true;
};

function handleDeleteTask(id) {
  const { tasks } = this.state;
  const { scrumId, projectId } = this.props.params;
  const deletedTask = tasks.find(task => task.id === id);
  const taskId = deletedTask.id;
  this.deleteSwal().then(response => {
    if (response.value)
      this.confirmDelete(taskId, Number(scrumId), Number(projectId));
  });
};

function deleteSwal() {
  return Swal.fire({
    type: 'warning',
    text: 'Are you sure to delete this task?',
    showConfirmButton: true,
    showCancelButton: true,
    className: 'deletTaskSwal'
  });
};

function confirmDelete(taskId, scrumId, projectId) {
  const { tasks } = this.state;
  const taskIndex = tasks.findIndex(task => task.id === Number(taskId));
  tasks.splice(taskIndex, 1);
  this.setState({ tasks });
  //Fetch to delete task
  axios
    .delete(`/api/v1/tasks/${taskId}`)
    .then(res => {
      if (res.status === 200) {
        Swal.fire('Deleted!', `Your task has been deleted.`, 'success');
      }
    })
    .catch(e => this.setState({ error: 'Task is not Deleted!!' }));
};

function handleChangeScrum(event) {
  const scrumNewName = event.target.value;
  this.setState({ scrumName: scrumNewName });
  this.props.scrumName(scrumNewName);
};

export {
  handleAddNewTask,
  handleEditTask,
  validateTask,
  deleteSwal,
  handleDeleteTask,
  confirmDelete,
  handleChangeScrum,
  };
