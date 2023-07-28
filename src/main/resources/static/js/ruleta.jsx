// Retorna la url del servicio. Es una función de configuración.
function RuletaServiceURL() {
  return 'ws://localhost:8080/ruletaService';
}

class WSChannel {
  constructor(URL, callback) {
    this.URL = URL;
    this.wsocket = new WebSocket(URL);
    this.wsocket.onopen = (evt) => this.onOpen(evt);
    this.wsocket.onmessage = (evt) => this.onMessage(evt);
    this.wsocket.onerror = (evt) => this.onError(evt);
    this.wsocket.onclose = (evt) => this.onClose(evt);
    this.receivef = callback;
  }

  onOpen(evt) {
    console.log("In onOpen", evt);
  }
  onMessage(evt) {
    console.log("In onMessage", evt);
    // Este if permite que el primer mensaje del servidor no se tenga en cuenta.
    // El primer mensaje solo confirma que se estableció la conexión.
    // De ahí en adelante intercambiaremos solo puntos(x,y) con el servidor
    if (evt.data != "Connection established.") {
      this.receivef(evt.data);
    }
  }
  onError(evt) {
    console.error("In onError", evt);
  }

  onClose(evt) {
    console.log("In onClose", evt);
  }

  send(value, selectedToken) {
    let msg = JSON.stringify({ "value": value, "selectedToken": selectedToken });
    console.log("sending: ", msg);
    this.wsocket.send(msg);
  }
}
// Componente que crea un tipo de cuadros del trablero
function Square({ value, onClick, show, selected }) {
  const handleClick = () => {
    onClick(value);
  };
  const array = [15, 4, 2, 17, 6, 13, 11, 8, 10, 24, 33, 20, 31, 22, 29, 28, 35, 26];
  const redArray = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];
  const newId = redArray.includes(Number(value)) ? 'red-square' : array.includes(Number(value)) ? 'square' : Number(value) === 0 ? 'cero' : 'other';
  return (
    <div id="divBet">
      <button className={newId}
        id={value} onClick={handleClick}>
        {value}{show && <div className="squareBet" value={selected}></div>}
      </button>
    </div>
  );
}
// Componente que crea un tipo de cuadros del trablero
function Square12({ value, onClick, show, selected }) {
  const handleClick = () => {
    onClick(value);
  };
  return (
    <div id="divBet">
      <button className="square12" value='3rd 12' onClick={handleClick}>
        {value}{show && <div className='squareBet2' value={selected}></div>}
      </button>
    </div>
  );
}
// Componente que crea un tipo de cuadros del trablero
function SquareButton({ value, onClick, show, selected }) {
  const handleClick = () => {
    onClick(value);
  };
  return (
    <div id="divBet">
      <button className="squarebutton" id={value} value={value} onClick={handleClick}>
        {value}{show && <div className='squareBetbr' value={selected}></div>}
      </button>
    </div>
  );
}
// Componente que crea los tipos de fichas para apostar del trablero
function Tokens({ value, onClickToken, selected }) {
  const handleClick = () => {
    onClickToken(value);
  };

  return (
    <button
      className={`Tokens ${selected ? "selected" : ""}`}
      value={value}
      id={value}
      onClick={handleClick}

    >
      {value}
    </button>
  );
}

// componente que crea el tablero
function Board(winner) {
  const red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  const black = [2, 4, 6, 8, 10, 11, 13, , 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
  const third12 = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
  const second12 = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  const first12 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const comunicationWS = React.useRef(null);
  const [show, setShow] = React.useState(new Map());
  const [bet, setBet] = React.useState(0);
  const [gain, setGain] = React.useState(0);
  const [balance, setBalance] = React.useState(0);
  const [clickedValues, setClickedValues] = React.useState(new Map());
  const [selectedToken, setSelectedToken] = React.useState("00");
  const [disable, setDisable] = React.useState(false);
  const count = React.useRef(0);
  const amountWon = React.useRef(0);
  //funcion de recargar saldo y limpiar tablero
  const recharge = () => { setDisable(true), (setBalance(balance + 100000)) }
  const clear = () => { (setClickedValues(new Map(clickedValues.clear())), comunicationWS.current.send("clear", ""), setShow(new Map(show.clear())), setBalance(balance + bet), setBet(0)) }
  const onClickToken = (value) => {
    setSelectedToken(value)
  };
  //funcion que al clickear un boton lo ingresa en un mapa, ajusta el balance y el monto apostado (usar condicionales para verificar disponibilidad de saldo para apostar) 
  const handleSquareClick = (value) => {
    selectedToken === null ? null :
    selectedToken === "delete" && clickedValues.has(value) ? (setShow(new Map(show.set(value, false))), setBalance(balance + Number(clickedValues.get(value))), comunicationWS.current.send(value, selectedToken), setBet(bet - Number(clickedValues.get(value))), (clickedValues.delete(value), setClickedValues(new Map(clickedValues))))
      : (
        (!clickedValues.has(value) && balance > 0 && balance >= Number(selectedToken) ? (setShow(new Map(show.set(value, true)), setClickedValues(new Map(clickedValues.set(value, selectedToken))), comunicationWS.current.send(value, selectedToken), setBalance(balance - Number(selectedToken)), setBet(bet + Number(selectedToken)))) : "null"),
        (!clickedValues.has(value) && balance < Number(selectedToken) ? alert("insuficinetes fondos") : "null"));
  }
  // realiza la accion de clickear el boton que mando la otra sesion por medio del websocket
  React.useEffect(() => {
    comunicationWS.current = new WSChannel(RuletaServiceURL(),
      (msg) => {
        var obj = JSON.parse(msg);
        console.log("On func call back ", msg);
        console.log(obj.selectedToken)
        var element = document.getElementById(obj.value);
        if (obj.selectedToken === "delete") {
          setSelectedToken("delete");
        } else {
          setSelectedToken("00")
        }
        element.click();
      });
    return () => {
      console.log('Clossing connection ...')
      comunicationWS.current.close();
    };
  }, []);
  // Realiza el calculo de cuanto se gana de acuerdo al numero ganador
  React.useEffect(() => {
    if (winner.winner != null) {
      count.current = count.current + 1;
      if (((count.current % 2) != 0)) {
        if (clickedValues.has(winner.winner.toString())) {
          amountWon.current += Number(clickedValues.get(winner.winner.toString())) * 36;
        }
        if (red.includes(Number(winner.winner)) && clickedValues.has("RED")) {
          amountWon.current += Number(clickedValues.get("RED")) * 2;
        }
        if (black.includes(Number(winner.winner)) && clickedValues.has("BLACK")) {
          amountWon.current += Number(clickedValues.get("BLACK") * 2);
        }
        if (first12.includes(Number(winner.winner)) && clickedValues.has('1st 12')) {
          amountWon.current += Number(clickedValues.get("1st 12") * 3);
        }
        if (second12.includes(Number(winner.winner)) && clickedValues.has('2nd 12')) {
          amountWon.current += Number(clickedValues.get("2nd 12") * 3);
        }
        if (third12.includes(Number(winner.winner) && clickedValues.has('3rd 12'))) {
          amountWon.current += Number(clickedValues.get("3rd 12") * 3);
        }
        if (first12.includes(Number(winner.winner)) && clickedValues.has('2to1')) {
          amountWon.current += Number(clickedValues.get("2to1") * 3);
        }
        if (second12.includes(Number(winner.winner)) && clickedValues.has('2to1.')) {
          amountWon.current += Number(clickedValues.get("2to1.") * 3);
        }
        if (third12.includes(Number(winner.winner) && clickedValues.has('2to1..'))) {
          amountWon.current += Number(clickedValues.get("2to1..") * 3);
        }
        setGain(amountWon.current);
        console.log("gano: " + amountWon.current);
        setBalance(balance + amountWon.current);
        setBet(0);
        setGain(0);
        setClickedValues(new Map(clickedValues.clear()));
        setShow(new Map(show.clear()));
        amountWon.current = 0;
      }

    }
  }, [winner]);

  return (
    <div className="board-game">
      <Menu balance={balance} bet={bet} gain={gain} onClick={recharge} disabled={disable} />
      <div className="board">
        <div className="board-row">
          <Square value='2to1' onClick={handleSquareClick} show={show.get('2to1')} selected={clickedValues.get('2to1')} />
          <Square value='36' onClick={handleSquareClick} show={show.get('36')} selected={clickedValues.get('36')} />
          <Square value='33' onClick={handleSquareClick} show={show.get('33')} selected={clickedValues.get('33')} />
          <Square value='30' onClick={handleSquareClick} show={show.get('30')} selected={clickedValues.get('30')} />
          <Square value='27' onClick={handleSquareClick} show={show.get('27')} selected={clickedValues.get('27')} />
          <Square value='24' onClick={handleSquareClick} show={show.get('24')} selected={clickedValues.get('24')} />
          <Square value='21' onClick={handleSquareClick} show={show.get('21')} selected={clickedValues.get('21')} />
          <Square value='18' onClick={handleSquareClick} show={show.get('18')} selected={clickedValues.get('18')} />
          <Square value='15' onClick={handleSquareClick} show={show.get('15')} selected={clickedValues.get('15')} />
          <Square value='12' onClick={handleSquareClick} show={show.get('12')} selected={clickedValues.get('12')} />
          <Square value='9' onClick={handleSquareClick} show={show.get('9')} selected={clickedValues.get('9')} />
          <Square value='6' onClick={handleSquareClick} show={show.get('6')} selected={clickedValues.get('6')} />
          <Square value='3' onClick={handleSquareClick} show={show.get('3')} selected={clickedValues.get('3')} />
        </div>
        <div className="board-row-reverse">
          <Square value='0' onClick={handleSquareClick} show={show.get('0')} selected={clickedValues.get('0')} />
          <Square value='2' onClick={handleSquareClick} show={show.get('2')} selected={clickedValues.get('2')} />
          <Square value='5' onClick={handleSquareClick} show={show.get('5')} selected={clickedValues.get('5')} />
          <Square value='8' onClick={handleSquareClick} show={show.get('8')} selected={clickedValues.get('8')} />
          <Square value='11' onClick={handleSquareClick} show={show.get('11')} selected={clickedValues.get('11')} />
          <Square value='14' onClick={handleSquareClick} show={show.get('14')} selected={clickedValues.get('14')} />
          <Square value='17' onClick={handleSquareClick} show={show.get('17')} selected={clickedValues.get('17')} />
          <Square value='20' onClick={handleSquareClick} show={show.get('20')} selected={clickedValues.get('20')} />
          <Square value='23' onClick={handleSquareClick} show={show.get('23')} selected={clickedValues.get('23')} />
          <Square value='26' onClick={handleSquareClick} show={show.get('26')} selected={clickedValues.get('26')} />
          <Square value='29' onClick={handleSquareClick} show={show.get('29')} selected={clickedValues.get('29')} />
          <Square value='32' onClick={handleSquareClick} show={show.get('32')} selected={clickedValues.get('32')} />
          <Square value='35' onClick={handleSquareClick} show={show.get('35')} selected={clickedValues.get('35')} />
          <Square value='2to1.' onClick={handleSquareClick} show={show.get('2to1.')} selected={clickedValues.get('2to1.')} />
        </div>
        <div className="board-row">
          <Square value='2to1..' onClick={handleSquareClick} show={show.get('2to1..')} selected={clickedValues.get('2to1..')} />
          <Square value='34' onClick={handleSquareClick} show={show.get('34')} selected={clickedValues.get('34')} />
          <Square value='31' onClick={handleSquareClick} show={show.get('31')} selected={clickedValues.get('31')} />
          <Square value='28' onClick={handleSquareClick} show={show.get('28')} selected={clickedValues.get('28')} />
          <Square value='25' onClick={handleSquareClick} show={show.get('25')} selected={clickedValues.get('25')} />
          <Square value='22' onClick={handleSquareClick} show={show.get('22')} selected={clickedValues.get('22')} />
          <Square value='19' onClick={handleSquareClick} show={show.get('19')} selected={clickedValues.get('19')} />
          <Square value='16' onClick={handleSquareClick} show={show.get('16')} selected={clickedValues.get('16')} />
          <Square value='13' onClick={handleSquareClick} show={show.get('13')} selected={clickedValues.get('13')} />
          <Square value='10' onClick={handleSquareClick} show={show.get('10')} selected={clickedValues.get('10')} />
          <Square value='7' onClick={handleSquareClick} show={show.get('7')} selected={clickedValues.get('7')} />
          <Square value='4' onClick={handleSquareClick} show={show.get('4')} selected={clickedValues.get('4')} />
          <Square value='1' onClick={handleSquareClick} show={show.get('1')} selected={clickedValues.get('1')} />
        </div>
        <div className="board-row1">
          <button className="void"></button>
          <Square12 value='3rd 12' onClick={handleSquareClick} show={show.get('3rd 12')} selected={clickedValues.get('3rd 12')} />
          <Square12 value='2nd 12' onClick={handleSquareClick} show={show.get('2nd 12')} selected={clickedValues.get('2nd 12')} />
          <Square12 value='1st 12' onClick={handleSquareClick} show={show.get('1st 12')} selected={clickedValues.get('1st 12')} />
        </div>
        <div className="board-row1">
          <button className="void" ></button>
          <button className="squarebutton" value='19-36' >19 to 36</button>
          <button className="squarebutton" value='odd'>ODD</button>
          <SquareButton value='BLACK' onClick={handleSquareClick} show={show.get('BLACK')} selected={clickedValues.get('BLACK')} />
          <SquareButton value='RED' onClick={handleSquareClick} show={show.get('RED')} selected={clickedValues.get('RED')} />
          <button className="squarebutton" value='even'>EVEN</button>
          <button className="squarebutton" value='1-18'>1 to 18</button>
        </div>
        <div className="token-row">
          <Tokens
            value="1000"
            onClickToken={onClickToken}
            selected={selectedToken === "1000"}
          />
          <Tokens
            value="2000"
            onClickToken={onClickToken}
            selected={selectedToken === "2000"}
          />
          <Tokens
            value="5000"
            onClickToken={onClickToken}
            selected={selectedToken === "5000"}
          />
          <Tokens
            value="10000"
            onClickToken={onClickToken}
            selected={selectedToken === "10000"}
          />
          <Tokens
            value="30000"
            onClickToken={onClickToken}
            selected={selectedToken === "30000"}
          />
          <Tokens
            value="delete"
            onClickToken={onClickToken}
            selected={selectedToken === "delete"}
          />
          <Tokens
            value="clear"
            onClickToken={clear}
          />
          <Tokens
            value="00"
            onClickToken={onClickToken}
            selected={selectedToken === "00"}
          />
        </div>
      </div>
    </div>
  );
}
//componente de menu(menu superior y lateral que contiene informacion de saldo, apuesta y ganado) 
function Menu({ balance, bet, gain, onClick, disabled }) {
  const [visible, setVisible] = React.useState(false);
    // obtiene jugador de la sesion
    const player = React.useRef(null);
    fetch("http://localhost:8080/user-info")
        .then(res => res.json())
        .then(
          (result) => {
            player.current = result.name;
          },
          (error) => {
            setSvrStatus("error");
          });
    
  const toggleDiv = () => {
    setVisible(!visible);
  };

  const onClickRecharge = () => {
    onClick(balance);
  };
  return (
    <header>
      <nav>
        <div className="left-section">
          <button className="account-section" onClick={toggleDiv}>
            Cuenta
          </button>{visible &&
            <div className={"verticalMenu"}>
              <nav className='nav2'>
                <div className="up-section">
                  <div className="image-section">
                    <svg className="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </div><br />
                  <div className="name-section">
                    <span>{player.current}</span>
                  </div>
                </div>
                <div className="bottom-section">
                  <div>
                    <button className='exitbutton'><svg className="exit-button" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></button>
                  </div>
                  <div className="exit-section">
                    <span>Salir</span>
                  </div><br />
                </div>
              </nav>
            </div> || visible || <div className={"verticalMenu1"}></div>}
        </div>
        <div className="right-section">
          <div className="balance-section">
            <span>Saldo: ${balance}</span>
          </div>
          <div className="divider"></div>
          <div className="profit-section">
            <span>Ganancia: ${gain}</span>
          </div>
          <div className="divider"></div>
          <div className="bet-section">
            <span>Apuesta: ${bet}</span>
          </div>
          <div className="recharge-section">
            <button disabled={disabled} onClick={onClickRecharge}>Recargar</button>
          </div>
        </div>
      </nav>
    </header>
  );
}
//componente que devuelve la ruleta
function Ruleta() {
  const winner = React.useRef(null);
  const [showRuleta, setShowRuleta] = React.useState(false);
  var num = Math.random() + 1;
  // cambia el estado de visibilidad de la ruleta despues de cierto tiempo y calcula cual es el numero ganador
  React.useEffect(() => {
    const toggleRuleta = () => {
      setShowRuleta((prevShowRuleta) => !prevShowRuleta);
    };
    const interval = setInterval(() => {
      if (!showRuleta) {
        const hideTimeout = setTimeout(() => {
          toggleRuleta();
          checkPos();

        }, 19000);

        toggleRuleta();

        return () => {
          clearTimeout(hideTimeout);
        };
      }
    }, 50000);

    return () => {
      clearInterval(interval);
    };
  }, [showRuleta, winner]);
  // calcula distancias entre pelota y numeros para determinar el ganador con menor distancia
  function checkPos() {
    let winnerDistance = 1000;
    let winners = 0;
    const sphere_top = document.getElementById("37").getBoundingClientRect().top;
    const sphere_left = document.getElementById("37").getBoundingClientRect().left;
    const sphere_bottom = document.getElementById("37").getBoundingClientRect().bottom;
    const sphere_right = document.getElementById("37").getBoundingClientRect().right;
    const centro_x = ((sphere_right - sphere_left) / 2) + sphere_left;
    const centro_y = ((sphere_bottom - sphere_top) / 2) + sphere_top;
    for (let i = 0; i < 37; i++) {
      const element = document.getElementById(i.toString());
      if (element) {
        const top = element.getBoundingClientRect().top;
        const left = element.getBoundingClientRect().left;
        const distance = Math.sqrt(Math.pow((top - centro_y), 2) + Math.pow((left - centro_x), 2));
        if (distance < winnerDistance) {
          winnerDistance = distance;
          winners = i;
        }
      }
      winner.current = winners
    } console.log("bola ganadora: " + winners);
  }
  return (
    <div>
      <Board winner={winner.current}/>
      {showRuleta && (<div className='ruleta'><div className='body-circulo'>
        <div className="contenedor-circulo">
          <div className="pruebaruleta" id='0'></div>
          <div className="pruebaruleta" id='1'></div>
          <div className="pruebaruleta" id='2'></div>
          <div className="pruebaruleta" id='3'></div>
          <div className="pruebaruleta" id='4'></div>
          <div className="pruebaruleta" id='5'></div>
          <div className="pruebaruleta" id='6'></div>
          <div className="pruebaruleta" id='7'></div>
          <div className="pruebaruleta" id='8'></div>
          <div className="pruebaruleta" id='9'></div>
          <div className="pruebaruleta" id='10'></div>
          <div className="pruebaruleta" id='11'></div>
          <div className="pruebaruleta" id='12'></div>
          <div className="pruebaruleta" id='13'></div>
          <div className="pruebaruleta" id='14'></div>
          <div className="pruebaruleta" id='15'></div>
          <div className="pruebaruleta" id='16'></div>
          <div className="pruebaruleta" id='17'></div>
          <div className="pruebaruleta" id='18'></div>
          <div className="pruebaruleta" id='19'></div>
          <div className="pruebaruleta" id='20'></div>
          <div className="pruebaruleta" id='21'></div>
          <div className="pruebaruleta" id='22'></div>
          <div className="pruebaruleta" id='23'></div>
          <div className="pruebaruleta" id='24'></div>
          <div className="pruebaruleta" id='25'></div>
          <div className="pruebaruleta" id='26'></div>
          <div className="pruebaruleta" id='27'></div>
          <div className="pruebaruleta" id='28'></div>
          <div className="pruebaruleta" id='29'></div>
          <div className="pruebaruleta" id='30'></div>
          <div className="pruebaruleta" id='31'></div>
          <div className="pruebaruleta" id='32'></div>
          <div className="pruebaruleta" id='33'></div>
          <div className="pruebaruleta" id='34'></div>
          <div className="pruebaruleta" id='35'></div>
          <div className="pruebaruleta" id='36'></div>
          <div id='37' className='circulo' style={{ '--randomNumber-rotation': num }}></div>
        </div>
      </div></div>)}
    </div>
  )
}
//componente del juego
function Game() {
  return (
    <div>
      <Ruleta/>
    </div>
  );
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Game />
);