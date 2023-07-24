const addBtn = document.querySelector("#addBtn");
const searchInput = document.querySelector("#search");
const pname = document.querySelector("#pname");
const pcategory = document.querySelector("#category");
const Price = document.querySelector("#price");
const desc = document.querySelector("#desc");
const table = document.querySelector("tbody");
const delBtn = document.querySelector(".deletebtn");

let products;

if (localStorage.getItem("products") == null) {
  products = [];
} else {
  products = JSON.parse(localStorage.getItem("products"));
  showProducts(products);
}

addBtn.addEventListener("click", () => {
  if (addBtn.textContent == "Add Product") {
    let prod = {
      name: pname.value,
      category: pcategory.value,
      price: Price.value,
      description: desc.value,
    };
    products.push(prod);
    localStorage.setItem("products", JSON.stringify(products));
    showLastProdut();
  } else {
    let val = addBtn.dataset.index;
    products[val].name = pname.value;
    products[val].category = pcategory.value;
    products[val].price = Price.value;
    products[val].description = desc.value;
    addBtn.textContent = "Add Product";
    localStorage.setItem("products", JSON.stringify(products));
    showProducts(products);
  }
});

function showLastProdut() {
  let i = products.length - 1;
  let trs = `
<tr>
<td>${i + 1}</td>
<td>${products[i].name}</td>
<td>${products[i].category}</td>
<td>${products[i].price}</td>
<td>${products[i].description}</td>
<td><button class="btn btn-outline-warning" onclick="update(${i})"><i class="fa-solid fa-edit" ></i></button></td>
<td><button class="btn btn-outline-danger deletebtn" onclick="deleted(${i})"><i class="fa-solid fa-trash"></i></button></td>
</tr>`;
  table.innerHTML += trs;
}

function deleted(val) {
  products.splice(val, 1);
  localStorage.setItem("products", JSON.stringify(products));
  showProducts(products);
}

function showProducts(products) {
  let trs = "";
  for (let i = 0; i < products.length; i++) {
    trs += `
      <tr>
      <td>${i + 1}</td>
      <td>${products[i].name}</td>
      <td>${products[i].category}</td>
      <td>${products[i].price}</td>
      <td>${products[i].description}</td>
      <td><button class="btn btn-outline-warning" onclick="update(${i})"><i class="fa-solid fa-edit"></i></button></td>
      <td><button class="btn btn-outline-danger deletebtn" onclick="deleted(${i})"><i class="fa-solid fa-trash"></i></button></td>
      </tr>`;
  }
  table.innerHTML = trs;
}

function update(val) {
  populateFields(val);
  addBtn.textContent = "UPDATE";
  addBtn.dataset.index = val;
}

function populateFields(val) {
  pname.value = products[val].name;
  pcategory.value = products[val].category;
  Price.value = products[val].price;
  desc.value = products[val].description;
}

function Reset() {
  products = [];
  table.innerHTML = "";
  pname.value = "";
  pcategory.value = "";
  desc.value = "";
  Price.value = "";
  products = [];
  localStorage.setItem("products", JSON.stringify(products));
}

function searchProduct() {
  filtredList = [];

  const searchQuery = searchInput.value.toLowerCase();
  for (let i = 0; i < products.length; i++) {
    const name = products[i].name.toLowerCase();
    const category = products[i].category.toLowerCase();
    const description = products[i].description.toLowerCase();
    if (
      name.includes(searchQuery) ||
      category.includes(searchQuery) ||
      description.includes(searchQuery)
    )
      filtredList.push(products[i]);
  }
  showProducts(filtredList);
}
