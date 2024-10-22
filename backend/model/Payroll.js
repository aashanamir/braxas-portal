import mongoose from 'mongoose';

const payrollSchema = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  bonus: {
    type: Number,
    default: 0,
  },
  deductions: {
    type: Number,
    default: 0,
  },
  total_pay: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  payslip_url: {
    type: String,
  },
});

export const Payroll = mongoose.model('Payroll', payrollSchema);
