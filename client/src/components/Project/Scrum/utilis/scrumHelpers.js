import axios from 'axios';
import Swal from 'sweetalert2';
import createNotification from '../../../Users/notification';

function handleAddScrum() {
  const { projectId } = this.props;
  const previousScrums = this.state.scrums;
  const lastScrumId = previousScrums.length;
  axios
    .post('/api/v1/scrums/new', {
      projectId: this.props.projectId,
      scrumName: `Scrum ${lastScrumId + 1}`
    })
    .then(({ data: { data } }) => {
      const { id, name } = data;
      this.setState(prevState => {
        return {
          scrums: prevState.scrums.concat({
            id,
            name
          })
        };
      });
      this.props.history.push(`/project/${projectId}/${id}`);
    });
}

function deleteSwal() {
  return Swal.fire({
    type: 'warning',
    text: 'Are you sure to delete this task?',
    showConfirmButton: true,
    showCancelButton: true,
    className: 'deletTaskSwal'
  });
}

function handleDeleteTask(Id) {
  this.deleteSwal().then(result => {
    if (result.value) this.confirmDelete(Id);
  });
}

function confirmDelete(scrumId) {
  axios
    .delete(`/api/v1/scrums/${scrumId}`)
    .then(result => {
      const { scrums } = this.state;
      const updatedScrums = scrums.filter(scrum => scrum.id !== scrumId);
      if (scrumId === Number(this.props.scrumId)) {
        const deletedScrumIndex = scrums.findIndex(
          scrum => scrum.id === scrumId
        );
        //the deleted scrum is not the first one//
        if (deletedScrumIndex) {
          const redirectId = scrums[deletedScrumIndex - 1].id;
          this.props.history.push(
            `/project/${this.props.projectId}/${redirectId}`
          );
          //the deleted scrum is the first one//
        } else {
          if (scrums.length === 1) {
            this.props.history.push(`/project/${this.props.projectId}`);
          } else {
            const redirectId = scrums[deletedScrumIndex + 1].id;
            this.props.history.push(
              `/project/${this.props.projectId}/${redirectId}`
            );
          }
        }
      }
      this.setState({ scrums: updatedScrums });
    })
    .catch(err => this.setState({ error: 'Error' }));
}

function handleScrumName(event) {
  let newValue = event.target.textContent;
  const scrumId = this.props.scrumId;
  if (!newValue) {
    newValue = ' ';
  }

  axios
    .put(`/api/v1/scrums/${scrumId}`, { name: newValue })
    .then(({ data: { data } }) => {
      this.setState(
        prevState => {
          const clonedScrums = JSON.parse(JSON.stringify(prevState.scrums));
          const scrumIndex = clonedScrums.findIndex(
            scrum => scrum.id === Number(scrumId)
          );
          clonedScrums[scrumIndex] = data;
          return {
            scrums: clonedScrums,
            scrumName: newValue
          };
        },
        () => createNotification('scrumNameChanged')
      );
    })
    .catch(error => this.setState({ error: 'Error' }));
}

export {
  handleAddScrum,
  deleteSwal,
  handleDeleteTask,
  confirmDelete,
  handleScrumName
};
