import axios from "axios";

const setAuthTokenHeader = () => {
	if (localStorage.getItem("token")) {
		axios.defaults.headers.common.authorization = `Bearer ${localStorage.getItem(
			"token"
		)}`;
		
		axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
	} else {
		localStorage.removeItem("token");
	}
};
export default setAuthTokenHeader;
