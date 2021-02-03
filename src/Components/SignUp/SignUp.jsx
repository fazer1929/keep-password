import React, { useRef, useState } from "react";
import { useAuth } from "../../AuthContext";
import { useHistory, Link } from "react-router-dom";
import {
	Container,
	Grid,
	Header,
	Image,
	Form,
	Segment,
	Button,
	Message,
} from "semantic-ui-react";
import auth from "../../Assests/Images/auth.svg";

function SignUp() {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { signup, currentUser } = useAuth();
	const history = useHistory();
	const [pass, setPass] = useState("");
	const [email, setEmail] = useState("");
	const [conPass, setConPass] = useState("");

	function handleEmailChange(e) {
		setEmail(e.target.value);
	}
	function handlePassChange(e) {
		setPass(e.target.value);
	}
	function handleConPassChange(e) {
		setConPass(e.target.value);
	}
	function handleSubmit(e) {
		e.preventDefault();
		if (pass !== conPass) {
			return setError("Passwords Do Not Match");
		}
		try {
			setError("");
			setLoading(true);
			signup(email, pass);
			setLoading(false);
			history.push("/");
		} catch {
			setLoading(false);
			setError("Failed To Create Account");
		}
	}
	if (currentUser) {
		history.push("/");
	}

	return (
		<Grid.Column style={{ maxWidth: 450 }}>
			<Header as="h2" color="teal" textAlign="center">
				<Image src={auth} /> Create An Account
			</Header>
			<Form size="large">
				<Segment stacked>
					<Form.Input
						fluid
						onChange={handleEmailChange}
						icon="user"
						value={email}
						iconPosition="left"
						placeholder="E-mail address"
					/>
					<Form.Input
						fluid
						icon="lock"
						value={pass}
						onChange={handlePassChange}
						iconPosition="left"
						placeholder="Password"
						type="password"
					/>
					<Form.Input
						fluid
						value={conPass}
						icon="lock"
						onChange={handleConPassChange}
						iconPosition="left"
						placeholder="Confirm Password"
						type="password"
					/>
					<Button
						disabled={loading}
						loading={loading}
						onClick={handleSubmit}
						color="teal"
						fluid
						size="large"
					>
						Login
					</Button>
				</Segment>
			</Form>
			<Message>
				Have An Account? <Link to="/signin">Sign In</Link>
			</Message>
		</Grid.Column>
	);
}

export default SignUp;
