const customerBase = "customer";
const productBase = "product";
const apiKey = "664b4701d214abdeb2a0f004";
const baseUrl = "https://getrgtm-2080.restdb.io/rest/";

async function createJson(base, data) {
  const response = await fetch(baseUrl + base, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": apiKey,
    },
    body: JSON.stringify(data),
  });
  const resp = await response.json();
  return resp;
  // console.log("Customer created:", resp);
}

async function getJson(base, id, query) {
  let endpoint = base;
  if (undefined != id) {
    endpoint += "/" + id;
  } else if (undefined != query) {
    endpoint += query;
  }

  // console.log("endpoint: " + endpoint);

  const response = await fetch(baseUrl + endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": apiKey,
    },
  });
  const resp = await response.json();
  // console.log("Customers:", resp);
  return resp;
}

async function updateJson(base, data, id) {
  const response = await fetch(baseUrl + base + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": apiKey,
    },
    body: JSON.stringify(data),
  });
  const resp = await response.json();
  return resp;
  // console.log("Customer updated:", resp);
}

// async function deleteCustomer(base, id) {
//   const response = await fetch(baseUrl + base + "/" + id, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       "x-apikey": apiKey,
//     },
//   });
//   const resp = await response.json();
//   console.log("Customer deleted:", resp);
// }

// let user = {
//   createTime: "",
//   userName: "",
//   email: "",
//   password: "",
//   productIds: [],
// };

// user.createTime = Date.now().toString();
// user.userName = "Bo";
// user.email = "bo@email.com";
// user.password = "87654321";
// // console.log("check: "+JSON.stringify(user))

// let product = {
//   id: "",
//   userName: "",
//   email: "",
//   password: "",
//   productIds: [],
// };

// createJson(productBase, user);

// getJson(usersBase, "664b65a1184aae2a00000250");
