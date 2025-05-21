const menuItems = [
  {
    id: 1,
    name: "Veg Burger",
    description: "Cheesy veg burger with lettuce and mayo",
    price: 40,
    image: "burger.png",
    isVeg: true
  },
  {
    id: 2,
    name: "Poha",
    description: "Easy, delicious, and healthy!",
    price: 20,
    image: "poha.png",
    isVeg: true
  },
  {
    id: 3,
    name: "Paneer Tikka",
    description: "Grilled paneer cubes with spices",
    price: 60,
    image: "paneer-tikka.png",
    isVeg: true
  },
  {
    id: 4,
    name: "Masala Dosa",
    description: "Crispy dosa with potato masala",
    price: 50,
    image: "dosa.png",
    isVeg: true
  },
  {
    id: 5,
    name: "Egg Curry",
    description: "Spicy egg curry served with rice",
    price: 70,
    image: "egg-curry.png",
    isVeg: false
  },
  {
    id: 6,
    name: "Samosa",
    description: "Crunchy samosa with chutney",
    price: 30,
    image: "samosa.png",
    isVeg: true
  },
  {
    id: 7,
    name: "Maharashtrian Thali",
    description: " balanced meal bursting with spicy and sweet ",
    price: 130,
    image: "thali.png",
    isVeg: true
  },
  {
    id: 8,
    name: "Coffee",
    description: " Coffee, Your Mood Booster ",
    price: 30,
    image: "cofee.png",
    isVeg: true
  }
];

function renderMenu(items) {
  const menuContainer = document.getElementById('menu');
  menuContainer.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'menu-item-card';
    card.innerHTML = `
      <img src="assets/images/${item.image}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p>₹${item.price}</p>
      <button onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>
    `;
    menuContainer.appendChild(card);
  });
}

document.getElementById('search').addEventListener('input', filterMenu);
document.getElementById('veg-filter').addEventListener('change', filterMenu);
document.getElementById('price-range').addEventListener('input', e => {
  document.getElementById('price-value').innerText = e.target.value;
  filterMenu();
});

function filterMenu() {
  const term = document.getElementById('search').value.toLowerCase();
  const showVeg = document.getElementById('veg-filter').checked;
  const maxPrice = parseInt(document.getElementById('price-range').value);

  const filtered = menuItems.filter(item => {
    return (
      item.name.toLowerCase().includes(term) &&
      (!showVeg || item.isVeg) &&
      item.price <= maxPrice
    );
  });

  renderMenu(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
  renderMenu(menuItems);
  updateCart();
});