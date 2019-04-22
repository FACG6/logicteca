export function Filter(tasks) {
    const tasks_names = [],
          namesFilters =[],
          action_types = [],
          actionsFilters = [],
          priorites = [],
          prioritiesFilters =[],
          statuses = [],
          statusFilters =[],
          assignees = [],
          assigneesFilters=[];

    tasks.forEach(task => {
      const { task_name, action_type, priority, status, assignee } = task;

      if( task_name && tasks_names.indexOf(task_name) === -1){
          tasks_names.push(task_name);
          namesFilters.push({
              text: task_name,
              value: task_name
          });
      }
      if( action_type && action_types.indexOf(action_type) === -1){
        action_types.push(action_type);
        actionsFilters.push({
            text: action_type,
            value: action_type
        });
      }
      if( priority && priorites.indexOf(priority) === -1){
        priorites.push(priority);
        prioritiesFilters.push({
            text: priority,
            value: priority
        });
      }
      if( status && statuses.indexOf(status) === -1){
        statuses.push(status);
        statusFilters.push({
            text: status,
            value: status
        });
      }
      if( assignee && assignees.indexOf(assignee) === -1){
        assignees.push(assignee);
        assigneesFilters.push({
            text: assignee,
            value: assignee
        });
      }
    })

    return { 
            namesFilters,
            actionsFilters, 
            prioritiesFilters, 
            statusFilters, 
            assigneesFilters
        }
}
