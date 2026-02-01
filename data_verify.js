
async function testEndpoint(name, url) {
    try {
        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            console.log(`[PASS] ${name}: Got ${Array.isArray(data) ? data.length + ' items' : 'object'}`);
        } else {
            console.error(`[FAIL] ${name}: ${res.status} ${res.statusText}`);
        }
    } catch (e) {
        console.error(`[FAIL] ${name}: ${e.message}`);
    }
}

async function main() {
    console.log("Verifying APIs...");
    await testEndpoint('Products', 'http://localhost:3000/api/products');
    await testEndpoint('Blog', 'http://localhost:3000/api/blog');
    await testEndpoint('Orders', 'http://localhost:3000/api/orders');
    await testEndpoint('Settings', 'http://localhost:3000/api/settings');
}

main();
