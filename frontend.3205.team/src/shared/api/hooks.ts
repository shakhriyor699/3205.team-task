import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from './api';

export const useGetUrls = () =>
  useQuery({
    queryKey: ['urls'],
    queryFn: async () => (await api.get('/info/all')).data,
  });

export const useCreateUrl = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (url: { originalUrl: string; alias?: string; expiresAt?: string }) =>
      api.post('/shorten', url),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['urls'] }),
  });
};

export const useDeleteUrl = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (shortUrl: string) => api.delete(`/delete/${shortUrl}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['urls'] }),
  });
};
