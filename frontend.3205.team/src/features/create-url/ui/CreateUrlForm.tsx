import { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { useCreateUrl } from '../../../shared/api/hooks';

export const CreateUrlForm = () => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [alias, setAlias] = useState('');
    const { mutate } = useCreateUrl();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ originalUrl, alias: alias || undefined });
        setOriginalUrl('');
        setAlias('');
        console.log({ originalUrl, alias: alias || undefined });
        
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
            <TextField
                label="Оригинальный URL"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                required
            />
            <TextField
                label="Алиас (опционально)"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
            />
            <Button type="submit" variant="contained">
                Создать
            </Button>
        </Box>
    );
};
