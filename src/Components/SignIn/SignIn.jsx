import React, { useRef, useState } from "react";
import { useAuth } from "../../AuthContext";
import { useHistory } from "react-router-dom";

export default function SignIn() {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { signin } = useAuth();
	const emailRef = useRef();
	const passRef = useRef();
	const history = useHistory();
	function handleSubmit(e) {
		e.preventDefault();
		try {
			setError("");
			setLoading(true);
			signin(emailRef.current.value, passRef.current.value);
			setLoading(false);
			history.push("/");
		} catch {
			setLoading(false);
			setError("Failed To Login");
		}
	}
	return (
		<div>
			<div>Already Have An Account? Login.</div>
			{error}
			<form>
				<input type="email" placeholder="email" required ref={emailRef} />
				<input type="password" placeholder="password" required ref={passRef} />
				<button disabled={loading} onClick={handleSubmit}>
					SignIn
				</button>
			</form>
		</div>
	);
}
