// Example of making an authenticated request
async function fetchProtectedData() {
    const token = localStorage.getItem("token");

    const res = await fetch("https://your-backend-api.com/api/protected", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.ok) {
        const data = await res.json();
        console.log(data);
    } else {
        console.log("Failed to fetch protected data");
    }
}
