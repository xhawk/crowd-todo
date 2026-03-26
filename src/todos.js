import db from "./db.js";

export const getAll = () => {
    return db.prepare(`
        SELECT * FROM todos
        WHERE deleted_at IS NULL
        ORDER BY created_at ASC
    `).all();
}

export const create = (id, title, now) => {
    db.prepare(`
        INSERT INTO todos (id, title, created_at)
        VALUES (?, ?, ?)
    `).run(id, title, now);
}

export const remove = (id) => {
    db.prepare(`
        UPDATE todos 
        SET deleted_at = ?
        WHERE id = ?
    `).run(new Date().toISOString(), id);
}

export const toggle = (id) => {
    db.prepare(`
        UPDATE todos
        SET completed = 1 - (SELECT completed FROM todos WHERE id = ?)
        WHERE id = ?
    `).run(id, id)
}