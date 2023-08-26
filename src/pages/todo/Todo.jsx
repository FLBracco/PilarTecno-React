import React, {useState} from "react";
import { Grid, Paper, Box, Button, Card, Stack, CardHeader, CardContent, TextField, Checkbox, Typography} from '@mui/material';
import { v4 as uuid } from 'uuid';
import { useSelector, useDispatch } from "react-redux";
import { appSelector, appActions } from "../../redux/appRedux";
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const Todo = () => {

    const dispatch = useDispatch()
    const todo = useSelector(appSelector.todo)

    const [texto, setTexto] = useState('')

    const handleChange = (e) =>{
        setTexto(e.target.value)
    }
    
    const addTask = async () => {
        dispatch(appActions.addTodo({text: texto, id:uuid()}))
        await setTexto(prev=>'')
    }

    const handleChecked = (e, id)=>{
        dispatch(appActions.setCompleteTodo({id, completed: e.target.checked}))
    }

    const delTask = async (id) => {
        dispatch(appActions.deleteTodo(id))
    }


    return (
        <>
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
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper sx={{p: 2}}>
                    <Card>
                        <CardHeader title="Agrega una tarea"/>
                        <CardContent>
                                <Stack sx={{justifyContent:'space-around'}} direction='row'>
                                <Grid item md={6}>
                                    <TextField value={texto} label="Tarea" variant="outlined" onChange={handleChange} />
                                </Grid>
                                <Grid item md={6}>
                                    <Button variant="contained" onClick={()=> addTask()}>
                                        Agregar
                                    </Button>
                                </Grid>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader title="Tareas"/>
                        <CardContent>
                            {todo.map((t, index)=>{
                                return(
                                <Stack key={t.id} sx={{justifyContent:'space-between'}} direction='row'>
                                    <Grid item md={1}>
                                        <Checkbox checked={t.completed} onChange={e => handleChecked(e, t.id)} />
                                    </Grid>
                                    <Grid item md={9} sx={{pt: 1}}>
                                        <Typography sx={{fontSize: 18, fontWeight: 700}}>{t.text}</Typography>
                                    </Grid>
                                    <Grid item md={2}>
                                        <Button variant="contained" onClick={()=> delTask(t.id)}>Eliminar</Button>
                                    </Grid>
                                </Stack>
                                )
                            })}
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
        </Grid>
        </>
    );
};

export default Todo;