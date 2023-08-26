import React from "react";
import { Grid, Paper, Box, Button, Card, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector} from "react-redux";
import { appSelector} from "../../redux/appRedux";

const Dashboard = () => {

    const todoList = useSelector(appSelector.todo);
    const completedTask = todoList.filter(task => task.completed);
    const pendingTask = todoList.filter(task => !task.completed);

    return (
        <>
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
            <Grid container spacing={3}>
            <Grid item xs={6}>
                    <Paper sx={{ p: 2 }} variant='outlined'>
                        <Box>
                            <Card variant="outlined">
                                <Typography variant="h4">Tareas Completadas</Typography>
                                <Typography variant="h5">
                                    Tareas Completadas: {completedTask.length}
                                </Typography>
                                <Typography variant='h5'>
                                    Tareas Totales: {todoList.length}
                                </Typography>
                            </Card>
                        </Box>
                    </Paper>
            </Grid>
            <Grid item xs={6}>
                    <Paper sx={{ p: 2 }} variant="outlined">
                            <Card variant='outlined'>
                                <Typography variant="h4">Tareas Pendientes</Typography>
                                <Typography variant="h5">
                                    Tareas Pendientes: {pendingTask.length}
                                </Typography>
                                <Typography variant="h5">
                                    Tareas Totales: {todoList.length}
                                </Typography>
                            </Card>
                    </Paper>
            </Grid>
        </Grid>
    </>
    );
};

export default Dashboard