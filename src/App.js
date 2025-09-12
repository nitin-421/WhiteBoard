import Board from './Components/Board';
import Toolbar from './Components/Toolbar/index';
import BoardProvider from './Store/Board/BoardProvider';
import ToolboxProvider from './Store/Tool/ToolboxProvider';
import {Toolbox} from './Components/Toolbox/index';

function App() {
  return (
    <BoardProvider>
      <ToolboxProvider>
        <Toolbar />
        <Board />
        <Toolbox/>
      </ToolboxProvider>
    </BoardProvider>
  );
}

export default App;