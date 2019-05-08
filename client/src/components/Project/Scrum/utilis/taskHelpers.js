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
      }, () => {
        this._focused.current.focus();
      })
    })
    .catch(err => this.setState({ error: 'Error' }));
};

function handleEditTask(event, record, column) {
  const { tasks } = this.state;
  const newTask = event.target.textContent.trim();
  const taskId = record.id;
  const prevTasks = [...tasks];
  const updatedTask = prevTasks.find(task => task.id === taskId);
  updatedTask[column] = newTask;

  if (this.validateTask(updatedTask)) {
    if (!updatedTask.priority) {
      updatedTask.priority = null;
    }
    if (!updatedTask.spent_time) {
      updatedTask.spent_time = null;
    }
    if (!updatedTask.total_efforts) {
      updatedTask.total_efforts = null;
    }
    if (!updatedTask.estimated_time) {
      updatedTask.estimated_time = null;
    }
    axios.put(`/api/v1/tasks/${taskId}`, updatedTask)
      .then((result) => {
        this.setState({ tasks: prevTasks })
      })
      .catch(error => {
        this.setState({ error: 'Error' })
      })
  }
};

function validateTask(task) {
  // this.setState({ error: '' });
  if (task.priority && isNaN(task.priority)) {
    this.setState({ error: 'Priority should be a number' });
    return false;
  }
  if (task.estimated_time && isNaN(task.estimated_time)) {
    this.setState({ error: 'Estimate time should be a number' });
    return false;
  }
  if (task.spent_time && isNaN(task.spent_time)) {
    this.setState({ error: 'Spent time should be a number' });
    return false;
  }
  if (task.total_efforts && isNaN(task.total_efforts)) {
    this.setState({ error: 'Total efforts should be a number' });
    return false;
  }
  return true;
};

function handleDeleteTask(Id) {
  this.deleteSwal().then(result => {
    if (result.value) this.confirmDelete(Id);
  });
}

function confirmDelete(taskId) {
  const { tasks } = this.state;
  axios
    .delete(`/api/v1/tasks/${taskId}`)
    .then(res => {
      if (res.status === 200) {
        Swal.fire('Deleted!', `Your task has been deleted.`, 'success');
        const taskIndex = tasks.findIndex(task => task.id === Number(taskId));
        tasks.splice(taskIndex, 1);
        this.setState({ tasks });
      }
    })
    .catch(e => this.setState({ error: 'Error' }));
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

export {
  handleAddNewTask,
  handleEditTask,
  validateTask,
  deleteSwal,
  handleDeleteTask,
  confirmDelete,
};
