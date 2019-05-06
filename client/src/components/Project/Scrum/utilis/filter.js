export function Filter(tasks) {
  const tasksDescriptions = [],
    tasksFilters = [],
    action_types = [],
    actionsFilters = [],
    priorites = [],
    prioritiesFilters = [],
    statuses = [],
    statusFilters = [],
    assignees = [],
    assigneesFilters = [];

  tasks.forEach(task => {
    const { description, action_type, priority, status, assigned_to } = task;

    if (description && tasksDescriptions.indexOf(description) === -1) {
      tasksDescriptions.push(description);
      tasksFilters.push({
        text: description,
        value: description
      });
    }
    if (action_type && action_types.indexOf(action_type) === -1) {
      action_types.push(action_type);
      actionsFilters.push({
        text: action_type,
        value: action_type
      });
    }
    if (priority && priorites.indexOf(priority) === -1) {
      priorites.push(priority);
      prioritiesFilters.push({
        text: priority,
        value: priority
      });
    }
    if (status && statuses.indexOf(status) === -1) {
      statuses.push(status);
      statusFilters.push({
        text: status,
        value: status
      });
    }
    if (assigned_to && assignees.indexOf(assigned_to) === -1) {
      assignees.push(assigned_to);
      assigneesFilters.push({
        text: assigned_to,
        value: assigned_to
      });
    }
  })

  return {
    tasksFilters,
    actionsFilters,
    prioritiesFilters,
    statusFilters,
    assigneesFilters
  }
}
