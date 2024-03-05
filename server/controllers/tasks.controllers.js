import { pool } from '../dbCon.js'

export const getTasks = async (req, res) => {
    const [result] = await pool.query("SELECT * FROM tasks ORDER BY createdAt ASC")
    res.json(result)
}

export const getTask = async (req, res) => {
    const [result] = await pool.query("SELECT * FROM tasks WHERE id = ?", [req.params.id])
    if (result.length === 0) {
        return res.status(404).json({ message: "Task not found" })
    }
    res.json(result[0]) //[0] por que solo se busca una tarea, no necesita ser un arreglo lo que regrese, solo 1 objeto con la inf del dato buscado
}

export const createTask = async (req, res) => {
    const { title, description } = req.body
    const [result] = await pool.query("INSERT INTO tasks (title, description) VALUES (?, ?)", [title, description])
    res.json({
        id: result.insertId,
        title,
        description,
    })
}

export const updateTask = async (req, res) => {
    const { title, description } = req.body
    const result = await pool.query("UPDATE tasks SET ? WHERE id = ?", [req.body, req.params.id])
    if (result[0].affectedRows === 0) {
        return res.status(404).json({ message: "Task not found" })
    }
    res.json({
        id: req.params.id,
        title,
        description,
    })
}

export const deleteTask = async (req, res) => {
    const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [req.params.id])
    if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Task not found" })
    }
    return res.status(204)
}