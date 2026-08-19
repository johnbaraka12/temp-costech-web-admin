import api from '../apiClient';

export const sponsorshipsAPI = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/api/sponsorships/ilist', {
      params: { page, limit }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/sponsorships/ilist');
    const sponsorshipsList = response.data.returnData?.list_of_item || [];
    const sponsorship = sponsorshipsList.find(r => r.id === id);
    return sponsorship ? { status: 'OK', returnData: sponsorship } : { status: 'ERROR', errorMessage: 'Sponsorship not found' };
  },

  create: async (sponsorshipData) => {
    const payload = {
      form_method: 'save',
      title: sponsorshipData.title || '',
      description: sponsorshipData.description || '',
      document: sponsorshipData.document || '',
    };

    const response = await api.post('/api/sponsorships/iformAction', payload);
    return response.data;
  },

  update: async (id, sponsorshipData) => {
    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      title: sponsorshipData.title || '',
      description: sponsorshipData.description || '',
      document: sponsorshipData.document || null,
    };

    const response = await api.post('/api/sponsorships/iformAction', payload);
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/sponsorships/iformAction', payload);
    return response.data;
  },

};
