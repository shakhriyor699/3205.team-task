import { Container, Typography } from '@mui/material';
import { CreateUrlForm } from '../../../features/create-url/ui/CreateUrlForm';
import { UrlList } from '../../../widgets/url-list/ui/UrlList';

export const HomePage = () => {
  return (
    <Container>
      <Typography variant="h4" sx={{ my: 2 }}>
        Сервис коротких ссылок
      </Typography>
      <CreateUrlForm />
      <UrlList />
    </Container>
  );
};
