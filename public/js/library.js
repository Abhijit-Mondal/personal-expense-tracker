class FetchRequests {

    async deleteResource(url) {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "credentials": "cross-origin"
            }
        });

        const resultData = "RESOURCE DELETED";

        return resultData;
    }
}