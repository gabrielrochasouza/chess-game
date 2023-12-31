import { ToastContainer } from "react-toastify";
import ChessBoard from "./components/ChessBoard";
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <>
        <ChessBoard />
        <ToastContainer 
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    </>
  )
}

export default App
