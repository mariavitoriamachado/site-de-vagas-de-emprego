import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuAdmin from '../../../components/menuAdmin';
import Footer from '../../../components/footerAdmin';

import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
  const [tipo, setTipo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [uf, setUf] = useState('');

async function handleSubmit(){
const data = {
  nome_usuario: nome, 
  email_usuario: email,
  senha_usuario: senha,
  tipo_usuario: tipo,
  nome_empresa: empresa,
  Cnpj: cnpj,
  Endereco: endereco,
  Telefone: telefone,
  Uf: uf
}


  if(nome!==''&&email!==''&&senha!==''&&tipo!==''&&empresa!==''&&cnpj!==''&&endereco!==''&&telefone!==''&&uf!==''){
    const response = await api.post('/api/usuarios/', data);

    if(response.status===200){
      window.location.href= '/admin/usuarios'
    } else{
      alert('Erro ao cadastrar usuário')
    }
  }else {
    alert('Por favor, preencha todos os dado!')
  }
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'USUÁRIOS'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item sm={12}>       
          <Button style={{marginBottom:10}} variant="contained" href={'/admin/usuarios'}>
            <ArrowBackIcon /> Voltar</Button>
          <Paper className={classes.paper}>
            <h2>Cadastro de Usuários</h2>
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
              <Grid item xs={12} sm={3}>
            
        <FormControl className={classes.formControl}>
        <InputLabel id="labelTipo">Tipo</InputLabel>
        <Select
          labelId="labelTipo"
          id="tipo"
          value={tipo}
          onChange={e => setTipo(e.target.value)}        
        >
          <option aria-label="None" value="" />
          <option value={1}>Administrador</option>
          <option value={2}>Gerente</option>
          <option value={3}>Funcionário</option>
          
        </Select>
        </FormControl>
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
              <Grid item xs={12} sm={6}>
              <TextField
                required
                id="empresa"
                name="empresa"
                label="Nome empresa"
                fullWidth
                autoComplete="empresa"
                value={empresa}
                onChange={e => setEmpresa(e.target.value)}
              />

              </Grid> 
              <Grid item xs={12} sm={6}>
              <TextField
                required
                id="cnpj"
                name="cpnj"
                label="Cpnj"
                fullWidth
                autoComplete="cpnj"
                value={cnpj}
                onChange={e => setCnpj(e.target.value)}
              />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                required
                id="endereco"
                name="endereco"
                label="Endereco da Empresa"
                fullWidth
                autoComplete="endereco"
                value={endereco}
                onChange={e => setEndereco(e.target.value)}
              />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                required
                id="telefone"
                name="telefone"
                label="Telefone"
                fullWidth
                autoComplete="telefone"
                value={telefone}
                onChange={e => setTelefone(e.target.value)}
              />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                required
                id="uf"
                name="uf"
                label="Uf"
                fullWidth
                autoComplete="uf"
                value={uf}
                onChange={e => setUf(e.target.value)}
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