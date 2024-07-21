import Role from '../models/roles.js';

const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find().sort({ _id: -1 });
        res.status(200).json(roles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getRoleByID = async (req, res) => {
    try {
        let id = req.params.id;
        await Role.findById(id, (err, data) => {
            if (err) return res.json({ message: 'No role with that id.' });
            res.send(data);
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createRole = async (req, res) => {
    const newRole = new Role({
        role_id: req.body.role_id,
        role: req.body.role
    });
    try {
        await newRole.save();
        res.status(200).json({ newRole: newRole, success: true });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateRole = async (req, res) => {
    const id = req.params.id;

    const role = await Role.findById(id);

    if (!id) {
        return res.status(404).send('No role with that id.');
    }

    if (role) {

        role.role_id = req.body.role_id,
        role.role = req.body.role

        if (updatedPost) {
            return res.status(200).send({ msg: 'Role Updated', data: updatedPost, success: true });
        } else {
            return res.status(500).send({ msg: 'Error in Updating role' });
        }
    }
}

const deleteRole = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).send('No role with that id.');
    }
    const deletedRole = await Role.findByIdAndRemove(id);

    res.json({ message: 'Role deleted successfully', post: deletedRole });
}

export { getAllRoles, getRoleByID, createRole, updateRole, deleteRole };