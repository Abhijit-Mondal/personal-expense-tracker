
const deleteExpenseBtns = document.getElementsByClassName("deleteExpense");


const fetchRequests = new FetchRequests();


for (let deleteBtn of deleteExpenseBtns) {

    deleteBtn.addEventListener("click", (evt) => {
        evt.preventDefault();
        let id = evt.target.id;
        let baseuri = evt.target.baseURI;
        let endpoint = baseuri.substring(0, baseuri.lastIndexOf("/") + 1);
        let deleteUrl = endpoint + id;
        console.log(deleteUrl);
        fetchRequests.deleteResource(deleteUrl)
            .then(resultData => {
                console.log(resultData);
                location.reload();
            })
            .catch(error => console.error(error));
        
    });
}