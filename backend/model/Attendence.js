import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  clock_in: {
    type: Date,
    required: true,
  },
  clock_out: {
    type: Date,
  },
  shift_start: {
    type: Date,
    required: true,
  },
  shift_end: {
    type: Date,
    required: true,
  },
  is_late: {
    type: Boolean,
    default: false,
  },
  is_overtime: {
    type: Boolean,
    default: false,
  },
  total_hours: {
    type: Number,
  },
  date: {
    type: Date,
    required: true,
  },
});

export const Attendance = mongoose.model('Attendance', attendanceSchema);
