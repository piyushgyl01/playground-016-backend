const express = require("express");
const app = express();

const { connectToDatabase } = require("./db/db.connect.js");

app.use(express.json());

const Gadget = require("./models/gadget.model.js");

connectToDatabase();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json("Gadgets Hub By Piyush Goyal");
});

// const addDataToDb = async (data) => {
//   try {
//     const addedData = await Gadget.insertMany(data);
//     console.log("Added Data", addedData);
//   } catch (error) {
//     console.log(`UNABLE TO ADD DATA TO DB ${error}`);
//   }
// };

// addDataToDb(mockGadgets)

//POST API
app.post("/api/post-gadget", async (req, res) => {
  try {
    const newGadget = new Gadget(req.body);
    const savedGadget = await newGadget.save();

    res.status(201).json(savedGadget);
  } catch (error) {
    res.status(500).json({ error: "Unable to post the data to DB" });
  }
});

//GET API
app.get("/api/get-products", async (req, res) => {
  try {
    const gadgets = await Gadget.find();

    res.status(200).json(gadgets);
  } catch (error) {
    res.status(500).json({ error: "Unable to get all the gadgets" });
  }
});

app.get("/api/get-gadget/:gadgetId", async (req, res) => {
  try {
    const gadget = await Gadget.findById(req.params.gadgetId);

    if (!gadget) {
      res
        .status(404)
        .json({ error: "Unable to find the gadget through the id" });
    }

    res.status(200).json(gadget);
  } catch (error) {
    res.status(500).json({ error: "Unable to get the gadget through the id" });
  }
});

//PUT API
app.put("/api/put-gadget/:gadgetId", async (req, res) => {
  try {
    const updatedGadget = await Gadget.findByIdAndUpdate(
      req.params.gadgetId,
      req.body,
      { new: true }
    );

    if (!updatedGadget) {
      res
        .status(404)
        .json({ error: "Unable to find the gadget through the id" });
    }

    res.status(200).json(updatedGadget);
  } catch (error) {
    res.status(500).json({ error: "Unable to updat the gadget" });
  }
});

//DELETE API
app.delete("/api/delete-gadget/:gadgetId", async (req, res) => {
  try {
    const deletedGadget = await Gadget.findByIdAndDelete(
      req.params.gadgetId,
      req.body
    );

    if (!deletedGadget) {
      res
        .status(404)
        .json({ error: "Unable to find the gadget through the id" });
    }

    res.status(200).json(deletedGadget)
  } catch (error) {
    res.status(500).json({ error: "Unable to delete the gadget" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`APP IS LISTENING ON ${PORT} PORT`);
});
