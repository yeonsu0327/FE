const baseUrl = 'https://your-api-url.com/groups';

const groupService = {
  createGroup: async (groupData) => {
    const response = await fetch(`${baseUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(groupData),
    });
    return response.json();
  },

  updateGroup: async (groupId, groupData) => {
    const response = await fetch(`${baseUrl}/${groupId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(groupData),
    });
    return response.json();
  },

  deleteGroup: async (groupId, password) => {
    const response = await fetch(`${baseUrl}/${groupId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    return response.ok;
  },

  getGroups: async () => {
    const response = await fetch(`${baseUrl}`);
    return response.json();
  },

  getGroupDetail: async (groupId, password = '') => {
    const response = await fetch(`${baseUrl}/${groupId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) throw new Error('Invalid password');
    return response.json();
  },
};

export default groupService;
