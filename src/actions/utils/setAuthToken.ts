import axios from "axios";

const setAuthTokenHeader = () => {
	if (localStorage.getItem("token")) {
		axios.defaults.headers.common.authorization = `Bearer ${localStorage.getItem(
			"token"
		)}`;
	} else {
		localStorage.removeItem("token");
	}
};
export default setAuthTokenHeader;
