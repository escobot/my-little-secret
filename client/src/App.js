import logo from './logo.svg';
// import './App.css';
import SecretForm from './Components/SecretForm';
import SecretList from './Components/SecretList';

function App() {
  return (
    <div className="container">
      <SecretForm />
      <hr />
      <SecretList />
    </div>
  );
}

export default App;
