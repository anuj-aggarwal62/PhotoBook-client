// App is typically the root component of the application,
// which acts as the main entry point and contains other components that make up the user interface. 
import React , {useEffect, useState} from 'react';
import {Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch  } from 'react-redux';

import {getPosts} from './actions/posts'
import memories from './images/memories.png'
import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'
import useStyles from './styles';
// anonymous function returning html components (can not contain siblings)
const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPosts());
    },[dispatch]);

    return (
        <Container maxidth="lg">
            <AppBar className = {classes.appBar} positon = "static" color="inherit">
                <Typography className = {classes.heading} variant = "h2" align = "center">PhotoBook</Typography>
                <img className = {classes.image} src = {memories} alt="memories" height = "60" />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="strech" spacing="3">
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId = {setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId = {currentId} setCurrentId = {setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
        
    )
}

// By using export default App, you are making the
//  App component available for use in other parts of your application or in other files that import it.
export default App;