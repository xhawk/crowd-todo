import db from "./db.js";

export const getAll = () => {
    return db.prepare(`
        SELECT * FROM todos
        WHERE deleted_at IS NULL
        ORDER BY created_at ASC
    `).all();
}

export const create = (id, title) => {
    const now = new Date().toISOString();
    db.prepare(`
        INSERT INTO todos (id, title, created_at)
        VALUES (?, ?, ?)
    `).run(id, title, now);
}

export const remove = (id) => {
    const now = new Date().toISOString();
    db.prepare(`
        UPDATE todos 
        SET deleted_at = ?, updated_at = ?
        WHERE id = ?
    `).run(now, now, id);
}

export const toggle = (id) => {
    const now = new Date().toISOString();
    db.prepare(`
        UPDATE todos
        SET completed = CASE WHEN completed = 0 THEN 1 ELSE 0 END, 
            updated_at = ? 
        WHERE id = ?
    `).run(now, id);
}
