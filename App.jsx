import Container from "./components/Container";


function App() {
  return (
    <div
      style={{
        minHeight: "100vh",     
        backgroundColor: "#F3FCF0",
        paddingTop: "20px",      
      }}
    >
    
      <div className="flow-bg"><Container /></div></div>
      
   
  );
}
const appBackground = {
  minHeight: "100vh",
  width: "100%",
  background: "linear-gradient(135deg,#EEF4ED)", 
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px 0",
};
export default App;
