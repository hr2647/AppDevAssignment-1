document.getElementById("productForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const price = parseFloat(document.getElementById("price").value);
    const description = document.getElementById("description").value;
    const message = document.getElementById("message");

    fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, price, description })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("failed to add product");
        }
        return response.json();
    })
    .then(data => {
        message.style.color = "green";
        message.textContent = "Product added";
        document.getElementById("productForm").reset();
    })
    .catch(error => {
        message.style.color = "red";
        message.textContent = "Error adding product";
        console.log(error);
    });
});
