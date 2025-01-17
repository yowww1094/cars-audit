import Order from "../models/Order.js";
import validateMongoDbId from "../utils/validateMongoDbId.js";

const getAllOrder = async (req, res) => {
  const { distinct, distinctBy } = req.query;
  const {
    dateEntrer,
    dateSortie,
    blNumber,
    brand,
    matricule,
    clientName,
    clientPhone,
    serviceType,
    price,
    paidAmt,
    technicien,
    seniorityCard,
    fidelity,
    reclamation
  } = req.query;

  let searchQuery = {};
  if (dateEntrer) {
    searchQuery.dateEntrer = new Date(dateEntrer);
  }
  if (dateSortie) {
    searchQuery.dateSortie = new Date(dateSortie);
  }
  if (blNumber) {
    searchQuery.blNumber = { $regex: blNumber.trim(), $options: "i" };
  }
  if (brand) {
    searchQuery.brand = { $regex: brand.trim(), $options: "i" };
  }
  if (matricule) {
    searchQuery.matricule = { $regex: matricule.trim(), $options: "i" };
  }
  if (clientName) {
    searchQuery.clientName = { $regex: clientName.trim(), $options: "i" };
  }
  if (clientPhone) {
    searchQuery.clientPhone = { $regex: clientPhone.trim(), $options: "i" };
  }
  if (serviceType) {
    searchQuery.serviceType = { $regex: serviceType.trim(), $options: "i" };
  }
  if (price) {
    searchQuery.price = price.trim();
  }
  if (paidAmt) {
    searchQuery.paidAmt = paidAmt.trim();
  }
  if (technicien) {
    searchQuery.technicien = { $regex: technicien.trim(), $options: "i" };
  }

  if (seniorityCard) {
    searchQuery.seniorityCard = seniorityCard.trim();
  }
  if (fidelity) {
    searchQuery.fidelity = fidelity.trim();
  }
  if (reclamation) {
    searchQuery.reclamation = reclamation.trim();
  }

  try {
    const orders =
      Object.keys(searchQuery).length === 0
        ? await Order.find()
        : distinct ? await Order.find(searchQuery).distinct(distinctBy) : await Order.find(searchQuery);
    if (!orders || orders.length === 0) {
      return res.status(200).json({
        orders,
        message: "No Orders found",
      });
    }
    return res.status(200).json({
      orders,
    });
  } catch (error) {
    console.log("Server error", error);
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      res.status(404).json({
        message: "Order not found",
      });
    }
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
    });
    console.log("Server error", error);
  }
};

const createOrder = async (req, res) => {
  const {
    dateEntrer,
    dateSortie,
    blNumber,
    brand,
    matricule,
    clientName,
    clientPhone,
    serviceType,
    technicien,
    price,
    paidAmt,
    seniorityCard,
    fidelity,
    reclamation
  } = req.body;
  try {
    const order = await Order.create({
      dateEntrer,
      dateSortie,
      blNumber,
      brand,
      matricule,
      clientName,
      clientPhone,
      serviceType,
      technicien,
      price,
      paidAmt,
      seniorityCard,
      fidelity,
      reclamation
    });
    if (!order) {
      res.status(400);
    }
    res.status(200).json({ order });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = {};
      for(let field in error.errors){
        errors[field] = error.errors[field].message
      }
      return res.status(400).json({ errors });
    }
    res.status(500).json({
      message: "Something went wrong!",
    });
    console.log("Server error", error);
  }
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const {
    dateEntrer,
    dateSortie,
    blNumber,
    brand,
    matricule,
    clientName,
    clientPhone,
    serviceType,
    technicien,
    price,
    paidAmt,
    seniorityCard,
    fidelity,
    reclamation
  } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      id,
      {
        dateEntrer,
        dateSortie,
        blNumber,
        brand,
        matricule,
        clientName,
        clientPhone,
        serviceType,
        technicien,
        price,
        paidAmt,
        seniorityCard,
        fidelity,
        reclamation
      },
      {
        new: true,
      }
    );
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    return res.status(200).json({
      message: "Order updated Successfully!",
      order,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = {};
      for(let field in error.errors){
        errors[field] = error.errors[field].message
      }
      return res.status(400).json({ errors });
    }
    console.log("Server error", error);
    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      res.status(404).json({
        message: "Order not found",
      });
    }
    res.status(200).json({
      message: "Order deleted Successfully!",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
    });
    console.log("Server error", error);
  }
};

export { getAllOrder, getOrderById, createOrder, updateOrder, deleteOrder };
