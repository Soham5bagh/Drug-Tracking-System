import mongoose from 'mongoose';

export enum DrugStatus {
  MANUFACTURED = 'MANUFACTURED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  VERIFIED = 'VERIFIED'
}

const drugSchema = new mongoose.Schema({
  batchId: {
    type: String,
    required: true,
    unique: true,
  },
  drugName: {
    type: String,
    required: true,
  },
  batchNumber: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  distributor: {
    type: String,
    default: '',
  },
  quantity: {
    type: Number,
    required: true,
  },
  manufacturingDate: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(DrugStatus),
    default: DrugStatus.MANUFACTURED,
  },
  verificationCode: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Update the updatedAt field on save
drugSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Drug = mongoose.models.Drug || mongoose.model('Drug', drugSchema);

export default Drug; 