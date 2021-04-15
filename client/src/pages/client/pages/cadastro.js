import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
//import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import api from '../../../services/api'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  root: {display: 'flex',},
  title: {flexGrow: 1,},
  appBarSpacer: theme.mixins.toolbar,
  content: {flexGrow: 1,height: '100vh',overflow: 'auto',},
  container: {paddingTop: theme.spacing(2),paddingBottom: theme.spacing(4),},
  paper: {padding: 15,display: 'flex',overflow: 'auto',flexDirection: 'column',},
  formControl: {width:'100%'},
  btnSuccess:{ backgroundColor:"green",color:"#fff","&:hover":{backgroundColor:"#12b912"}}
}));

export default function UsuarioCadastrar() {
  const classes = useStyles();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

async function handleSubmit(){
const data = {
  nome: nome, 
  email: email,
  senha: senha,
}

  if(nome!==''&&email!==''&&senha!==''){
    const response = await api.post('/api/candidatos/', data);

    if(response.status===200){
      window.location.href= '/'
    } else{
      alert('Erro ao cadastrar usuário')
    }
  }else {
    alert('Por favor, preencha todos os dado!')
  }
  }

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item sm={12}>       
          
          <Paper className={classes.paper}>
            <h2>Cadastro de Usuário</h2>
          <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
              <TextField
                required
                id="nome"
                name="nome"
                label="Nome completo"
                fullWidth
                autoComplete="Nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              </Grid>
              </Grid>
                <Grid item xs={12} sm={6}>
              <TextField
                type="password"
                required
                id="senha"
                name="senha"
                label="Senha"
                fullWidth
                autoComplete="Senha"
                value={senha}
                onChange={e => setSenha(e.target.value)}
              />
              </Grid>
              <Grid item xs={12} sm={12}>
              <Button style={{marginBottom:10, marginRight:5}} variant="contained" href={'/'}>
            <ArrowBackIcon /> Voltar</Button>
              <Button style={{marginBottom:10, marginRight:5}} variant="contained" onClick={handleSubmit} className={classes.btnSuccess}>
              <SaveIcon /> Salvar
              </Button>
              </Grid>
          </Paper>
          </Grid>
          </Grid>
          <Box pt={4}>
            
          </Box>
        </Container>
      </main>
    </div> 
  );
}