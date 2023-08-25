import React from "react";
import { Grid, Paper, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';


const Dashboard = () => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Link to="/todo">
                    <Paper sx={{ p: 2 }}>
                        <Box>
                            <h3>Pagina To Do</h3>
                            <Button variant='outlined' color='secondary'>Ir a To Do</Button>
                        </Box>
                    </Paper>
                </Link>
            </Grid>
            <Grid item xs={6}>
                <Link to="/fetchlist">
                    <Paper sx={{ p: 2 }}>
                        <Box>
                            <h3>Pagina FetchList</h3>
                            <Button variant='outlined' color='secondary'>Ir a FetchList</Button>
                        </Box>
                    </Paper>
                </Link>
            </Grid>
        </Grid>
    );
};
export default Dashboard