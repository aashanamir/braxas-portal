import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Admin', 'Employee'],
    default: 'Employee',
  },
  contact_number: {
    type: String,
    required: true,
  },
  profile_image: {
    type: String,
  },
  custom_schedule: {
    start: { type: Date },
    end: { type: Date },
    breaks: [{ start: Date, end: Date }],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Virtual relationships
employeeSchema.virtual('attendanceRecords', {
  ref: 'Attendance',
  localField: '_id',
  foreignField: 'employee_id',
});

employeeSchema.virtual('payrolls', {
  ref: 'Payroll',
  localField: '_id',
  foreignField: 'employee_id',
});

employeeSchema.virtual('leaves', {
  ref: 'Leave',
  localField: '_id',
  foreignField: 'employee_id',
});

export const Employee = mongoose.model('Employee', employeeSchema);