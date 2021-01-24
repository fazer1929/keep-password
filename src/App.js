import logo from "./logo.svg";
import SignUp from "./Components/SignUp/SignUp";
import SignIn from "./Components/SignIn/SignIn";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Dashboard} />
				<Route path="/signup" component={SignUp} />
				<Route path="/signup" component={SignIn} />
			</Switch>
		</Router>
	);
}

export default App;
