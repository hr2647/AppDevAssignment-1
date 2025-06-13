const mongoose = require('mongoose');

// Define the schema structure for student documents
const studentSchema = mongoose.Schema({
    name: { type: String },
    rollno: { type: Number },
    course: { type: String }
});

// Export the model to use in other files
module.exports = mongoose.model('Student', studentSchema);
