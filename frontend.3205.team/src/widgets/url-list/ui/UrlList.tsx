
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useDeleteUrl, useGetUrls } from '../../../shared/api/hooks';

export const UrlList = () => {
  const { data: urls, isLoading } = useGetUrls();
  const { mutate: deleteUrl } = useDeleteUrl();

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Оригинальный URL</TableCell>
          <TableCell>Короткий URL</TableCell>
          <TableCell>Клики</TableCell>
          <TableCell>Действия</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {urls?.map((url: any) => (
          <TableRow key={url.shortUrl}>
            <TableCell>{url.originalUrl}</TableCell>
            <TableCell>
              <a href={`http://localhost:3000/url/${url.shortUrl}`} target="_blank" rel="noopener noreferrer">
                {url.shortUrl}
              </a>
            </TableCell>
            <TableCell>{url.clickCount}</TableCell>
            <TableCell>
              <Button variant="outlined" color="error" onClick={() => deleteUrl(url.shortUrl)}>
                Удалить
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
