const getCustomer = () => {
    console.log('calling getcustomer');
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch("https://oblist-b2b.onrender.com/api/customers", requestOptions)
    .then((response) => response.text())
    .then((result) => {
        const res = JSON.parse(result);
        let reg_customers = [], pro_customers = [];

        // Categorize customers into regular and studio
        for (let i = 0; i < res.length; i++) {
            if (res[i].tag == 'studio') {
                pro_customers.push(res[i]);
            } else {
                reg_customers.push(res[i]);
            }
        }

        // Populate regular customers table
        const regularCustomersList = document.getElementById("regular-customers-list");
        reg_customers.forEach(customer => {
            const row = document.createElement("tr");
            row.classList.add("table-info"); // Styling with Bootstrap class

            row.innerHTML = `
                <td>${customer.firstName} ${customer.lastName}</td>
                <td>${customer.email}</td>
                <td>${customer.tag}</td>
            `;
            regularCustomersList.appendChild(row);
        });

        // Populate studio customers table
        const studioCustomersList = document.getElementById("studio-customers-list");
        pro_customers.forEach(customer => {
            const row = document.createElement("tr");
            row.classList.add("table-success"); // Styling with Bootstrap class

            row.innerHTML = `
                <td>${customer.firstName} ${customer.lastName}</td>
                <td>${customer.email}</td>
                <td>${customer.tag}</td>
            `;
            studioCustomersList.appendChild(row);
        });

        // Calculate and display percentage for regular customers
        const totalCustomers = res.length;
        const regularPercentage = ((reg_customers.length / totalCustomers) * 100).toFixed(2);
        const studioPercentage = ((pro_customers.length / totalCustomers) * 100).toFixed(2);

        // Update the percentage next to the titles
        document.getElementById("regular-customers-percentage").textContent = `${regularPercentage}%`;
        document.getElementById("studio-customers-percentage").textContent = `${studioPercentage}%`;

    })
    .catch((error) => console.error(error));
}

getCustomer();
