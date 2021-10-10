import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  imageUpText: {
    type: String,
  },
  imageUrl: { 
    type: String,
  },
  imageDownText: {
    type: String,
  },
  root: {
    type: String,
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  },
  wrongAnswer1: {
    type: String,
    required: true
  },
  wrongAnswer2: {
    type: String,
    required: true
  },
  wrongAnswer3: {
    type: String,
    required: true
  },
  wrongAnswer4: {
    type: String,
    required: true
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "branch",
    required: true
  },
  subtopics: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "subTopic"
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  }
});

const Question = mongoose.model("question", questionSchema);

export default Question;
