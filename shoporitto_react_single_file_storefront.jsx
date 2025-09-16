import React, { useState } from "react";

// SHOPORITTO - Single-file React storefront (Tailwind CSS required)
// How to use:
// 1) Add Tailwind CSS to your project (recommended) or translate classes to your CSS.
// 2) Replace product images (placeholder URLs) with your own / Webflow-exported images.
// 3) To connect to Shopify, replace the `handleCheckout` and product sources with your Shopify Buy SDK or storefront API.

export default function ShoporittoApp() {
  const initialProducts = [
    {
      id: "p1",
      title: "Compact Hair Dryer",
      price: 34.99,
      tags: ["soch", "beauty"],
      img: "https://via.placeholder.com/800x800?text=Hair+Dryer",
      short: "Tez quritadi, salon natijasi",
      rating: 4.6,
      stock: 120,
    },
    {
      id: "p2",
      title: "Posture Corrector Belt",
      price: 29.5,
      tags: ["tana", "fitness"],
      img: "https://via.placeholder.com/800x800?text=Posture+Belt",
      short: "Qulay va yengil material",
      rating: 4.4,
      stock: 80,
    },
    {
      id: "p3",
      title: "Ceramic Hair Straightener",
      price: 48.0,
      tags: ["soch", "styling"],
      img: "https://via.placeholder.com/800x800?text=Hair+Straightener",
      short: "Zarar kamaytiruvchi keramika plating",
      rating: 4.7,
      stock: 50,
    },
    {
      id: "p4",
      title: "Facial Massager Roller",
      price: 18.0,
      tags: ["kosmetika", "beauty"],
      img: "https://via.placeholder.com/800x800?text=Face+Roller",
      short: "Teri uchun massaj va qon aylanishi",
      rating: 4.3,
      stock: 150,
    },
  ];

  const [products] = useState(initialProducts);
  const [query, setQuery] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);

  function addToCart(product, qty = 1) {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: Math.min(p.qty + qty, product.stock) } : p
        );
      }
      return [...prev, { ...product, qty }];
    });
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  }

  function updateQty(productId, qty) {
    setCart((prev) => prev.map((p) => (p.id === productId ? { ...p, qty } : p)));
  }

  function cartTotal() {
    return cart.reduce((s, p) => s + p.price * p.qty, 0).toFixed(2);
  }

  function handleCheckout() {
    // For demo: open a fake checkout modal.
    // Replace this with Shopify checkout code or your payment provider integration.
    alert("Checkout: total $" + cartTotal());
  }

  const tags = Array.from(new Set(products.flatMap((p) => p.tags)));

  const visible = products.filter((p) => {
    const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase()) || p.short.toLowerCase().includes(query.toLowerCase());
    const matchesTag = filterTag ? p.tags.includes(filterTag) : true;
    return matchesQuery && matchesTag;
  });

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <div>
            <a href="#" className="text-2xl font-bold tracking-tight">
              SHOPORITTO
            </a>
            <div className="text-sm text-gray-500">Beauty & Lifestyle</div>
          </div>
          <div className="flex items-center gap-4">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border rounded-md px-3 py-2 w-64 text-sm"
              placeholder="Search products, e.g. hair dryer"
            />

            <button
              onClick={() => setFilterTag("")}
              className={`text-sm px-3 py-2 rounded-md ${filterTag === "" ? "bg-gray-100" : "bg-white"}`}
            >
              All
            </button>
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setFilterTag(t)}
                className={`text-sm px-3 py-2 rounded-md ${filterTag === t ? "bg-pink-100" : "bg-white"}`}
              >
                {t}
              </button>
            ))}

            <CartButton count={cart.reduce((s, p) => s + p.qty, 0)} onClick={() => setSelected({ type: "cart" })} />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-extrabold mb-4">Beauty made simple</h1>
            <p className="text-gray-600 mb-6">
              Trendy and affordable beauty tools for everyday women.
              Shop compact hair tools, posture helpers, and skincare accessories.
            </p>

            <div className="flex gap-3">
              <a href="#products" className="inline-block bg-pink-200 text-pink-900 px-5 py-3 rounded-md font-semibold">
                Shop Bestsellers
              </a>

              <a href="#" className="inline-block border px-5 py-3 rounded-md text-sm">
                Learn More
              </a>
            </div>

            <ul className="mt-6 text-sm text-gray-600 grid grid-cols-2 gap-2">
              <li>Free shipping over $50</li>
              <li>30-day returns</li>
              <li>Secure payments</li>
              <li>Local support</li>
            </ul>
          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src="https://via.placeholder.com/700x560?text=Hero+Lifestyle"
              alt="Woman using beauty tool"
              className="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Products */}
      <main id="products" className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Products</h2>
          <div className="text-sm text-gray-500">Showing {visible.length} items</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {visible.map((p) => (
            <article key={p.id} className="border rounded-lg overflow-hidden bg-white shadow-sm">
              <button onClick={() => setSelected({ type: "product", product: p })} className="block">
                <img src={p.img} alt={p.title} className="w-full h-56 object-cover" />
              </button>

              <div className="p-4">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{p.short}</p>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-base font-bold">${p.price.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">Rating: {p.rating}</div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(p, 1)}
                      className="bg-pink-200 text-pink-900 px-3 py-2 rounded-md text-sm font-semibold"
                    >
                      Add
                    </button>

                    <button
                      onClick={() => setSelected({ type: "product", product: p })}
                      className="border px-3 py-2 rounded-md text-sm"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="mx-auto max-w-6xl px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-bold">SHOPORITTO</h4>
            <p className="text-sm text-gray-500 mt-2">Beauty & Lifestyle for everyday women.</p>
          </div>

          <div>
            <h5 className="font-semibold">Customer</h5>
            <ul className="text-sm text-gray-500 mt-2 space-y-1">
              <li>Delivery & Returns</li>
              <li>Payment</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold">Subscribe</h5>
            <p className="text-sm text-gray-500 mt-2">Get 10% off first order</p>
            <div className="mt-3 flex">
              <input className="border rounded-l px-3 py-2 text-sm w-full" placeholder="Your email" />
              <button className="bg-pink-200 px-4 rounded-r">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 py-4">© SHOPORITTO</div>
      </footer>

      {/* Modal area for cart or product */}
      {selected && selected.type === "cart" && (
        <Modal onClose={() => setSelected(null)}>
          <h3 className="text-xl font-bold">Your Cart</h3>
          {cart.length === 0 ? (
            <p className="text-gray-600 mt-4">Cart is empty</p>
          ) : (
            <div className="mt-4 space-y-3">
              {cart.map((c) => (
                <div key={c.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={c.img} alt={c.title} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <div className="font-semibold">{c.title}</div>
                      <div className="text-sm text-gray-500">${c.price.toFixed(2)}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={c.stock}
                      value={c.qty}
                      onChange={(e) => updateQty(c.id, Math.max(1, Number(e.target.value)))}
                      className="w-16 border rounded px-2 py-1 text-sm"
                    />

                    <button onClick={() => removeFromCart(c.id)} className="text-sm text-red-500">Remove</button>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t flex items-center justify-between">
                <div className="font-semibold">Total: ${cartTotal()}</div>
                <div className="flex gap-3">
                  <button onClick={() => setSelected(null)} className="border px-4 py-2 rounded-md">Continue Shopping</button>
                  <button onClick={handleCheckout} className="bg-pink-500 text-white px-4 py-2 rounded-md">Checkout</button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      )}

      {selected && selected.type === "product" && (
        <Modal onClose={() => setSelected(null)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img src={selected.product.img} alt={selected.product.title} className="w-full h-96 object-cover rounded" />
            </div>

            <div>
              <h3 className="text-2xl font-bold">{selected.product.title}</h3>
              <div className="mt-2 text-gray-600">{selected.product.short}</div>

              <div className="mt-4 font-bold text-2xl">${selected.product.price.toFixed(2)}</div>

              <div className="mt-4 flex items-center gap-3">
                <label className="text-sm">Quantity</label>
                <input type="number" defaultValue={1} min={1} max={selected.product.stock} className="w-20 border rounded px-2 py-1 text-sm" id="qty" />
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    const qty = Number(document.getElementById("qty").value) || 1;
                    addToCart(selected.product, qty);
                    setSelected(null);
                  }}
                  className="bg-pink-500 text-white px-4 py-2 rounded-md"
                >
                  Add to cart
                </button>

                <button onClick={() => setSelected(null)} className="border px-4 py-2 rounded-md">Close</button>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                <div>Stock: {selected.product.stock}</div>
                <div>Rating: {selected.product.rating}</div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function CartButton({ count = 0, onClick }) {
  return (
    <button onClick={onClick} aria-label="Open cart" className="relative">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6h12l-2-6M16 21a1 1 0 11-2 0 1 1 0 012 0zM8 21a1 1 0 11-2 0 1 1 0 012 0z" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">{count}</span>
      )}
    </button>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>
      <div className="relative z-10 bg-white rounded-lg shadow-lg max-w-3xl w-full p-6"> 
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500">Close</button>
        {children}
      </div>
    </div>
  );
}
