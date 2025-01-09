import { React, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

function SignIn() {

    // State to access input values
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const getuser = (name, email, password) => {
        return { name, email, password };
    };


    const onSubmit = (e) => {
        e.preventDefault();


        const user = getuser(name, email, password);


        fetch("http://localhost:3000/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("User added:", data);
                Swal.fire({
                    title: "Sign Up Successful!",
                    icon: "success",
                });
            })
            .catch((error) => {
                console.error("Error posting user:", error);
                Swal.fire({
                    title: "Sign Up Failed!",
                    icon: "error",
                    text: "There was an error while creating your account. Please try again.",
                });
            });

        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className="grid items-center justify-center py-36">
            <div className="border-2 border-sky-500 w-[400px] h-[550px] rounded-md">
                <h1 className="text-center p-5 text-4xl font-semibold hover:opacity-50">Sign In</h1>

                <div className="">
                    <form className="flex flex-col p-5 gap-6" onSubmit={onSubmit}>
                        <div className="flex flex-col">
                            <p>Enter Name:</p>
                            <input
                                type="text"
                                className="border-2 p-2"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

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
                            <button className="border-2 w-full p-2" type="submit">Sign Up</button>
                        </div>
                    </form>

                    <div className="text-center mt-10">
                        <Link to='/'>
                            <h2>Already Have an Account? Sign In</h2>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
