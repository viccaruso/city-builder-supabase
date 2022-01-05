const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTUwOTAyMSwiZXhwIjoxOTU1MDg1MDIxfQ.v4B-VNkc9Xc9bIM4ig0BrZcgdU2bqx3VGiJiMMYNcis';
const SUPABASE_URL = 'https://iddyxpegdpnmmnebvghi.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getUser() {
    return client.auth.session();
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./other-page');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '/';
}

export async function fetchCity() {
    const response = await client
        .from('cities')
        .select()
        .single();
    
    return checkError(response);
}

export async function createDefaultCity() {
    const response = await client
        .from('cities')
        .insert([{
            name: 'Nullville',
            water_type: Math.ceil(Math.random() * 3),
            density_type: Math.ceil(Math.random() * 3),
            park_type: Math.ceil(Math.random() * 3),
            mottos: []
        }]);
    
    return checkError(response);
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
