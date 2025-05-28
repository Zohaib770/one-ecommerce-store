import { useState } from 'react';
import textContent from "../../locales/en";
import Apis from '../../api/Apis'

const Login = () => {
    const { userLogin } = Apis();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await userLogin(email, password);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl w-full">
                {/* Left Side Branding */}
                <div className="md:w-1/2 bg-slate-900 text-white flex items-center justify-center p-10">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-2">{textContent.store_name}</h2>
                        <h3 className="text-3xl font-bold mb-2">{textContent.login_admin_panel}</h3>
                    </div>
                </div>

                {/* Right Side Form */}
                <div className="md:w-1/2 p-10">
                    <h3 className="text-2xl font-semibold text-slate-900 text-center mb-6">{textContent.login_to_account}</h3>
                    <form className="space-y-5" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{textContent.login_email}</label>
                            <input
                                type="email"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">{textContent.login_pass}</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition"
                        >
                            {textContent.login_btn}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
