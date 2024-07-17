import axios from "axios";

const setAuthTokenHeader = () => {
	axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
	axios.defaults.headers.common["Content-Type"] = "application/json";
	axios.defaults.headers.common.Accept = "application/json";

	if (localStorage.getItem("token")) {
		axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
			"token"
		)}`;	
	} else localStorage.removeItem("token");
};
export default setAuthTokenHeader;
