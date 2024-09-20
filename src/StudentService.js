const BASE_URL = 'http://localhost:8080/students';

export async function fetchStudents() {
    const response = await fetch(BASE_URL);
    return response.json();
}

export async function addStudent(student) {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
    });
    return response.json();
}

export async function deleteStudent(id) {
    await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
}
