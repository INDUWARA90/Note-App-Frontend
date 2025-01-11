import { React, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";

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

    const [txtPassword, txtSetPassword] = useState('');
    const [txtShowPassword, txtSetShowPassword] = useState(false);

    return (
        <div className="grid items-center justify-center py-36">
            <div className="border-2 border-sky-400 w-[400px] h-[550px] rounded-md">
                <h1 className="text-center p-5 text-5xl font-semibold">Sign In</h1>

                <div className="">
                    <form className="flex flex-col p-5 gap-6" onSubmit={onSubmit}>
                        <div className="flex flex-col">
                            <p className="font-semibold">Enter Name:</p>
                            <input
                                type="text"
                                className=" text-white font-medium border-2 p-2 rounded-md bg-transparent outline-none from-neutral-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <p className="font-semibold">Enter Email:</p>
                            <input
                                type="email"
                                className="text-white font-medium border-2 p-2 rounded-md bg-transparent outline-none from-neutral-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <p className="font-semibold">Enter Password :</p>
                            <div className="flex items-center">
                                <input
                                    type={txtShowPassword ? "text" : "password"}
                                    className="text-white font-medium border-2 p-2 rounded-md bg-transparent outline-none"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="ml-3 text-[23px] "
                                    onClick={() => txtSetShowPassword(!txtShowPassword)}
                                >
                                    {txtSetShowPassword ? <IoMdEyeOff />: <MdOutlineRemoveRedEye />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col items-center mt-3">
                            <button className="text-white w-full p-3 rounded-md font-medium bg-black hover:opacity-80" type="submit">Sign Up</button>
                        </div>
                    </form>

                    <div className="text-center mt-10">
                        <Link to='/'>
                            <h2 className="font-medium italic hover:opacity-80">Already Have an Account? Sign In</h2>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
