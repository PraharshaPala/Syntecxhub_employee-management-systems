const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    employeeId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    imageUrl: { type: String, default: '' } // Stores image web URLs or base64 data strings
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);