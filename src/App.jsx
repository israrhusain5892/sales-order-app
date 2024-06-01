
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import LoginForm from './LoginForm';
import ProductForm from './Components/ProductForm';
import ActiveSaleTable from './Components/ActiveSaleTable';
import CompletedSaleTable from './Components/CompletedSaleTable';
const queryClient = new QueryClient();

function App() {
      
  // "login": "correct_login@example.com",
  // "password": "C0rr3Ct_P@55w0rd"
    // demo login username and password

  return (
    <>
        
          <QueryClientProvider client={queryClient}>
          
            <Router>
                <Routes>
                     <Route path="/" element={<Dashboard/>}/>
                     <Route path="/loginForm" element={<LoginForm/>}/>
                     <Route path="/product" element={<ProductForm/>}/>
                     <Route path="/activesale" element={<ActiveSaleTable/>}/>
                     <Route path="/completedsale" element={<CompletedSaleTable/>}/>

                </Routes>
            </Router>
            
         </QueryClientProvider> 
         
    </>
  )
}

export default App
