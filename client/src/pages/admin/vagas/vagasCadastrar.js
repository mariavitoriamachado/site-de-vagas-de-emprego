import React,{useState}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuAdmin from '../../../components/menuAdmin';
import Footer from '../../../components/footerAdmin';

// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import api from '../../../services/api'

const useStyles = makeStyles((theme) => ({
  root: {display: 'flex',},
  title: {flexGrow: 1,},
  appBarSpacer: theme.mixins.toolbar,
  content: {flexGrow: 1,height: '100vh',overflow: 'auto',},
  container: {paddingTop: theme.spacing(2),paddingBottom: theme.spacing(4),},
  paper: {padding: 35,display: 'flex',overflow: 'auto',flexDirection: 'column',},
  formControl:{width:'100%'},
  btnSuccess:{ backgroundColor:"green",color:"#fff","&:hover":{backgroundColor:"#12b912"}}
}));

export default function ProdutoCadastrar() {
  const classes = useStyles();

  const [vaga, setVaga] = useState('');
  const [descricao , setDescricao] = useState('');
  const [requisitos , setRequisitos] = useState('');
  const [salario , setSalario] = useState('');

  async function handleSubmit(){

    const data = {
      nome_vaga: vaga,
      descricao_vaga:descricao,
      requisito: requisitos,
      faixaSalario: salario,
    }

      if(vaga!==''&&descricao!==''&&requisitos!==''&&salario!==''){
        const response = await api.post('/api/vagas',data);

        if(response.status===200){
          window.location.href='/admin/vagas'
        }else{
          alert('Erro ao cadastrar o vaga!');
        }
      }else{
        alert('Por favor, preencha todos os dados!');
      }
  }
  
  return (
    <div className={classes.root}>
      
      <MenuAdmin title={'VAGAS'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button style={{marginBottom:10}} variant="contained" href={'/admin/vagas'}><ArrowBackIcon />  Voltar</Button>
              <Paper className={classes.paper}>
                <h2>Cadastro de Vagas</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="vaga"
                      name="vaga"
                      label="Vaga"
                      fullWidth
                      autoComplete="vaga"
                      value={vaga}
                      onChange={e => setVaga(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="descricao"
                      name="descricao"
                      label="Descricao"
                      fullWidth
                      autoComplete="descricao"
                      value={descricao}
                      onChange={e => setDescricao(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                  <TextField
                      required
                      id="requisito"
                      name="requisito"
                      label="Requisito"
                      fullWidth
                      autoComplete=" requisito"
                      value={requisitos}
                      onChange={e => setRequisitos(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      id="salario"
                      name="salario"
                      label="Salario"
                      fullWidth
                      autoComplete="salario"
                      value={salario}
                      onChange={e => setSalario(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <Button variant="contained" onClick={handleSubmit} className={classes.btnSuccess}>
                  <SaveIcon /> Salvar
                  </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}