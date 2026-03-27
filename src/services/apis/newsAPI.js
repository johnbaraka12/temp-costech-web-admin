import api from '../apiClient';

export const newsAPI = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get('/api/news/ilist', {
      params: { page, limit }
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get('/api/news/ilist');
    const newsList = response.data.returnData?.list_of_item || [];
    const news = newsList.find(n => n.id === id);
    return news ? { status: 'OK', returnData: news } : { status: 'ERROR', errorMessage: 'News not found' };
  },

  create: async (newsData) => {
    // Format date to YYYY-MM-DD if provided
    let formattedDate = newsData.date || new Date().toISOString().split('T')[0];
    if (formattedDate && formattedDate.includes('/')) {
      // Convert DD/MM/YYYY to YYYY-MM-DD if needed
      const parts = formattedDate.split('/');
      if (parts.length === 3) {
        formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
    }

    const payload = {
      form_method: 'save',
      date: formattedDate,
      title: newsData.title || '',
      description: newsData.description || '',
    };

    const response = await api.post('/api/news/iformAction', payload);
    return response.data;
  },

  update: async (id, newsData) => {
    // Format date to YYYY-MM-DD if provided
    let formattedDate = newsData.date || new Date().toISOString().split('T')[0];
    if (formattedDate && formattedDate.includes('/')) {
      // Convert DD/MM/YYYY to YYYY-MM-DD if needed
      const parts = formattedDate.split('/');
      if (parts.length === 3) {
        formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
    }

    const payload = {
      form_method: 'update',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
      date: formattedDate,
      title: newsData.title || '',
      description: newsData.description || '',
    };

    const response = await api.post('/api/news/iformAction', payload);
    return response.data;
  },

  uploadImage: async (documentId, imageFile) => {
    const formData = new FormData();
    formData.append('form_method', 'save');
    formData.append('document_id', documentId);
    formData.append('image', imageFile);

    const response = await api.post('/api/news/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteUploadedImage: async (imageId) => {
    const formData = new FormData();
    formData.append('form_method', 'delete');
    formData.append('id', imageId);

    const response = await api.post('/api/news/upload', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  },

  delete: async (id) => {
    const payload = {
      form_method: 'delete',
      id: typeof id === 'string' ? parseInt(id, 10) : id,
    };

    const response = await api.post('/api/news/iformAction', payload);
    return response.data;
  },
};
