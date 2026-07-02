// State Management
let students = JSON.parse(localStorage.getItem('proStudentData')) || [
    { id: 'STU001', name: 'Alex Johnson', age: 21, department: 'CSE', email: 'alex@example.com', date: '2026-01-15', status: 'Active' },
    { id: 'STU002', name: 'Sarah Miller', age: 22, department: 'ECE', email: 'sarah@example.com', date: '2026-02-10', status: 'Active' },
    { id: 'STU003', name: 'Michael Chen', age: 20, department: 'IT', email: 'michael@example.com', date: '2026-03-05', status: 'Active' },
    { id: 'STU004', name: 'Emily Davis', age: 23, department: 'MECH', email: 'emily@example.com', date: '2026-03-20', status: 'Active' },
    { id: 'STU005', name: 'David Wilson', age: 21, department: 'CSE', email: 'david@example.com', date: '2026-04-12', status: 'Active' }
];

let currentPage = 1;
const itemsPerPage = 10;
let filteredStudents = [...students];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    setupEventListeners();
    checkDarkMode();
});

function initApp() {
    updateStats();
    renderStudents();
}

function setupEventListeners() {
    document.getElementById('studentForm').addEventListener('submit', handleSubmit);
    document.getElementById('globalSearch').addEventListener('input', handleGlobalSearch);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// --- Stats Management ---
function updateStats() {
    const total = students.length;
    const depts = new Set(students.map(s => s.department)).size;
    const avgAge = total > 0 ? (students.reduce((acc, s) => acc + parseInt(s.age), 0) / total).toFixed(1) : 0;
    
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - 7);
    const recent = students.filter(s => new Date(s.date) >= recentDate).length;

    document.getElementById('totalStudents').textContent = total;
    document.getElementById('totalDepts').textContent = depts;
    document.getElementById('avgAge').textContent = avgAge;
    document.getElementById('recentAdds').textContent = recent;
}

// --- Rendering ---
function renderStudents() {
    const tbody = document.getElementById('studentsList');
    const noData = document.getElementById('noData');
    
    if (filteredStudents.length === 0) {
        tbody.innerHTML = '';
        noData.style.display = 'block';
        document.getElementById('paginationInfo').textContent = 'Showing 0 students';
        return;
    }

    noData.style.display = 'none';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageStudents = filteredStudents.slice(start, end);

    tbody.innerHTML = pageStudents.map(student => `
        <tr>
            <td>#${student.id}</td>
            <td>
                <div class="student-name">
                    <img class="student-avatar" src="https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=6366f1&color=fff" alt="">
                    <span>${student.name}</span>
                </div>
            </td>
            <td>${student.age}</td>
            <td>${student.department}</td>
            <td>${student.email}</td>
            <td>${student.date}</td>
            <td><span class="status-badge status-active">${student.status}</span></td>
            <td>
                <div class="actions">
                    <button class="btn-icon view" onclick="viewStudent('${student.id}')" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon edit" onclick="editStudent('${student.id}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon delete" onclick="deleteStudent('${student.id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
    document.getElementById('paginationInfo').textContent = `Showing ${filteredStudents.length} student${filteredStudents.length !== 1 ? 's' : ''}`;
    document.getElementById('pageNumber').textContent = `${currentPage} / ${totalPages}`;
}

// --- CRUD Operations ---
function handleSubmit(e) {
    e.preventDefault();

    const editIndex = document.getElementById('editIndex').value;
    const name = document.getElementById('studentName').value;
    const age = document.getElementById('studentAge').value;
    const dept = document.getElementById('studentDept').value;
    const email = document.getElementById('studentEmail').value;

    if (editIndex === "-1") {
        // Add new
        const newId = 'STU' + String(Math.floor(Math.random() * 9000) + 1000);
        students.push({
            id: newId,
            name,
            age,
            department: dept,
            email,
            date: new Date().toISOString().split('T')[0],
            status: 'Active'
        });
        showToast('Student added successfully!');
    } else {
        // Update existing
        const idx = students.findIndex(s => s.id === editIndex);
        if (idx !== -1) {
            students[idx] = { ...students[idx], name, age, department: dept, email };
            showToast('Student updated successfully!');
        }
    }

    saveData();
    closeModal('addStudentModal');
}

function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(s => s.id !== id);
        saveData();
        showToast('Student deleted successfully!');
    }
}

function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;

    document.getElementById('modalTitle').textContent = 'Edit Student';
    document.getElementById('editIndex').value = student.id;
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentAge').value = student.age;
    document.getElementById('studentDept').value = student.department;
    document.getElementById('studentEmail').value = student.email;

    openModal('addStudentModal');
}

function viewStudent(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;

    const content = document.getElementById('viewContent');
    content.innerHTML = `
        <img class="view-avatar" src="https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&size=100&background=6366f1&color=fff" alt="">
        <div class="view-name">${student.name}</div>
        <div class="view-id">ID: #${student.id}</div>
        <div class="view-details">
            <div class="detail-item">
                <div class="detail-label">Department</div>
                <div class="detail-value">${student.department}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Age</div>
                <div class="detail-value">${student.age} Years</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Email</div>
                <div class="detail-value">${student.email}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Enrolled On</div>
                <div class="detail-value">${student.date}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Status</div>
                <div class="detail-value">${student.status}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Student ID</div>
                <div class="detail-value">#${student.id}</div>
            </div>
        </div>
    `;

    openModal('viewModal');
}

// --- Filtering & Searching ---
function applyFilters() {
    currentPage = 1;
    const deptFilter = document.getElementById('filterDept').value;
    const sortBy = document.getElementById('sortBy').value;

    filteredStudents = [...students];

    // Filter by department
    if (deptFilter) {
        filteredStudents = filteredStudents.filter(s => s.department === deptFilter);
    }

    // Sort
    if (sortBy === 'nameAsc') {
        filteredStudents.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'nameDesc') {
        filteredStudents.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'ageAsc') {
        filteredStudents.sort((a, b) => a.age - b.age);
    } else if (sortBy === 'newest') {
        filteredStudents.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    renderStudents();
}

function handleGlobalSearch(e) {
    const query = e.target.value.toLowerCase();
    currentPage = 1;

    if (query.trim() === '') {
        filteredStudents = [...students];
    } else {
        filteredStudents = students.filter(s =>
            s.name.toLowerCase().includes(query) ||
            s.email.toLowerCase().includes(query) ||
            s.id.toLowerCase().includes(query) ||
            s.department.toLowerCase().includes(query)
        );
    }

    renderStudents();
}

// --- Pagination ---
function nextPage() {
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderStudents();
    }
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        renderStudents();
    }
}

// --- Modal Management ---
function openModal(modalId) {
    if (modalId === 'addStudentModal') {
        document.getElementById('modalTitle').textContent = 'Add New Student';
        document.getElementById('studentForm').reset();
        document.getElementById('editIndex').value = "-1";
    }
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// --- Utilities ---
function saveData() {
    localStorage.setItem('proStudentData', JSON.stringify(students));
    updateStats();
    applyFilters();
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

function exportData() {
    const dataStr = JSON.stringify(students, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `students_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Data exported successfully!');
}

function toggleDarkMode() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

function checkDarkMode() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }
}
