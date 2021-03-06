
const deleteExpenseBtns = document.querySelectorAll(".deleteExpenseBtn");


const fetchRequests = new FetchRequests();


for (let deleteBtn of deleteExpenseBtns) {

    deleteBtn.addEventListener("click", (evt) => {
        let id = evt.target.id;
        let baseurl = evt.target.attributes.baseurl.value;
        let deleteUrl = `${baseurl}/${id}`;
        console.log(deleteUrl);
        fetchRequests.deleteResource(deleteUrl)
            .then(resultData => {
                console.log(resultData);
                location.reload();
            })
            .catch(error => console.error(error));
        
    });
}