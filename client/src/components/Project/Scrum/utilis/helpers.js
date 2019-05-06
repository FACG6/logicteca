import axios from 'axios';
import Swal from 'sweetalert2';
import createNotification from '../../../Users/notification/index';

function handleAddNewTask() {
  if (this.state.newTask) {
    createNotification('task exist');
    return;
  }
  if (this.state.tasks.length) {
    this.setState(prevState => {
      const newTask = [
        ...prevState.tasks,
        {
          id: '1',
          task_name: '',
          task_description: '',
          action_type: 'testing',
          priority: '',
          est_time: '',
          remaining_time: '',
          status: 'in progress',
          assignee: '',
          ticket: '',
          scrumName: ''
        }
      ];
      return { tasks: newTask, newTask: true };
    });
    return;
  }
  this.setState(prevState => {
    const newTask = [
      ...prevState.tasks,
      {
        id: this.state.tasks.length + 1,
        task_name: '',
        task_description: '',
        action_type: 'testing',
        priority: '',
        est_time: '',
        remaining_time: '',
        status: 'in progress',
        assignee: '',
        ticket: '',
        scrumName: ''
      }
    ];
    return { tasks: newTask, newTask: true };
  });
};

function handleAddTask(event, column) {
  const newTask = event.target.value;
  this.setState(prevState => {
    const clonedTasks = [...prevState.tasks];
    clonedTasks[clonedTasks.length - 1][column] = newTask;
    return {
      saving: true,
      tasks: clonedTasks,
      newRow: clonedTasks[clonedTasks.length - 1]
    };
  });
};

function handleSaveNewTask(event) {
  const { newRow } = this.state;
  const { scrumId } = this.props;
  const {
    description: task_description,
    action_type,
    assigned_to: assignee,
    ticket,
    status,
    spent_time,
    priority,
    est_time
  } = this.state.newRow;

  if (this.validateTask(newRow)) {
    // console.log(this.props.scrumId, 55555);

    const addedTask = {
      action_type,
      status,
      task_description,
      priority,
      assigned_to: assignee,
      estimate_time: est_time,
      spent_time,
      ticket,
      scrum_id: this.props.scrumId
    };
    //Fetch
    axios
      .post('/api/v1/tasks/new', {
        addedTask
      })
      .then(result => {
        const {
          data: { data },
          status
        } = result;
        if (status === 200) {
          const newData = [...this.state.tasks];
          newData.push(data);
          this.setState({ tasks: newData });
        }
      })
      .catch(e => this.setState({ error: 'Task is not Added!!' }));
    this.setState({ newTask: false, error: false, saving: false });
    createNotification('success');
  }
};

function handleEditTask(event, record, column) {
  const { tasks } = this.state;
  //Add a new task
  if (this.state.newTask || record.id === tasks[tasks.length - 1].id) {
    return this.handleAddTask(event, column);
  }
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
  this.setState({ taskDescriptionErr: '' });
  if (!task['task_description']) {
    this.setState({ error: "Task description can't be blank" });
    return false;
  }
  if (task.priority && !/\d/.test(task.priority)) {
    this.setState({ error: 'Priority should be a number' });
    return false;
  }
  if (task.est_time && !/\d/.test(task.est_time)) {
    this.setState({ error: 'Estimate time should be numbers' });
    return false;
  }
  if (task.spent_time && !/\d/.test(task.spent_time)) {
    this.setState({ error: 'Spent time should be numbers' });
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
    handleAddTask,
    handleSaveNewTask,
    handleEditTask,
    validateTask,
    deleteSwal,
    handleDeleteTask,
    confirmDelete,
    handleChangeScrum,
    }
