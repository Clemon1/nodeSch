import department from "../model/departmentModel";

// Find all department

export const findDepartment = async (req, res) => {
  try {
    const departM = await department.find(department);
    res.status(200).json(departM);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
// Find single department
export const findSingleDepartment = async (req, res) => {
  try {
    const id = req.params.id;
    const singleDepartment = await department.findById(id);
    res.status(200).json(singleDepartment);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Create department
export const createDepartment = async (req, res) => {
  try {
  } catch (err) {}
};
// Update department
export const updateDepartment = async (req, res) => {};
// Delete department
export const deleteDepartment = async (req, res) => {};
