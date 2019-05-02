import React from 'react';

function StatusSelect({ defaultValue, onChange }) {
  return (
    <select className="status__select" defaultValue={defaultValue} onChange={onChange}>
      <option id="2" value="To Do">To Do</option>
      <option id="1" value="Completed">Completed</option>
      <option id="3" value="In Progress">In Progress</option>
      <option id="4" value="Review">Review</option>
      <option id="5" value="Request Changes">Request Change</option>
    </select>
  );
};

function ActionTypeSelect({ team, defaultValue, onChange }) {
  return (
    <select className="actionType__select" defaultValue={defaultValue} onChange={onChange}>
      <option id="1" value="Coding">Coding</option>
      <option id="2" value="Testing">Testing</option>
      <option id="3" value="Changes">Changes</option>
      <option id="4" value="Fix Bugs">Fix Bugs</option>
    </select>
  );
};

function ProjectTeam({team, onChange, defaultValue}) {
  return (
    <select className="projectTeam__select" onChange={onChange}>
      {team.map(member => <option key={member.userId} id={member.userId} value={member.fullName} selected={defaultValue === member.fullName? true: false}>{member.fullName}</option>)}
    </select>
  );
}

export { StatusSelect, ActionTypeSelect, ProjectTeam }
