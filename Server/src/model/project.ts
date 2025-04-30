import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  title: { type: String, required: true },
  budget: { type: Number, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, required: true },
}, { timestamps: true });

export const Project = mongoose.model('Project', projectSchema);
