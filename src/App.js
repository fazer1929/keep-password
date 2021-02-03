import logo from "./logo.svg";
import SignUp from "./Components/SignUp/SignUp";
import SignIn from "./Components/SignIn/SignIn";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import HomePage from "./Pages/HomePage";
import "semantic-ui-css/semantic.min.css";
import Footer from "./Components/Footer/Footer";
import AddInstance from "./Components/AddInstance/AddInstance";
function App() {
	return (
		<Router>
			<Switch>
				<PrivateRoute exact path="/" component={Dashboard} />
				<Route path="/add" component={AddInstance} />
				<Route path="/signin">
					<HomePage comp={SignIn} />
				</Route>
				<Route path="/signup">
					<HomePage comp={SignUp} />
				</Route>
				<Route path="/forgot-password" component={ForgotPassword} />
			</Switch>
			<Footer />
		</Router>
	);
}

export default App;
