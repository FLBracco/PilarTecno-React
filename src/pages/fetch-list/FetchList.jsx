import React, {useEffect, useState} from "react";
import { Grid, Paper, Box, Button, CardContent, Typography, CardMedia, Card, Modal} from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import api from '../../services/api'
import { IMG_URL, POKEMON_URL, SPRITE_URL } from "../../constants";
import { appActions } from "../../redux/appRedux";
import { useDispatch } from "react-redux";
import POKE_IMG from '../../assets/images/poke.png'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const FetchList = () => {

    const dispatch = useDispatch()
    const [pokemons,setPokemons] = useState(null)
    const [next, setNext] = useState('')
    const [open, setOpen] = useState(false)
    const [selectedPokemon, setSelectedPokemon] = useState({
        id: 0,
        name: '',
        abilities: [],
        moves: []
    });

    useEffect(()=>{
        getPokemons()
    }, [])

    const getPokemons = async () => {
        try{
            dispatch(appActions.loading(true))
            const result = await api.GET(api.pokemons)
            if(result){
                console.log('poke: ', result.results);
                setPokemons(result.results)
                setNext(result.next)
            }
        }catch(error){
            console.log(error);
        }finally{
            dispatch(appActions.loading(false))
        }
    }

    const renderItem = (item) =>{
        const path = item.url.split('/')
        const imgID = getPokemonImgId(path[6])
        return (
            <Card p={2} 
                sx={{ display: 'flex', height:100, cursor:'pointer',
                '&:hover': {backgroundColor: '#5acdbd', color:'white'
            }}}>
                <CardContent sx={{flex: '1 0 auto'}}>
                    <Typography component='div' variant="h5">
                        N° {imgID}
                    </Typography>
                    <Typography component="div" variant="h5">
                        {item.name}
                    </Typography>
                </CardContent>
                <CardMedia 
                    component='img'
                    sx={{width: 100}}
                    src={`${IMG_URL}/${imgID}.png`}
                />
            </Card>)
    }

    const getPokemonImgId= (id)=>{
        switch (id?.length) {
            case 1:
                return `00${id}`
            case 2:
                return `0${id}`
            default:
                return id
        }
    }

    const loadMore = async() =>{
        try {
            dispatch(appActions.loading(true))
            const result = await api.GET(next)
            if(result){
                console.log('poke: ', result.results);
                setPokemons(prev=>[...prev, ...result.results])
                setNext(result.next)
            }
        } catch (error) {
            console.log(error);
        } finally{
            dispatch(appActions.loading(false))
        }
    }

    const handledClickPokemon = async (p)=>{
        try {
            let selectedData = await api.GET(`${POKEMON_URL}/${p.name}`)
            console.log(selectedData.abilities);
            setSelectedPokemon(selectedData);
            setOpen(true);
            console.log(open);
        } catch (error) {
            console.log(error);
        }
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
            <Paper sx={{p: 2}} variant='outlined'>
                <Grid item xs={12}>
                    <Typography component="div" variant="h4">
                        La Pokédex
                    </Typography>
                </Grid>
                <Grid container spacing={3}>
                    {pokemons && pokemons.map((p, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index} onClick={()=> handledClickPokemon(p)}>
                            {renderItem(p)}
                        </Grid>
                        ))
                    }
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card p={2} sx={{ margin:'5px 0 0 0 ',display: 'flex', height:100, cursor:'pointer',
                    backgroundColor:'#317b52', '&:hover': {backgroundColor: '#5acdbd'}}}
                    onClick={()=>loadMore()}>
                        <CardContent sx={{flex: '1 0 auto'}}>
                            <Typography component="div" variant="h5" sx={{color: 'white'}}>
                                Cargar Más
                            </Typography>
                        </CardContent>
                        <CardMedia 
                            component='img'
                            sx={{width: 100, p:2 }}
                            image={(POKE_IMG)}
                            alt="Live from space album cover"
                            />
                    </Card>
                </Grid>
            </Paper>
            </Grid>
        </Grid>
        <Modal 
            open={open}
            onClose={() => setOpen(false)} 
            sx={{height:'400px', width:'90vw', margin: 'auto'}} 
            variant='outline'
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {`Habilidades posibles de: ${selectedPokemon.name}`}
                </Typography>
                {selectedPokemon && (
                    <List
                        sx={{
                            width:'100%',
                            maxWidth: 360,
                            bgcolor: 'background.paper',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 300,
                            '& ul': { padding: 0 },
                        }} 
                        subheader={<li />}
                    >
                        {selectedPokemon.moves.map((move, index) => (
                            <li key={index}>
                                <ul>
                                    <ListItem key={index}>{move.move.name}</ListItem>
                                </ul>
                            </li>
                        ))}
                </List>
                )}
                <CardMedia 
                    component='img'
                    sx={{ width: 100, p: 2 }}
                    src={SPRITE_URL(selectedPokemon.id)}
                    alt={`Sprite de ${selectedPokemon.name}`}
                />
            </Box>
        </Modal>
        </>
    );
};

export default FetchList;