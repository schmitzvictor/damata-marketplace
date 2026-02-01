
async function testUpdatePersistence() {
    console.log("Creating product...");
    // 1. Create
    const createRes = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: "Persistent Stock Test",
            price: 50,
            category: "Camisetas",
            image: "",
            variants: [{ size: "M", stock: 10 }]
        })
    });
    const product = await createRes.json();
    console.log("Created:", product.id, "Stock:", product.variants[0].stock);

    // 2. Update
    console.log("Updating stock to 50...");
    const updateRes = await fetch(`http://localhost:3000/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: "Persistent Stock Test",
            price: 50,
            category: "Camisetas",
            image: "",
            variants: [{ size: "M", stock: 50 }]
        })
    });
    const updated = await updateRes.json();
    console.log("Update Response FULL:", JSON.stringify(updated, null, 2)); 
    console.log("Update Response Stock:", updated.stock); 

    // 3. Fetch List (simulate Admin Page)
    console.log("Fetching List...");
    const listRes = await fetch('http://localhost:3000/api/products');
    const list = await listRes.json();
    const found = list.find(p => p.id === product.id);
    
    if (found && found.stock === 50) {
        console.log("SUCCESS: List shows stock 50");
    } else {
        console.log("FAIL: List shows stock", found ? found.stock : "Not Found");
    }

    // Cleanup
    await fetch(`http://localhost:3000/api/products/${product.id}`, { method: 'DELETE' });
}

testUpdatePersistence();
