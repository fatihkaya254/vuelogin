import mongoose from "mongoose";

const subTopicSchema = mongoose.Schema({
  subTopicName: {
    type: String,
    required: true
  },
  subTopicStat: {
    type: String,
    required: true
  },
  subTopicOrder: {
    type: String,
    required: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject"
  }
});

const SubTopic = mongoose.model("subTopic", subTopicSchema);

export default SubTopic;
