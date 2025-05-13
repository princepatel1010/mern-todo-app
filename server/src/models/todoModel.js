import mongooseToJson from "@meanie/mongoose-to-json";
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

todoSchema.plugin(mongooseToJson);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
