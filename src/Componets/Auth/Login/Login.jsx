import { React, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function Login() {
    const navigate = useNavigate();
   
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [array, setArray] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/user")
            .then((response) => response.json())
            .then((data) => {
                setArray(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const onsubmit = (e) => {
        e.preventDefault();

        const user = array.find((element) => element.email === email && element.password === password);

        if (user) {
            Swal.fire({
                title: "Login Successfully!",
                icon: "success"
            });
            navigate('/home')

        } else {
            Swal.fire({
                icon: "error",
                title: "Invalid email or password",
                text: "Please try Again!",
            });
        }

    }

    return (
        <div className="grid items-center justify-center py-36">
            <div className="border-2 border-sky-500 w-[400px] h-[450px] rounded-md">
                <h1 className="text-center p-5 text-4xl font-semibold hover:opacity-50">Login</h1>

                <div className="">
                    <form className="flex flex-col p-5 gap-6 " onSubmit={onsubmit}>

                        <div className="flex flex-col">
                            <p>Enter Email:</p>
                            <input
                                type="email"
                                className="border-2 p-2"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <p>Enter Password:</p>
                            <input
                                type="password"
                                className="border-2 p-2"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-col items-center mt-3">
                            <button className="border-2 w-full p-2" type="submit">Login</button>
                        </div>

                    </form>

                    <div className="text-center mt-10">
                        <Link to='/signIn'><h2>Don't Have an Account? Sign Up</h2></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
