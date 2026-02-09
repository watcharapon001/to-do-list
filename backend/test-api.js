async function test() {
    const baseUrl = 'http://localhost:3000/api/todos';

    try {
        // 1. Get initial
        console.log('1. GET Initial list');
        let res = await fetch(baseUrl);
        console.log('Status:', res.status);
        console.log('Body:', await res.json());

        // 2. Post
        console.log('\n2. POST New Task');
        res = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Test Task' })
        });
        console.log('Status:', res.status);
        console.log('Body:', await res.json());

        // 3. Get again
        console.log('\n3. GET List after add');
        res = await fetch(baseUrl);
        console.log('Status:', res.status);
        console.log('Body:', await res.json());
    } catch (error) {
        console.error('Test failed:', error);
    }
}

test();
