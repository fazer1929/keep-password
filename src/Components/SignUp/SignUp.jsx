import React, { useRef, useState } from "react";
import { useAuth } from "../../AuthContext";
function SignUp() {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { signup } = useAuth();
	const emailRef = useRef();
	const passRef = useRef();
	const passConfirmRef = useRef();
	function handleSubmit(e) {
		e.preventDefault();
		if (passRef.current.value !== passConfirmRef.current.value) {
			return setError("Passwords Do Not Match");
		}
		try {
			setError("");
			setLoading(true);
			signup(emailRef.current.value, passRef.current.value);
			setLoading(false);
		} catch {
			setLoading(false);
			setError("Failed To Create Account");
		}
	}
	return (
		<div>
			<div>Already Have An Account? Login.</div>
			{error}
			<form>
				<input type="email" placeholder="email" required ref={emailRef} />
				<input type="password" placeholder="password" required ref={passRef} />
				<input
					type="password"
					placeholder="password Confirm"
					required
					ref={passConfirmRef}
				/>
				<button disabled={loading} onClick={handleSubmit}>
					SignUp
				</button>
			</form>
		</div>
	);
}

export default SignUp;
