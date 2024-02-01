import mongoose, { Document, Schema } from "mongoose";

interface IAssessment extends Document {
  username: string;
  name: string;
  description: string;
  quantity: number;
}

const assessmentSchema = new Schema<IAssessment>({
  username: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const Assessment = mongoose.model<IAssessment>("Assessment", assessmentSchema);

export default Assessment;
