import React ,{useState ,useEffect} from 'react';
import {TextField,Button,Typography,Paper} from '@material-ui/core';
import useStyles from './styles';
import FileBase from 'react-file-base64';
import {useDispatch ,useSelector} from 'react-redux';
import {createPost , updatePost} from '../../actions/posts';
// import { updatePost } from '../../../../server/controllers/posts';


const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({creator:'',title :'',message:'',tags:'',selectedFile:''})
    const classes = useStyles();
    const dispatch = useDispatch();

    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id == currentId) : null);

    useEffect(() => {
        if(post) setPostData(post);
    } ,[post])
    
    const handleSubmit = (e) => {
        e.preventDefault(); // not to get refresh in the browser
        
        if(currentId)
        {
            dispatch(updatePost(currentId ,postData));
        }
        else 
        {
        dispatch(createPost(postData));
        }
    }

    const clear = () => {

    }
    return (
        <Paper class = {classes.paper}>
            <form autocomplete="off" noValidate className = {`${classes.root} ${classes.form}`} onSubmit = {handleSubmit} 
            style={{
                //rohit
                backgroundColor: '#ffffff41',
                backdropFilter: 'blur(2px)',
                border: '1.5px solid #ffffff41',
                borderRadius: '20px'
            }}
            >
                <Typography variant="h6">Creating a Memory</Typography>
                    <TextField name="creater" variant="outlined" label="Creator" fullWidth value = {postData.creator} onChange = {(e) => setPostData({...postData, creator: e.target.value})} />
                    <TextField name="title" variant="outlined" label="title" fullWidth value = {postData.title} onChange = {(e) => setPostData({...postData, title: e.target.value})} />
                    <TextField name="message" variant="outlined" label="Message" fullWidth value = {postData.message} onChange = {(e) => setPostData({...postData, message: e.target.value})} />
                    <TextField name="tags" variant="outlined" label="tags" fullWidth value = {postData.tags} onChange = {(e) => setPostData({...postData, tags: e.target.value})} />
                    <div className={classes.fileInput}> <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData,selectedFile:base64})}> </FileBase> </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        padding: '10px',
                        gap: '10px'
                    }}>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit">Submit</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear}>Clear</Button>
                    </div>
            </form>
        </Paper>
    );
}

export default Form;