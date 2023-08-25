import React from "react";
import { Grid, Paper, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const Todo = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Link to="/">
                    <Paper sx={{ p: 2 }}>
                        <Box>
                            <h3>Volver atras</h3>
                            <Button variant='outlined' color='secondary'> <HomeIcon fontSize="small"/> INICIO</Button>
                        </Box>
                    </Paper>
                </Link>
            </Grid>
        </Grid>
    );
};
export default Todo;