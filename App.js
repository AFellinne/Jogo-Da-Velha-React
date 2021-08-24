//Componentes
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View ,TouchableOpacity } from 'react-native';

//Paginas
export default function App() {
  const[tela,setTela] = useState('menu');//Estado tela referenciada
  const[jogadorAtual, setJogadorAtual] = useState('');//Estado jogador do momento
  const[tabuleiro, setTabuleiro] = useState(['']);///Estado tamanho tabuleiro
  const[jogadasRestantes, setJogadasRestantes] = useState(0);//Estado jogadas restantes
  const[ganhador, setGanhador] = useState('');//Estado vencedor

 //Cria uma nova partida com o jogador selecionado X ou O 
function iniciarJogo(jogador){
  setJogadorAtual(jogador);

  setJogadasRestantes(9);
  setTabuleiro([
    ['','',''],
    ['','',''],
    ['','','']
  ]);

  setTela('jogo');
  
}

//Lógica do jogo
function jogar(linha,coluna){
  tabuleiro[linha][coluna] = jogadorAtual;
  setTabuleiro([...tabuleiro]);//Novo array com os dados do array tabuleiro

  setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X'); //Troca o jogador atual,para o outro

  verificarGanhador(tabuleiro,linha,coluna);

}

//Verifica o tabuleiro de acordo com o final do jogo
function verificarGanhador(tabuleiro,linha,coluna){
  //Validando linhas
  if(tabuleiro[linha][0] !== '' && tabuleiro[linha][0] === tabuleiro[linha][1] && tabuleiro[linha][1] === tabuleiro[linha][2]){
    return finalizarJogo(tabuleiro[linha][0]);
  }
  
  //Validando colunas
  if(tabuleiro[0][coluna] !== '' && tabuleiro[0][coluna] === tabuleiro[1][coluna] && tabuleiro[1][coluna] === tabuleiro[2][coluna] ){
    return finalizarJogo(tabuleiro[0][coluna]);
  }

  //Validando diagonal 1
  if(tabuleiro[0][0] !== '' && tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2] ){
    return finalizarJogo(tabuleiro[0][0]);
  }

  //Validando diagonal 2
  if(tabuleiro[0][2] !== '' && tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0] ){
    return finalizarJogo(tabuleiro[0][2]);
  }

  //Nenhum ganhador
  if(jogadasRestantes - 1 ===0){
    return finalizarJogo(``);
  }

  //Jogo nao finalizado
  setJogadasRestantes((jogadasRestantes - 1));
}

function finalizarJogo(jogador){
  setGanhador(jogador);
  setTela('ganhador');
}

  //Switch para instanciacao de telas
  switch(tela){
    case 'menu':
      return getTelaMenu();
    case 'jogo':
      return getTelaJogo();
    case 'ganhador':
      return getTelaGanhador();
  }

//Tela Menu //View inlineItems criada para alinhar os itens
  function getTelaMenu(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Jogo da velha</Text>
        <Text style={styles.subtitulo}>Selecione o primeiro jogador</Text>

        
        <View style ={styles.inlineItems}>
          <TouchableOpacity style={styles.boxJogador}  onPress={() => iniciarJogo('X')}> 
            <Text style ={styles.jogadorX}>X</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.boxJogador}  onPress={() => iniciarJogo('O')}> 
            <Text style={styles.jogadorO}>O</Text>
          </TouchableOpacity>
        </View>
      </View>
    ); 
  }


  //TelaJogo
  function getTelaJogo(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Jogo da velha</Text>
        
        {
          tabuleiro.map((linha,numeroLinha) => {
              return (
                <View key={numeroLinha} style ={styles.inlineItems}>

                  {
                    linha.map((coluna,numeroColuna) => {
                      return(
                        <TouchableOpacity  
                        key={numeroColuna} 
                        style={styles.boxJogador}
                        onPress={() => jogar(numeroLinha,numeroColuna)}
                        disabled={coluna !== ''}> 
                        <Text style ={coluna === 'X' ? styles.jogadorX : styles.jogadorO}>{coluna}</Text>
                      </TouchableOpacity>

                      )

                    })
                  }

                </View>



              )

          })

        }
      <TouchableOpacity  style={styles.botaoMenu} onPress={() => setTela('menu')}> 
         <Text style ={styles.textoBotaoMenu}>Voltar ao menu</Text>
      </TouchableOpacity>

      </View>
    ); 
  }

  //Tela ganhador
  function getTelaGanhador(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Jogo da velha</Text>
        <Text style={styles.subtitulo}>Resultado final</Text>

        
        {//Empate
          ganhador === '' &&
          <Text style={styles.ganhador}>Empate!</Text>
        }

        {
          ganhador !== '' && 
          <>  
          <Text style={styles.ganhador}>Ganhador</Text>
          <View style={styles.boxJogador}>
            <Text style={ganhador === 'X' ? styles.jogadorX : styles.jogadorO}>{ganhador}</Text>
            </View>
          </>
        }

       
        <TouchableOpacity style={styles.botaoMenu}  onPress={() => setTela('menu')}//Voltar pra tela de menu
        >
              <Text style={styles.textoBotaoMenu}>Voltar ao menu </Text>
        </TouchableOpacity>
        

        

      </View> 
    );
  }
}

//Estilos CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo:{
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333'
  },
  subtitulo:{
    fontSize: 20,
    color: '#555',
    marginTop : 20
  },
  boxJogador:{
    width: 80,
    height: 80,
    backgroundColor: '#ddd',
    alignItems: 'center', //Alinha de acordo com a tela
    justifyContent: 'center' //Alinha dentro do container
  },
  jogadorX:{
    fontSize: 40,
    color: '#553fda'
  },
  jogadorO:{
    fontSize: 40,
    color: '#da3f3f'
  },
  inlineItems:{
    flexDirection: 'row',//Alinha de acordo com sua escolha.
  },
  botaoMenu:{
    marginTop: 20
  },
  textoBotaoMenu:{
    color: '#4e6fe4'
  },
  ganhador: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333'
  }

});
