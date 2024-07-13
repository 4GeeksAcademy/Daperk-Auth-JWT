import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import Login from "../components/Login.jsx";
import Signup from "../components/Signup.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<div className="text-center mt-5">
			<Signup/>
			<Login />
		</div>
	);
}; 