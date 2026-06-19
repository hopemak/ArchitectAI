import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectAPI } from '../services/projectService.js';
import { useToast } from '../context/ToastContext.jsx';

export const useProjects = () => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const projectsQuery = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await projectAPI.getAll();
      return response.data;
    },
    staleTime: 5 * 60 * 1000
  });

  const deleteMutation = useMutation({
    mutationFn: async (projectId) => {
      const response = await projectAPI.delete(projectId);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      addToast('Project deleted successfully', 'success');
    },
    onError: (err) => {
      addToast(err.response?.data?.message || 'Failed to delete project', 'error');
    }
  });

  const generateMutation = useMutation({
    mutationFn: async (projectData) => {
      console.log('Sending project data:', projectData);
      
      const createRes = await projectAPI.create(projectData);
      console.log('Project created:', createRes.data);
      
      const projectId = createRes.data.data._id;
      
      const blueprintRes = await projectAPI.generateBlueprint(projectId);
      console.log('Blueprint response:', blueprintRes.data);
      
      return blueprintRes.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      addToast('Blueprint generated successfully!', 'success');
    },
    onError: (err) => {
      console.error('Generation error:', err.response?.data || err.message);
      addToast(err.response?.data?.message || 'Generation failed', 'error');
    }
  });

  return {
    projects: projectsQuery.data?.data || [],
    stats: {
      totalProjects: projectsQuery.data?.data?.length || 0,
      generatedBlueprints: projectsQuery.data?.data?.filter(p => p.status === 'generated').length || 0,
      pendingBlueprints: projectsQuery.data?.data?.filter(p => p.status === 'pending').length || 0,
    },
    isLoading: projectsQuery.isLoading,
    deleteProject: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    generateBlueprint: generateMutation.mutateAsync,
    isGenerating: generateMutation.isPending,
    refetch: projectsQuery.refetch
  };
};
