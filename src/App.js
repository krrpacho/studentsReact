import React, { useState, useEffect } from 'react';
import { fetchStudents, addStudent, deleteStudent } from './StudentService';

function App() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState('');
    const [newStudent, setNewStudent] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        dateOfBirth: '',
        groupName: '',
    });

    useEffect(() => {
        loadStudents();
    }, []);

    async function loadStudents() {
        const data = await fetchStudents();
        setStudents(data);
    }

    async function handleAddStudent() {
        await addStudent(newStudent);
        loadStudents();
        setNewStudent({
            firstName: '',
            lastName: '',
            middleName: '',
            dateOfBirth: '',
            groupName: '',
        });
    }

    async function handleDeleteStudent(id) {
        await deleteStudent(id);
        loadStudents();
    }

    const filteredStudents = students.filter(
        (student) =>
            student.firstName.toLowerCase().includes(search.toLowerCase()) ||
            student.lastName.toLowerCase().includes(search.toLowerCase()) ||
            student.groupName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            <h1>Student Management</h1>
      
            <input
                type="text"
                placeholder="Search students"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
            />

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={newStudent.firstName}
                    onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={newStudent.lastName}
                    onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Middle Name"
                    value={newStudent.middleName}
                    onChange={(e) => setNewStudent({ ...newStudent, middleName: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Date of Birth"
                    value={newStudent.dateOfBirth}
                    onChange={(e) => setNewStudent({ ...newStudent, dateOfBirth: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Group"
                    value={newStudent.groupName}
                    onChange={(e) => setNewStudent({ ...newStudent, groupName: e.target.value })}
                />
                <button onClick={handleAddStudent}>+</button>
            </div>

            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Middle Name</th>
                        <th>Date of Birth</th>
                        <th>Group</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStudents.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.middleName}</td>
                            <td>{student.dateOfBirth}</td>
                            <td>{student.groupName}</td>
                            <td>
                                <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
