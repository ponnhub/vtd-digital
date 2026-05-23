import liff from '@line/liff';
import './App.css';
import { useEffect } from 'react';
import SharePage from './pages/SharePage/SharePage';
import { 
  BrowserRouter as Router } from 'react-router-dom';


function App() {

  useEffect(() => {


    liff.init({
      liffId: '1657061659-9mX4RN6v',
      withLoginOnExternalBrowser: true, // Enable automatic login process
    })

});


  
  return (
    <div className="App">
          <header className="App-header">

              <Router>
                <SharePage />  
            </Router>
  


          </header>
        </div>

  );
}

export default App;
