class FetchRequests {

    async deleteResource(url) {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        });

        const resultData = "RESOURCE DELETED";

        return resultData;
    }
}