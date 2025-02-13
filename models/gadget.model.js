const mongoose = require("mongoose");

const gadgetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Gadget name is required"],
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String,
    },
    specs: {
      dimensions: {
        type: String,
        required: [true, "Dimensions are required"],
      },
      category: {
        type: String,
        required: [true, "Category is required"],
        enum: ["Smart Home", "Wearables", "Audio", "Mobile Accessories"],
      },
      price: {
        type: Number,
        required: [true, "Price is required"],
      },
      batteryLife: {
        type: Number,
        required: [true, "Battery life is required"],
      },
    },
    keyFeatures: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RxGadget", gadgetSchema);
