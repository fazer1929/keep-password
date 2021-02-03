import React, { useRef, useState } from "react";
import { useAuth } from "../../AuthContext";
import { useHistory, Link, Redirect } from "react-router-dom";
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
export default function SignIn() {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { signin, currentUser } = useAuth();
	const [pass, setPass] = useState("");
	const [email, setEmail] = useState("");

	function handleEmailChange(e) {
		setEmail(e.target.value);
	}
	function handlePassChange(e) {
		setPass(e.target.value);
	}

	const history = useHistory();
	function handleSubmit(e) {
		e.preventDefault();
		try {
			setError("");
			setLoading(true);
			signin(email, pass);
			setLoading(false);
			history.push("/");
		} catch (e) {
			setLoading(false);
			setError("Failed To Login");
		}
	}
	if (currentUser) {
		history.push("/");
	}
	return (
		<Grid.Column style={{ maxWidth: 450 }}>
			<Header as="h2" color="teal" textAlign="center">
				<Image src={auth} /> Log-in to your account
			</Header>
			<Form size="large">
				<Segment stacked>
					<Form.Input
						fluid
						icon="user"
						value={email}
						onChange={handleEmailChange}
						iconPosition="left"
						placeholder="E-mail address"
					/>
					<Form.Input
						fluid
						value={pass}
						onChange={handlePassChange}
						icon="lock"
						iconPosition="left"
						placeholder="Password"
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
				New to us? <Link to="/signup">Sign Up</Link>
			</Message>
		</Grid.Column>
	);
}
